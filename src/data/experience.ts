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

export const experiencesZh: Experience[] = [
  {
    id: 'exp1',
    company: '卫宁健康科技集团有限公司',
    position: '高级研发/架构师',
    duration: '2022.08 - 2024.05',
    description: '负责临床专科产科、全院上报项目后端架构设计，主导核心业务系统的重构与性能调优，解决复杂场景下的技术难题。',
    achievements: [
      '主导临床专科产科项目的后端架构设计与性能优化，提升系统稳定性',
      '完成全院上报系统的深度重构，优化代码结构与维护性',
      '攻克系统高并发与复杂业务场景下的关键技术瓶颈'
    ],
    technologies: ['Backend Architecture', 'Performance Optimization', 'System Refactoring', 'Java', 'Spring Boot'],
    location: '上海',
    type: 'full-time'
  },
  {
    id: 'exp2',
    company: '深圳坐标软件',
    position: '高级研发工程师',
    duration: '2021.01 - 2022.07',
    description: '核心负责体检及职业病体检系统的后端研发；主导健康管理项目从0到1的架构设计与核心功能落地。',
    achievements: [
      '负责大规模体检与职业病筛查系统的后端核心模块开发',
      '独立完成健康管理项目从0到1的架构设计与技术选型',
      '高效交付核心业务功能，确立项目技术标准'
    ],
    technologies: ['Backend Development', 'System Design', 'Zero to One', 'Java'],
    location: '深圳',
    type: 'full-time'
  },
  {
    id: 'exp3',
    company: '北京和桥技术有限公司',
    position: '初/中级研发工程师',
    duration: '2017.09 - 2020.09',
    description: '负责 ROSETTA Phoenix Server 后端研发；独立承担 ROSETTA License Server 从0到1的架构设计与核心开发。',
    achievements: [
      '参与 ROSETTA Phoenix Server 核心后端功能的研发与维护',
      '独立设计并实现 ROSETTA License Server，从无到有构建授权服务',
      '负责关键业务模块的编码实现与功能迭代'
    ],
    technologies: ['Server Development', 'System Architecture', 'Core Features', 'Java'],
    location: '北京',
    type: 'full-time'
  }
];

export const experiencesEn: Experience[] = [
  {
    id: 'exp1',
    company: 'Winning Health Technology Group',
    position: 'Senior R&D / Architect',
    duration: '2022.08 - 2024.05',
    description: 'Led backend architecture design for Clinical Obstetrics and Hospital-wide Reporting projects, focusing on system refactoring and performance optimization.',
    achievements: [
      'Spearheaded the backend architecture design and optimization for the Clinical Obstetrics specialty system.',
      'Completed a comprehensive refactoring of the Hospital-wide Reporting system backend.',
      'Resolved critical performance bottlenecks and complex technical challenges in high-load scenarios.'
    ],
    technologies: ['Backend Architecture', 'Performance Optimization', 'System Refactoring', 'Java', 'Spring Boot'],
    location: 'Shanghai, China',
    type: 'full-time'
  },
  {
    id: 'exp2',
    company: 'Shenzhen Coordinate Software',
    position: 'Senior R&D Engineer',
    duration: '2021.01 - 2022.07',
    description: 'Core developer for Physical & Occupational Health Examination backend; Led the 0-to-1 architecture design for the Health Management project.',
    achievements: [
      'Responsible for backend development of large-scale medical examination systems.',
      'Led the 0-1 architecture design and technology selection for the Health Management project.',
      'Delivered core business features and established technical standards for the new project.'
    ],
    technologies: ['Backend Development', 'System Design', 'Zero to One', 'Java'],
    location: 'Shenzhen, China',
    type: 'full-time'
  },
  {
    id: 'exp3',
    company: 'Beijing Double Bridge Technology',
    position: 'R&D Engineer',
    duration: '2017.09 - 2020.09',
    description: 'Developed backend for ROSETTA Phoenix Server; Designed and implemented the ROSETTA License Server from scratch (0-to-1).',
    achievements: [
      'Contributed to the core backend development and maintenance of ROSETTA Phoenix Server.',
      'Designed and implemented the ROSETTA License Server from the ground up.',
      'Responsible for coding key business modules and feature iterations.'
    ],
    technologies: ['Server Development', 'System Architecture', 'Core Features', 'Java'],
    location: 'Beijing, China',
    type: 'full-time'
  }
];

// Default export for backward compatibility if needed, though we will update consumers to use named exports
export const experiences = experiencesEn;