'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills, Skill } from '@/data/skills';
import { useLanguage } from '@/lib/LanguageContext';

interface CircularSkillChartProps {
  activeCategory: string;
}

export default function CircularSkillChart({ activeCategory }: CircularSkillChartProps) {
  const { t } = useLanguage();
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  
  // 过滤当前分类的技能
  const categorySkills = skills.filter(s => s.category === activeCategory);
  const totalSkills = categorySkills.length;
  
  // 圆盘参数
  const radius = 140; // 稍微减小半径给文字留空间
  const centerX = 200;
  const centerY = 200;

  return (
    <div className="relative w-full max-w-[500px] aspect-square mx-auto flex items-center justify-center">
      {/* 悬停详情浮层 */}
      <AnimatePresence>
        {hoveredSkill && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 z-20 px-4 py-2 bg-black/80 backdrop-blur-md border border-cyber-cyan/30 rounded-lg text-center pointer-events-none"
          >
            <div className="text-cyber-cyan font-display font-bold">{hoveredSkill.fullName || hoveredSkill.name}</div>
            <div className="text-xs text-gray-400 font-mono">Proficiency: {hoveredSkill.level * 20}%</div>
          </motion.div>
        )}
      </AnimatePresence>

      <svg viewBox="0 0 400 400" className="w-full h-full overflow-visible">
        {/* 背景装饰圆环 */}
        {[0.4, 0.7, 1.0].map((rMult) => (
          <circle
            key={rMult}
            cx={centerX}
            cy={centerY}
            r={radius * rMult}
            className="stroke-white/5 fill-none"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        ))}

        {/* 技能节点 */}
        <AnimatePresence mode="wait">
          {categorySkills.map((skill, index) => {
            const angle = (index / totalSkills) * 2 * Math.PI - Math.PI / 2;
            const x = centerX + radius * 1.2 * Math.cos(angle);
            const y = centerY + radius * 1.2 * Math.sin(angle);
            
            // 熟练度线条长度
            const lineLength = radius * (skill.level / 5);
            const lx = centerX + lineLength * Math.cos(angle);
            const ly = centerY + lineLength * Math.sin(angle);

            return (
              <motion.g
                key={`${activeCategory}-${skill.name}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
                className="cursor-pointer group"
              >
                {/* 熟练度指示线 */}
                <motion.line
                  x1={centerX}
                  y1={centerY}
                  x2={lx}
                  y2={ly}
                  className="stroke-cyber-cyan/30 group-hover:stroke-cyber-cyan/60 transition-colors"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
                
                {/* 技能点 */}
                <motion.circle
                  cx={lx}
                  cy={ly}
                  r="5"
                  className="fill-cyber-cyan group-hover:fill-white transition-colors"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(0, 255, 242, 0.5))' }}
                  whileHover={{ r: 8, filter: 'drop-shadow(0 0 12px rgba(0, 255, 242, 0.8))' }}
                />
                
                {/* 技能名称 */}
                <motion.text
                  x={x}
                  y={y}
                  fill="currentColor"
                  className="text-[11px] font-mono text-gray-400 group-hover:text-white transition-colors"
                  textAnchor={x > centerX ? 'start' : 'end'}
                  dominantBaseline="middle"
                  dx={x > centerX ? 10 : -10}
                >
                  {skill.name}
                </motion.text>
              </motion.g>
            );
          })}
        </AnimatePresence>

        {/* 中心分类标识 */}
        <motion.g
          key={activeCategory}
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.6 }}
        >
          <circle
            cx={centerX}
            cy={centerY}
            r="45"
            className="fill-cyber-purple/10 stroke-cyber-purple/30"
            strokeWidth="1"
            style={{ filter: 'drop-shadow(0 0 15px rgba(188, 19, 254, 0.2))' }}
          />
          <text
            x={centerX}
            y={centerY}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-cyber-cyan text-[11px] font-bold uppercase tracking-[0.2em]"
          >
            {activeCategory.split(' ')[0]}
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
