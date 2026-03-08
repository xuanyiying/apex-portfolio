import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GITHUB_USERNAME = 'xuanyiying';
const OUTPUT_FILE = path.join(__dirname, '../src/data/projects.ts');

const ZH_DESCRIPTIONS: Record<string, { title: string; description: string; longDescription: string }> = {
    'ezento': {
        title: 'MedAI-Consultant',
        description: '基于现代 AI 的全栈对话式应用，用于辅助医疗诊断，具有智能分型、预诊咨询和报告解读功能。',
        longDescription: 'MedAI-Consultant 是一个先进的医疗保健解决方案，利用大语言模型 (LLM) 自动化患者指导和临床数据解读。它具有智能分型算法、结构化的预诊工作流程以及基于 RAG 架构的高精度医疗报告分析功能。'
    },
    'cleanup-assistant': {
        title: 'cleanup-cli',
        description: '由本地 Ollama LLM 驱动的智能 CLI 工具，通过深度内容分析自动整理混乱的桌面和目录。',
        longDescription: 'cleanup-cli 是一个高性能的系统实用工具，利用本地大语言模型 (通过 Ollama) 理解文件语义。它根据实际内容而不仅仅是扩展名，自动将文档 (PDF, DOCX, TXT)、图片和代码文件归类到结构化的层级中。功能包括跨平台支持 (macOS/Windows/Linux)、智能重命名以及带有实时进度反馈的可自定义整理规则。'
    },
    'ai-ace-job': {
        title: 'ai-ace-job',
        description: '利用 LLM 进行职业智能分析的 AI 驱动全栈生态系统，采用解耦合的服务导向架构。',
        longDescription: '一个集成了多个 AI 模型 (Gemini, OpenAI) 的智能职业平台，通过中心化的代理层进行管理。设计具有高扩展性和模块化，可处理密集的 AI 推理工作流。'
    },
    'quant-trader': {
        title: 'Quant-Trader',
        description: '专为高并发、低延迟设计的高性能量化交易引擎，支持 WASM 隔离的策略执行。',
        longDescription: '专业的算法交易基础设施，提供从基于 NATS JetStream 的实时行情接入到基于 WASM 沙箱 (wazero) 的策略隔离执行的完整流水线。包含模拟交易、风控系统以及集成 Stripe 的策略市场。'
    }
};

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

async function fetchFileContent(owner: string, repo: string, filePath: string): Promise<string | null> {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
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
            'redux', 'query', 'prisma', 'supabase', 'firebase', 'postgresql', 'prisma-client', 'mysql', 'mongodb', 'mongoose', 'redis', 'fastapi', 'django', 'flask', 'spring'
        ];
        const toolKeywords = ['jest', 'eslint', 'prettier', 'webpack', 'vite', 'husky', 'vitest', 'cypress'];

        const main: string[] = [];
        const tools: string[] = [];

        const formatName = (name: string): string => {
            let displayName = name.split('/').pop() || name;
            if (displayName.toLowerCase() === 'framer-motion') return 'Framer Motion';
            if (displayName.toLowerCase() === 'lucide-react') return 'Lucide';
            if (displayName.toLowerCase() === 'next') return 'Next.js';
            if (displayName.toLowerCase() === 'react-dom') return '';
            if (displayName.toLowerCase() === 'react') return 'React';
            if (displayName.toLowerCase() === 'vue') return 'Vue.js';
            if (displayName.toLowerCase() === 'typescript') return 'TypeScript';
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
        'jwt', 'gorm', 'cobra', 'zap', 'grpc', 'redis', 'mysql', 'pq', 'postgres', 'echo', 'fiber'
    ];

    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('require') || trimmed.includes('/')) {
            const parts = trimmed.split(/\s+/);
            const pkgPath = parts[0] === 'require' ? parts[1] : parts[0];
            if (!pkgPath) continue;

            const name = pkgPath.split('/').pop()?.toLowerCase() || '';

            if (goKeywords.some(k => name.includes(k))) {
                let displayName = name.charAt(0).toUpperCase() + name.slice(1);
                if (displayName.toLowerCase().includes('jwt')) displayName = 'JWT';
                if (displayName.toLowerCase() === 'gin-gonic') displayName = 'Gin';
                if (displayName.toLowerCase() === 'echo') displayName = 'Echo';
                if (displayName.toLowerCase() === 'fiber') displayName = 'Fiber';

                if (!main.includes(displayName)) main.push(displayName);
            }
        }
    }
    return { main: main.slice(0, 8), tools: [] };
}

interface ProjectData {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    image: string;
    images: string[];
    tags: string[];
    architecture: {
        frontend: string[];
        backend: string[];
        database: string[];
        devops: string[];
    };
    metrics: {
        codeQuality: number;
        apiDesign: number;
        deployment: number;
    };
    github: string;
    demo: string;
    featured: boolean;
    stars: number;
    forks: number;
    updatedAt: string;
    language: string;
}

