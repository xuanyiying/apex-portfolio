'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { cn } from '@/lib/utils';
import ThemeToggle from './ThemeToggle';
import { heroContent } from '@/data';

interface NavItem {
  id: string;
  labelKey: string;
}

const navItems: NavItem[] = [
  { id: 'home', labelKey: 'Nav.home' },
  { id: 'skills', labelKey: 'Nav.skills' },
  { id: 'projects', labelKey: 'Nav.projects' },
  { id: 'experience', labelKey: 'Nav.experience' },
  { id: 'contact', labelKey: 'Nav.contact' },
];

export default function Navigation() {
  const { locale, setLocale, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    setLocale(locale === 'en' ? 'zh' : 'en');
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'py-4 bg-background/80 backdrop-blur-xl border-b border-border shadow-[0_4px_30px_rgba(0,0,0,0.1)]'
            : 'py-6 bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-3 cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection('home')}
            >
              <div className="relative w-10 h-10 bg-gradient-to-br from-cyber-cyan to-cyber-purple rounded-xl flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="font-display font-bold text-black text-lg relative z-10">
                  {heroContent.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <span className="font-display font-bold text-xl hidden sm:block">
                <span className="text-foreground group-hover:text-cyber-cyan transition-colors">{heroContent.name.split(' ')[0]}</span>
                <span className="text-cyber-cyan ml-1 group-hover:text-cyber-purple transition-colors">{heroContent.name.split(' ').slice(1).join(' ')}</span>
              </span>
            </motion.div>

            {/* Desktop Navigation - Magnetic Effect */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="relative text-muted-foreground hover:text-cyber-cyan transition-colors duration-300 font-medium px-2 py-1"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">{t(item.labelKey)}</span>
                  <motion.span
                    className="absolute inset-0 bg-cyber-cyan/10 rounded-lg -z-0"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>
              ))}
            </div>

            {/* Language Toggle & Theme Toggle & CTA */}
            <div className="flex items-center gap-4">
              <ThemeToggle />

              <motion.button
                onClick={toggleLanguage}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-muted/20 border border-border rounded-lg hover:border-cyber-cyan/30 transition-all duration-300 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="font-mono text-sm text-cyber-cyan group-hover:text-cyber-pink transition-colors">{locale === 'zh' ? '中文' : 'EN'}</span>
                <span className="text-muted-foreground">/</span>
                <span className="font-mono text-sm text-muted-foreground">{locale === 'zh' ? 'EN' : 'ZH'}</span>
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center bg-muted/20 border border-border rounded-lg hover:bg-cyber-cyan/10 transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex flex-col gap-1.5">
                  <motion.span
                    animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 6 : 0 }}
                    className="w-5 h-0.5 bg-cyber-cyan block"
                  />
                  <motion.span
                    animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
                    className="w-5 h-0.5 bg-foreground block"
                  />
                  <motion.span
                    animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -6 : 0 }}
                    className="w-5 h-0.5 bg-cyber-cyan block"
                  />
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Holographic Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-background/60 backdrop-blur-xl"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-background/90 border-l border-white/10 p-8 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] flex flex-col justify-center overflow-hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Background Effects */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-cyan/10 blur-[80px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyber-purple/10 blur-[80px] rounded-full pointer-events-none" />
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] pointer-events-none opacity-50" />

              <div className="relative z-10 flex flex-col items-end mb-12 gap-6">
                <ThemeToggle />
                <motion.button
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-cyber-cyan/50 transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="font-mono text-sm text-cyber-cyan">{locale === 'zh' ? '中文' : 'EN'}</span>
                  <span className="text-muted-foreground">/</span>
                  <span className="font-mono text-sm text-muted-foreground">{locale === 'zh' ? 'EN' : 'ZH'}</span>
                </motion.button>
              </div>

              <div className="relative z-10 flex flex-col gap-8">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="group flex items-center justify-end gap-4 text-4xl font-display font-bold text-muted-foreground hover:text-white transition-colors duration-300"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-sm font-mono text-cyber-cyan opacity-0 group-hover:opacity-100 transition-opacity">0{index + 1}</span>
                    <span>{t(item.labelKey)}</span>
                    <span className="w-2 h-2 bg-cyber-cyan rounded-full opacity-0 group-hover:opacity-100 shadow-[0_0_10px_#00F0FF] transition-opacity" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}