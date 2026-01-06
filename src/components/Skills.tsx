'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import {
  Code2, Server, Database, Cloud,
  Terminal,
  Layout, Cpu,
  Pause, Play
} from 'lucide-react';
import { skills, skillCategories } from '@/data';
import HolographicSkillChart from './HolographicSkillChart';

interface SkillCategory {
  icon: typeof Code2;
  titleKey: string;
  skills: { name: string; level: number; color: string }[];
}

// 为技能分配颜色
const getSkillColor = (skillName: string): string => {
  const colorMap: { [key: string]: string } = {
    'JavaScript': 'from-yellow-400 to-yellow-600',
    'TypeScript': 'from-blue-500 to-indigo-500',
    'React': 'from-blue-400 to-cyan-400',
    'Next.js': 'from-gray-300 to-gray-700',
    'Node.js': 'from-green-500 to-green-700',
    'Python': 'from-yellow-600 to-blue-600',
    'PostgreSQL': 'from-blue-600 to-blue-800',
    'MongoDB': 'from-green-500 to-green-700',
    'AWS': 'from-orange-400 to-orange-600',
    'Docker': 'from-blue-400 to-blue-600',
    'Git': 'from-orange-400 to-red-500',
    'Tailwind': 'from-cyan-400 to-teal-400',
    'Vue.js': 'from-green-400 to-emerald-500',
    'Express': 'from-gray-600 to-black',
    'GraphQL': 'from-pink-500 to-purple-500',
    'Redux': 'from-purple-500 to-purple-700',
    'Jest': 'from-red-400 to-red-600',
    'Figma': 'from-purple-400 to-pink-500',
    'UI/UX': 'from-pink-400 to-rose-500',
    'UI/UX Design': 'from-pink-400 to-rose-500',
    'SASS': 'from-pink-500 to-red-500',
    'Webpack': 'from-blue-500 to-indigo-600',
    'Jenkins': 'from-yellow-500 to-orange-600',
    'K8s': 'from-blue-500 to-cyan-500',
    'Redis': 'from-red-500 to-red-700',
    'MySQL': 'from-blue-400 to-blue-600',
    'C#': 'from-purple-500 to-purple-700',
    'Java': 'from-red-500 to-red-700',
    'Go': 'from-cyan-400 to-blue-500',
    'NestJS': 'from-gray-700 to-black',
    'Prisma': 'from-blue-400 to-cyan-400',
    'Supabase': 'from-teal-400 to-cyan-400',
    'Firebase': 'from-yellow-400 to-orange-400',
    'Stripe': 'from-blue-400 to-blue-600',
    'Twilio': 'from-purple-400 to-blue-400',
    'Socket.io': 'from-indigo-400 to-purple-400',
    'Three.js': 'from-orange-400 to-yellow-400',
    'Framer Motion': 'from-purple-400 to-pink-500',
    'Zustand': 'from-red-400 to-pink-400',
    'TanStack Query': 'from-yellow-400 to-orange-400',
    'React Hook Form': 'from-teal-400 to-cyan-400',
    'Storybook': 'from-pink-400 to-rose-400',
    'Cypress': 'from-cyan-400 to-blue-400',
    'Vitest': 'from-green-400 to-emerald-400',
    'Vercel': 'from-gray-200 to-gray-800',
    'Netlify': 'from-green-500 to-teal-500',
    'Terraform': 'from-purple-500 to-indigo-500',
    'Linux': 'from-gray-600 to-black',
    'CI/CD': 'from-blue-500 to-purple-500',
    'Testing': 'from-green-400 to-teal-500',
  };

  return colorMap[skillName] || 'from-gray-400 to-gray-600';
};

// 将技能数据按类别分组
const getSkillsByCategory = (category: string) => {
  return skills
    .filter(skill => skill.category === category)
    .map(skill => ({
      name: skill.name,
      level: skill.level * 20, // 将1-5级别转换为0-100%
      color: getSkillColor(skill.name)
    }));
};

const skillCategoryIcons: { [key: string]: any } = {
  'Frontend': Layout,
  'Backend': Server,
  'Database': Database,
  'AI & LLM': Cpu,
  'DevOps': Terminal,
  'Cloud': Cloud,
};

const skillCategoryTitles: { [key: string]: string } = {
  'Frontend': 'Skills.frontend',
  'Backend': 'Skills.backend',
  'Database': 'Skills.database',
  'AI & LLM': 'Skills.ai',
  'DevOps': 'Skills.devops',
  'Cloud': 'Skills.cloud',
};

const skillCategoriesData: SkillCategory[] = skillCategories.map(category => ({
  icon: skillCategoryIcons[category] || Code2,
  titleKey: skillCategoryTitles[category] || 'Skills.other',
  skills: getSkillsByCategory(category)
}));

export default function Skills() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(skillCategories[0]);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  // 自动轮播逻辑
  useEffect(() => {
    if (!isAutoRotating) return;

    const interval = setInterval(() => {
      setActiveCategory((current) => {
        const currentIndex = skillCategories.indexOf(current);
        const nextIndex = (currentIndex + 1) % skillCategories.length;
        return skillCategories[nextIndex];
      });
    }, 5000); // Slower interval for 3D view

    return () => clearInterval(interval);
  }, [isAutoRotating]);

  const handleCategoryManualSelect = (category: string) => {
    setActiveCategory(category);
    setIsAutoRotating(false); // 用户手动选择后暂停自动轮播
  };

  const toggleAutoRotate = () => {
    setIsAutoRotating(!isAutoRotating);
  };

  return (
    <section id="skills" className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-cyan/5 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="section-title">{t('Skills.title')}</h2>
          <p className="section-subtitle mx-auto">{t('Skills.subtitle')}</p>
        </motion.div>

        <motion.div
          key="holographic"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* Category Selector */}
          <div className="flex flex-col items-center gap-6 mb-4 relative z-20">
            <div className="flex flex-wrap justify-center gap-2">
              {skillCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryManualSelect(category)}
                  className={`relative px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 overflow-hidden group border ${activeCategory === category
                    ? 'text-black bg-cyber-cyan border-cyber-cyan shadow-[0_0_15px_rgb(var(--cyber-cyan)/0.5)]'
                    : 'text-muted-foreground border-white/10 bg-black/40 hover:border-cyber-cyan/50 hover:text-white'
                    }`}
                >
                  <span className="relative z-10">{t(skillCategoryTitles[category])}</span>
                </button>
              ))}
            </div>

            {/* Auto-rotate toggle */}
            <button
              onClick={toggleAutoRotate}
              className={`flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-mono transition-all duration-300 ${isAutoRotating
                ? 'border-cyber-cyan/50 text-cyber-cyan bg-cyber-cyan/10'
                : 'border-white/10 text-muted-foreground hover:border-white/30'
                }`}
            >
              {isAutoRotating ? (
                <>
                  <Pause className="w-3 h-3" />
                  <span>Cycle Active</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3" />
                  <span>Cycle Paused</span>
                </>
              )}
            </button>
          </div>

          <div className="w-full flex justify-center items-center -mt-10">
            <HolographicSkillChart activeCategory={skillCategoriesData[skillCategories.indexOf(activeCategory)] || skillCategoriesData[0]} />
          </div>
        </motion.div>

        {/* Floating badges (Fallback/Accessibility) */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mt-8 max-w-5xl mx-auto opacity-60 hover:opacity-100 transition-opacity"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
        >
          {skills.map((skill) => (
            <span
              key={skill.name}
              className="px-2 py-1 text-[10px] text-muted-foreground/50 font-mono"
            >
              {skill.name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}