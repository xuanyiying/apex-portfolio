// src/data/skills.ts

export interface Skill {
  name: string;
  fullName?: string; // 完整的技能名称，用于悬停显示
  level: number; // 1-5, 5 being expert
  category: string;
  icon?: string; // 可选的图标类名或路径
}

export const skills: Skill[] = [
  // Frontend
  {
    name: 'TypeScript',
    level: 5,
    category: 'Frontend',
    icon: 'devicon-typescript-plain'
  },
  {
    name: 'React',
    level: 5,
    category: 'Frontend',
    icon: 'devicon-react-plain'
  },
  {
    name: 'Next.js',
    level: 5,
    category: 'Frontend',
    icon: 'devicon-nextjs-plain'
  },
  {
    name: 'Tailwind',
    fullName: 'Tailwind CSS',
    level: 5,
    category: 'Frontend',
    icon: 'devicon-tailwindcss-plain'
  },
  // Backend
  {
    name: 'Node.js',
    level: 5,
    category: 'Backend',
    icon: 'devicon-nodejs-plain'
  },
  {
    name: 'NestJS',
    level: 4,
    category: 'Backend',
    icon: 'devicon-nestjs-plain'
  },
  {
    name: 'Go',
    level: 4,
    category: 'Backend',
    icon: 'devicon-go-plain'
  },
  {
    name: 'Gin',
    level: 4,
    category: 'Backend',
    icon: 'devicon-go-plain'
  },
  {
    name: 'Java',
    level: 4,
    category: 'Backend',
    icon: 'devicon-java-plain'
  },
  {
    name: 'Spring Boot',
    level: 4,
    category: 'Backend',
    icon: 'devicon-spring-plain'
  },
  {
    name: 'Microservices',
    fullName: 'Spring Cloud / Microservices',
    level: 4,
    category: 'Backend',
    icon: 'devicon-spring-plain'
  },
  // Database
  {
    name: 'PostgreSQL',
    level: 4,
    category: 'Database',
    icon: 'devicon-postgresql-plain'
  },
  {
    name: 'MySQL',
    level: 4,
    category: 'Database',
    icon: 'devicon-mysql-plain'
  },
  {
    name: 'Redis',
    level: 4,
    category: 'Database',
    icon: 'devicon-redis-plain'
  },
  {
    name: 'MongoDB',
    level: 4,
    category: 'Database',
    icon: 'devicon-mongodb-plain'
  },
  {
    name: 'ES',
    fullName: 'Elasticsearch',
    level: 3,
    category: 'Database',
    icon: 'devicon-elasticsearch-plain'
  },
  {
    name: 'MQ',
    fullName: 'Messaging (Kafka/RabbitMQ/RocketMQ)',
    level: 4,
    category: 'Backend',
    icon: 'devicon-apachekafka-plain'
  },
  // AI & LLM
  {
    name: 'LangChain',
    level: 4,
    category: 'AI & LLM',
    icon: 'devicon-python-plain'
  },
  {
    name: 'Vector DB',
    fullName: 'Vector DB (Pinecone/Milvus)',
    level: 4,
    category: 'AI & LLM',
    icon: 'devicon-postgresql-plain'
  },
  {
    name: 'AI Tools',
    fullName: 'AI Tools (Cursor/Claude Code)',
    level: 5,
    category: 'AI & LLM',
    icon: 'devicon-vscode-plain'
  },
  // DevOps & Cloud
  {
    name: 'Docker',
    level: 5,
    category: 'DevOps',
    icon: 'devicon-docker-plain'
  },
  {
    name: 'Compose',
    fullName: 'Docker Compose',
    level: 5,
    category: 'DevOps',
    icon: 'devicon-docker-plain'
  },
  {
    name: 'K8s',
    fullName: 'Kubernetes',
    level: 4,
    category: 'DevOps',
    icon: 'devicon-kubernetes-plain'
  },
  {
    name: 'CI/CD',
    level: 4,
    category: 'DevOps',
    icon: 'devicon-githubactions-plain'
  },
  {
    name: 'Actions',
    fullName: 'GitHub Actions',
    level: 4,
    category: 'DevOps',
    icon: 'devicon-githubactions-plain'
  },
  {
    name: 'AWS',
    level: 3,
    category: 'Cloud',
    icon: 'devicon-aws-plain'
  },
  {
    name: 'Azure',
    level: 3,
    category: 'Cloud',
    icon: 'devicon-azure-plain'
  },
  {
    name: 'GCP',
    fullName: 'Google Cloud Platform',
    level: 3,
    category: 'Cloud',
    icon: 'devicon-googlecloud-plain'
  }
];

export const skillCategories = [
  'Frontend',
  'Backend',
  'Database',
  'AI & LLM',
  'DevOps',
  'Cloud'
];