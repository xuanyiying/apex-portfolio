export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    image: string;
    tags: string[];
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
        "title": "ezento",
        "description": "A lightweight, reactive frontend development framework based on TypeScript, designed to simplify the build process of modern web applications.",
        "longDescription": "ezento is a frontend library focused on developer experience. It provides an intuitive set of APIs for state management, component communication, and routing, making the construction of complex Single Page Applications (SPAs) more efficient and straightforward.",
        "image": "/images/projects/ezento.jpg",
        "tags": [
            "TypeScript", "Next.js", "LangChain", "AI", "ChatGPT", "Gemini 3 API", "OpenAI", "Agent", 
            "Microservice", "MongoDB", "PostgreSQL", "Redis", "Prisma", "React", "Ant Design", 
            "Websocket", "Zustand", "Axios", "REST API", "Redux"
        ],
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
        "title": "cleanup-assistant",
        "description": "An efficient system cleanup tool written in Go, helping users automate the management of temporary files and disk space.",
        "longDescription": "cleanup-assistant is a high-performance command-line tool designed for developers and system administrators. It intelligently identifies redundant caches, log files, and residual installation packages.",
        "image": "/images/projects/cleanup-assistant.jpg",
        "tags": [
            "Go", "Gin", "Websocket", "TimescaleDB", "Grafana", "NATS", "Prometheus", "JWT", 
            "Redis", "Kubernetes", "CI/CD", "Git", "Docker", "GitHub Actions", "Zustand", 
            "ECharts", "Axios", "React", "TailwindCSS"
        ],
        "github": "https://github.com/xuanyiying/cleanup-assistant",
        "demo": "",
        "featured": false,
        "stars": 1,
        "forks": 0,
        "updatedAt": "2025-12-27",
        "language": "Go"
    },
    {
        "id": "1105497096",
        "title": "ai-ace-job",
        "description": "An intelligent career assistance platform providing one-stop services such as resume optimization, interview guidance, and interview question prediction.",
        "longDescription": "ai-ace-job leverages advanced AI technology to provide comprehensive support for job seekers. Core features include: automated resume scoring with optimization suggestions and interview question prediction.",
        "image": "/images/projects/ai-ace-job.jpg",
        "tags": [
            "TypeScript", "Next.js", "LangChain", "AI", "ChatGPT", "Gemini 3 API", "OpenAI", "Agent", 
            "Microservice", "MongoDB", "PostgreSQL", "Prisma", "Kubernetes", "CI/CD", "Git", 
            "Docker", "GitHub Actions", "React", "Antd", "Websocket", "Zustand", "Axios", "Redux"
        ],
        "github": "https://github.com/xuanyiying/ai-ace-job",
        "demo": "",
        "featured": true,
        "stars": 0,
        "forks": 0,
        "updatedAt": "2025-12-23",
        "language": "TypeScript"
    },
    {
        "id": "1032539488",
        "title": "WedMaster",
        "description": "A professional SaaS platform for wedding celebrants to manage schedules, scripts, and client bookings efficiently.",
        "longDescription": "WedMaster is a comprehensive management suite designed specifically for wedding MCs and celebrants. It features a robust scheduling system and dynamic script editor.",
        "image": "/images/projects/wedmaster.jpg",
        "tags": [
            "TypeScript", "Express", "PostgreSQL", "Sequelize", "OpenAPI", "Swagger", "React", 
            "Axios", "Antd", "Redux"
        ],
        "github": "https://github.com/xuanyiying/wedding",
        "demo": "",
        "featured": true,
        "stars": 0,
        "forks": 0,
        "updatedAt": "2025-09-28",
        "language": "TypeScript"
    }
];
