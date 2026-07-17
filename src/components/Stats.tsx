import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Database, TrendingUp, Cpu, Award, Zap, Sparkles } from 'lucide-react';
import { playHoverSound } from '../lib/audio';

// Local reusable Counter
function ScrollCounter({ value, suffix = '', duration = 1200 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMiliseconds = duration;
    const incrementTime = 30;
    const steps = totalMiliseconds / incrementTime;
    const stepIncrement = (end - start) / steps;

    const timer = setInterval(() => {
      start += stepIncrement;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="font-display font-black text-4xl sm:text-5xl text-white">
      {count}
      {suffix}
    </span>
  );
}

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  icon: any;
  sub: string;
}

const STATS: StatItem[] = [
  { value: 5, suffix: '+', label: 'BENTO PROJECTS', icon: Database, sub: 'Vetted ML & BI sandboxes' },
  { value: 3, suffix: '', label: 'INTERNSHIPS', icon: Award, sub: 'Real industry deployments' },
  { value: 15, suffix: '+', label: 'SQL COMPLEX QUERIES', icon: Cpu, sub: 'Normalized & indexed keys' },
  { value: 87, suffix: '%', label: 'ML ACCURACY', icon: TrendingUp, sub: 'Tuned Random Forest pipelines' },
  { value: 100, suffix: '%', label: 'LEARNING MINDSET', icon: Zap, sub: 'Continuously active telemetry' }
];

export default function Stats() {
  return (
    <section className="py-24 relative bg-[#050505] overflow-hidden select-none">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
            <span className="text-[10px] font-mono tracking-wider text-brand-cyan uppercase">
              METRIC ANALYTICS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            Key Operational Telemetry
          </h2>
          <div className="w-12 h-[2px] bg-brand-purple mt-4 rounded-full" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onMouseEnter={playHoverSound}
                className="col-span-1 p-6 rounded-3xl bg-[#111111]/60 border border-white/5 hover:border-brand-cyan/30 transition-all duration-300 flex flex-col justify-between h-[180px] text-center"
              >
                <div className="flex justify-center mb-2">
                  <div className="p-2 rounded-xl bg-white/5 text-brand-cyan">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <ScrollCounter value={stat.value} suffix={stat.suffix} />

                <div className="space-y-1">
                  <span className="text-[9px] font-mono tracking-wider text-brand-muted uppercase block font-bold">
                    {stat.label}
                  </span>
                  <span className="text-[8px] font-mono text-brand-purple tracking-normal block leading-tight">
                    {stat.sub}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
