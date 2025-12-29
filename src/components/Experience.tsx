'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { Briefcase, Calendar, MapPin, Award, Users, Code2 } from 'lucide-react';
import { experiencesEn, experiencesZh } from '@/data';


const experienceColors = [
  'from-cyan-400 to-blue-500',
  'from-purple-400 to-pink-500',
  'from-green-400 to-emerald-500',
  'from-yellow-400 to-orange-500',
  'from-pink-400 to-rose-500',
  'from-indigo-400 to-purple-500'
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
    <section id="experience" className="relative py-20 sm:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-cyan/3 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">{t('Experience.title')}</h2>
          <p className="section-subtitle mx-auto">{t('Experience.subtitle')}</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <motion.div
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyber-cyan via-cyber-purple to-cyber-pink"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            style={{ transformOrigin: 'top' }}
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-12"
          >
            {experiences.map((experience, index) => {
              const color = experienceColors[index % experienceColors.length];

              return (
                <motion.div
                  key={experience.id}
                  variants={itemVariants}
                  className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                    }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4">
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${color} ring-4 ring-background`} />
                    <motion.div
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${color}`}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>

                  {/* Content */}
                  <div className={`flex-1 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <motion.div
                      className="glass-card p-6 relative overflow-hidden text-left"
                      whileHover={{ scale: 1.02 }}
                    >
                      {/* Decorative gradient */}
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${color} opacity-10 rounded-full blur-2xl`} />

                      {/* Header */}
                      <div className="relative z-10">
                        {/* Company name hidden as per request */}

                        <h3 className="font-display font-bold text-xl mb-2">
                          {experience.position}
                        </h3>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {experience.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {experience.location}
                          </span>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-gradient-to-r from-border/50 via-border/50 to-transparent my-4" />

                      {/* Description */}
                      <p className="text-muted-foreground text-sm mb-4 relative z-10">
                        {experience.description}
                      </p>

                      {/* Achievements */}
                      <div className="space-y-2 mb-4">
                        <h4 className="text-cyber-cyan text-sm font-medium flex items-center gap-2">
                          <Award className="w-4 h-4" />
                          {t('Experience.achievements')}
                        </h4>
                        <ul className="space-y-1 pl-4">
                          {experience.achievements.slice(0, 3).map((achievement, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-cyber-cyan mt-1">▹</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech) => (
                          <span
                            key={tech}
                            className={`px-3 py-1 bg-muted/20 border border-border rounded-full text-xs text-muted-foreground hover:border-${color.split(' ')[1].replace('to-', '').replace('-500', '')}/30 transition-colors`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Empty space for the other side */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {[
            { icon: Briefcase, value: '8+', label: locale === 'zh' ? '工作年限' : 'Years Experience' },
            { icon: Code2, value: '10+', label: locale === 'zh' ? '项目交付' : 'Projects Delivered' },
            { icon: Users, value: '100+', label: locale === 'zh' ? '服务机构' : 'Institutions Served' },
            { icon: Award, value: '10+', label: locale === 'zh' ? '获得荣誉' : 'Awards Won' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-card p-6 text-center"
              whileHover={{ y: -5 }}
              transition={{ delay: index * 0.1 }}
            >
              <stat.icon className="w-8 h-8 text-cyber-cyan mx-auto mb-3" />
              <div className="text-3xl font-display font-bold bg-gradient-to-r from-cyber-cyan to-cyber-purple bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}