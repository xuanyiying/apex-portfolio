'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, GradientTexture, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useLanguage } from '@/lib/LanguageContext';
import { Github, Mail } from 'lucide-react';
import { heroContentEn, heroContentZh } from '@/data';
import { useTheme } from 'next-themes';
import GlitchText from './GlitchText';

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  if (!mounted) return null;

  const currentTheme = resolvedTheme || theme;

  // Vibrant Cyberpunk Colors
  const colors = currentTheme === 'light'
    ? ['#00B4D8', '#7209B7', '#F72585'] // Cyan -> Purple -> Pink (Light)
    : ['#00F0FF', '#7000FF', '#FF0080']; // Cyber Cyan -> Cyber Purple -> Neon Pink (Dark)

  return (
    <Float
      speed={4}
      rotationIntensity={1}
      floatIntensity={2}
    >
      <Sphere args={[1, 256, 256]} ref={meshRef} scale={1.8}>
        <MeshDistortMaterial
          distort={0.4}
          speed={3}
          roughness={0.2}
          metalness={0.8}
          bumpScale={0.05}
        >
          <GradientTexture
            stops={[0, 0.5, 1]}
            colors={colors}
            size={1024}
          />
        </MeshDistortMaterial>
      </Sphere>

      {/* Surrounding Particles/Stars for depth */}
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={2} />

      {/* Inner glow light */}
      <pointLight intensity={5} distance={10} color={colors[0]} />
    </Float>
  );
}

function HeroScene() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = resolvedTheme || theme;
  const lightIntensity = currentTheme === 'light' ? 1.2 : 2;

  return (
    <div className="w-full h-full min-h-[400px] lg:min-h-[500px]">
    </div>
  );
}

export default function Hero() {
  const { t, locale } = useLanguage();
  const heroContent = locale === 'zh' ? heroContentZh : heroContentEn;
  const [displayedText, setDisplayedText] = useState('');

  const roles = ['Full Stack Developer', 'UI/UX Designer', 'Creative Technologist'];
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const role = roles[currentRole];
    let index = 0;
    setDisplayedText('');

    const typeInterval = setInterval(() => {
      if (index <= role.length) {
        setDisplayedText(role.substring(0, index));
        index++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }, 2000);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, [currentRole]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-grid-bg">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyber-purple/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyber-cyan/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm shadow-[0_0_15px_rgba(0,240,255,0.2)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="w-2 h-2 bg-cyber-cyan rounded-full animate-pulse shadow-[0_0_10px_#00F0FF]" />
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-6 tracking-tighter leading-[1.1]">
              <span className="text-inherit opacity-80">{t('Hero.greeting')}</span>
              <br />
              <GlitchText
                text={heroContent.name}
                className="animate-gradient-text bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink bg-clip-text text-transparent"
              />
            </h1>

            <motion.div
              className="text-2xl sm:text-3xl font-mono text-cyber-cyan mb-8 h-8 flex items-center justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span>{displayedText}</span>
              <motion.span
                className="inline-block w-3 h-8 bg-cyber-pink ml-2"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            </motion.div>

            <motion.p
              className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {heroContent.description}
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <a href="#projects" className="btn-primary">
                View Work
              </a>
              <div className="flex gap-3">
                {[
                  { icon: Github, href: heroContent.socialLinks.github },
                  { icon: Mail, href: `mailto:${heroContent.email}` },
                ].map((social) => (
                  <motion.a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white hover:bg-cyber-cyan hover:text-black hover:border-cyber-cyan transition-all duration-300 backdrop-blur-sm"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right content - 3D visual */}
          <motion.div
            className="hidden lg:block relative h-[600px] w-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <HeroScene />
          </motion.div>
        </div>
      </div>
    </section>
  );
}