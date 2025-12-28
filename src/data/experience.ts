// src/data/experience.ts

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  achievements: string[];
  technologies: string[];
  logo?: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
}

export const experiences: Experience[] = [
  {
    id: 'exp1',
    company: 'Tech Innovations Inc.',
    position: 'Senior Frontend Developer',
    duration: '2022 - Present',
    description: 'Lead frontend development for customer-facing applications using React and TypeScript.',
    achievements: [
      'Improved application performance by 40% through code optimization',
      'Led a team of 4 developers to deliver critical features on schedule',
      'Implemented modern CI/CD pipeline reducing deployment time by 50%'
    ],
    technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GraphQL'],
    logo: '/images/tech-innovations-logo.png',
    location: 'San Francisco, CA',
    type: 'full-time'
  },
  {
    id: 'exp2',
    company: 'Digital Solutions LLC',
    position: 'Full Stack Developer',
    duration: '2020 - 2022',
    description: 'Developed and maintained multiple client applications using modern web technologies.',
    achievements: [
      'Built 5+ client applications with React and Node.js',
      'Implemented automated testing suite with 90% code coverage',
      'Reduced server costs by 30% through infrastructure optimization'
    ],
    technologies: ['JavaScript', 'Node.js', 'MongoDB', 'Express', 'AWS'],
    logo: '/images/digital-solutions-logo.png',
    location: 'New York, NY',
    type: 'full-time'
  },
  {
    id: 'exp3',
    company: 'StartUp Ventures',
    position: 'Frontend Developer',
    duration: '2019 - 2020',
    description: 'Created responsive web applications for startup clients with tight deadlines.',
    achievements: [
      'Delivered 10+ client projects within strict timelines',
      'Created reusable component library increasing development speed by 35%',
      'Mentored 2 junior developers on React best practices'
    ],
    technologies: ['React', 'JavaScript', 'CSS', 'Redux', 'Jest'],
    logo: '/images/startup-ventures-logo.png',
    location: 'Austin, TX',
    type: 'contract'
  }
];