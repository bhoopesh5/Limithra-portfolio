import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, Play, Database, Sparkles, X, ChevronRight, BarChart3, Calculator, Shuffle } from 'lucide-react';
import { playClickSound, playHoverSound, playSuccessSound } from '../lib/audio';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  tech: string[];
  metrics: { label: string; value: string }[];
  description: string;
  githubUrl: string;
  demoUrl?: string;
  accent: string;
}

const PROJECTS: Project[] = [
  {
    id: 'road-safety',
    title: 'Road Safety Severity Prediction',
    subtitle: 'Machine Learning Classification',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'EDA', 'Random Forest'],
    metrics: [
      { label: 'Accuracy', value: '87%' },
      { label: 'Dataset Size', value: '100k+ Records' }
    ],
    description: 'An end-to-end predictive machine learning classification model designed to forecast accident severity based on road conditions, environmental factors, and time vectors.',
    githubUrl: 'https://github.com/Limithra2006/road-safety',
    accent: '#00E5FF'
  },
  {
    id: 'netflix',
    title: 'Netflix Analytics Dashboard',
    subtitle: 'Business Intelligence & Insights',
    tech: ['SQL', 'Oracle APEX', 'Dashboard Design', 'Data Visualization'],
    metrics: [
      { label: 'KPI Metrics', value: '12 Dynamic KPIs' },
      { label: 'Database', value: 'Oracle DB / SQL' }
    ],
    description: 'A multi-perspective BI cloud-hosted analytics dashboard designed on Oracle APEX, presenting subscription trends, user audience segment splits, content growth curves, and global regional coverage metrics.',
    githubUrl: 'https://www.linkedin.com/posts/limithra-shanmugam_oracleapex-sqlprojects-dashboarddesign-activity-7342496806410342402-KE7v?utm_source=share&utm_medium=member_android&rcm=ACoAAE28l3oB7i6lPKHyR7hnkIFjTGHOny3HKR4',
    demoUrl: 'https://www.linkedin.com/posts/limithra-shanmugam_oracleapex-sqlprojects-dashboarddesign-activity-7342496806410342402-KE7v?utm_source=share&utm_medium=member_android&rcm=ACoAAE28l3oB7i6lPKHyR7hnkIFjTGHOny3HKR4',
    accent: '#7C3AED'
  },
  {
    id: 'stat-pro-tutor',
    title: 'StatProTutor Platform',
    subtitle: 'Educational Interactive Visualizer',
    tech: ['React', 'D3.js', 'Framer Motion', 'Tailwind CSS'],
    metrics: [
      { label: 'Interactive Formulae', value: '15+ Modules' },
      { label: 'Visual Clarity', value: '100%' }
    ],
    description: 'A responsive interactive web-based simulator presenting core statistical concepts, floating formulas, and dynamic distribution modeling in real time.',
    githubUrl: 'https://github.com/Limithra2006/statpro_tutor',
    accent: '#22C55E'
  }
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  
  // Pipeline interactive step state
  const [pipelineStep, setPipelineStep] = useState(0);
  const pipeline = ['Dataset', 'Cleaning', 'EDA', 'Feature Eng.', 'Training', 'Prediction'];

  // Netflix simulator state
  const [netflixFilter, setNetflixFilter] = useState<'All' | 'Movies' | 'TV Shows'>('All');
  
  // StatProTutor formula simulation state (Normal Distribution standard deviation)
  const [stdDev, setStdDev] = useState(1.5);
  const [mean, setMean] = useState(0);

  const handleCardClick = (p: Project) => {
    playSuccessSound();
    setActiveProject(p);
  };

  const handleCloseModal = () => {
    playClickSound();
    setActiveProject(null);
  };

  return (
    <section id="projects" className="py-24 relative bg-[#050505] overflow-hidden select-none">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
            <span className="text-[10px] font-mono tracking-wider text-brand-cyan uppercase">
              DATA LABORATORY
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            Premium Project Lab
          </h2>
          <div className="w-12 h-[2px] bg-brand-purple mt-4 rounded-full" />
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: ML Prediction (Road Safety) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-8 group relative bg-[#111111]/80 rounded-3xl p-6 sm:p-8 border border-white/5 flex flex-col justify-between overflow-hidden"
          >
            {/* Background grid */}
            <div className="absolute inset-0 animated-grid opacity-5 pointer-events-none" />
            
            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono text-brand-cyan tracking-widest uppercase bg-brand-cyan/10 px-2.5 py-1 rounded-full">
                  Machine Learning Model
                </span>
                <span className="text-sm font-mono text-white flex items-center gap-1">
                  Accuracy: <strong className="text-brand-cyan">87%</strong>
                </span>
              </div>
              
              <h3 className="text-2xl font-display font-extrabold text-white">
                Road Safety Severity Prediction
              </h3>
              
              <p className="text-sm text-brand-muted max-w-xl">
                Trained multiple regression models on structured city transit records. Optimizing city emergency dispatches via predictive vectors.
              </p>

              {/* Dynamic Interactive ML Pipeline Simulator */}
              <div className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-brand-muted uppercase tracking-wider">
                    Interactive ML Pipeline
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      playClickSound();
                      setPipelineStep((prev) => (prev + 1) % pipeline.length);
                    }}
                    onMouseEnter={playHoverSound}
                    className="flex items-center gap-1 text-[10px] font-mono text-brand-cyan border border-brand-cyan/20 px-2 py-1 rounded bg-brand-cyan/5 hover:bg-brand-cyan/10 cursor-none"
                  >
                    <Shuffle className="w-3 h-3" /> Step Pipeline
                  </button>
                </div>
                
                {/* Pipeline flow blocks */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-2">
                  {pipeline.map((step, idx) => {
                    const isActive = idx === pipelineStep;
                    const isPassed = idx < pipelineStep;
                    return (
                      <div
                        key={step}
                        className={`p-2.5 rounded-lg border text-center transition-all duration-300 ${
                          isActive 
                            ? 'bg-brand-cyan/15 border-brand-cyan shadow-md shadow-brand-cyan/10 text-white font-semibold'
                            : isPassed
                            ? 'bg-brand-purple/10 border-brand-purple/30 text-brand-purple'
                            : 'bg-[#1a1a1a]/40 border-white/5 text-brand-muted'
                        }`}
                      >
                        <div className="text-[9px] font-mono mb-0.5">S-0{idx + 1}</div>
                        <div className="text-[10px] font-jakarta tracking-tight truncate">{step}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/5 relative z-10">
              <div className="flex gap-2">
                {['Python', 'Scikit-learn', 'EDA'].map((t) => (
                  <span key={t} className="text-[10px] font-mono bg-white/5 text-brand-muted px-2 py-1 rounded">
                    {t}
                  </span>
                ))}
              </div>
              <button
                onClick={() => handleCardClick(PROJECTS[0])}
                onMouseEnter={playHoverSound}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-brand-cyan hover:text-white transition-colors cursor-none"
              >
                Launch Study <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Card 2: SQL & Oracle APEX Dashboard (Netflix) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-4 group relative bg-[#111111]/80 rounded-3xl p-6 sm:p-8 border border-white/5 flex flex-col justify-between overflow-hidden"
          >
            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono text-brand-purple tracking-widest uppercase bg-brand-purple/10 px-2.5 py-1 rounded-full">
                  BI Analytics
                </span>
                <span className="text-xs font-mono text-brand-purple">Oracle SQL & APEX</span>
              </div>
              
              <h3 className="text-xl font-display font-extrabold text-white">
                Netflix Analytics Dashboard
              </h3>

              <p className="text-xs text-brand-muted leading-relaxed">
                Aggregating content releases, localized metrics, genres, and audience ratings with cross-filtering engines.
              </p>

              {/* Simulated Tableau Dashboard Visualizer */}
              <div className="bg-[#1a1a1a]/60 border border-white/5 rounded-xl p-4 space-y-3 pt-3">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-[9px] font-mono text-brand-muted uppercase">Interactive Filters</span>
                  <div className="flex gap-1">
                    {(['All', 'Movies', 'TV Shows'] as const).map((filter) => (
                      <button
                        key={filter}
                        onClick={(e) => {
                          e.stopPropagation();
                          playClickSound();
                          setNetflixFilter(filter);
                        }}
                        className={`text-[9px] font-mono px-2 py-0.5 rounded cursor-none ${
                          netflixFilter === filter 
                            ? 'bg-brand-purple text-white' 
                            : 'bg-white/5 text-brand-muted hover:text-white'
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Simulated Chart Bars */}
                <div className="space-y-2 pt-1">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[8px] font-mono text-brand-muted">
                      <span>Action & Thriller</span>
                      <span className="text-brand-purple font-semibold">
                        {netflixFilter === 'All' ? '3,450 titles' : netflixFilter === 'Movies' ? '2,100' : '1,350'}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[#222] rounded-full overflow-hidden">
                      <motion.div 
                        animate={{ width: netflixFilter === 'All' ? '80%' : netflixFilter === 'Movies' ? '65%' : '40%' }}
                        className="h-full bg-brand-purple rounded-full" 
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[8px] font-mono text-brand-muted">
                      <span>Documentary</span>
                      <span className="text-brand-purple font-semibold">
                        {netflixFilter === 'All' ? '1,890 titles' : netflixFilter === 'Movies' ? '1,500' : '390'}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[#222] rounded-full overflow-hidden">
                      <motion.div 
                        animate={{ width: netflixFilter === 'All' ? '55%' : netflixFilter === 'Movies' ? '45%' : '20%' }}
                        className="h-full bg-brand-purple rounded-full" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5 relative z-10">
              <span className="text-[10px] font-mono text-brand-muted">Oracle SQL Pipeline</span>
              <button
                onClick={() => handleCardClick(PROJECTS[1])}
                onMouseEnter={playHoverSound}
                className="inline-flex items-center gap-1 text-xs font-mono text-brand-purple hover:text-white transition-colors cursor-none"
              >
                Expand <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Card 3: Educational Visualizer (StatProTutor) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-4 group relative bg-[#111111]/80 rounded-3xl p-6 sm:p-8 border border-white/5 flex flex-col justify-between overflow-hidden"
          >
            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono text-brand-success tracking-widest uppercase bg-brand-success/10 px-2.5 py-1 rounded-full">
                  React Tooling
                </span>
                <span className="text-xs font-mono text-brand-success">StatProTutor</span>
              </div>
              
              <h3 className="text-xl font-display font-extrabold text-white">
                StatProTutor Platform
              </h3>

              <p className="text-xs text-brand-muted leading-relaxed">
                Translating advanced statistics, floating probability formula bounds, and sample variables into micro-reactive animations.
              </p>

              {/* Dynamic Interactive Curve Simulation */}
              <div className="bg-[#1a1a1a]/60 border border-white/5 rounded-xl p-4 space-y-3">
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] font-mono text-brand-muted uppercase">Standard Deviation (σ)</span>
                    <span className="text-[9px] font-mono text-brand-success font-semibold">{stdDev.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="2.5"
                    step="0.1"
                    value={stdDev}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      playClickSound();
                      setStdDev(parseFloat(e.target.value));
                    }}
                    className="w-full accent-brand-success cursor-none"
                  />
                </div>

                {/* Symmetrical Bell Curve Simulation (SVG) */}
                <svg viewBox="0 0 100 30" className="w-full h-12 stroke-brand-success fill-none">
                  <motion.path
                    animate={{
                      d: `M 0 28 Q 50 ${28 - (24 / stdDev)} 100 28`
                    }}
                    transition={{ type: 'spring', damping: 15 }}
                    strokeWidth="1.5"
                  />
                  <line x1="0" y1="28" x2="100" y2="28" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                </svg>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5 relative z-10">
              <span className="text-[10px] font-mono text-brand-muted">Formula Sandbox</span>
              <button
                onClick={() => handleCardClick(PROJECTS[2])}
                onMouseEnter={playHoverSound}
                className="inline-flex items-center gap-1 text-xs font-mono text-brand-success hover:text-white transition-colors cursor-none"
              >
                Expand <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

        </div>

        {/* Big Fullscreen Modal Details Case */}
        <AnimatePresence>
          {activeProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCloseModal}
                className="absolute inset-0 bg-[#050505]/95 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="relative bg-brand-card w-full max-w-2xl rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[85vh] overflow-y-auto"
              >
                <div className="absolute inset-0 animated-grid opacity-5 pointer-events-none" />

                {/* Exit */}
                <button
                  onClick={handleCloseModal}
                  onMouseEnter={playHoverSound}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 hover:border-brand-cyan/40 text-brand-muted hover:text-white transition-all cursor-none"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Details Header */}
                <div className="space-y-2 mb-6">
                  <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded bg-white/5 border border-white/5 text-brand-muted">
                    {activeProject.subtitle}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-3">
                    {activeProject.title}
                  </h3>
                  <div className="flex gap-4 pt-1">
                    {activeProject.metrics.map((met) => (
                      <div key={met.label} className="text-xs">
                        <span className="text-brand-muted">{met.label}: </span>
                        <strong style={{ color: activeProject.accent }}>{met.value}</strong>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full h-[1px] bg-white/10 mb-6" />

                {/* Details Body */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest mb-2 font-semibold" style={{ color: activeProject.accent }}>
                      Mission Briefing
                    </h4>
                    <p className="text-sm text-brand-muted leading-relaxed font-sans">
                      {activeProject.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest mb-3 font-semibold" style={{ color: activeProject.accent }}>
                      Key Features Implemented
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex gap-2.5 items-start text-xs sm:text-sm text-brand-muted leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: activeProject.accent }} />
                        <span>Interactive diagnostic displays integrated into responsive canvas controllers.</span>
                      </li>
                      <li className="flex gap-2.5 items-start text-xs sm:text-sm text-brand-muted leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: activeProject.accent }} />
                        <span>Automated normalization scripts preventing redundant relational queries inside server pools.</span>
                      </li>
                      <li className="flex gap-2.5 items-start text-xs sm:text-sm text-brand-muted leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: activeProject.accent }} />
                        <span>High-fidelity visual storytelling mapping core database fields directly to stakeholders requirements.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-6">
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={playClickSound}
                      onMouseEnter={playHoverSound}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-jakarta font-semibold rounded-xl text-xs cursor-none hover:bg-opacity-90 transition"
                    >
                      {activeProject.id === 'netflix' ? <ExternalLink className="w-4 h-4" /> : <Github className="w-4 h-4" />}
                      {activeProject.id === 'netflix' ? 'View LinkedIn Post' : 'View GitHub Repository'}
                    </a>
                    {activeProject.id === 'road-safety' && (
                      <button
                        onClick={() => {
                          playClickSound();
                          alert('Predictive sandbox loaded. Pipeline accuracy stabilized at 87%.');
                        }}
                        onMouseEnter={playHoverSound}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#111] text-white border border-white/10 font-jakarta font-semibold rounded-xl text-xs cursor-none hover:border-brand-cyan/40 transition"
                      >
                        <Play className="w-4 h-4 text-brand-cyan" /> Run Simulated Ingestion
                      </button>
                    )}
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
