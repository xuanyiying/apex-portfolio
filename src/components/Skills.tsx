'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import {
  Server, Database, Cloud,
  Terminal, Layout, Cpu,
  Zap, Activity,
  Zap as Lightning,
  Box, Hash
} from 'lucide-react';
import { skills, skillCategories } from '@/data';
import dynamic from 'next/dynamic';

const DynamicHolographicCanvas = dynamic(
  () => import('./SkillsThreeScene'),
  { ssr: false }
);

const skillCategoryIcons: { [key: string]: typeof Layout } = {
  'Frontend': Layout,
  'Backend': Server,
  'Database': Database,
  'AI ': Cpu,
  'DevOps': Terminal,
  'Cloud': Cloud,
};

const skillCategoryTitles: { [key: string]: string } = {
  'Frontend': 'Skills.frontend',
  'Backend': 'Skills.backend',
  'Database': 'Skills.database',
  'AI ': 'Skills.ai',
  'DevOps': 'Skills.devops',
  'Cloud': 'Skills.cloud',
};

const categoryConfig: { [key: string]: { primary: string; secondary: string; accent: string; icon: typeof Layout } } = {
  'Frontend': { primary: '#00F0FF', secondary: '#3B82F6', accent: '#06B6D4', icon: Layout },
  'Backend': { primary: '#B400FF', secondary: '#8B5CF6', accent: '#A855F7', icon: Server },
  'Database': { primary: '#00FF88', secondary: '#10B981', accent: '#34D399', icon: Database },
  'AI ': { primary: '#FF0080', secondary: '#EC4899', accent: '#F472B6', icon: Cpu },
  'DevOps': { primary: '#FF6B00', secondary: '#F97316', accent: '#FB923C', icon: Terminal },
  'Cloud': { primary: '#6366F1', secondary: '#4F46E5', accent: '#818CF8', icon: Cloud },
};

const getSkillsByCategory = (category: string) => {
  return skills.filter(skill => skill.category === category);
};



