import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, Calendar, MapPin, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { playHoverSound, playClickSound, playSuccessSound } from '../lib/audio';

interface Internship {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  skills: string[];
  summary: string;
  highlights: string[];
  color: string;
}

const INTERNSHIPS: Internship[] = [
  {
    id: 'axlero',
    company: 'Axlero Innovative Solutions',
    role: 'Data Analyst & BI Intern',
    period: 'Current • 2026',
    location: 'Remote',
    skills: ['Python', 'SQL', 'Pandas', 'Power BI', 'EDA'],
    summary: 'Spearheading database cleaning procedures, streamlining data pipeline ingestions, and preparing highly dynamic Power BI dashboards for predictive risk analysis.',
    highlights: [
      'Automated raw CSV log ingestion pipelines using Pandas, cutting cleaning times by 40%.',
      'Developed custom SQL scripts to audit customer data records and enforce constraints.',
      'Designed a multi-page Power BI dashboard visualizing client operation cycles.',
      'Configured exploratory correlation matrices to assist ML forecasting teams.'
    ],
    color: '#00E5FF'
  },
  {
    id: 'ediglobe',
    company: 'EdiGlobe',
    role: 'Web & Full Stack Developer Intern',
    period: '2025',
    location: 'Hybrid',
    skills: ['Frontend', 'Backend', 'CMS', 'JavaScript', 'SQL'],
    summary: 'Assisted in building custom client-facing interfaces, connecting backend database forms, and optimizing content management system components.',
    highlights: [
      'Engineered responsive web interfaces using CSS grid frameworks and HTML5 standard markup.',
      'Designed backend feedback forms securely pushing lead submissions into SQL data stores.',
      'Customized and managed core CMS plugins for global enterprise business clients.',
      'Participated in code quality cycles, boosting mobile loading speed metrics by 15%.'
    ],
    color: '#22C55E'
  },
  {
    id: 'spyder',
    company: 'Spyder Academy LLP',
    role: 'Database Developer Intern',
    period: '2025',
    location: 'Remote',
    skills: ['SQL', 'Database Normalization', 'Schema Design', 'indexing'],
    summary: 'Focused strictly on transactional database integrity, performance indexing, system normalization, and designing clean entity-relationship schemas.',
    highlights: [
      'Refactored highly nested legacy databases into structured 3NF forms, reducing storage redundancy.',
      'Authored scalable SQL queries optimizing critical operational reports by 30%.',
      'Created granular Entity-Relationship diagrams (ERDs) mapped to business models.',
      'Tested query search efficiency using customized database index allocations.'
    ],
    color: '#7C3AED'
  }
];

export default function Timeline() {
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);

  const handleCardClick = (intern: Internship) => {
    playSuccessSound();
    setSelectedInternship(intern);
  };

  const handleClose = () => {
    playClickSound();
    setSelectedInternship(null);
  };

  return (
    <section id="experience" className="py-24 relative bg-[#050505]/60 overflow-hidden select-none">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
            <span className="text-[10px] font-mono tracking-wider text-brand-purple uppercase">
              PROFESSIONAL TRAJECTORY
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            Internship Journey
          </h2>
          <div className="w-12 h-[2px] bg-brand-cyan mt-4 rounded-full" />
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central spine line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[1.5px] bg-white/10 hidden md:block" />

          <div className="space-y-12">
            {INTERNSHIPS.map((intern, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={intern.id} className="relative flex flex-col md:flex-row items-center md:justify-between w-full">
                  
                  {/* Timeline bullet dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#050505] border-2 border-brand-cyan z-20 hidden md:block" />

                  {/* Spacer or Left Card depending on index */}
                  <div className={`w-full md:w-[45%] ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      onClick={() => handleCardClick(intern)}
                      onMouseEnter={playHoverSound}
                      className="p-6 rounded-3xl bg-[#111111] border border-white/5 hover:border-brand-cyan/30 shadow-xl cursor-none relative overflow-hidden group hover:scale-[1.02] transition-all duration-300"
                    >
                      {/* Left vertical color accent bar */}
                      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: intern.color }} />
                      
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-mono tracking-widest text-brand-cyan uppercase bg-brand-cyan/10 px-2.5 py-1 rounded-full">
                          {intern.period}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-brand-muted group-hover:text-white transition-colors" />
                      </div>

                      <h3 className="text-xl font-display font-bold text-white mb-1 group-hover:text-brand-cyan transition-colors">
                        {intern.company}
                      </h3>
                      <p className="text-sm font-jakarta text-brand-muted font-medium mb-4">
                        {intern.role}
                      </p>
                      
                      <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed mb-4">
                        {intern.summary}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {intern.skills.slice(0, 3).map((sk) => (
                          <span key={sk} className="text-[9px] font-mono bg-white/5 text-brand-muted px-2 py-0.5 rounded">
                            {sk}
                          </span>
                        ))}
                        {intern.skills.length > 3 && (
                          <span className="text-[9px] font-mono text-brand-cyan">
                            +{intern.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    </motion.div>
                  </div>

                  <div className={`w-full md:w-[45%] hidden md:block ${isEven ? 'md:order-2' : 'md:order-1'}`} />

                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Case Modal */}
        <AnimatePresence>
          {selectedInternship && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleClose}
                className="absolute inset-0 bg-[#050505]/95 backdrop-blur-md"
              />

              {/* Case Card Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="relative bg-brand-card w-full max-w-2xl rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[85vh] overflow-y-auto"
              >
                <div className="absolute inset-0 animated-grid opacity-5 pointer-events-none" />

                {/* Exit Button */}
                <button
                  onClick={handleClose}
                  onMouseEnter={playHoverSound}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 hover:border-brand-cyan/40 text-brand-muted hover:text-white transition-all cursor-none"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Modal Header */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-brand-cyan" />
                    <span className="text-xs font-mono text-brand-cyan tracking-wider uppercase">
                      Internship Case Study
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                    {selectedInternship.company}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-brand-muted pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-brand-purple" />
                      {selectedInternship.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-cyan" />
                      {selectedInternship.location}
                    </span>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-white/10 mb-6" />

                {/* Modal Content */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-mono text-brand-cyan uppercase tracking-widest mb-2 font-semibold">
                      Overview & Intent
                    </h4>
                    <p className="text-sm text-brand-muted leading-relaxed font-sans">
                      {selectedInternship.summary}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono text-brand-purple uppercase tracking-widest mb-3 font-semibold">
                      Key Highlights & Deliverables
                    </h4>
                    <ul className="space-y-3">
                      {selectedInternship.highlights.map((hl, i) => (
                        <li key={i} className="flex gap-2.5 items-start text-xs sm:text-sm text-brand-muted leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan mt-2 shrink-0" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono text-white uppercase tracking-widest mb-3 font-semibold">
                      Utilized Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedInternship.skills.map((sk) => (
                        <span key={sk} className="text-xs font-mono bg-white/5 border border-white/10 text-white px-3 py-1 rounded-full uppercase">
                          {sk}
                        </span>
                      ))}
                    </div>
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
