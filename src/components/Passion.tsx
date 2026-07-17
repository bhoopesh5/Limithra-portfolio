import { motion } from 'motion/react';
import { Trophy, Award, Activity, Target } from 'lucide-react';
import { playHoverSound } from '../lib/audio';

export default function Passion() {
  const achievements = [
    {
      id: '01',
      title: 'National-Level Competitive Player',
      metric: 'Elite Rank',
      description: 'Actively participating and training at the highest competitive tier of Carrom sports, executing complex tactical board control.'
    },
    {
      id: '02',
      title: '3x Consecutive Gold Medalist',
      metric: 'School Games',
      description: 'Ranked #1 for three consecutive years at the state-level school sports tournament, demonstrating precision under pressure.'
    },
    {
      id: '03',
      title: '3x Consecutive 1st Place Winner',
      metric: 'CM Trophy',
      description: 'Secured consecutive first-place finishes at the prestigious Chief Minister\'s Trophy sports tournament.'
    },
    {
      id: '04',
      title: 'Active National Competitor',
      metric: 'Current Track',
      description: 'Currently actively competing in national-level championships, refining angles and advanced mental precision.'
    }
  ];

  return (
    <section id="passion" className="py-24 relative bg-[#050505] overflow-hidden select-none">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 mb-4"
          >
            <Trophy className="w-3.5 h-3.5 text-brand-cyan animate-pulse" />
            <span className="text-[10px] font-mono tracking-wider text-brand-cyan uppercase">
              BEYOND THE DATA
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight"
          >
            Strike & Score
          </motion.h2>
          
          <div className="w-12 h-[2px] bg-brand-purple mt-4 rounded-full" />
        </div>

        {/* Simple & Consistent Ledger Card */}
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#111111]/80 rounded-3xl p-8 sm:p-10 border border-white/5 relative overflow-hidden"
          >
            {/* Field Notebook Paper Elements */}
            <div className="absolute inset-0 animated-grid opacity-5 pointer-events-none" />
            <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-red-500/15 pointer-events-none" />

            <div className="pl-6 space-y-8">
              {/* Notebook Header Annotation */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <span className="text-[10px] font-mono text-brand-cyan tracking-widest uppercase font-bold">
                  ATHLETIC PORTFOLIO // FIELD RECORDS
                </span>
                <span className="text-[9px] font-mono text-brand-muted uppercase">
                  CARROM SPORTS CERTIFIED
                </span>
              </div>

              {/* Simple Clean Achievements List */}
              <div className="space-y-6">
                {achievements.map((ach) => (
                  <div
                    key={ach.id}
                    onMouseEnter={playHoverSound}
                    className="group border border-white/5 hover:border-brand-purple/20 bg-black/30 hover:bg-white/[0.02] p-4 sm:p-5 rounded-2xl transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex gap-4 items-start">
                      {/* Entry Index */}
                      <span className="text-[10px] font-mono text-brand-purple bg-brand-purple/10 px-2 py-0.5 rounded h-fit font-bold">
                        #{ach.id}
                      </span>
                      
                      <div className="space-y-1">
                        <h3 className="text-sm sm:text-base font-display font-bold text-white group-hover:text-brand-cyan transition-colors">
                          {ach.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-brand-muted font-sans leading-relaxed">
                          {ach.description}
                        </p>
                      </div>
                    </div>

                    {/* Badge Pill Metric */}
                    <div className="shrink-0 flex items-center self-end sm:self-center">
                      <span className="text-[9px] font-mono px-3 py-1 bg-white/5 text-brand-muted rounded-full border border-white/5 group-hover:border-brand-cyan/20 group-hover:text-brand-cyan transition-all uppercase tracking-wider font-bold">
                        {ach.metric}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Annotation Footer */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5 text-brand-muted text-[10px] font-mono">
                <Activity className="w-3.5 h-3.5 text-brand-purple animate-pulse" />
                <span>DATA LEDGER VERIFIED: ACTIVE NATIONAL GRADE-A COMPETITOR TRACK</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
