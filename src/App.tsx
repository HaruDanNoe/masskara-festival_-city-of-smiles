/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from 'motion/react';
import { 
  Smile, 
  Palette, 
  Sparkles, 
  Layout, 
  Navigation, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Info,
  AlertCircle,
  Lightbulb,
  Image as ImageIcon,
  Menu,
  X
} from 'lucide-react';
import { useRef, useState, useEffect, ReactNode } from 'react';

const COLORS = {
  magenta: '#FF00FF',
  cyan: '#00FFFF',
  yellow: '#FFFF00',
  black: '#050505'
};

const SectionHeading = ({ children, subtitle, colorClass }: { children: ReactNode, subtitle?: string, colorClass: string }) => (
  <div className="mb-12">
    <motion.h2 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`text-3xl md:text-5xl font-display font-bold uppercase tracking-tighter ${colorClass} mb-2`}
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-white/60 font-mono text-sm uppercase tracking-widest"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const Card = ({ title, description, icon: Icon, colorClass, delay = 0 }: { title: string, description: string, icon: any, colorClass: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="glass-card p-8 rounded-2xl group hover:bg-white/10 transition-all duration-500"
  >
    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 border transition-colors duration-500 ${colorClass.replace('neon-glow', 'border').replace('text-', 'border-')}`}>
      <Icon className="w-6 h-6" />
    </div>
    <h3 className={`text-xl font-display font-bold mb-3 ${colorClass}`}>{title}</h3>
    <p className="text-white/70 leading-relaxed">{description}</p>
  </motion.div>
);

export default function App() {
  const containerRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Intro', href: '#intro' },
    { name: 'Challenge', href: '#problem' },
    { name: 'Stack', href: '#tech' },
    { name: 'Solution', href: '#solution' },
    { name: 'Gallery', href: '#gallery' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[var(--color-festive-black)] overflow-x-hidden selection:bg-festive-magenta selection:text-black">

      {/* NAVBAR */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 px-6 py-4 ${isScrolled ? 'bg-black/60 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* LOGO */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden rotate-12 group-hover:rotate-0 transition-transform">
              <img
                src="/img/masskara_menu.png"
                alt="Menu Logo"
                className="w-full h-full object-cover"
              />
            </div>

            <span className="font-display font-bold uppercase tracking-tighter text-lg hidden sm:block">
              Mass<span className="text-festive-cyan">Kara</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.button
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => scrollToSection(link.href)}
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-festive-magenta transition-colors"
              >
                {link.name}
              </motion.button>
            ))}
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <header className="relative h-screen flex flex-col items-center justify-center text-center px-4">

        <motion.h1 className="text-5xl md:text-8xl font-bold text-white mb-8">
          Bacolod: <span className="text-festive-cyan">The City</span><br />
          <span className="text-festive-magenta">of Smiles</span>
        </motion.h1>

        {/* REPLACED HERO IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-32 h-32 md:w-48 md:h-48 mb-10"
        >
          <div className="absolute inset-0 bg-festive-magenta/20 blur-2xl rounded-full" />

          <img
            src="/img/masskara_photo.png"
            alt="MassKara"
            className="relative w-full h-full object-cover rounded-full border border-white/20"
          />
        </motion.div>

        <button
          onClick={() => scrollToSection('#intro')}
          className="px-8 py-4 text-white border border-white/20 hover:bg-white hover:text-black transition"
        >
          Let the festival begin →
        </button>
      </header>

      {/* MAIN CONTENT (UNCHANGED BELOW SECTIONS STRUCTURE) */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-24 space-y-48">

        <section id="intro">
          <SectionHeading subtitle="01 / Academic Journey" colorClass="text-festive-cyan">
            Introduction
          </SectionHeading>
        </section>

        <section id="problem">
          <SectionHeading subtitle="02 / The Design Context" colorClass="text-festive-magenta">
            The Challenge
          </SectionHeading>
        </section>

        <section id="tech">
          <SectionHeading subtitle="03 / Built With" colorClass="text-festive-yellow">
            Tech Stack
          </SectionHeading>
        </section>

        <section id="solution">
          <SectionHeading subtitle="04 / Creative Outcome" colorClass="text-festive-yellow">
            The Solution
          </SectionHeading>
        </section>

        <section id="gallery">
          <SectionHeading subtitle="05 / Visual Showcase" colorClass="text-festive-cyan">
            Project Gallery
          </SectionHeading>
        </section>

      </main>

    </div>
  );
}