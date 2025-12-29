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
            ? 'py-4 bg-background/80 backdrop-blur-xl border-b border-border' 
            : 'py-6 bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection('home')}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-cyber-cyan to-cyber-purple rounded-xl flex items-center justify-center">
                <span className="font-display font-bold text-black text-lg">
                  {heroContent.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <span className="font-display font-bold text-xl hidden sm:block">
                <span className="text-foreground">{heroContent.name.split(' ')[0]}</span>
                <span className="text-cyber-cyan ml-1">{heroContent.name.split(' ').slice(1).join(' ')}</span>
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-muted-foreground hover:text-cyber-cyan transition-colors duration-300 font-medium"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t(item.labelKey)}
                </motion.button>
              ))}
            </div>

            {/* Language Toggle & Theme Toggle & CTA */}
            <div className="flex items-center gap-4">
              <ThemeToggle />

              <motion.button
                onClick={toggleLanguage}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-muted/20 border border-border rounded-lg hover:border-cyber-cyan/30 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="font-mono text-sm text-cyber-cyan">{locale === 'zh' ? '中文' : 'EN'}</span>
                <span className="text-muted-foreground">/</span>
                <span className="font-mono text-sm text-muted-foreground">{locale === 'zh' ? 'EN' : 'ZH'}</span>
              </motion.button>

              <motion.button
                onClick={() => scrollToSection('contact')}
                className="hidden sm:block btn-primary text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('Nav.contact')}
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center bg-muted/20 border border-border rounded-lg"
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div 
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-background border-l border-border p-8"
            >
              <div className="flex flex-col items-end mb-8 gap-4">
                <ThemeToggle />
                <motion.button
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 px-4 py-2 bg-muted/20 border border-border rounded-lg"
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="font-mono text-sm text-cyber-cyan">{locale === 'zh' ? '中文' : 'EN'}</span>
                  <span className="text-muted-foreground">/</span>
                  <span className="font-mono text-sm text-muted-foreground">{locale === 'zh' ? 'EN' : 'ZH'}</span>
                </motion.button>
              </div>

              <div className="flex flex-col gap-6">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-3xl font-display font-bold text-left text-muted-foreground hover:text-cyber-cyan transition-colors duration-300"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t(item.labelKey)}
                  </motion.button>
                ))}
              </div>

              <motion.button
                onClick={() => scrollToSection('contact')}
                className="mt-12 w-full btn-primary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {t('Nav.contact')}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}