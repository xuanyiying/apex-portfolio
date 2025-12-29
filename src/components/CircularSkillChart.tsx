'use client';

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Skill {
  name: string;
  level: number;
  color: string;
}

interface SkillCategory {
  icon: any;
  titleKey: string;
  skills: Skill[];
}

interface CircularSkillChartProps {
  activeCategory: SkillCategory;
}

const CircularSkillChart: React.FC<CircularSkillChartProps> = ({ activeCategory }) => {
  const { icon: Icon, skills } = activeCategory;
  const radius = 160; // Radius of the orbit

  // Calculate positions for skills
  const skillPositions = useMemo(() => {
    return skills.map((skill, index) => {
      const angle = (index / skills.length) * 2 * Math.PI - Math.PI / 2; // Start from top
      return {
        ...skill,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        angle
      };
    });
  }, [skills, radius]);

  return (
    <div className="relative w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] flex items-center justify-center">
      {/* Background Radar Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="absolute w-[200px] h-[200px] rounded-full border border-cyber-cyan/10"
          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-[360px] h-[360px] rounded-full border border-cyber-purple/10 border-dashed"
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full border border-cyber-cyan/5"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Central Hub */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeCategory.titleKey}
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          exit={{ scale: 0, rotate: 180, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative z-20 w-24 h-24 rounded-full bg-background border-2 border-cyber-cyan flex items-center justify-center shadow-[0_0_30px_rgb(var(--cyber-cyan)/0.3)] group"
        >
          <div className="absolute inset-0 rounded-full bg-cyber-cyan/10 animate-pulse" />
          <Icon className="w-10 h-10 text-cyber-cyan drop-shadow-[0_0_10px_rgba(var(--cyber-cyan),0.5)]" />

          {/* Decorative central rings */}
          <div className="absolute inset-1 rounded-full border border-cyber-cyan/30 border-t-transparent animate-spin-slow" />
          <div className="absolute -inset-2 rounded-full border border-cyber-purple/20 border-b-transparent animate-reverse-spin-slow" />
        </motion.div>
      </AnimatePresence>

      {/* Connecting Lines & Skills */}
      <AnimatePresence mode="popLayout">
        {skillPositions.map((skill, index) => (
          <React.Fragment key={`${activeCategory.titleKey}-${skill.name}`}>
            {/* Connecting Line */}
            <motion.div
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 1, pathLength: 1 }}
              exit={{ opacity: 0, pathLength: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="absolute z-0 top-1/2 left-1/2 w-0 h-0"
            >
              <svg className="absolute top-0 left-0 overflow-visible w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <motion.line
                  x1="250"
                  y1="250"
                  x2={250 + skill.x}
                  y2={250 + skill.y}
                  stroke="url(#lineGradient)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.4 }}
                  exit={{ pathLength: 0, opacity: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.05 }}
                />
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(var(--cyber-cyan), 0.1)" />
                    <stop offset="100%" stopColor="rgba(var(--cyber-cyan), 0.5)" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Skill Node */}
            <motion.div
              initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
              animate={{
                scale: 1,
                x: skill.x,
                y: skill.y,
                opacity: 1
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: index * 0.1
              }}
              className="absolute z-10 top-1/2 left-1/2 -ml-[40px] -mt-[40px]"
            >
              <motion.div
                className="w-20 h-20 flex flex-col items-center justify-center"
                whileHover={{ scale: 1.2, zIndex: 50 }}
              >
                {/* Skill Circle */}
                <div className={`
                    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    w-12 h-12 rounded-full bg-background border border-border
                    flex items-center justify-center
                    shadow-lg shadow-black/50
                    group cursor-pointer
                 `}>
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${skill.color} opacity-20 group-hover:opacity-40 transition-opacity`} />
                  <div className={`absolute -inset-1 rounded-full bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-50 blur-md transition-opacity duration-300`} />

                  {/* Ring showing level */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90 scale-125">
                    <circle
                      cx="24"
                      cy="24"
                      r="22"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-muted/20"
                    />
                    <motion.circle
                      cx="24"
                      cy="24"
                      r="22"
                      fill="none"
                      stroke={`url(#gradient-${skill.name.replace(/\s+/g, '-')})`}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 22}
                      initial={{ strokeDashoffset: 2 * Math.PI * 22 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 22 * (1 - skill.level / 100) }}
                      transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
                    />
                    <defs>
                      <linearGradient id={`gradient-${skill.name.replace(/\s+/g, '-')}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        {/* Extract colors from class names would be hard in SVG defs, simplified to use cyan/purple */}
                        <stop offset="0%" stopColor="rgb(var(--cyber-cyan))" />
                        <stop offset="100%" stopColor="rgb(var(--cyber-purple))" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <span className="text-[10px] font-bold z-10">{skill.level}%</span>
                </div>

                {/* Label */}
                <div className="absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="px-2 py-1 rounded bg-background/80 border border-border/50 backdrop-blur-sm text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                    {skill.name}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </React.Fragment>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CircularSkillChart;
