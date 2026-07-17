import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const duration = 2400; // 2.4 seconds loading
    const intervalTime = 30;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setIsDone(true);
          setTimeout(onComplete, 800); // Allow fade animation to finish
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader"
          className="fixed inset-0 bg-[#050505] z-50 flex flex-col items-center justify-center p-6"
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
          }}
        >
          {/* Subtle moving particles in loader background */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute inset-0 animated-grid" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-cyan/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-purple/10 rounded-full blur-[120px] animate-pulse delay-1000" />
          </div>

          <div className="relative flex flex-col items-center max-w-lg w-full">
            {/* Morphing / revealing brand name */}
            <div className="h-28 flex items-center justify-center relative select-none">
              <AnimatePresence mode="wait">
                {progress < 40 ? (
                  <motion.div
                    key="logo-l"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-7xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple tracking-widest"
                  >
                    L
                  </motion.div>
                ) : (
                  <motion.div
                    key="full-name"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="text-center"
                  >
                    <h1 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight bg-gradient-to-r from-brand-cyan via-white to-brand-purple bg-clip-text text-transparent">
                      Limithra Shanmugam
                    </h1>
                    <p className="text-xs font-mono text-brand-cyan uppercase tracking-[0.3em] mt-2">
                      Data Intelligence Portfolio
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Futuristic Tech Details */}
            <motion.div 
              className="mt-12 w-full max-w-xs flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* Progress counter */}
              <div className="flex justify-between w-full text-[10px] font-mono text-brand-muted mb-2 select-none uppercase tracking-wider">
                <span>SYSTEM DIAGNOSTIC</span>
                <span className="text-brand-cyan font-bold">{Math.round(progress)}%</span>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full h-[3px] bg-[#111111] rounded-full overflow-hidden border border-white/5 relative">
                {/* Glowing glow effect behind the bar */}
                <motion.div
                  className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-brand-cyan to-brand-purple"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <span className="text-[9px] font-mono text-brand-purple uppercase tracking-[0.2em] mt-3 animate-pulse">
                INITIALIZING MULTI-MODAL PIPELINE
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
