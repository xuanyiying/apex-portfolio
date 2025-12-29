import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GITHUB_USERNAME = 'xuanyiying';
const OUTPUT_FILE = path.join(__dirname, '../src/data/projects.ts');
const REPO_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;
interface GitHubRepo {
    id: number;
    name: string;
    description: string | null;
    fork: boolean;
    html_url: string;
    homepage: string | null;
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
    language: string | null;
    topics: string[];
    owner: {
        login: string;
    };
}

interface TechStack {
    main: string[];
    tools: string[];
}

async function fetchFileContent(owner: string, repo: string, path: string): Promise<string | null> {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    try {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/vnd.github.v3.raw',
                'User-Agent': 'Node.js-Fetch-Script'
            }
        });
        if (response.ok) {
            return await response.text();
        }
    } catch (error) {
        // Silently fail if file doesn't exist
    }
    return null;
}

function parsePackageJson(content: string): TechStack {
    try {
        const pkg = JSON.parse(content);
        const deps = { ...pkg.dependencies, ...pkg.devDependencies };
        
        const mainKeywords = [
            'react', 'next', 'vue', 'express', 'nest', 'typescript', 'antd', 'tailwind', 
            'framer-motion', 'lucide-react', 'three', 'axios', 'zustand', 'echarts', 'socket.io',
            'redux', 'query', 'prisma', 'supabase', 'firebase', 'postgresql', 'prisma-client', 'mysql', 'mongodb', 'mongoose', 'redis', 
        ];
        const toolKeywords = ['jest', 'eslint', 'prettier', 'webpack', 'vite', 'husky', 'vitest', 'cypress'];

        const main: string[] = [];
        const tools: string[] = [];

        const formatName = (name: string) => {
            // Remove scope and capitalize common ones
            let displayName = name.split('/').pop() || name;
            if (displayName.toLowerCase() === 'framer-motion') return 'Framer Motion';
            if (displayName.toLowerCase() === 'lucide-react') return 'Lucide';
            if (displayName.toLowerCase() === 'next') return 'Next.js';
            if (displayName.toLowerCase() === 'react-dom') return '';
            return displayName.charAt(0).toUpperCase() + displayName.slice(1);
        };

        for (const [name] of Object.entries(deps)) {
            const entry = formatName(name);
            if (!entry) continue;
            
            if (mainKeywords.some(k => name.toLowerCase().includes(k))) {
                if (!main.includes(entry)) main.push(entry);
            } else if (toolKeywords.some(k => name.toLowerCase().includes(k))) {
                if (!tools.includes(entry)) tools.push(entry);
            }
        }

        return { main: main.slice(0, 8), tools: tools.slice(0, 4) };
    } catch (e) {
        return { main: [], tools: [] };
    }
}

function parseGoMod(content: string): TechStack {
    const lines = content.split('\n');
    const main: string[] = [];
    
    const goKeywords = [
        'gin', 'websocket', 'timescaledb', 'grafana', 'nats', 'prometheus', 
        'jwt', 'gorm', 'cobra', 'zap', 'grpc', 'redis', 'mysql', 'pq', 'postgres'
    ];
    
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('require') || trimmed.includes('/')) {
            const parts = trimmed.split(/\s+/);
            const path = parts[0] === 'require' ? parts[1] : parts[0];
            if (!path) continue;

            const name = path.split('/').pop()?.toLowerCase() || '';
            
            if (goKeywords.some(k => name.includes(k))) {
                let displayName = name.charAt(0).toUpperCase() + name.slice(1);
                // Specialized formatting
                if (displayName.toLowerCase().includes('jwt')) displayName = 'JWT';
                if (displayName.toLowerCase() === 'gin-gonic') displayName = 'Gin';
                
                if (!main.includes(displayName)) main.push(displayName);
            }
        }
    }
    return { main: main.slice(0, 8), tools: [] };
}

async function fetchGithubProjects() {
    console.log(`Fetching repositories for ${GITHUB_USERNAME}...`);
    
    try {
        const response = await fetch(REPO_API_URL, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Node.js-Fetch-Script'
            }
        });

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
        }

        const repos = await response.json() as GitHubRepo[];
        
        const projects = [];
        for (const repo of repos) {
            if (repo.fork) continue;

            console.log(`Processing ${repo.name}...`);
            let techStack: TechStack = { main: [], tools: [] };
            
            // Try package.json
            const pkgJson = await fetchFileContent(repo.owner.login, repo.name, 'package.json');
            if (pkgJson) {
                techStack = parsePackageJson(pkgJson);
            } else {
                // Try go.mod
                const goMod = await fetchFileContent(repo.owner.login, repo.name, 'go.mod');
                if (goMod) {
                    techStack = parseGoMod(goMod);
                }
            }

            const tags = Array.from(new Set([
                repo.language,
                ...(repo.topics || []),
            ].filter((tag): tag is string => Boolean(tag)))).map(tag => {
                // Capitalize first letter of each tag if it's not already specialized
                if (tag.toLowerCase() === 'typescript') return 'TypeScript';
                if (tag.toLowerCase() === 'javascript') return 'JavaScript';
                return tag.charAt(0).toUpperCase() + tag.slice(1);
            });

            projects.push({
                id: repo.id.toString(),
                title: repo.name === 'wedding' ? 'WedMaster' : repo.name,
                description: repo.description || 'No description provided.',
                longDescription: repo.description || 'No description provided.',
                image: `/images/projects/${repo.name.toLowerCase()}.jpg`,
                tags: tags,
                architecture: {
                    frontend: techStack.main.filter(t => !t.toLowerCase().includes('node') && !t.toLowerCase().includes('express')),
                    backend: techStack.main.filter(t => t.toLowerCase().includes('node') || t.toLowerCase().includes('express') || t.toLowerCase().includes('gin')),
                    database: techStack.main.filter(t => t.toLowerCase().includes('sql') || t.toLowerCase().includes('db') || t.toLowerCase().includes('redis') || t.toLowerCase().includes('prisma')),
                    devops: techStack.tools.slice(0, 4)
                },
                metrics: {
                    codeQuality: 85 + Math.floor(Math.random() * 10),
                    apiDesign: 80 + Math.floor(Math.random() * 15),
                    deployment: 75 + Math.floor(Math.random() * 20)
                },
                github: repo.html_url,
                demo: repo.homepage || '',
                featured: repo.stargazers_count > 0,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                updatedAt: repo.updated_at.split('T')[0],
                language: repo.language || 'Unknown'
            });
        }

        const fileContent = `// This file is automatically generated by scripts/fetch-github-projects.ts
// Do not edit this file manually.

export interface ProjectMetrics {
    codeQuality: number;
    apiDesign: number;
    deployment: number;
}

export interface FullStackArchitecture {
    frontend: string[];
    backend: string[];
    database: string[];
    devops: string[];
}

export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    image: string;
    tags: string[];
    architecture: FullStackArchitecture;
    metrics: ProjectMetrics;
    github: string;
    demo: string;
    featured: boolean;
    stars: number;
    forks: number;
    updatedAt: string;
    language: string;
}

export const projects: Project[] = ${JSON.stringify(projects, null, 4)};
`;

        fs.writeFileSync(OUTPUT_FILE, fileContent);
        console.log(`Successfully updated ${OUTPUT_FILE} with ${projects.length} projects.`);
        
    } catch (error: any) {
        console.error('Error fetching GitHub projects:', error.message);
        process.exit(1);
    }
}

fetchGithubProjects();
