// src/data/skills.ts

export interface Skill {
  name: string;
  level: number; // 1-5, 5 being expert
  category: string;
  icon?: string; // 可选的图标类名或路径
}

export const skills: Skill[] = [
  {
    name: 'JavaScript',
    level: 5,
    category: 'Frontend',
    icon: 'devicon-javascript-plain'
  },
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
    level: 4,
    category: 'Frontend',
    icon: 'devicon-nextjs-plain'
  },
  {
    name: 'Node.js',
    level: 4,
    category: 'Backend',
    icon: 'devicon-nodejs-plain'
  },
  {
    name: 'Python',
    level: 4,
    category: 'Backend',
    icon: 'devicon-python-plain'
  },
  {
    name: 'PostgreSQL',
    level: 3,
    category: 'Database',
    icon: 'devicon-postgresql-plain'
  },
  {
    name: 'MongoDB',
    level: 3,
    category: 'Database',
    icon: 'devicon-mongodb-plain'
  },
  {
    name: 'AWS',
    level: 3,
    category: 'Cloud',
    icon: 'devicon-aws-plain'
  },
  {
    name: 'Docker',
    level: 3,
    category: 'DevOps',
    icon: 'devicon-docker-plain'
  }
];

export const skillCategories = [
  'Frontend',
  'Backend',
  'Database',
  'DevOps',
  'Cloud'
];