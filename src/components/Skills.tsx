import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Database, LineChart, ShieldAlert, Cpu, Sparkles } from 'lucide-react';
import { playHoverSound, playClickSound } from '../lib/audio';

interface Skill {
  name: string;
  level: string;
  desc: string;
  glow: string;
}

interface SkillCategory {
  title: string;
  icon: any;
  skills: Skill[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming',
    icon: Terminal,
    skills: [
      { name: 'Python', level: 'Advanced', desc: 'Core language for building pipeline cleaning scripts, predictive models, and EDA automation.', glow: 'rgba(0, 229, 255, 0.4)' },
      { name: 'SQL', level: 'Expert', desc: 'Advanced queries, complex joins, stored procedures, indexing, and normalizations.', glow: 'rgba(124, 58, 237, 0.4)' },
      { name: 'NumPy', level: 'Intermediate', desc: 'Efficient vector and matrix operations inside ML model pipelines.', glow: 'rgba(0, 229, 255, 0.3)' },
      { name: 'Pandas', level: 'Intermediate', desc: 'Tabular data munging, aggregation, grouping, and multi-file merges.', glow: 'rgba(124, 58, 237, 0.4)' },
      { name: 'Scikit-learn', level: 'Intermediate', desc: 'Predictive pipeline construction, regression, classification, and hyperparameter tuning.', glow: 'rgba(34, 197, 94, 0.4)' },
    ],
  },
  {
    title: 'Business Intelligence',
    icon: Database,
    skills: [
      { name: 'Power BI', level: 'Expert', desc: 'Interactive dashboards, custom DAX measures, star schema modeling, and row-level security.', glow: 'rgba(34, 197, 94, 0.4)' },
      { name: 'Tableau', level: 'Advanced', desc: 'Rich data storytelling, calculated fields, and cloud-hosted data pipelines.', glow: 'rgba(0, 229, 255, 0.4)' },
      { name: 'Excel', level: 'Expert', desc: 'Pivot tables, Power Query, advanced formula auditing, and financial risk modeling.', glow: 'rgba(124, 58, 237, 0.4)' },
      { name: 'Google Sheets', level: 'Advanced', desc: 'Real-time collaborative analytics, scripts, and webhook sync integrations.', glow: 'rgba(0, 229, 255, 0.3)' },
    ],
  },
  {
    title: 'Statistics',
    icon: LineChart,
    skills: [
      { name: 'EDA', level: 'Expert', desc: 'Exploratory Data Analysis to identify anomalies, distributions, and core statistical correlations.', glow: 'rgba(124, 58, 237, 0.4)' },
      { name: 'Feature Engineering', level: 'Advanced', desc: 'Log transforms, scaling, one-hot encoding, and correlation reduction.', glow: 'rgba(34, 197, 94, 0.4)' },
      { name: 'Probability', level: 'Intermediate', desc: 'Bayesian statistics, distribution fits, and random variable analysis.', glow: 'rgba(0, 229, 255, 0.3)' },
      { name: 'Linear Algebra', level: 'Intermediate', desc: 'Dimensionality reduction, PCA transforms, and matrix covariance operations.', glow: 'rgba(124, 58, 237, 0.3)' },
    ],
  },
  {
    title: 'Tools',
    icon: ShieldAlert,
    skills: [
      { name: 'Git', level: 'Advanced', desc: 'Distributed version control, branch management, clean pull requests, and merges.', glow: 'rgba(124, 58, 237, 0.3)' },
      { name: 'GitHub', level: 'Advanced', desc: 'Repository management, Action workflows, and collaborative team branches.', glow: 'rgba(0, 229, 255, 0.3)' },
      { name: 'VS Code', level: 'Expert', desc: 'Configured environment for Jupyter debugging, linting, and virtual environments.', glow: 'rgba(34, 197, 94, 0.3)' },
      { name: 'Jupyter', level: 'Intermediate', desc: 'Interactive notebook programming, visual plotting, and inline data prototyping.', glow: 'rgba(124, 58, 237, 0.4)' },
    ],
  },
  {
    title: 'Generative AI',
    icon: Cpu,
    skills: [
      { name: 'LLMs', level: 'Intermediate', desc: 'Integration of Gemini and Claude models using serverless Node and Python SDKs.', glow: 'rgba(0, 229, 255, 0.4)' },
      { name: 'Prompt Engineering', level: 'Advanced', desc: 'Few-shot patterns, XML tags, structured JSON outputs, and system directives.', glow: 'rgba(124, 58, 237, 0.4)' },
      { name: 'Embeddings', level: 'Intermediate', desc: 'Converting raw unstructured logs/documents into dense semantic vectors.', glow: 'rgba(34, 197, 94, 0.3)' },
    ],
  },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>(SKILL_CATEGORIES[0].title);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  const handleCategorySelect = (title: string) => {
    playClickSound();
    setActiveCategory(title);
    setHoveredSkill(null);
  };

