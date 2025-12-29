'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { 
  Code2, Server, Database, Cloud, 
  Layers, Terminal, Box, GitBranch,
  Layout, Cpu, Shield, Zap,
  CircleDot, Network, Pause, Play
} from 'lucide-react';
import { skills, skillCategories } from '@/data';
import CircularSkillChart from './CircularSkillChart';

type ViewMode = 'grid' | 'orbital';

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
  const [viewMode, setViewMode] = useState<ViewMode>('orbital');
  const [activeCategory, setActiveCategory] = useState(skillCategories[0]);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  // 自动轮播逻辑
  useEffect(() => {
    if (!isAutoRotating || viewMode !== 'orbital') return;

    const interval = setInterval(() => {
      setActiveCategory((current) => {
        const currentIndex = skillCategories.indexOf(current);
        const nextIndex = (currentIndex + 1) % skillCategories.length;
        return skillCategories[nextIndex];
      });
    }, 4000); // 每4秒切换一次

    return () => clearInterval(interval);
  }, [isAutoRotating, viewMode]);

  const handleCategoryManualSelect = (category: string) => {
    setActiveCategory(category);
    setIsAutoRotating(false); // 用户手动选择后暂停自动轮播
  };

  const toggleAutoRotate = () => {
    setIsAutoRotating(!isAutoRotating);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    },
  };

  return (
    <section id="skills" className="relative py-20 sm:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-cyan/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">{t('Skills.title')}</h2>
          <p className="section-subtitle mx-auto">{t('Skills.subtitle')}</p>

          {/* View Toggle */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                viewMode === 'grid' 
                  ? 'bg-cyber-cyan/20 border-cyber-cyan text-cyber-cyan' 
                  : 'bg-muted/20 border-border text-muted-foreground hover:bg-muted/30'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span className="text-sm font-mono">Grid</span>
            </button>
            <button
              onClick={() => setViewMode('orbital')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                viewMode === 'orbital' 
                  ? 'bg-cyber-purple/20 border-cyber-purple text-cyber-purple' 
                  : 'bg-muted/20 border-border text-muted-foreground hover:bg-muted/30'
              }`}
            >
              <CircleDot className="w-4 h-4" />
              <span className="text-sm font-mono">Orbital</span>
            </button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div
              key="grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {skillCategoriesData.map((category, categoryIndex) => (
                <motion.div
                  key={categoryIndex}
                  variants={itemVariants}
                  className="glass-card p-6 group"
                >
                  {/* Category header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyber-cyan/20 to-cyber-purple/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <category.icon className="w-6 h-6 text-cyber-cyan" />
                    </div>
                    <span className="font-display font-semibold text-lg">{t(category.titleKey)}</span>
                  </div>

                  {/* Skills list */}
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        className="relative"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-muted-foreground">{skill.name}</span>
                          <span className="text-xs font-mono text-cyber-cyan">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-muted/20 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.05, ease: 'easeOut' }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="orbital"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center"
            >
              {/* Category Selector for Orbital View */}
              <div className="flex flex-col items-center gap-6 mb-12">
                <div className="flex flex-wrap justify-center gap-3">
                  {skillCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryManualSelect(category)}
                      className={`px-6 py-2 rounded-xl text-sm font-display transition-all duration-300 ${
                        activeCategory === category
                          ? 'bg-cyber-cyan/20 border border-cyber-cyan text-cyber-cyan shadow-[0_0_15px_rgb(var(--cyber-cyan)/0.3)]'
                          : 'bg-muted/20 border border-border text-muted-foreground hover:border-muted-foreground/30'
                      }`}
                    >
                      {t(skillCategoryTitles[category])}
                    </button>
                  ))}
                </div>

                {/* Auto-rotate toggle */}
                <button
                  onClick={toggleAutoRotate}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/20 border border-border text-[10px] font-mono text-muted-foreground hover:text-cyber-cyan transition-colors"
                >
                  {isAutoRotating ? (
                    <>
                      <Pause className="w-3 h-3" />
                      <span>AUTOSCAN ACTIVE</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3" />
                      <span>AUTOSCAN PAUSED</span>
                    </>
                  )}
                </button>
              </div>
              
              <div className="w-full flex justify-center items-center py-10 min-h-[500px]">
                <CircularSkillChart activeCategory={activeCategory} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {skills.slice(0, 10).map((skill, index) => (
            <motion.span
              key={skill.name}
              className="px-4 py-2 bg-muted/20 border border-border rounded-lg text-sm text-muted-foreground hover:text-cyber-cyan hover:border-cyber-cyan/30 transition-all duration-300 cursor-default"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              {skill.name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}