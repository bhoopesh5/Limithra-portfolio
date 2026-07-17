import { motion } from 'motion/react';
import { ArrowUp, Github, Linkedin, Mail, Heart, Terminal } from 'lucide-react';
import { playClickSound, playHoverSound } from '../lib/audio';

export default function Footer() {
  const handleScrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050505] border-t border-white/5 py-12 overflow-hidden select-none">
      
      {/* Background vector glow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[80vw] h-[300px] bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center space-y-8">
        
        {/* Back To Top Action */}
        <button
          onClick={handleScrollToTop}
          onMouseEnter={playHoverSound}
          className="p-3.5 rounded-full bg-[#111] border border-white/5 hover:border-brand-cyan/30 text-brand-muted hover:text-white hover:scale-110 transition-all cursor-none"
          title="Scroll back to top"
        >
          <ArrowUp className="w-5 h-5 animate-bounce" />
        </button>

        {/* Brand Signoff */}
        <div className="space-y-2">
          <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight bg-gradient-to-r from-brand-cyan via-white to-brand-purple bg-clip-text text-transparent">
            Thank You
          </h3>
          <p className="text-xs font-mono text-brand-muted uppercase tracking-[0.25em]">
            Data Decoded • Decisions Empowered
          </p>
        </div>

        {/* Creator Line */}
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-brand-muted">
          <span>Made with</span>
          <Heart className="w-3.5 h-3.5 text-brand-purple fill-brand-purple animate-pulse" />
          <span>using React + Framer Motion + Web Audio</span>
        </div>

        {/* Social Badges */}
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/Limithra2006"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
            className="text-brand-muted hover:text-brand-cyan transition-colors cursor-none"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/limithra-shanmugam"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
            className="text-brand-muted hover:text-brand-cyan transition-colors cursor-none"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="mailto:limithral820@gmail.com"
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
            className="text-brand-muted hover:text-brand-cyan transition-colors cursor-none"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Bottom Rights Bar */}
        <div className="pt-6 border-t border-white/5 w-full max-w-md flex justify-center text-[9px] font-mono text-brand-muted/40 uppercase tracking-wider">
          <span>© 2026 LIMITHRA SHANMUGAM. ALL SIGNALS STABILIZED.</span>
        </div>

      </div>
    </footer>
  );
}
