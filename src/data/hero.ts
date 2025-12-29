// src/data/hero.ts

export interface HeroContent {
  name: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  location: string;
  email: string;
  avatar: string;
  socialLinks: {
    github: string;
    portfolio: string;
  };
}

export const heroContentEn: HeroContent = {
  name: 'Yiying Xuan',
  title: 'Senior Full Stack Developer',
  description: 'I build exceptional digital experiences that are fast, accessible, visually appealing, and responsive. Even if you don\'t hire me, these skills are transferable to your team.',
  ctaText: 'Get In Touch',
  ctaLink: '#contact',
  location: 'San Francisco, CA',
  email: 'keexi2025@outlook.com',
  avatar: '/images/avatar.jpg',
  socialLinks: {
    github: 'https://github.com/xuanyiying',
    portfolio: 'https://xuanyiying.dev'
  }
};

export const heroContentZh: HeroContent = {
  name: 'Yiying Xuan',
  title: '高级全栈开发工程师',
  description: '我致力于构建快速、无障碍、视觉精美且响应迅速的卓越数字体验。',
  ctaText: '联系我',
  ctaLink: '#contact',
  location: '上海, 中国',
  email: 'keexi2025@outlook.com',
  avatar: '/images/avatar.jpg',
  socialLinks: {
    github: 'https://github.com/xuanyiying',
    portfolio: 'https://xuanyiying.dev'
  }
};

export const heroContent = heroContentEn;