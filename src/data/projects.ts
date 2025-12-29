export interface ProjectMetrics {
    codeQuality: number; // 0-100
    apiDesign: number;   // 0-100
    deployment: number;  // 0-100
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

export const projects: Project[] = [
    {
        "id": "1123960731",
        "title": "MedAI-Consultant",
        "description": "Modern AI conversational full-stack application for auxiliary medical diagnosis, featuring intelligent triage, pre-diagnosis consultation, and report interpretation.",
        "longDescription": "MedAI-Consultant is a sophisticated healthcare solution that leverages LLMs to automate patient guidance and clinical data interpretation. It features intelligent triage algorithms, structured pre-diagnosis workflows, and high-precision medical report analysis powered by RAG architecture.",
        "image": "/images/projects/ezento.svg",
        "tags": ["AI/Healthcare", "Next.js", "RAG", "Full-Stack"],
        "architecture": {
            "frontend": ["React 18", "Next.js", "Tailwind CSS", "Framer Motion"],
            "backend": ["Python (FastAPI)", "Node.js", "LangChain"],
            "database": ["PostgreSQL", "Vector DB (Pinecone)", "Redis"],
            "devops": ["Docker", "Kubernetes", "AWS HealthLake"]
        },
        "metrics": {
            "codeQuality": 96,
            "apiDesign": 94,
            "deployment": 90
        },
        "github": "https://github.com/xuanyiying/ezento",
        "demo": "",
        "featured": true,
        "stars": 0,
        "forks": 0,
        "updatedAt": "2025-12-28",
        "language": "TypeScript"
    },
    {
        "id": "1123603049",
        "title": "cleanup-cli",
        "description": "Intelligent CLI tool powered by local Ollama LLM that automatically organizes messy desktops and directories through deep content analysis.",
        "longDescription": "cleanup-cli is a high-performance system utility that leverages local Large Language Models (via Ollama) to understand file semantics. It automatically categorizes documents (PDF, DOCX, TXT), images, and code files into a structured hierarchy based on their actual content rather than just extensions. Features include cross-platform support (macOS/Windows/Linux), intelligent renaming, and customizable organization rules with real-time progress feedback.",
        "image": "/images/projects/cleanup-cli.svg",
        "tags": ["Go", "Ollama", "LLM", "System Tools"],
        "architecture": {
            "frontend": ["Cobra CLI", "Bubble Tea (TUI)", "Lip Gloss"],
            "backend": ["Go", "Ollama API", "Concurrent File Walker"],
            "database": ["Local Config (YAML)", "Embedded Key-Value Store"],
            "devops": ["GitHub Actions", "Docker", "Cross-Compilation"]
        },
        "metrics": {
            "codeQuality": 98,
            "apiDesign": 94,
            "deployment": 92
        },
        "github": "https://github.com/xuanyiying/cleanup-assistant",
        "demo": "",
        "featured": true,
        "stars": 1,
        "forks": 0,
        "updatedAt": "2025-12-27",
        "language": "Go"
    },
    {
        "id": "1105497096",
        "title": "ai-ace-job",
        "description": "AI-driven full-stack ecosystem leveraging LLMs for career intelligence, featuring a decoupled service-oriented architecture.",
        "longDescription": "An intelligent career platform that integrates multiple AI models (Gemini, OpenAI) through a centralized agentic layer. Designed with high scalability and modularity to handle intensive AI inference workflows.",
        "image": "/images/projects/ai-ace-job.svg",
        "tags": ["AI/LLM", "Next.js", "Microservices", "Agentic UI"],
        "architecture": {
            "frontend": ["React", "Next.js", "Framer Motion", "Ant Design"],
            "backend": ["Node.js", "LangChain", "OpenAI/Gemini API"],
            "database": ["MongoDB", "Vector DB", "Prisma"],
            "devops": ["Docker", "Kubernetes", "CI/CD Pipeline"]
        },
        "metrics": {
            "codeQuality": 92,
            "apiDesign": 96,
            "deployment": 85
        },
        "github": "https://github.com/xuanyiying/ai-ace-job",
        "demo": "",
        "featured": true,
        "stars": 0,
        "forks": 0,
        "updatedAt": "2025-12-23",
        "language": "TypeScript"
    }
];
