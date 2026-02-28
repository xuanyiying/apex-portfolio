'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { Github, Mail } from 'lucide-react';
import { heroContentEn, heroContentZh } from '@/data';
import { useTheme } from 'next-themes';
import GlitchText from './GlitchText';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function HeroParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const positions = useRef(new Float32Array(2000 * 3));

  useEffect(() => {
    for (let i = 0; i < 2000 * 3; i += 3) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 6 + Math.random() * 6;

      positions.current[i] = r * Math.sin(phi) * Math.cos(theta);
      positions.current[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions.current[i + 2] = r * Math.cos(phi);
    }
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.15;
    pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.15;
    pointsRef.current.rotation.z = Math.cos(time * 0.08) * 0.1;

    if (ringRef.current) {
      ringRef.current.rotation.x = time * 0.3;
      ringRef.current.rotation.y = time * 0.2;
    }
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2000}
            array={positions.current}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#00F0FF"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <mesh ref={ringRef}>
        <torusGeometry args={[5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#B400FF" transparent opacity={0.6} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4, 0.015, 16, 100]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.5} />
      </mesh>
      <mesh>
        <torusGeometry args={[6, 0.01, 16, 100]} />
        <meshBasicMaterial color="#FF0080" transparent opacity={0.4} />
      </mesh>
    </>
  );
}

function HeroScene() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full min-h-[400px] lg:min-h-[500px] flex items-center justify-center">
        <div className="w-32 h-32 border-2 border-cyber-cyan/30 border-t-cyber-cyan rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[400px] lg:min-h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <HeroParticles />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00F0FF" />
      </Canvas>
    </div>
  );
}

export default function Hero() {
  const { t, locale } = useLanguage();
  const heroContent = locale === 'zh' ? heroContentZh : heroContentEn;
  const [displayedText, setDisplayedText] = useState('');

  const roles = ['Full Stack Developer', 'UI/UX Designer', 'Creative Technologist'];
  const [currentRole, setCurrentRole] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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

    intervalRef.current = typeInterval;

    return () => {
      clearInterval(typeInterval);
    };
  }, [currentRole]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-grid-bg">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyber-purple/20 blur-[120px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyber-cyan/20 blur-[120px] rounded-full pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-cyber-pink/10 blur-[80px] rounded-full pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Animated Grid Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,240,255,0.03)_50%)] bg-[length:100%_4px]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_50%,rgba(0,240,255,0.02)_50%)] bg-[length:4px_100%]" />
      </div>

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
                delay={200}
              />
            </h1>

            <motion.div
              className="text-2xl sm:text-3xl font-mono text-cyber-cyan mb-8 h-8 flex items-center justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="min-w-[200px] sm:min-w-[280px]">{displayedText}</span>
              <motion.span
                className="inline-block w-1 h-6 sm:h-8 bg-cyber-pink ml-1"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
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
              <div className="flex gap-4">
                {[
                  { icon: Github, href: heroContent.socialLinks.github, color: 'hover:bg-white hover:text-black' },
                  { icon: Mail, href: `mailto:${heroContent.email}`, color: 'hover:bg-cyber-pink hover:text-white hover:border-cyber-pink' },
                ].map((social) => (
                  <motion.a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-14 h-14 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all duration-300 backdrop-blur-sm ${social.color}`}
                    whileHover={{ scale: 1.1, rotate: 5, boxShadow: '0 0 30px rgba(0,240,255,0.4)' }}
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