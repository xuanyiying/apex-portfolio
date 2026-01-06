import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/lib/LanguageContext';
import { heroContent } from '@/data';

import ThreeBackground from '@/components/ThreeBackground';
import GsapAnimations from '@/components/GsapAnimations';

export const metadata: Metadata = {
  title: `${heroContent.name} | ${heroContent.title}`,
  description: heroContent.description,
};

export default function Home() {
  return (
    <LanguageProvider initialLocale="en">
      <ThreeBackground />
      <GsapAnimations />
      <Navigation />
      <main className="min-h-screen">
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
