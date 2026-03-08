'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { Github, ExternalLink, Code2, Zap, Server, Database, Activity, Layout } from 'lucide-react';
import { projectsEn, projectsZh } from '@/data';
import ProjectCarousel from './ProjectCarousel';

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

const MetricBar = ({ label, value, color }: { label: string, value: number, color: string }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-[10px] font-mono">
      <span className="text-muted-foreground uppercase tracking-wider">{label}</span>
      <span className="text-foreground">{value}%</span>
    </div>
    <div className="h-1 w-full bg-muted/20 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-full bg-gradient-to-r ${color}`}
      />
    </div>
  </div>
);

const ArchitectureBadge = ({ icon: Icon, title, items }: { icon: any, title: string, items: string[] }) => (
  <div className="flex flex-col gap-1.5 p-2 rounded-lg bg-muted/20 border border-border hover:border-cyber-cyan/30 transition-colors">
    <div className="flex items-center gap-2 text-cyber-cyan">
      <Icon className="w-3.5 h-3.5" />
      <span className="text-[10px] font-bold uppercase tracking-widest">{title}</span>
    </div>
    <div className="flex flex-wrap gap-1">
      {items.map(item => (
        <span key={item} className="text-[9px] text-muted-foreground font-mono">
          {item}
        </span>
      ))}
    </div>
  </div>
);

export default function Projects() {
  const { t, locale } = useLanguage();
  const projects = locale === 'zh' ? projectsZh : projectsEn;
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  // 获取所有项目类别
  const allCategories = ['All', 'Full-Stack', 'AI/LLM', 'System Design', 'SaaS'];
  const filters = allCategories;

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.tags.includes(activeFilter));

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
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === filter
                ? 'bg-cyber-cyan text-black'
                : 'bg-muted/20 border border-border text-muted-foreground hover:text-foreground hover:border-cyber-cyan/30'
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
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => {
            const projectColor = getProjectColor(index);
            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group relative bg-background/30 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-cyber-cyan/50"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                whileHover={{ y: -5 }}
              >
                {/* Tech Hover Border / Corners */}
                <div className="absolute inset-0 pointer-events-none z-30">
                  {/* Top Left */}
                  <svg className="absolute top-0 left-0 w-8 h-8 text-cyber-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 32 32">
                    <path d="M0,0 L32,0 L32,2 L2,2 L2,32 L0,32 Z" fill="currentColor" />
                  </svg>
                  {/* Top Right */}
                  <svg className="absolute top-0 right-0 w-8 h-8 text-cyber-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 32 32">
                    <path d="M0,0 L32,0 L32,32 L30,32 L30,2 L0,2 Z" fill="currentColor" />
                  </svg>
                  {/* Bottom Left */}
                  <svg className="absolute bottom-0 left-0 w-8 h-8 text-cyber-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 32 32">
                    <path d="M0,32 L0,0 L2,0 L2,30 L32,30 L32,32 Z" fill="currentColor" />
                  </svg>
                  {/* Bottom Right */}
                  <svg className="absolute bottom-0 right-0 w-8 h-8 text-cyber-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 32 32">
                    <path d="M32,32 L0,32 L0,30 L30,30 L30,0 L32,0 Z" fill="currentColor" />
                  </svg>
                </div>

                {/* Image container */}
                <div className="relative h-56 overflow-hidden">
                  <ProjectCarousel images={project.images || [project.image]} alt={project.title} />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

                  {/* Featured badge */}
                  {project.featured && (
                    <motion.div
                      className="absolute top-4 left-4 z-20 px-3 py-1 bg-cyber-cyan text-black text-xs font-bold rounded-full font-display tracking-wider"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      {t('Projects.featured')}
                    </motion.div>
                  )}

                  {/* Category badge */}
                  <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/20 rounded-full text-xs text-white font-mono">
                    {project.tags[0] || 'Project'}
                  </div>

                  {/* Hover overlay - Holographic Scan */}
                  <motion.div
                    className="absolute inset-0 z-20 flex items-center justify-center gap-4 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    {/* Scanline animation */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.8)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />

                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-30 w-12 h-12 flex items-center justify-center bg-black/50 border border-white/20 rounded-xl text-white hover:bg-cyber-cyan hover:text-black hover:border-cyber-cyan transition-all duration-300"
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
                        className="relative z-30 w-12 h-12 flex items-center justify-center bg-cyber-cyan/10 border border-cyber-cyan/50 rounded-xl text-cyber-cyan hover:bg-cyber-cyan hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(var(--cyber-cyan),0.3)]"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="w-5 h-5" />
                      </motion.a>
                    )}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6 relative">
                  {/* Floating slight glow behind text area */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="flex items-center justify-between mb-3 relative z-10">
                    <h3 className="font-display font-bold text-xl group-hover:text-cyber-cyan transition-colors duration-300 tracking-tight">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      {project.stars > 0 && (
                        <div className="flex items-center gap-1 font-mono text-yellow-400">
                          <Zap className="w-3 h-3" />
                          <span>{project.stars}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-6 line-clamp-2 h-10 relative z-10 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Architecture Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-6 relative z-10">
                    <ArchitectureBadge
                      icon={Layout}
                      title="Frontend"
                      items={project.architecture.frontend.slice(0, 2)}
                    />
                    <ArchitectureBadge
                      icon={Server}
                      title="Backend"
                      items={project.architecture.backend.slice(0, 2)}
                    />
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                    {project.tags.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-gray-400 group-hover:text-cyber-cyan group-hover:border-cyber-cyan/30 transition-colors font-mono uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-2 py-0.5 text-[10px] text-gray-500 font-mono self-center">+{project.tags.length - 4}</span>
                    )}
                  </div>
                </div>

                {/* Internal Glow Light */}
                <motion.div
                  className={`absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0`}
                  style={{
                    background: `radial-gradient(400px circle at 50% 50%, rgba(var(--cyber-cyan), 0.15), transparent 60%)`,
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-muted/20 border border-border rounded-xl text-muted-foreground hover:text-cyber-cyan hover:border-cyber-cyan/30 transition-all duration-300"
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