function getZhData(repoName: string): { title: string; description: string; longDescription: string } | null {
    const zhData = ZH_DESCRIPTIONS[repoName];
    if (zhData) return zhData;

    const keywords: Record<string, { title: string; description: string }> = {
        'ai': { title: 'AI 项目', description: '人工智能相关项目' },
        'chat': { title: '聊天应用', description: '实时通讯应用' },
        'web': { title: 'Web 应用', description: 'Web 应用程序' },
        'api': { title: 'API 服务', description: 'API 后端服务' },
        'cli': { title: 'CLI 工具', description: '命令行工具' },
        'dashboard': { title: '仪表板', description: '数据仪表板' },
        'admin': { title: '管理后台', description: '管理系统' },
        'shop': { title: '电商平台', description: '电子商务平台' },
    };

    for (const [key, value] of Object.entries(keywords)) {
        if (repoName.toLowerCase().includes(key)) {
            return { title: repoName, description: value.description, longDescription: value.description };
        }
    }

    return null;
}

function getDefaultTags(language: string | null, topics: string[]): string[] {
    const tags: string[] = [];
    if (language) tags.push(language);
    tags.push(...topics.slice(0, 3));
    return tags;
}

function generateMetrics(): { codeQuality: number; apiDesign: number; deployment: number } {
    const baseQuality = 80;
    const randomOffset = () => Math.floor(Math.random() * 15);
    return {
        codeQuality: baseQuality + randomOffset(),
        apiDesign: baseQuality + randomOffset(),
        deployment: baseQuality + randomOffset()
    };
}

async function fetchGithubProjects() {
    console.log(`Fetching repositories for ${GITHUB_USERNAME}...`);

    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Node.js-Fetch-Script'
            }
        });

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
        }

        const repos = await response.json() as GitHubRepo[];

        const projectsEn: ProjectData[] = [];
        const projectsZh: ProjectData[] = [];

        for (const repo of repos) {
            if (repo.fork) continue;

            console.log(`Processing ${repo.name}...`);
            let techStack: TechStack = { main: [], tools: [] };

            const pkgJson = await fetchFileContent(repo.owner.login, repo.name, 'package.json');
            if (pkgJson) {
                techStack = parsePackageJson(pkgJson);
            } else {
                const goMod = await fetchFileContent(repo.owner.login, repo.name, 'go.mod');
                if (goMod) {
                    techStack = parseGoMod(goMod);
                }
            }

            const zhData = getZhData(repo.name);
            const tags = getDefaultTags(repo.language, repo.topics || []);

            const projectBase = {
                id: repo.id.toString(),
                image: `/images/projects/${repo.name.toLowerCase()}.svg`,
                images: [
                    `/images/projects/${repo.name.toLowerCase()}.svg`,
                    `/images/projects/${repo.name.toLowerCase()}.png`
                ],
                github: repo.html_url,
                demo: repo.homepage || '',
                featured: repo.stargazers_count > 0,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                updatedAt: repo.updated_at.split('T')[0],
                language: repo.language || 'Unknown',
                tags,
                architecture: {
                    frontend: techStack.main.filter(t => !['Node', 'Express', 'FastAPI', 'Django', 'Flask', 'Spring', 'Go', 'Gin', 'Echo', 'Fiber'].some(x => t.toLowerCase().includes(x.toLowerCase()))),
                    backend: techStack.main.filter(t => ['Node', 'Express', 'FastAPI', 'Django', 'Flask', 'Spring', 'Go', 'Gin', 'Echo', 'Fiber'].some(x => t.toLowerCase().includes(x.toLowerCase()))),
                    database: techStack.main.filter(t => ['SQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Prisma', 'Supabase', 'Firebase', 'SQLite'].some(x => t.toLowerCase().includes(x.toLowerCase()))),
                    devops: techStack.tools.slice(0, 4)
                },
                metrics: generateMetrics()
            };

            const enDescription = repo.description || 'A full-stack application built with modern technologies.';
            const zhDescription = zhData?.description || repo.description || '使用现代技术构建的全栈应用程序。';
            const zhLongDescription = zhData?.longDescription || repo.description || '使用现代技术构建的全栈应用程序。';

            projectsEn.push({
                ...projectBase,
                title: repo.name === 'wedding' ? 'WedMaster' : repo.name,
                description: enDescription,
                longDescription: enDescription
            });

            projectsZh.push({
                ...projectBase,
                title: zhData?.title || repo.name,
                description: zhDescription,
                longDescription: zhLongDescription
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
    images: string[];
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

export const projectsEn: Project[] = ${JSON.stringify(projectsEn, null, 4)};

export const projectsZh: Project[] = ${JSON.stringify(projectsZh, null, 4)};

export const projects = projectsEn;
`;

        fs.writeFileSync(OUTPUT_FILE, fileContent);
        console.log(`Successfully updated ${OUTPUT_FILE} with ${projectsEn.length} projects.`);

    } catch (error: any) {
        console.error('Error fetching GitHub projects:', error.message);
        process.exit(1);
    }
}

fetchGithubProjects();
