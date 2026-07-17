import { motion } from 'motion/react';
import { Award, Zap, Sparkles, Database, Code, Globe, Cpu, ExternalLink } from 'lucide-react';
import { playHoverSound, playClickSound } from '../lib/audio';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  icon: any;
  glowColor: string;
  hoverBorder: string;
  url: string;
  recipientName: string;
  duration?: string;
  skills: string[];
  certifiedStamp: string;
  signatures?: string[];
}

const CERTS: Certification[] = [
  {
    id: 'claude',
    title: 'Claude Code 101',
    issuer: 'Anthropic',
    date: 'Issued Jun 2026',
    icon: Zap,
    glowColor: 'rgba(235, 134, 57, 0.25)', // Peach/orange glow
    hoverBorder: 'hover:border-[#EB8639]/30',
    url: 'https://drive.google.com/file/d/1rzdP16_hcX_JE1wBje5HpgLbOp1SaX1p/view?usp=drivesdk',
    recipientName: 'Limithra Shanmugam',
    skills: ['AI Coding Assistants', 'Command Line Tools', 'Prompt Engineering', 'Workflow Automation'],
    certifiedStamp: 'Anthropic Certified Developer'
  },
  {
    id: 'azure-openai',
    title: 'Develop applications with Azure OpenAI in Foundry Models',
    issuer: 'Microsoft',
    date: 'Issued Jun 2025',
    icon: Cpu,
    glowColor: 'rgba(0, 120, 215, 0.25)', // Microsoft blue glow
    hoverBorder: 'hover:border-[#0078D7]/30',
    url: 'https://drive.google.com/file/d/10OfQtpfy23zw_5uOkbkH56ew8Yx5Ip3U/view?usp=drivesdk',
    recipientName: 'Limithra Shanmugam',
    skills: ['Azure OpenAI Service', 'Large Language Models', 'Foundry Integration', 'Prompt Design'],
    certifiedStamp: 'Microsoft Learning Partner'
  },
  {
    id: 'database-dev',
    title: 'Database Developer Internship',
    issuer: 'Spyder Academy LLP',
    date: 'Issued Feb 2025',
    icon: Database,
    glowColor: 'rgba(0, 229, 255, 0.25)', // Cyan glow
    hoverBorder: 'hover:border-brand-cyan/30',
    url: 'https://drive.google.com/file/d/1nmmMRRiLP009NQL5E0F-V1Sct-nrLXPr/view?usp=drivesdk',
    recipientName: 'Limithra S',
    duration: 'Feb 5, 2025 to Feb 20, 2025',
    skills: ['SQL Development', 'Database Schema Design', 'Query Optimization', 'Relational Models'],
    certifiedStamp: 'ISO 9001 Certified',
    signatures: ['Prajithkumar Shanmugam (Founder)', 'Devaganthan (Co-Founder)']
  },
  {
    id: 'fullstack-intern',
    title: 'Full Stack Developer Intern',
    issuer: 'EdiGlobe & Zhagaram Technologies',
    date: 'Issued Oct 1, 2025',
    icon: Code,
    glowColor: 'rgba(124, 58, 237, 0.25)', // Purple glow
    hoverBorder: 'hover:border-brand-purple/30',
    url: 'https://drive.google.com/file/d/1TI7i8h4HxMjumSyMMzq5ZGkW2XrUk3J_/view?usp=drivesdk',
    recipientName: 'Limithra Shanmugam',
    duration: 'Jul 1, 2025 to Aug 30, 2025',
    skills: ['MERN Stack', 'REST APIs', 'Frontend Architecture', 'Backend Integration', 'Web Development'],
    certifiedStamp: 'Unique ID: EGN1433',
    signatures: ['Ashish Verma (HR Manager)', 'Founder (Zhagaram)']
  },
  {
    id: 'webdev-course',
    title: 'Web Development Course Completion',
    issuer: 'EdiGlobe',
    date: 'Issued Oct 2025',
    icon: Globe,
    glowColor: 'rgba(34, 197, 94, 0.25)', // Green glow
    hoverBorder: 'hover:border-brand-success/30',
    url: 'https://drive.google.com/file/d/1gpnXfuUJvmqjC4_A8SpWkeviWA2Zn2Ov/view?usp=drivesdk',
    recipientName: 'Limithra Shanmugam',
    skills: ['HTML5 & CSS3', 'JavaScript ES6+', 'Responsive Design', 'Vite & React'],
    certifiedStamp: 'EdiGlobe Training Division'
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 relative bg-[#050505]/50 overflow-hidden select-none">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
            <span className="text-[10px] font-mono tracking-wider text-brand-purple uppercase">
              CREDENTIAL LEDGER
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            Certifications & Courses
          </h2>
          <div className="w-12 h-[2px] bg-brand-cyan mt-4 rounded-full" />
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {CERTS.map((cert) => {
            const Icon = cert.icon;
            return (
              <motion.a
                key={cert.id}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
                whileHover={{ scale: 1.05 }}
                className={`p-6 rounded-3xl bg-[#111111]/70 border border-white/5 cursor-none relative overflow-hidden flex flex-col justify-between min-h-[220px] transition-all duration-300 ${cert.hoverBorder} group text-left outline-none`}
                style={{
                  boxShadow: `0 0 20px ${cert.glowColor}`
                }}
              >
                {/* Background layout dots */}
                <div className="absolute inset-0 animated-grid opacity-5 pointer-events-none" />

                <div className="space-y-3 relative z-10">
                  <div className="flex justify-between items-center">
                    <div className="p-2 rounded-xl bg-white/5 text-white group-hover:bg-brand-cyan/10 group-hover:text-brand-cyan transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-brand-cyan flex items-center gap-1">
                      {cert.date}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-display font-extrabold text-white tracking-tight group-hover:text-brand-cyan transition-colors leading-snug">
                    {cert.title}
                  </h3>
                </div>

                <div className="relative z-10 mt-4 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-brand-muted uppercase tracking-widest">
                    {cert.issuer}
                  </span>
                  <span className="text-[9px] font-mono text-brand-cyan/0 group-hover:text-brand-cyan/80 transition-all uppercase tracking-wider">
                    Verify
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