function SkillMatrix({ category, primaryColor }: { category: string; primaryColor: string }) {
  const skills = getSkillsByCategory(category);

  return (
    <div className="relative overflow-hidden rounded-xl bg-black/40 border border-white/10 p-3 sm:p-4 min-h-[280px] sm:min-h-[300px]">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,240,255,0.03)_50%)] bg-[length:100%_4px]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_50%,rgba(0,240,255,0.02)_50%)] bg-[length:4px_100%]" />
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group flex items-center gap-2 sm:gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <div
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse flex-shrink-0"
              style={{ backgroundColor: primaryColor, boxShadow: `0 0 10px ${primaryColor}` }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] sm:text-xs font-medium text-foreground truncate">{skill.name}</span>
                <span className="text-[8px] sm:text-[10px] font-mono ml-2" style={{ color: primaryColor }}>{skill.level * 20}%</span>
              </div>
              <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: primaryColor }}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level * 20}%` }}
                  transition={{ delay: index * 0.05 + 0.2, duration: 0.6 }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-2 right-2 flex items-center gap-1 text-[8px] sm:text-[10px] font-mono" style={{ color: primaryColor, opacity: 0.5 }}>
        <Activity className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
        <span>{category} MODE</span>
      </div>
    </div>
  );
}

function TerminalSkills({ category, primaryColor }: { category: string; primaryColor: string }) {
  const skills = getSkillsByCategory(category);

  const commands = useMemo(() => {
    return skills.map(skill => ({
      cmd: `> skill.load("${skill.name}")`,
      status: skill.level >= 4 ? 'READY' : skill.level >= 3 ? 'ACTIVE' : 'LOADING',
      level: skill.level * 20
    }));
  }, [skills]);

  return (
    <div className="relative overflow-hidden rounded-xl bg-black/60 border border-white/10 font-mono text-[10px] sm:text-xs">
      <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 border-b border-white/10 bg-white/5">
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/50" />
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/50" />
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/50" />
        <span className="ml-1.5 sm:ml-2 text-muted-foreground text-[9px] sm:text-xs">system_skills.exe</span>
      </div>

      <div className="p-3 sm:p-4 space-y-1 max-h-[250px] sm:max-h-[280px] overflow-y-auto">
        {commands.map((cmd, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center justify-between py-0.5 gap-2"
          >
            <span className="text-muted-foreground truncate text-[9px] sm:text-xs">{cmd.cmd}</span>
            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <span
                className="px-1 sm:px-1.5 py-0.5 text-[8px] sm:text-[9px] rounded"
                style={{
                  backgroundColor: `${primaryColor}20`,
                  color: primaryColor
                }}
              >
                {cmd.status}
              </span>
              <span style={{ color: primaryColor, opacity: 0.7 }} className="text-[8px] sm:text-[10px]">[{cmd.level}%]</span>
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="pt-2"
        >
          <span style={{ color: primaryColor }}>›</span> <span className="text-muted-foreground">_</span>
        </motion.div>
      </div>
    </div>
  );
}

export default function Skills() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(skillCategories[0]);
  const [viewMode, setViewMode] = useState<'3d' | 'matrix' | 'terminal'>('3d');

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCategory(current => {
        const idx = skillCategories.indexOf(current);
        return skillCategories[(idx + 1) % skillCategories.length];
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const config = categoryConfig[activeCategory] || categoryConfig['Frontend'];
  const IconComponent = config.icon;

  return (
    <section id="skills" className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px]" style={{
          background: `radial-gradient(circle, ${config.primary}15 0%, transparent 70%)`,
          filter: 'blur(60px)'
        }} />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px]" style={{
          background: `radial-gradient(circle, ${config.secondary}15 0%, transparent 70%)`,
          filter: 'blur(60px)'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <Lightning className="w-4 h-4" style={{ color: config.primary }} />
            <span className="text-xs font-mono uppercase tracking-wider" style={{ color: config.primary }}>
              {t('Skills.title')}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 tracking-tight">
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(135deg, ${config.secondary}, ${config.primary})` }}
            >
              Technical
            </span>
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{ backgroundImage: `linear-gradient(135deg, ${config.primary}, ${config.accent})` }}
            >
              Expertise
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t('Skills.subtitle')}</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-8 px-4">
          {skillCategories.map((category) => {
            const Icon = skillCategoryIcons[category];
            const isActive = activeCategory === category;
            const catConfig = categoryConfig[category];

            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${isActive
                  ? 'text-black shadow-lg'
                  : 'text-muted-foreground hover:text-white'
                  }`}
                style={isActive ? {
                  backgroundColor: catConfig.primary,
                  boxShadow: `0 0 30px ${catConfig.primary}40`
                } : {}}
              >
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">{t(skillCategoryTitles[category])}</span>
                  <span className="sm:hidden">{category}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex justify-center gap-2 mb-8">
          {(['3d', 'matrix', 'terminal'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all ${viewMode === mode
                ? 'bg-white/10 text-white border border-white/20'
                : 'text-muted-foreground hover:text-white/70'
                }`}
            >
              {mode === '3d' && <Box className="w-3 h-3 inline mr-1" />}
              {mode === 'matrix' && <Hash className="w-3 h-3 inline mr-1" />}
              {mode === 'terminal' && <Terminal className="w-3 h-3 inline mr-1" />}
              {mode}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative h-[300px] sm:h-[350px] lg:h-[400px] rounded-2xl overflow-hidden border border-white/10"
            style={{
              background: `linear-gradient(135deg, ${config.primary}10 0%, transparent 50%)`,
            }}
          >
            <div className="absolute inset-0">
              <DynamicHolographicCanvas activeCategory={activeCategory} />
            </div>

            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-black/50 backdrop-blur-sm border border-white/10">
              <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: config.primary }} />
              <span className="text-[10px] sm:text-xs font-mono text-white">{activeCategory}</span>
            </div>

            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-black/50 backdrop-blur-sm border border-white/10">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[8px] sm:text-[10px] font-mono text-green-500">ONLINE</span>
                </div>
                <span className="text-[8px] sm:text-[10px] font-mono text-muted-foreground">
                  {getSkillsByCategory(activeCategory).length} MODULES
                </span>
              </div>
              <span className="text-[8px] sm:text-[10px] font-mono" style={{ color: config.primary }}>
                v2.0.2048
              </span>
            </div>
          </motion.div>

          <div className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${viewMode}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {viewMode === 'matrix' && (
                  <SkillMatrix category={activeCategory} primaryColor={config.primary} />
                )}
                {viewMode === 'terminal' && (
                  <TerminalSkills category={activeCategory} primaryColor={config.primary} />
                )}
                {viewMode === '3d' && (
                  <div className="space-y-3 sm:space-y-4">
                    <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10">
                      <h3 className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: config.primary }} />
                        Proficiency Level
                      </h3>
                      <div className="space-y-2 sm:space-y-3">
                        {getSkillsByCategory(activeCategory).slice(0, 5).map((skill, i) => (
                          <div key={skill.name} className="flex items-center gap-2 sm:gap-3">
                            <span className="text-[10px] sm:text-xs text-muted-foreground w-20 sm:w-24 truncate">{skill.name}</span>
                            <div className="flex-1 h-1 sm:h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: config.primary }}
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level * 20}%` }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                              />
                            </div>
                            <span className="text-[10px] sm:text-xs font-mono w-10 sm:w-12 text-right" style={{ color: config.primary }}>
                              {skill.level * 20}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      {[
                        { label: 'EXP', value: '12.5K', icon: Activity },
                        { label: 'RANK', value: '#42', icon: Hash },
                        { label: 'STREAK', value: '7D', icon: Zap },
                      ].map((stat, i) => (
                        <div
                          key={stat.label}
                          className="p-2 sm:p-3 rounded-xl bg-white/5 border border-white/10 text-center"
                        >
                          <stat.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 mx-auto mb-1" style={{ color: config.primary }} />
                          <div className="text-base sm:text-lg font-bold" style={{ color: config.primary }}>{stat.value}</div>
                          <div className="text-[8px] sm:text-[10px] font-mono text-muted-foreground">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          className="flex flex-wrap justify-center gap-2 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {skills.slice(0, 12).map((skill) => (
            <span
              key={skill.name}
              className="px-3 py-1.5 text-[10px] font-mono text-muted-foreground/60 bg-white/5 border border-white/10 rounded-full hover:border-white/20 transition-all cursor-default"
            >
              {skill.name}
            </span>
          ))}
          {skills.length > 12 && (
            <span className="px-3 py-1.5 text-[10px] font-mono text-muted-foreground/40">
              +{skills.length - 12}
            </span>
          )}
        </motion.div>
      </div>
    </section>
  );
}