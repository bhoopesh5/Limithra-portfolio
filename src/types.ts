export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  tech: string[];
  metrics?: { label: string; value: string }[];
  pipeline?: string[];
  stats?: { name: string; value: number }[];
  githubUrl?: string;
  demoUrl?: string;
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  experience: string;
  category: 'Programming' | 'BI' | 'Statistics' | 'Tools' | 'AI';
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  skills: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  glowColor: string;
}

export interface SimulationCard {
  company: string;
  title: string;
  domain: string;
  description: string;
  backDetails: {
    challenge: string;
    approach: string;
    skills: string[];
  };
}
