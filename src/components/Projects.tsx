'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { Github, ExternalLink, Code2, Zap, Server, Database, Activity, Layout } from 'lucide-react';
import { projectsEn, projectsZh } from '@/data';

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
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

                  {/* Featured badge */}
                  {project.featured && (
                    <motion.div
                      className="absolute top-4 left-4 z-20 px-3 py-1 bg-cyber-cyan text-black text-xs font-bold rounded-full"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      {t('Projects.featured')}
                    </motion.div>
                  )}

                  {/* Category badge - using first tag as category */}
                  <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-background/50 backdrop-blur-sm border border-border rounded-full text-xs text-muted-foreground">
                    {project.tags[0] || 'Project'}
                  </div>

                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 z-20 flex items-center justify-center gap-4 bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 flex items-center justify-center bg-muted/20 border border-border rounded-xl text-foreground hover:bg-cyber-cyan hover:text-black hover:border-cyber-cyan transition-all duration-300"
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
                        className="w-12 h-12 flex items-center justify-center bg-cyber-cyan/20 border border-cyber-cyan/30 rounded-xl text-cyber-cyan hover:bg-cyber-cyan hover:text-black transition-all duration-300"
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
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display font-bold text-xl group-hover:text-cyber-cyan transition-colors duration-300">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      {project.stars > 0 && (
                        <div className="flex items-center gap-1">
                          <Zap className="w-3 h-3 text-yellow-400" />
                          <span>{project.stars}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-6 line-clamp-2 h-10">
                    {project.description}
                  </p>

                  {/* Architecture Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
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
                    <ArchitectureBadge
                      icon={Database}
                      title="Storage"
                      items={project.architecture.database.slice(0, 2)}
                    />
                    <ArchitectureBadge
                      icon={Activity}
                      title="Infrastructure"
                      items={project.architecture.devops.slice(0, 2)}
                    />
                  </div>

                  {/* Quality Metrics */}
                  <div className="space-y-3 mb-6 p-4 bg-muted/20 rounded-xl border border-border">
                    <MetricBar
                      label="Code Quality"
                      value={project.metrics.codeQuality}
                      color={projectColor}
                    />
                    <MetricBar
                      label="API Architecture"
                      value={project.metrics.apiDesign}
                      color={projectColor}
                    />
                    <MetricBar
                      label="Deployment Readiness"
                      value={project.metrics.deployment}
                      color={projectColor}
                    />
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded text-[9px] text-cyber-cyan font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.updatedAt && (
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] text-muted-foreground font-mono">
                        MODULAR ARCHITECTURE • VERIFIED
                      </div>
                      <div className="text-[10px] text-muted-foreground font-mono">
                        {project.updatedAt}
                      </div>
                    </div>
                  )}
                </div>

                {/* Glow effect on hover */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  style={{
                    background: `radial-gradient(600px circle at center, rgb(var(--cyber-cyan) / 0.1), transparent 70%)`,
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
