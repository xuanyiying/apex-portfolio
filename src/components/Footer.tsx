'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { Github, Linkedin, Mail, Heart, Code2 } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:hello@alexchen.dev', label: 'Email' },
  ];

  const footerLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-cyber-black/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyber-cyan to-cyber-purple rounded-xl flex items-center justify-center">
                <span className="font-display font-bold text-cyber-black text-lg">AC</span>
              </div>
              <span className="font-display font-bold text-xl">
                <span className="text-white">Alex</span>
                <span className="text-cyber-cyan">Chen</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Passionate full-stack developer creating stunning digital experiences. Building the digital future with modern technologies.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan/30 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-cyber-cyan transition-colors duration-300 text-sm flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-cyber-cyan rounded-full" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Tech stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-display font-semibold text-lg mb-4">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'Tailwind'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} Alex Chen. {t('Footer.rights')}
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{t('Footer.built')}</span>
            <motion.span
              className="text-cyber-pink"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4" />
            </motion.span>
            <span>{t('Footer.with')}</span>
            <span className="flex items-center gap-1 text-cyber-cyan">
              <Code2 className="w-4 h-4" />
              Next.js
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
