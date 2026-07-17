import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, FileText, Github, Linkedin, Database } from 'lucide-react';
import { playClickSound, playHoverSound } from '../lib/audio';

interface HeroProps {
  onViewProjects: () => void;
  onContactClick: () => void;
}

const TYPED_TITLES = [
  'Aspiring Data Analyst',
  'Business Intelligence Enthusiast',
  'Python Developer',
  'Power BI Explorer',
  'Generative AI Learner'
];

export default function Hero({ onViewProjects, onContactClick }: HeroProps) {
  const [titleIdx, setTitleIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle typing effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullText = TYPED_TITLES[titleIdx];
    
    const tick = () => {
      if (!isDeleting) {
        setDisplayedText(currentFullText.substring(0, displayedText.length + 1));
        if (displayedText === currentFullText) {
          // Pause at the end of typing
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        setDisplayedText(currentFullText.substring(0, displayedText.length - 1));
        if (displayedText === '') {
          setIsDeleting(false);
          setTitleIdx((prev) => (prev + 1) % TYPED_TITLES.length);
          return;
        }
      }
      
      const speed = isDeleting ? 30 : 60;
      timer = setTimeout(tick, speed);
    };

    timer = setTimeout(tick, 100);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, titleIdx]);

  // Mouse parallax background movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) / 35,
        y: (e.clientY - window.innerHeight / 2) / 35,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleCTA = (fn: () => void) => {
    playClickSound();
    fn();
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-24 select-none">
      {/* Dynamic shifting meshes */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Shifting cyan blob */}
        <motion.div
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-cyan/5 blur-[120px]"
          style={{ x: mousePos.x * -1.2, y: mousePos.y * -1.2 }}
        />
        {/* Shifting purple blob */}
        <motion.div
          className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-purple/5 blur-[120px]"
          style={{ x: mousePos.x * 1.5, y: mousePos.y * 1.5 }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        {/* Futuristic Top Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel neon-border-cyan mb-8"
        >
          <Database className="w-3.5 h-3.5 text-brand-cyan animate-pulse" />
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-brand-cyan">
            BI & Data Intelligence Space
          </span>
        </motion.div>

        {/* Large Elegant Main Headings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <span className="text-xl md:text-2xl font-jakarta font-light text-brand-muted tracking-wide block">
            Hi, I'm
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-display font-extrabold tracking-tight text-white max-w-5xl leading-none">
            Limithra Shanmugam
          </h1>
        </motion.div>

        {/* Typing Headline Subtext */}
        <div className="h-16 flex items-center justify-center mt-6">
          <span className="text-xl sm:text-3xl font-jakarta font-medium text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-white to-brand-purple tracking-wide">
            {displayedText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
              className="inline-block ml-1 w-1 h-6 bg-brand-cyan align-middle"
            />
          </span>
        </div>

        {/* Elevator Pitch */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-sm sm:text-base text-brand-muted max-w-xl font-sans mt-4 leading-relaxed"
        >
          Specializing in translating complex datasets into actionable business intelligence, predictive pipeline modeling, and modern AI engineering.
        </motion.p>

        {/* Action Button Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-12 w-full justify-center max-w-md"
        >
          {/* Main View Projects CTA */}
          <button
            onClick={() => handleCTA(onViewProjects)}
            onMouseEnter={playHoverSound}
            className="w-full sm:w-auto relative group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-jakarta font-semibold rounded-full overflow-hidden transition-transform active:scale-95 duration-150 shadow-lg shadow-white/5 cursor-none"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan to-brand-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-200">
              View Projects
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </button>

          {/* Contact Me Secondary CTA */}
          <button
            onClick={() => handleCTA(onContactClick)}
            onMouseEnter={playHoverSound}
            className="w-full sm:w-auto relative group inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-card/60 text-white font-jakarta font-semibold rounded-full border border-white/10 overflow-hidden hover:border-brand-cyan/50 transition-all duration-300 cursor-none"
          >
            <span className="relative z-10 flex items-center gap-2 group-hover:text-brand-cyan transition-colors duration-200">
              Get In Touch
            </span>
          </button>
        </motion.div>

        {/* Social Badges / Connect Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex items-center gap-6 mt-16"
        >
          <a
            href="https://github.com/Limithra2006"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
            className="p-3 rounded-full bg-[#111111] border border-white/5 text-brand-muted hover:text-brand-cyan hover:border-brand-cyan/20 transition-all duration-300 hover:scale-110 cursor-none"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/limithra-shanmugam"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
            className="p-3 rounded-full bg-[#111111] border border-white/5 text-brand-muted hover:text-brand-cyan hover:border-brand-cyan/20 transition-all duration-300 hover:scale-110 cursor-none"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://drive.google.com/file/d/19Ze75XtbrQX4YTP88wN57o-9bljtU5Ep/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#111111] border border-white/5 text-brand-muted hover:text-brand-cyan hover:border-brand-cyan/20 transition-all duration-300 hover:scale-105 cursor-none font-mono text-xs"
          >
            <FileText className="w-4 h-4" />
            <span>CV / RESUME</span>
          </a>
        </motion.div>

        {/* Bottom Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5, y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="absolute bottom-6 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] font-mono tracking-[0.2em] text-brand-muted uppercase">
            SCROLL DOWN TO INGEST DATA
          </span>
          <div className="w-1.5 h-6 rounded-full border border-white/10 flex justify-center p-[2px]">
            <div className="w-1 h-1.5 bg-brand-cyan rounded-full animate-bounce" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