  const selectedCategoryData = SKILL_CATEGORIES.find((cat) => cat.title === activeCategory);

  return (
    <section id="skills" className="py-24 relative bg-[#050505] overflow-hidden select-none">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
            <span className="text-[10px] font-mono tracking-wider text-brand-cyan uppercase">
              EXPERTISE ENGINE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            Advanced Skill Clusters
          </h2>
          <div className="w-12 h-[2px] bg-brand-purple mt-4 rounded-full" />
        </div>

        {/* Categories Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {SKILL_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = cat.title === activeCategory;
            return (
              <button
                key={cat.title}
                onClick={() => handleCategorySelect(cat.title)}
                onMouseEnter={playHoverSound}
                className={`flex items-center gap-2 px-5 py-3 rounded-full border text-xs font-mono tracking-wider transition-all duration-300 cursor-none ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-cyan to-brand-purple text-black font-semibold border-transparent shadow-lg shadow-brand-cyan/10'
                    : 'bg-brand-card/50 text-brand-muted border-white/5 hover:border-brand-cyan/30 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-brand-cyan'}`} />
                {cat.title}
              </button>
            );
          })}
        </div>

        {/* Dynamic Display Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start min-h-[350px]">
          
          {/* Left: Interactive Bubble Field */}
          <div className="lg:col-span-7 bg-[#111111]/40 border border-white/5 rounded-3xl p-8 relative overflow-hidden flex flex-wrap justify-center items-center gap-4 min-h-[320px]">
            <div className="absolute inset-0 animated-grid opacity-5 pointer-events-none" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="flex flex-wrap justify-center items-center gap-4 w-full"
              >
                {selectedCategoryData?.skills.map((skill) => {
                  const isHovered = hoveredSkill?.name === skill.name;
                  return (
                    <motion.div
                      key={skill.name}
                      onMouseEnter={() => {
                        playHoverSound();
                        setHoveredSkill(skill);
                      }}
                      onMouseLeave={() => setHoveredSkill(null)}
                      whileHover={{ scale: 1.08 }}
                      className="relative p-5 sm:p-7 rounded-2xl glass-panel border border-white/5 cursor-none flex flex-col items-center justify-center min-w-[120px] sm:min-w-[140px] text-center shadow-md overflow-hidden group"
                      style={{
                        boxShadow: isHovered ? `0 0 25px ${skill.glow}` : 'none',
                        borderColor: isHovered ? '#00E5FF' : 'rgba(255, 255, 255, 0.05)',
                      }}
                    >
                      {/* Ambient background glow inside the bubble */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                        style={{ backgroundColor: skill.glow }}
                      />
                      
                      <span className="font-display font-semibold text-sm sm:text-base text-white group-hover:text-brand-cyan transition-colors duration-200">
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-mono text-brand-muted mt-1 uppercase tracking-widest group-hover:text-white transition-colors duration-200">
                        {skill.level}
                      </span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Dynamic Context Panel */}
          <div className="lg:col-span-5 h-full">
            <div className="bg-[#111111]/80 rounded-3xl p-8 border border-white/5 shadow-2xl h-full min-h-[320px] flex flex-col justify-center relative overflow-hidden group">
              {/* Background accent ring */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/5 rounded-full blur-2xl" />
              
              <AnimatePresence mode="wait">
                {hoveredSkill ? (
                  <motion.div
                    key={hoveredSkill.name}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: hoveredSkill.glow }} />
                      <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white">
                        {hoveredSkill.name}
                      </h3>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-brand-cyan px-2.5 py-1 rounded-full bg-brand-cyan/10 uppercase tracking-widest font-semibold">
                        {hoveredSkill.level}
                      </span>
                      <span className="text-[10px] font-mono text-brand-muted">Active Pipeline Engine</span>
                    </div>

                    <p className="text-sm text-brand-muted font-sans leading-relaxed pt-2">
                      {hoveredSkill.desc}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-6 space-y-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center mx-auto animate-pulse">
                      <Sparkles className="w-6 h-6 text-brand-cyan" />
                    </div>
                    <h3 className="text-lg font-display font-bold text-white">
                      Inspect Skill Architecture
                    </h3>
                    <p className="text-xs text-brand-muted font-sans leading-relaxed max-w-xs mx-auto">
                      Hover over any skill bubble to display diagnostic reports, level classification, and real-world application details.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
