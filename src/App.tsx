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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
  if (!audioRef.current) return;

  if (isPlaying) {
    audioRef.current.pause();
  } else {
    audioRef.current.play();
  }

  setIsPlaying(!isPlaying);
};

useEffect(() => {
  const handleUserInteraction = () => {
    if (audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.play();
      setIsPlaying(true);
    }
    window.removeEventListener('click', handleUserInteraction);
  };

  window.addEventListener('click', handleUserInteraction);
}, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Intro', href: '#intro' },
    { name: 'Challenge', href: '#problem' },
    { name: 'Stack', href: '#tech' },
    { name: 'Vision', href: '#vision' },
    { name: 'Gallery', href: '#gallery' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[var(--color-festive-black)] overflow-x-hidden selection:bg-festive-magenta selection:text-black">
      {/* Navbar */}

      <audio ref={audioRef} loop muted>
      <source src="/img/mask.mp3" type="audio/mpeg" />
    </audio>

      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 px-6 py-4 ${isScrolled ? 'bg-black/60 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >

            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center rotate-12 transition-transform group-hover:rotate-0">
          <img 
             src="/img/masskara_menu.png" 
            alt="Menu Logo"
            className="w-full h-full object-cover"
  />
  
</div>
            <span className="font-display font-bold uppercase tracking-tighter text-lg hidden sm:block">
              Mass<span className="text-festive-cyan">Kara</span>
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.button
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => scrollToSection(link.href)}
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-festive-magenta transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-festive-magenta transition-all group-hover:w-full" />
              </motion.button>
            ))}
            
            
            <motion.a
  href="https://portfolio-gamma-ten-4pevx4sjtn.vercel.app/"
  target="_blank"
  rel="noopener noreferrer"
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5 }}
  className="px-4 py-2 glass-card rounded-full font-mono text-[10px] uppercase tracking-widest text-festive-yellow hover:bg-festive-yellow hover:text-black transition-all flex items-center gap-2"
>
  Back to Portfolio
</motion.a>

 <motion.button
  onClick={toggleMusic}
  className="text-white/70 hover:text-festive-yellow text-xs font-mono uppercase"
>
  {isPlaying ? 'Music Off' : 'Music On'}
