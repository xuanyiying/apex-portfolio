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

export const heroContent: HeroContent = {
  name: 'Yiying Xuan',
  title: 'Senior Full Stack Developer',
  description: 'I build exceptional digital experiences that are fast, accessible, visually appealing, and responsive. Even if you don\'t hire me, these skills are transferable to your team.',
  ctaText: 'Get In Touch',
  ctaLink: '#contact',
  location: 'San Francisco, CA',
  email: 'alex.johnson@example.com',
  avatar: '/images/avatar.jpg',
  socialLinks: {
    github: 'https://github.com/xuanyiying',
    portfolio: 'https://xuanyiying.dev'
  }
};