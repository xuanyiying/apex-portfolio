'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, GradientTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useLanguage } from '@/lib/LanguageContext';
import { Github, Mail } from 'lucide-react';
import { heroContentEn, heroContentZh } from '@/data';
import { useTheme } from 'next-themes';

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  if (!mounted) return null;

  const currentTheme = resolvedTheme || theme;
  const colors = currentTheme === 'light'
    ? ['#2DD4BF', '#A855F7'] // Lighter Cyan/Teal to Lighter Purple (Light)
    : ['#00F0FF', '#7000FF']; // Cyber Cyan to Cyber Purple (Dark)

  return (
    <Float
      speed={2}
      rotationIntensity={1.5}
      floatIntensity={2}
    >
      <Sphere args={[1, 128, 128]} ref={meshRef} scale={1.4}>
        <MeshDistortMaterial
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.1}
        >
          <GradientTexture
            stops={[0, 1]}
            colors={colors}
            size={1024}
          />
        </MeshDistortMaterial>
      </Sphere>
      {/* Inner glow light */}
      <pointLight intensity={currentTheme === 'light' ? 10 : 20} color={colors[0]} />
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
  const lightIntensity = currentTheme === 'light' ? 1 : 1.5;
  const ambientIntensity = currentTheme === 'light' ? 0.6 : 0.4;

  return (
    <div className="w-full h-full min-h-[300px] lg:min-h-[400px]">
      <Canvas
        key={currentTheme}
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={ambientIntensity} />
        {/* Main directional lighting for highlights */}
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={lightIntensity} />
        <pointLight position={[-10, -10, -10]} intensity={lightIntensity * 0.5} color="#7000FF" />
        {/* Rim light effect */}
        <pointLight position={[0, 0, 5]} intensity={lightIntensity * 0.8} color="#00F0FF" />

        <AnimatedSphere />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}

export default function Hero() {
  const { t, locale } = useLanguage();
  const heroContent = locale === 'zh' ? heroContentZh : heroContentEn;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const roles = ['Full Stack Developer', 'UI Designer', 'Tech Enthusiast'];
  const [currentRole, setCurrentRole] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const role = roles[currentRole];
    let index = 0;
    setDisplayedText('');
    setIsTyping(true);

    const typeInterval = setInterval(() => {
      if (index <= role.length) {
        setDisplayedText(role.substring(0, index));
        index++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        setTimeout(() => {
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [currentRole]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-grid-bg">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-30 lg:opacity-40">
        <HeroScene />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-cyber-cyan/20 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-cyber-purple/20 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Grid lines */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-cyber-cyan/10 border border-cyber-cyan/20 rounded-full mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="w-2 h-2 bg-cyber-cyan rounded-full animate-pulse" />
              <span className="text-cyber-cyan text-sm font-mono">Available for hire</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-4">
              <span className="text-muted-foreground">{t('Hero.greeting')}</span>
              <br />
              <span className="bg-gradient-to-r from-foreground via-cyber-cyan to-cyber-purple bg-clip-text text-transparent">
                {heroContent.name}
              </span>
            </h1>

            <motion.div
              className="text-2xl sm:text-3xl font-mono text-cyber-cyan mb-6 h-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {displayedText}
              <motion.span
                className="inline-block w-1 h-6 bg-cyber-cyan ml-1"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </motion.div>

            <motion.p
              className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {heroContent.description}
            </motion.p>

            {/* Social links */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {[
                { icon: Github, href: heroContent.socialLinks.github },
                { icon: Mail, href: `mailto:${heroContent.email}` },
              ].map((social) => (
                <motion.a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-muted/20 border border-border rounded-xl text-muted-foreground hover:text-cyber-cyan hover:border-cyber-cyan/30 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right content - 3D visual */}
          <motion.div
            className="hidden lg:block relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative w-full aspect-square">
              {/* Main 3D HeroScene in foreground */}
              <div className="absolute inset-0 z-10">
                <HeroScene />
              </div>

              {/* Decorative elements */}
              <motion.div
                className="absolute inset-0 border border-cyber-cyan/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-10 border border-cyber-purple/20 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              />

              {/* Center glow */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-cyber-cyan/30 to-cyber-purple/30 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="text-sm text-muted-foreground">{t('Hero.scrollHint')}</span>
          <motion.div
            className="w-6 h-10 border-2 border-border/50 rounded-full flex justify-center pt-2"
          >
            <motion.div
              className="w-1.5 h-3 bg-cyber-cyan rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}