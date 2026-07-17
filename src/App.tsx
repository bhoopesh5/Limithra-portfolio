import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import BackgroundAnimation from './components/BackgroundAnimation';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import Simulations from './components/Simulations';
import Passion from './components/Passion';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Stats from './components/Stats';
import TechStack from './components/TechStack';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Custom glowing cursor with particle trail */}
      <CustomCursor />

      {/* Loading preloader gate */}
      <Loader onComplete={() => setLoading(false)} />

      {/* Interactive canvas neural backgrounds */}
      <BackgroundAnimation />

      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative min-h-screen bg-[#050505] text-white overflow-hidden"
          >
            {/* Header / Navigation bar */}
            <Header />

            {/* Smooth main content flow */}
            <main className="relative z-10 w-full">
              
              {/* Hero entry section */}
              <Hero 
                onViewProjects={handleScrollToProjects} 
                onContactClick={handleScrollToContact} 
              />

              {/* About summary & metrics */}
              <About />

              {/* Advanced expanding skill bubbles */}
              <Skills />

              {/* Internship history cards */}
              <Timeline />

              {/* Interactive bento grids, pipelines & math sliders */}
              <Projects />

              {/* Flipping industry case reviews */}
              <Simulations />

              {/* National-level sports analytical boards */}
              <Passion />

              {/* Connecting roadmap stepping track */}
              <Education />

              {/* Credentials ledger glass cards */}
              <Certifications />

              {/* Key operational metric counters */}
              <Stats />

              {/* Ecological orbit tags */}
              <TechStack />

              {/* Encrypted transmission input pathways */}
              <Contact />

            </main>

            {/* Wave signoff footer */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
