import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/lib/LanguageContext';

export const metadata: Metadata = {
  title: 'Alex Chen | Full Stack Developer',
  description: 'Passionate full-stack developer creating stunning digital experiences. Building the digital future with modern technologies.',
};

export default function Home() {
  return (
    <LanguageProvider initialLocale="en">
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
