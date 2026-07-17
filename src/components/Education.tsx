import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { School, GraduationCap, Briefcase, Database, Lightbulb, Sparkles } from 'lucide-react';
import { playClickSound, playHoverSound } from '../lib/audio';

interface LearningCategory {
  title: string;
  items: string[];
}

interface RoadmapStep {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  period: string;
  scoreLabel?: string;
  scoreValue?: string;
  description: string;
  learnings?: string[];
  categories?: LearningCategory[];
}

const ROADMAP: RoadmapStep[] = [
  {
    id: 'school',
    title: 'Secondary Education',
    subtitle: 'Sri Sakthi Vikaas Matriculation Higher Secondary School',
    icon: School,
    period: 'Completed • 2023',
    scoreLabel: 'Percentile',
    scoreValue: '94%',
    description: 'Completed secondary education in the Maths-Biology branch, laying robust analytical, mathematical, and scientific foundations.',
    learnings: ['Maths & Biology', 'Calculus & Algebra', 'Scientific Inquiry']
  },
  {
    id: 'college',
    title: 'Undergraduate Program',
    subtitle: 'Computer Science & Intelligent Systems',
    icon: GraduationCap,
    period: 'Graduating • 2027',
    scoreLabel: 'GPA Score',
    scoreValue: '8.4 / 10',
    description: 'Pursuing specialized curriculum in core software engineering, algorithms, artificial intelligence, and cloud frameworks.',
    categories: [
      {
        title: 'Core CS Fundamentals',
        items: [
          'Data Structures & Algorithms',
          'OOP (Java/C++)',
          'Operating Systems',
          'Computer Networks',
          'DBMS (SQL)',
          'Computer Architecture'
        ]
      },
      {
        title: 'Programming',
        items: ['C', 'C++', 'Java', 'Python']
      },
      {
        title: 'Software Engineering',
        items: ['Agile/SDLC', 'Git/GitHub']
      },
      {
        title: 'Data Science / AI/ML',
        items: [
          'Python (Pandas, NumPy, Scikit-learn)',
          'Machine Learning fundamentals',
          'Generative AI'
        ]
      },
      {
        title: 'Cloud & Big Data',
        items: ['AWS', 'Azure', 'GCP', 'Hadoop', 'Spark']
      },
      {
        title: 'Soft Skills',
        items: ['Problem-solving', 'Team projects', 'Documentation']
      }
    ]
  },
  {
    id: 'internships',
    title: 'Industry Internships',
    subtitle: 'Practical Application Labs',
    icon: Briefcase,
    period: '2024 - 2026',
    scoreLabel: 'Staged Roles',
    scoreValue: '3 Positions',
    description: 'Validating theoretical structures in professional fast-paced environments like Axlero and Spyder LLP.',
    learnings: ['Relational Normalization', 'Power BI Dashboards', 'Team Git Workflows']
  },
  {
    id: 'projects',
    title: 'Research & Bento Projects',
    subtitle: 'Experimental Sandboxes',
    icon: Database,
    period: 'Ongoing',
    scoreLabel: 'Models Tested',
    scoreValue: '12+ Scenarios',
    description: 'Translating real-world problems like road safety forecasting and Netflix subscriber growth into interactive models.',
    learnings: ['Hyperparameter Tuning', 'D3.js Visualization', 'Interactive Prototyping']
  },
  {
    id: 'career',
    title: 'Future Career Objectives',
    subtitle: 'Next-Gen Analytics',
    icon: Lightbulb,
    period: 'Target 2027+',
    scoreLabel: 'Trajectory',
    scoreValue: 'Data Analyst',
    description: 'Aspiring to transform complex datasets into actionable insights that power strategic business decisions.',
    learnings: ['Advanced Analytics', 'Data Visualization', 'Business Intelligence']
  }
];

