import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Menu, X, Terminal } from 'lucide-react';
import { getMuteState, setMuteState, playClickSound, playHoverSound } from '../lib/audio';

interface NavItem {
  label: string;
  targetId: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'About', targetId: 'about' },
  { label: 'Skills', targetId: 'skills' },
  { label: 'Experience', targetId: 'experience' },
  { label: 'Projects', targetId: 'projects' },
  { label: 'Passion', targetId: 'passion' },
  { label: 'Contact', targetId: 'contact' }
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(getMuteState());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMute = () => {
    const nextMute = !isMuted;
    setMuteState(nextMute);
    setIsMuted(nextMute);
    // Play a test sound immediately upon unmuting to give instant feedback
    if (!nextMute) {
      setTimeout(() => {
        playClickSound();
      }, 50);
    }
  };

  const handleNavClick = (targetId: string) => {
    playClickSound();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'py-4 bg-[#050505]/80 backdrop-blur-md border-b border-white/5' 
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          
          {/* Logo */}
          <button
            onClick={() => handleNavClick('root')}
            onMouseEnter={playHoverSound}
            className="flex items-center gap-2 cursor-none font-display font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple tracking-wider"
          >
            L
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.targetId}
                onClick={() => handleNavClick(item.targetId)}
                onMouseEnter={playHoverSound}
                className="text-xs font-mono tracking-widest text-brand-muted hover:text-brand-cyan transition-colors cursor-none uppercase"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Control Utility Buttons */}
          <div className="flex items-center gap-4">
            
            {/* Audio Toggle */}
            <button
              onClick={toggleMute}
              onMouseEnter={playHoverSound}
              className="p-2.5 rounded-full bg-white/5 border border-white/5 hover:border-brand-cyan/20 text-brand-muted hover:text-white transition-all cursor-none"
              title={isMuted ? 'Unmute Synthesizer Sound' : 'Mute Synthesizer Sound'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-brand-cyan animate-pulse" />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => {
                playClickSound();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              onMouseEnter={playHoverSound}
              className="p-2.5 rounded-full bg-white/5 border border-white/5 hover:border-brand-cyan/20 text-brand-muted hover:text-white md:hidden cursor-none"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[72px] bg-[#050505] border-b border-white/5 z-30 p-6 flex flex-col gap-4 md:hidden shadow-2xl"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.targetId}
                onClick={() => handleNavClick(item.targetId)}
                className="w-full py-3 text-left text-sm font-mono tracking-widest text-brand-muted hover:text-brand-cyan transition-colors border-b border-white/5"
              >
                {item.label.toUpperCase()}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
