'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { Github, ExternalLink, Code2, Zap, Globe, Smartphone } from 'lucide-react';
import { projects } from '@/data';

// 为项目分配颜色
const getProjectColor = (index: number): string => {
  const colors = [
    'from-cyan-400 to-blue-500',
    'from-purple-400 to-pink-500',
    'from-green-400 to-emerald-500',
    'from-orange-400 to-red-500',
    'from-blue-400 to-indigo-500',
    'from-yellow-400 to-orange-500',
  ];
  return colors[index % colors.length];
};

export default function Projects() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  // 获取所有项目类别
  const allCategories = Array.from(new Set(projects.map(p => p.title.split(' ')[0]))); // 简单的分类方式，实际可自定义
  const filters = ['All', ...allCategories];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.title.startsWith(activeFilter));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
  };

  return (
    <section id="projects" className="relative py-20 sm:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-purple/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block px-4 py-2 bg-cyber-purple/10 border border-cyber-purple/20 rounded-full text-cyber-purple text-sm font-mono mb-6"
          >
            Portfolio
          </motion.span>
          <h2 className="section-title">{t('Projects.title')}</h2>
          <p className="section-subtitle mx-auto">{t('Projects.subtitle')}</p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-cyber-cyan text-cyber-black'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-cyber-cyan/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => {
            const projectColor = getProjectColor(index);
            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="glass-card overflow-hidden group cursor-pointer"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                whileHover={{ y: -5 }}
              >
                {/* Image container */}
                <div className="relative h-56 overflow-hidden">
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${projectColor} opacity-20 z-10`}
                  />
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-transparent to-transparent" />

                  {/* Featured badge */}
                  {project.featured && (
                    <motion.div
                      className="absolute top-4 left-4 z-20 px-3 py-1 bg-cyber-cyan text-cyber-black text-xs font-bold rounded-full"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      {t('Projects.featured')}
                    </motion.div>
                  )}

                  {/* Category badge - using first tag as category */}
                  <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-cyber-black/50 backdrop-blur-sm border border-white/10 rounded-full text-xs text-gray-300">
                    {project.tags[0] || 'Project'}
                  </div>

                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 z-20 flex items-center justify-center gap-4 bg-cyber-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 flex items-center justify-center bg-white/10 border border-white/20 rounded-xl text-white hover:bg-cyber-cyan hover:text-cyber-black hover:border-cyber-cyan transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github className="w-5 h-5" />
                      </motion.a>
                    )}
                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 flex items-center justify-center bg-cyber-cyan/20 border border-cyber-cyan/30 rounded-xl text-cyber-cyan hover:bg-cyber-cyan hover:text-cyber-black transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="w-5 h-5" />
                      </motion.a>
                    )}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display font-bold text-xl mb-2 group-hover:text-cyber-cyan transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-400"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-2 py-1 bg-cyber-cyan/10 border border-cyber-cyan/20 rounded text-xs text-cyber-cyan">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Glow effect on hover */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  style={{
                    background: `radial-gradient(600px circle at center, rgba(0, 240, 255, 0.1), transparent 70%)`,
                  }}
                />
              </motion.div>
            )
          })}
        </motion.div>

        {/* View more button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan/30 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Code2 className="w-5 h-5" />
            View All Projects
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
