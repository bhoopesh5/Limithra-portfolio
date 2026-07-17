import { motion } from 'motion/react';
import { ShieldCheck, BarChart3, FlipHorizontal, Sparkles, ExternalLink } from 'lucide-react';
import { playHoverSound, playClickSound } from '../lib/audio';

interface SimulationCard {
  id: string;
  company: string;
  title: string;
  icon: any;
  difficulty: string;
  glow: string;
  frontDesc: string;
  challenge: string;
  approach: string;
  tools: string[];
  issued: string;
  verificationCode?: string;
  userVerificationCode?: string;
  certificateUrl?: string;
}

const SIMULATIONS: SimulationCard[] = [
  {
    id: 'jpmorgan',
    company: 'J.P. Morgan',
    title: 'Quantitative Research Job Simulation',
    icon: ShieldCheck,
    difficulty: 'Advanced',
    glow: 'rgba(0, 229, 255, 0.3)',
    frontDesc: 'Evaluating quantitative analysis models, asset pricing models, portfolio weights, and forecasting strategies in partnership with Forage.',
    challenge: 'Apply rigorous quantitative, analytical, and coding methodologies to validate financial predictions and investment risk portfolios.',
    approach: 'Engineered model evaluation functions, computed asset metrics, and designed custom statistical frameworks.',
    tools: ['Quantitative Research', 'Python', 'Financial Modeling', 'Risk Assessment'],
    issued: 'Jan 2026',
    verificationCode: 'JPM-QR-2026-VAL',
    certificateUrl: 'https://drive.google.com/file/d/1ggdBNKwdJOdo37C2VBzvgnnavJqnZ2Aq/view?usp=drivesdk'
  },
  {
    id: 'deloitte',
    company: 'Deloitte Australia',
    title: 'Data Analytics Job Simulation',
    icon: BarChart3,
    difficulty: 'Intermediate',
    glow: 'rgba(124, 58, 237, 0.3)',
    frontDesc: 'Investigating dataset metrics, analyzing customer trends, and building interactive dashboard presentations.',
    challenge: 'Transform unstructured business datasets into actionable corporate insights and present strategic recommendations.',
    approach: 'Cleaned and transformed source transaction tables, performed descriptive analysis, and synthesized key findings.',
    tools: ['Data Analytics', 'Tableau', 'Data Visualization', 'SQL Analysis'],
    issued: 'Jan 23, 2026',
    verificationCode: 'kXv3JkGerH57fBANa',
    userVerificationCode: '6969cc032e40c7c03ceb664c',
    certificateUrl: 'https://drive.google.com/file/d/1AuBz3OmOuMqAWE1HSIDeT9JtaH_4cO7u/view?usp=drivesdk'
  }
];

export default function Simulations() {
  return (
    <section id="simulations" className="py-24 relative bg-[#050505]/50 overflow-hidden select-none">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
            <span className="text-[10px] font-mono tracking-wider text-brand-purple uppercase">
              INDUSTRY LABS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            Job Simulations
          </h2>
          <div className="w-12 h-[2px] bg-brand-cyan mt-4 rounded-full" />
        </div>

        {/* 3D Flip Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {SIMULATIONS.map((sim) => {
            const Icon = sim.icon;
            return (
              <div
                key={sim.id}
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
                className="group relative h-[360px] w-full [perspective:1000px] cursor-none"
              >
                {/* 3D Rotator element */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-3xl transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] border border-white/5"
                  style={{
                    boxShadow: `0 0 30px ${sim.glow}`
                  }}
                >
                  
                  {/* Front Side */}
                  <div className="absolute inset-0 w-full h-full rounded-3xl bg-[#111111] p-8 flex flex-col justify-between [backface-visibility:hidden] group-hover:pointer-events-none group-hover:opacity-0 transition-all duration-500">
                    <div className="absolute inset-0 animated-grid opacity-5 rounded-3xl" />
                    
                    <div className="space-y-4 relative z-10">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono text-brand-cyan uppercase tracking-widest bg-brand-cyan/10 px-2.5 py-1 rounded-full">
                          {sim.difficulty}
                        </span>
                        <FlipHorizontal className="w-4 h-4 text-brand-muted group-hover:text-brand-cyan transition-colors" />
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <div className="p-2.5 rounded-xl bg-white/5 text-brand-cyan">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h3 className="text-[10px] font-mono text-brand-muted uppercase tracking-widest">
                              {sim.company}
                            </h3>
                            <span className="text-[9px] font-mono text-brand-cyan">
                              • Issued {sim.issued}
                            </span>
                          </div>
                          <h4 className="text-base sm:text-lg font-display font-bold text-white mt-0.5">
                            {sim.title}
                          </h4>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-brand-muted leading-relaxed pt-3">
                        {sim.frontDesc}
                      </p>
                    </div>

                    <div className="flex justify-between items-center relative z-10 pt-4 border-t border-white/5 mt-auto">
                      <div className="flex items-center gap-2 text-[9px] font-mono text-brand-purple uppercase tracking-wider animate-pulse">
                        <span>Hover card to inspect solutions</span>
                      </div>
                      {sim.certificateUrl && (
                        <a
                          href={sim.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            playClickSound();
                          }}
                          className="flex items-center gap-1 bg-brand-cyan/20 hover:bg-brand-cyan/40 text-brand-cyan border border-brand-cyan/30 px-2.5 py-1 rounded-lg text-[9px] font-mono uppercase tracking-wider transition-all duration-300 cursor-none"
                        >
                          Certificate <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Back Side (Rotated 180 degrees) */}
                  <div className="absolute inset-0 w-full h-full rounded-3xl bg-[#161616] p-8 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] border border-brand-cyan/20 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-500">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-[9px] font-mono text-brand-cyan uppercase tracking-widest mb-1">
                          The Challenge
                        </h4>
                        <p className="text-xs text-brand-muted leading-relaxed">
                          {sim.challenge}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-[9px] font-mono text-brand-purple uppercase tracking-widest mb-1">
                          Our Analytical Approach
                        </h4>
                        <p className="text-xs text-brand-muted leading-relaxed">
                          {sim.approach}
                        </p>
                      </div>

                      <div className="pt-2">
                        <h4 className="text-[9px] font-mono text-white uppercase tracking-widest mb-2">
                          Utilized Modules
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {sim.tools.map((t) => (
                            <span key={t} className="text-[9px] font-mono bg-white/5 border border-white/5 text-brand-muted px-2.5 py-0.5 rounded">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-3 flex items-end justify-between relative z-10">
                      {sim.verificationCode ? (
                        <div className="space-y-1">
                          <h4 className="text-[8px] font-mono text-brand-muted uppercase tracking-wider">
                            Verification Code
                          </h4>
                          <p className="text-[10px] font-mono text-brand-cyan uppercase font-bold select-all leading-none">
                            {sim.verificationCode}
                          </p>
                        </div>
                      ) : (
                        <div className="text-[10px] font-mono text-brand-cyan uppercase tracking-widest">
                          Task Completed Successfully
                        </div>
                      )}

                      {sim.certificateUrl && (
                        <a
                          href={sim.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            playClickSound();
                          }}
                          className="flex items-center gap-1.5 bg-brand-purple/20 hover:bg-brand-purple/40 text-brand-purple border border-brand-purple/30 px-3 py-1.5 rounded-xl text-[10px] font-mono uppercase tracking-wider transition-all duration-300 cursor-none"
                        >
                          Verify Certificate <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
