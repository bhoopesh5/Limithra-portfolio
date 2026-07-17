import { motion } from 'motion/react';
import { Terminal, Database, FileText, Cpu, GitBranch, Layout, Play, Code, Sparkles } from 'lucide-react';
import { playHoverSound, playClickSound } from '../lib/audio';

interface TechItem {
  name: string;
  icon: any;
  color: string;
  desc: string;
}

const TECH_ITEMS: TechItem[] = [
  { name: 'Python', icon: Terminal, color: '#00E5FF', desc: 'Predictive Pipelines & Ingestion' },
  { name: 'SQL', icon: Database, color: '#7C3AED', desc: 'Data Warehousing & 3NF Normalization' },
  { name: 'Power BI', icon: Layout, color: '#22C55E', desc: 'Interactive KPI Executive Dashboards' },
  { name: 'Tableau', icon: Layout, color: '#00E5FF', desc: 'Enterprise Cloud-Hosted Storytelling' },
  { name: 'Excel', icon: FileText, color: '#7C3AED', desc: 'Advanced Modeling & Pivot Analyses' },
  { name: 'Git & GitHub', icon: GitBranch, color: '#22C55E', desc: 'Distributed Versioning & Pull Codes' },
  { name: 'VS Code', icon: Code, color: '#00E5FF', desc: 'Script Writing & Virtual Environments' },
  { name: 'Jupyter', icon: Play, color: '#7C3AED', desc: 'Exploratory Prototyping Notebooks' },
  { name: 'Large Models', icon: Cpu, color: '#22C55E', desc: 'Generative RAG & Semantic Embeddings' }
];

export default function TechStack() {
  return (
    <section className="py-24 relative bg-[#050505]/50 overflow-hidden select-none">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
            <span className="text-[10px] font-mono tracking-wider text-brand-purple uppercase">
              ORBITAL ENGINE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            Technology Ecosystem
          </h2>
          <div className="w-12 h-[2px] bg-brand-cyan mt-4 rounded-full" />
        </div>

        {/* Orbit Grid */}
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          {TECH_ITEMS.map((tech) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
                whileHover={{ scale: 1.05 }}
                className="p-5 rounded-3xl bg-[#111111] border border-white/5 cursor-none relative overflow-hidden flex flex-col items-center justify-center w-[200px] text-center shadow-lg transition-all duration-300 hover:border-brand-cyan/20 group"
              >
                {/* Micro particle orbit line inside the card */}
                <div className="absolute inset-0 animated-grid opacity-5 pointer-events-none" />

                <div 
                  className="p-3.5 rounded-2xl bg-[#161616] mb-3 text-white transition-all duration-300 group-hover:scale-115"
                  style={{
                    boxShadow: `0 0 15px rgba(255, 255, 255, 0.02)`
                  }}
                >
                  <Icon className="w-6 h-6 transition-colors duration-300 group-hover:text-brand-cyan" />
                </div>

                <h3 className="text-sm font-display font-bold text-white mb-1 group-hover:text-brand-cyan transition-colors duration-200">
                  {tech.name}
                </h3>
                <span className="text-[9px] font-mono text-brand-muted uppercase leading-tight">
                  {tech.desc}
                </span>

                {/* Bottom pulsing indicator */}
                <div className="absolute bottom-3 w-1.5 h-1.5 rounded-full bg-brand-cyan/20 group-hover:bg-brand-cyan animate-pulse transition-all" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