export default function Education() {
  const [activeStep, setActiveStep] = useState<string>(ROADMAP[1].id);

  const handleStepSelect = (id: string) => {
    playClickSound();
    setActiveStep(id);
  };

  const selectedStepData = ROADMAP.find((step) => step.id === activeStep);

  return (
    <section id="education" className="py-24 relative bg-[#050505] overflow-hidden select-none">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
            <span className="text-[10px] font-mono tracking-wider text-brand-cyan uppercase">
              STRATEGY BOARD
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            Academic & Career Roadmap
          </h2>
          <div className="w-12 h-[2px] bg-brand-purple mt-4 rounded-full" />
        </div>

        {/* Roadmap Steps */}
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Horizontal Track (Desktops) */}
          <div className="relative flex justify-between items-center py-6 overflow-x-auto gap-4 scrollbar-none">
            {/* SVG Connector Track */}
            <div className="absolute left-1/12 right-1/12 top-1/2 transform -translate-y-1/2 h-0.5 bg-white/5 z-0 hidden lg:block" />

            {ROADMAP.map((step, idx) => {
              const Icon = step.icon;
              const isActive = step.id === activeStep;
              return (
                <button
                  key={step.id}
                  onClick={() => handleStepSelect(step.id)}
                  onMouseEnter={playHoverSound}
                  className="flex flex-col items-center text-center relative z-10 cursor-none min-w-[120px]"
                >
                  {/* Outer circle ring */}
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      isActive
                        ? 'bg-[#111111] border-brand-cyan shadow-lg shadow-brand-cyan/15 text-brand-cyan scale-110'
                        : 'bg-[#111111]/40 border-white/5 hover:border-brand-purple/40 text-brand-muted hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Tiny indicator badge */}
                  <span className={`text-[10px] font-mono mt-3 tracking-wide transition-colors ${isActive ? 'text-brand-cyan font-semibold' : 'text-brand-muted'}`}>
                    S-0{idx + 1}
                  </span>
                  
                  {/* Short step name */}
                  <span className={`text-xs font-jakarta mt-1 hidden sm:block ${isActive ? 'text-white font-medium' : 'text-brand-muted'}`}>
                    {step.title.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Step Detail Card */}
          <div className="bg-[#111111]/80 rounded-3xl p-8 border border-white/5 relative overflow-hidden min-h-[300px] flex flex-col justify-center max-w-3xl mx-auto">
            <div className="absolute inset-0 animated-grid opacity-5 pointer-events-none" />

            <AnimatePresence mode="wait">
              {selectedStepData && (
                <motion.div
                  key={selectedStepData.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
                >
                  <div className="md:col-span-8 space-y-4">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[10px] font-mono tracking-widest text-brand-cyan bg-brand-cyan/10 px-2.5 py-1 rounded-full uppercase">
                        {selectedStepData.period}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white">
                      {selectedStepData.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-muted font-sans leading-relaxed">
                      {selectedStepData.description}
                    </p>

                    {/* Learnings list */}
                    <div className="pt-2">
                      {selectedStepData.categories ? (
                        <div className="space-y-3">
                          <span className="text-[10px] font-mono text-brand-purple uppercase tracking-widest block font-semibold">
                            Core Curriculum Modules
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[280px] overflow-y-auto pr-1 scrollbar-none">
                            {selectedStepData.categories.map((cat, cIdx) => (
                              <div key={cIdx} className="bg-white/[0.02] border border-white/5 p-2.5 rounded-xl hover:bg-white/[0.04] transition-all">
                                <span className="text-[10px] font-mono text-brand-cyan uppercase tracking-wider block mb-1 font-bold">
                                  {cat.title}
                                </span>
                                <div className="flex flex-wrap gap-1">
                                  {cat.items.map((item, iIdx) => (
                                    <span key={iIdx} className="text-[9px] font-mono bg-white/5 text-brand-muted px-2 py-0.5 rounded">
                                      {item}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        selectedStepData.learnings && (
                          <>
                            <span className="text-[10px] font-mono text-brand-purple uppercase tracking-widest block mb-2 font-semibold">
                              Key Competencies Developed
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {selectedStepData.learnings.map((l) => (
                                <span key={l} className="text-[10px] font-mono bg-white/5 border border-white/5 text-brand-muted px-2.5 py-1 rounded">
                                  {l}
                                </span>
                              ))}
                            </div>
                          </>
                        )
                      )}
                    </div>
                  </div>

                  {/* Sidebar stats panel */}
                  <div className="md:col-span-4 flex flex-col items-center justify-center border-l border-white/5 pl-0 md:pl-8 py-4">
                    <span className="text-[10px] font-mono text-brand-muted uppercase tracking-widest mb-1">
                      {selectedStepData.scoreLabel || 'Diagnostic metric'}
                    </span>
                    <span className="text-3xl sm:text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple">
                      {selectedStepData.scoreValue || '---'}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
