import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Sparkles, Terminal, Cpu, Award } from 'lucide-react';
import { playHoverSound } from '../lib/audio';

// Dynamic Counter Component
function AnimatedCounter({ value, duration = 1500, suffix = '' }: { value: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Handle floating values or standard decimals nicely
      if (value % 1 === 0) {
        setCount(Math.floor(progress * value));
      } else {
        setCount(parseFloat((progress * value).toFixed(1)));
      }

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="font-display font-bold text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple">
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={containerRef} className="py-24 relative overflow-hidden bg-[#050505]/50 select-none">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
            <span className="text-[10px] font-mono tracking-wider text-brand-purple uppercase">
              ABOUT THE ANALYST
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight"
          >
            Decoding Complexity, Driving Strategy
          </motion.h2>
          <div className="w-12 h-[2px] bg-brand-cyan mt-4 rounded-full" />
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Complex Animated Visual Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-sm aspect-square bg-[#111111]/80 rounded-3xl p-8 border border-white/5 shadow-2xl overflow-hidden group"
            >
              {/* Internal abstract grid lines */}
              <div className="absolute inset-0 animated-grid opacity-10" />

              {/* Central Glowing Globe or Data Center Ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full border border-brand-cyan/20 animate-spin" style={{ animationDuration: '20s' }} />
                <div className="absolute w-36 h-36 rounded-full border border-dashed border-brand-purple/30 animate-spin" style={{ animationDuration: '10s', animationDirection: 'reverse' }} />
                <div className="absolute w-12 h-12 rounded-full bg-gradient-to-tr from-brand-cyan to-brand-purple opacity-20 blur-xl animate-pulse" />
              </div>

              {/* Floating Tech Node Icons */}
              {/* Python Node */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                onMouseEnter={playHoverSound}
                className="absolute top-12 left-12 p-3 bg-brand-card rounded-2xl border border-white/5 shadow-lg flex flex-col items-center gap-1 group-hover:border-brand-cyan/30"
              >
                <Terminal className="w-5 h-5 text-brand-cyan" />
                <span className="text-[8px] font-mono text-brand-muted">PYTHON</span>
              </motion.div>

              {/* SQL Node */}
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.5 }}
                onMouseEnter={playHoverSound}
                className="absolute top-1/2 right-6 p-3 bg-brand-card rounded-2xl border border-white/5 shadow-lg flex flex-col items-center gap-1 group-hover:border-brand-purple/30"
              >
                <Cpu className="w-5 h-5 text-brand-purple" />
                <span className="text-[8px] font-mono text-brand-muted">SQL</span>
              </motion.div>

              {/* Power BI Node */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
                onMouseEnter={playHoverSound}
                className="absolute bottom-12 left-16 p-3 bg-brand-card rounded-2xl border border-white/5 shadow-lg flex flex-col items-center gap-1 group-hover:border-brand-success/30"
              >
                <Award className="w-5 h-5 text-brand-success" />
                <span className="text-[8px] font-mono text-brand-muted">BI TOOLS</span>
              </motion.div>

              {/* Background Glow */}
              <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-brand-cyan/20 blur-xl animate-pulse" />
            </motion.div>
          </div>

          {/* Right: Narrative Summary & Metrics */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white leading-tight">
                Aspiring Business Intelligence Expert based in Salem, Tamil Nadu.
              </h3>
              
              <p className="text-sm text-brand-muted font-sans leading-relaxed">
                I am <strong className="text-white">Limithra Shanmugam</strong>, a dedicated Data Analyst and Business Intelligence student currently pursuing a graduation date in 2027. My passion lies in taking massive, chaotic structures of database pipelines and crafting clean, beautiful insights.
              </p>

              <p className="text-sm text-brand-muted font-sans leading-relaxed">
                Having interned with companies like <strong className="text-brand-cyan">Axlero Innovative Solutions</strong> and <strong className="text-brand-purple">EdiGlobe</strong>, I specialize in SQL data warehousing, Normalization, pipeline analytics, and machine learning models. I merge core predictive capabilities with beautiful visualizations to deliver high-impact insights.
              </p>
            </motion.div>

            {/* Metrics Counters Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
              
              {/* Projects Count */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                onMouseEnter={playHoverSound}
                className="p-4 rounded-2xl bg-[#111111] border border-white/5 hover:border-brand-cyan/20 transition-all duration-300"
              >
                <div className="flex flex-col items-start gap-1">
                  <AnimatedCounter value={5} suffix="+" />
                  <span className="text-[10px] font-mono tracking-wider text-brand-muted uppercase">
                    PROVEN PROJECTS
                  </span>
                </div>
              </motion.div>

              {/* Internships Count */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                onMouseEnter={playHoverSound}
                className="p-4 rounded-2xl bg-[#111111] border border-white/5 hover:border-brand-purple/20 transition-all duration-300"
              >
                <div className="flex flex-col items-start gap-1">
                  <AnimatedCounter value={3} />
                  <span className="text-[10px] font-mono tracking-wider text-brand-muted uppercase">
                    INTERNSHIPS
                  </span>
                </div>
              </motion.div>

              {/* GPA Score */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                onMouseEnter={playHoverSound}
                className="p-4 rounded-2xl bg-[#111111] border border-white/5 hover:border-brand-cyan/20 transition-all duration-300"
              >
                <div className="flex flex-col items-start gap-1">
                  <AnimatedCounter value={8.4} />
                  <span className="text-[10px] font-mono tracking-wider text-brand-muted uppercase">
                    GPA SCORE
                  </span>
                </div>
              </motion.div>

              {/* Graduate Year */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                onMouseEnter={playHoverSound}
                className="p-4 rounded-2xl bg-[#111111] border border-white/5 hover:border-brand-purple/20 transition-all duration-300"
              >
                <div className="flex flex-col items-start gap-1">
                  <AnimatedCounter value={2027} />
                  <span className="text-[10px] font-mono tracking-wider text-brand-muted uppercase">
                    GRADUATE YEAR
                  </span>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
