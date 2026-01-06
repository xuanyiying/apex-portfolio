'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { Briefcase, Calendar, MapPin, Award, Users, Code2 } from 'lucide-react';
import { experiencesEn, experiencesZh } from '@/data';

// Cyber-Tech Unified Palette (Cyan -> Purple -> Blue)
const experienceColors = [
  'from-cyan-400 to-blue-500',
  'from-blue-400 to-indigo-500',
  'from-indigo-400 to-purple-500',
  'from-purple-400 to-fuchsia-500',
  'from-fuchsia-400 to-pink-500',
  'from-pink-400 to-cyan-500' // Loop back
];

export default function Experience() {
  const { t, locale } = useLanguage();
  const experiences = locale === 'zh' ? experiencesZh : experiencesEn;

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
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    },
  };

  return (
    <section id="experience" className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/10 to-transparent pointer-events-none" />

      {/* Grid Lines Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          {/*<div className="inline-block mb-3 px-3 py-1 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/10 text-cyber-cyan text-xs font-mono tracking-widest uppercase">*/}
          {/*  {t('Experience.subtitle') || 'Career Trajectory'}*/}
          {/*</div>*/}
          <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyber-cyan to-cyber-purple drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            {t('Experience.title')}
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line with animated gradient */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gray-800/50">
            <motion.div
              className="absolute top-0 left-0 right-0 w-full bg-gradient-to-b from-cyber-cyan via-purple-500 to-cyan-500"
              initial={{ height: "0%" }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-16"
          >
            {experiences.map((experience, index) => {
              const color = experienceColors[index % experienceColors.length];
              const isEvent = index % 2 === 0;

              return (
                <motion.div
                  key={experience.id}
                  variants={itemVariants}
                  className={`relative flex flex-col md:flex-row gap-8 ${isEvent ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline Node (Holographic) */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 top-0 w-6 h-6 z-10">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div className={`absolute w-full h-full rounded-full bg-gray-900 border-2 border-cyber-cyan shadow-[0_0_10px_rgba(34,211,238,0.5)] z-20`} />
                      <motion.div
                        className={`absolute inset-0 bg-cyber-cyan rounded-full`}
                        initial={{ scale: 1 }}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <div className="absolute w-2 h-2 bg-white rounded-full z-30" />
                    </div>
                  </div>

                  {/* Connector Line */}
                  <div className={`hidden md:block absolute top-3 h-[2px] w-8 bg-cyber-cyan/30 ${isEvent ? 'right-1/2 mr-3' : 'left-1/2 ml-3'}`} />

                  {/* Content Card */}
                  <div className={`flex-1 ml-16 md:ml-0 ${isEvent ? 'md:pr-12' : 'md:pl-12'}`}>
                    <motion.div
                      className="group relative p-6 md:p-8 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 overflow-hidden hover:border-cyber-cyan/40 transition-colors duration-500"
                      whileHover={{ y: -5 }}
                    >
                      {/* Holographic Gradient bg on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />



                      {/* Header */}
                      <div className="relative z-10 mb-4 border-b border-white/10 pb-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                          <h3 className="text-xl md:text-2xl font-bold font-display text-white group-hover:text-cyber-cyan transition-colors">
                            {experience.position}
                          </h3>
                          <div className="flex items-center gap-2 text-xs font-mono text-cyber-cyan bg-cyber-cyan/10 px-2 py-1 rounded border border-cyber-cyan/20">
                            <Calendar className="w-3 h-3" />
                            {experience.duration}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <MapPin className="w-3.5 h-3.5" />
                          {experience.location}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light relative z-10">
                        {experience.description}
                      </p>

                      {/* Achievements */}
                      <div className="space-y-3 mb-6 relative z-10">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-cyber-purple flex items-center gap-2">
                          <Award className="w-3.5 h-3.5" />
                          {t('Experience.achievements')}
                        </h4>
                        <ul className="space-y-2">
                          {experience.achievements.map((achievement, i) => (
                            <li key={i} className="text-sm text-gray-400 flex items-start gap-2.5 group/list">
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-cyber-purple group-hover/list:bg-cyber-cyan transition-colors" />
                              <span className="group-hover/list:text-gray-200 transition-colors">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 relative z-10">
                        {experience.technologies.slice(0, 6).map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold rounded bg-white/5 border border-white/10 text-gray-400 group-hover:text-cyber-cyan group-hover:border-cyber-cyan/30 transition-all"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Empty space for the other side to keep timeline centered */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Stats Row with HUD style */}
        <motion.div
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {[
            { icon: Briefcase, value: '8+', label: locale === 'zh' ? '工作年限' : 'Years Exp' },
            { icon: Code2, value: '10+', label: locale === 'zh' ? '项目交付' : 'Projects' },
            { icon: Users, value: '100+', label: locale === 'zh' ? '服务机构' : 'Clients' },
            { icon: Award, value: '10+', label: locale === 'zh' ? '获得荣誉' : 'Awards' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative group p-4 bg-black/20 border border-white/5 hover:border-cyber-cyan/30 transition-colors rounded-xl text-center overflow-hidden"
              whileHover={{ y: -2 }}
            >
              <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-cyber-cyan/10 to-transparent rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <stat.icon className="w-6 h-6 mx-auto mb-2 text-gray-500 group-hover:text-cyber-cyan transition-colors" />
              <div className="text-2xl font-bold font-display text-white group-hover:text-cyber-cyan transition-colors mb-1">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-widest text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}