</motion.button>
          </div>

          <motion.div className="flex items-center gap-4">
            <motion.button 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={mobileMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          className="md:hidden overflow-hidden bg-black/95 backdrop-blur-3xl"
        >
          <div className="flex flex-col gap-6 p-8 border-t border-white/10">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="font-display font-bold text-2xl uppercase text-left hover:text-festive-magenta transition-colors"
              >
                {link.name}
              </button>
            ))}
            <a
              href="/"
              className="font-display font-bold text-2xl uppercase text-left text-festive-yellow hover:text-white transition-colors pt-4 border-t border-white/10"
            >
              Back to Portfolio
            </a>
          </div>
        </motion.div>
      </nav>
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-festive-magenta/20 blur-[120px] rounded-full"
        />
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-festive-cyan/15 blur-[100px] rounded-full"
        />
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute top-[40%] right-[10%] w-[25%] h-[25%] bg-festive-yellow/10 blur-[80px] rounded-full"
        />
      </div>

      {/* Hero Section */}
      <header className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-0 z-0 flex items-center justify-center"
        >
          <div className="w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-gradient-to-tr from-festive-magenta/10 via-transparent to-festive-cyan/10 rounded-full blur-3xl" />
        </motion.div>

        <div className="z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 text-white/80">
              <span className="text-festive-yellow">KASANAG</span> Presents
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl lg:text-9xl font-display font-extrabold uppercase tracking-tight leading-[0.9] mb-8"
          >
            <span className="block text-white">Bacolod:</span>
            <span className="block neon-glow-cyan text-festive-cyan">The City</span>
            <span className="block neon-glow-magenta text-festive-magenta">of Smiles</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-2xl font-display italic text-white/90 mb-12 max-w-2xl mx-auto"
          >
            "Glows under the spotlight of colorful festival."
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col items-center gap-8"
          >
            
            <button 
              onClick={() => scrollToSection('#intro')}
              className="group relative px-8 py-4 bg-transparent font-mono text-sm uppercase tracking-widest text-white hover:text-black transition-colors duration-500"
            >
               <span className="relative z-10">Let the festival begin &rarr;</span>
               <div className="absolute inset-x-0 h-px bottom-0 bg-white/20 group-hover:h-full group-hover:bg-white transition-all duration-500" />
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
        >
          <div className="w-px h-16 bg-gradient-to-b from-white to-transparent mx-auto" />
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-24 space-y-48">
        
        {/* Introduction */}
        <section id="intro" className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading subtitle="01 / Academic Journey" colorClass="text-festive-cyan neon-glow-cyan">Introduction</SectionHeading>
            <p className="text-xl text-white/80 leading-relaxed mb-6">
              Developed during my second year as part of my academic work, this project is a digital tribute to my roots.
            </p>
            <div className="space-y-4 border-l-2 border-festive-cyan/30 pl-6">
              <p className="text-white/60 leading-relaxed">
                It focuses on creating a digital experience that captures the vibrant and joyful atmosphere of the MassKara Festival in Bacolod.
              </p>
              <p className="text-white/60 leading-relaxed italic">
                A journey of translating culture into code.
              </p>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-festive-cyan/10 rounded-3xl blur-2xl group-hover:bg-festive-cyan/20 transition-colors duration-700" />
            <div className="relative glass-card aspect-video rounded-3xl overflow-hidden p-1">
                <video
           className="w-full h-full object-cover rounded-2xl opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700"
               autoPlay
                 muted
             loop
            playsInline
    >
      <source src="/img/mainvid.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
               <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
               </div>
            </div>
          </div>
        </section>

        {/* The Problem */}
        <section id="problem" className="relative">
          <SectionHeading subtitle="02 / The Design Context" colorClass="text-festive-magenta neon-glow-magenta">The Challenge</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card 
              title="Sensory Translation" 
              description="Festivals are highly visual and experiential. Translating that raw energy into a 2D screen was the primary hurdle."
              icon={Sparkles}
              colorClass="text-festive-magenta neon-glow-magenta"
            />
            <Card 
              title="Cultural Identity" 
              description="Ensuring the interface authentically reflected Bacolod's spirit without becoming a caricature."
              icon={ImageIcon}
              colorClass="text-festive-magenta neon-glow-magenta"
              delay={0.1}
            />
            <Card 
              title="Balanced UI" 
              description="Managing high-intensity colors while keeping the interface clean, interactive, and easy to navigate."
              icon={Layout}
              colorClass="text-festive-magenta neon-glow-magenta"
              delay={0.2}
            />
          </div>
        </section>

        {/* Tech Stack */}
        <section id="tech" className="text-center">
          <SectionHeading subtitle="03 / Built With" colorClass="text-festive-yellow neon-glow-yellow">Tech Stack</SectionHeading>
          <div className="flex flex-wrap justify-center gap-4">
            {['HTML5', 'CSS3', 'JavaScript'].map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="px-6 py-3 glass-card rounded-full font-mono text-sm text-festive-yellow flex items-center gap-2 border-festive-yellow/20"
              >
                <div className="w-1.5 h-1.5 bg-festive-yellow rounded-full animate-pulse" />
                {tech}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Vision */}
        <section id="vision" className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div className="order-2 lg:order-1 relative group">
            <div className="absolute inset-0 bg-festive-yellow/10 rounded-3xl blur-2xl group-hover:bg-festive-yellow/20 transition-colors duration-700" />
            <div className="relative glass-card rounded-3xl overflow-hidden p-8 space-y-6">
               <div className="h-40 w-full bg-gradient-to-br from-festive-magenta/20 to-festive-cyan/20 rounded-xl flex items-center justify-center">
                   <video
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition duration-700"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/img/mas2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

               </div>
               <div className="space-y-3">
                  <div className="h-4 w-3/4 bg-white/10 rounded" />
                  <div className="h-4 w-1/2 bg-white/10 rounded" />
                  <div className="h-4 w-5/6 bg-white/10 rounded" />
               </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading subtitle="04 / Creative Outcome" colorClass="text-festive-yellow neon-glow-yellow">The Vision</SectionHeading>
            <div className="space-y-6 text-lg text-white/70">
              <p>
                We designed a festive-themed interface that uses bold colors, vibrant visuals, and engaging layouts inspired by the MassKara Festival.
              </p>
              <p>
                The goal was to reflect the festival’s lively spirit while keeping the interface clean, interactive, and easy to navigate.
              </p>
              <ul className="space-y-4">
                {[
                  'Bespoke color palette',
                  'Interactive elements mimicking festival energy',
                  'Clean navigation with cultural highlights'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/90">
                    <CheckCircle2 className="w-5 h-5 text-festive-yellow" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery">
          <SectionHeading subtitle="05 / Visual Showcase" colorClass="text-festive-cyan neon-glow-cyan">Project Gallery</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    <div className="space-y-6">
      <GalleryVideo
        title="History Page"
        subtitle="Festival-inspired visuals paired with bold, modern typography for a high-impact cultural narrative."
        video="/img/history.mp4"
      />

      <GalleryVideo
        title="Event Highlights"
        subtitle="Showcasing the schedule and festival energy"
        video="/img/event.mp4"
      />
    </div>

    <div className="space-y-6 md:mt-12">
      <GalleryVideo
        title="Tourist Attraction Page"
        subtitle="Balanced dual-column layout showcasing city landmarks through vibrant photography and clean editorial design"
        video="/img/tourist.mp4"
      />

      <GalleryVideo
        title="Local Delicacies Page"
        subtitle="Vibrant, dark-themed UI showcasing local delicacies with clean typography and glowing borders."
        video="/img/ld.mp4"
      />

    </div>

  </div>
        </section>

        {/* Summary Footer */}
        <section className="text-center py-24 border-t border-white/10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <ImageIcon className="w-16 h-16 text-festive-magenta mx-auto mb-8 neon-glow-magenta" />
            <h2 className="text-3xl md:text-5xl font-display font-bold uppercase mb-8">Summary</h2>
            <p className="text-xl text-white/70 leading-relaxed mb-12">
              This project demonstrates my ability to translate real-world experiences into digital design. By combining front-end technologies with UI/UX principles, We created an engaging platform that highlights the culture and energy of the MassKara Festival.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <p className="text-white/40 font-mono text-sm uppercase tracking-widest">Bacolod City &bull; 2nd Year Academic Project</p>
            </div>
          </motion.div>
        </section>

{/* Certification */}
<section id="certification" className="text-center">
  <SectionHeading
    subtitle="03.5 / Achievement Unlocked"
    colorClass="text-festive-yellow neon-glow-yellow"
  >
    Champion Certificate
  </SectionHeading>

  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="max-w-3xl mx-auto relative group"
  >
    {/* Glow background */}
    <div className="absolute inset-0 bg-festive-yellow/10 blur-2xl rounded-3xl group-hover:bg-festive-yellow/20 transition-all duration-700" />

    {/* Card */}
    <div className="relative glass-card rounded-3xl overflow-hidden">

      {/* Image */}
      <div className="aspect-video overflow-hidden">
        <img
          src="/img/certificate.jpg"
          alt="Champion Certificate"
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
        />
      </div>

      {/* Content */}
      <div className="p-8 text-center space-y-3">
        <h3 className="text-2xl font-display font-bold text-festive-yellow">
          Champion Award
        </h3>
        <p className="text-white/70">
          Recognized for outstanding performance and contribution as champions in the event.
        </p>
      </div>

    </div>
  </motion.div>
</section>

{/* Awarding Photo */}
<section id="awarding" className="text-center">
  <SectionHeading
    subtitle="03.6 / Awarding Moment"
    colorClass="text-festive-cyan neon-glow-cyan"
  >
    Champion Recognition
  </SectionHeading>

  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="max-w-4xl mx-auto relative group"
  >
    <div className="absolute inset-0 bg-festive-cyan/10 blur-2xl rounded-3xl group-hover:bg-festive-cyan/20 transition-all duration-700" />

    <div className="relative glass-card rounded-3xl overflow-hidden">

      <div className="aspect-video overflow-hidden">
        <img
          src="/img/awarding.jpg"
          alt="Awarding Ceremony"
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
        />
      </div>

      <div className="p-8 space-y-4">
        <h3 className="text-2xl font-display font-bold text-festive-cyan">
          Awarding Ceremony
        </h3>

        <p className="text-white/70">
          A memorable moment when our team was officially recognized as champions.
        </p>

        {/* Team Members */}
        <div className="pt-4 border-t border-white/10">
          <p className="text-white/50 text-sm uppercase tracking-widest mb-2">
            Team Members
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-white/80 font-mono text-sm">
            <span>• Angel Endoma</span>
            <span>• Christian Llena</span>
            <span>• Danea Zerudo</span>
          </div>
        </div>

      </div>

    </div>
  </motion.div>
</section>
      </main>

      <footer className="py-8 px-6 border-t border-white/5 text-center text-white/30 font-mono text-[10px] uppercase tracking-[0.2em] relative z-10">
        &copy; 2026 Crafted with Joy & Festival Spirit
      </footer>
    </div>
  );
}

function GalleryVideo({
  title,
  subtitle,
  video,
}: {
  title: string;
  subtitle: string;
  video: string;
}) {
  return (

    
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="group relative glass-card rounded-3xl overflow-hidden aspect-[4/5] md:aspect-auto"
    >
      {/* VIDEO */}
      <video
        className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={video} type="video/mp4" />
      </video>

      {/* OVERLAY */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <h4 className="text-2xl font-display font-bold text-festive-cyan mb-1">
          {title}
        </h4>
        <p className="text-white/70 text-sm font-display italic">
          {subtitle}
        </p>
      </div>

      {/* ICON */}
      <div className="absolute top-8 right-8 w-10 h-10 glass-card rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
        <ImageIcon className="w-4 h-4 text-white/80" />
      </div>
    </motion.div>
  );
}