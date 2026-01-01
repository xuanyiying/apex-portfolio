
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

export const projectsEn: Project[] = [
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
    },
    {
        "id": "1123603050",
        "title": "Quant-Trader",
        "description": "High-performance quant trading engine designed for high concurrency and low latency, featuring WASM-isolated strategy execution.",
        "longDescription": "Professional algorithmic trading infrastructure providing a complete pipeline from real-time market data ingestion via NATS JetStream to isolated strategy execution using WASM sandboxing (wazero). It includes paper trading, risk management, and a Stripe-integrated strategy marketplace.",
        "image": "/images/projects/cleanup-cli.svg",
        "tags": ["Quant", "Trading", "Go", "WASM", "NATS"],
        "architecture": {
            "frontend": ["React", "Vite", "ECharts", "Tailwind CSS"],
            "backend": ["Go", "Gin", "GORM", "Wazero (WASM)"],
            "database": ["TimescaleDB", "Redis"],
            "devops": ["NATS JetStream", "Docker", "Stripe API"]
        },
        "metrics": {
            "codeQuality": 95,
            "apiDesign": 92,
            "deployment": 88
        },
        "github": "https://github.com/xuanyiying/quant-trader",
        "demo": "",
        "featured": true,
        "stars": 2,
        "forks": 1,
        "updatedAt": "2025-12-30",
        "language": "Go"
    },
];

export const projectsZh: Project[] = [
    {
        "id": "1123960731",
        "title": "MedAI-Consultant",
        "description": "基于现代 AI 的全栈对话式应用，用于辅助医疗诊断，具有智能分型、预诊咨询和报告解读功能。",
        "longDescription": "MedAI-Consultant 是一个先进的医疗保健解决方案，利用大语言模型 (LLM) 自动化患者指导和临床数据解读。它具有智能分型算法、结构化的预诊工作流程以及基于 RAG 架构的高精度医疗报告分析功能。",
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
        "description": "由本地 Ollama LLM 驱动的智能 CLI 工具，通过深度内容分析自动整理混乱的桌面和目录。",
        "longDescription": "cleanup-cli 是一个高性能的系统实用工具，利用本地大语言模型 (通过 Ollama) 理解文件语义。它根据实际内容而不仅仅是扩展名，自动将文档 (PDF, DOCX, TXT)、图片和代码文件归类到结构化的层级中。功能包括跨平台支持 (macOS/Windows/Linux)、智能重命名以及带有实时进度反馈的可自定义整理规则。",
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
        "description": "利用 LLM 进行职业智能分析的 AI 驱动全栈生态系统，采用解耦合的服务导向架构。",
        "longDescription": "一个集成了多个 AI 模型 (Gemini, OpenAI) 的智能职业平台，通过中心化的代理层进行管理。设计具有高扩展性和模块化，可处理密集的 AI 推理工作流。",
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
    },
    {
        "id": "1123603050",
        "title": "Quant-Trader",
        "description": "专为高并发、低延迟设计的高性能量化交易引擎，支持 WASM 隔离的策略执行。",
        "longDescription": "专业的算法交易基础设施，提供从基于 NATS JetStream 的实时行情接入到基于 WASM 沙箱 (wazero) 的策略隔离执行的完整流水线。包含模拟交易、风控系统以及集成 Stripe 的策略市场。",
        "image": "/images/projects/cleanup-cli.svg",
        "tags": ["量化", "交易", "Go", "WASM", "NATS"],
        "architecture": {
            "frontend": ["React", "Vite", "ECharts", "Tailwind CSS"],
            "backend": ["Go", "Gin", "GORM", "Wazero (WASM)"],
            "database": ["TimescaleDB", "Redis"],
            "devops": ["NATS JetStream", "Docker", "Stripe API"]
        },
        "metrics": {
            "codeQuality": 95,
            "apiDesign": 92,
            "deployment": 88
        },
        "github": "https://github.com/xuanyiying/quant-trader",
        "demo": "",
        "featured": true,
        "stars": 2,
        "forks": 1,
        "updatedAt": "2025-12-30",
        "language": "Go"
    }
];

export const projects = projectsEn;
