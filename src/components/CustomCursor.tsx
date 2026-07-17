import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
}

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdRef = useRef(0);
  const lastEmitTime = useRef(0);

  // Mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring animations for a smooth delayed "magnetic" follow effect
  const springConfig = { damping: 30, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      if (!isVisible) setIsVisible(true);

      // Emit particle trails with throttle
      const now = Date.now();
      if (now - lastEmitTime.current > 40) {
        lastEmitTime.current = now;
        
        const id = particleIdRef.current++;
        const newParticle: Particle = {
          id,
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 4 + 2,
        };

        setParticles((prev) => [...prev.slice(-15), newParticle]);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('interactive-hover')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('mouseover', handleHoverStart);

    // Filter out old particles periodically
    const interval = setInterval(() => {
      setParticles((prev) => prev.slice(1));
    }, 120);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mouseover', handleHoverStart);
      clearInterval(interval);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden hidden md:block">
      {/* Particle trail */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-brand-cyan/40 mix-blend-screen"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 0.1 }}
          transition={{ duration: 0.6 }}
        />
      ))}

      {/* Primary custom cursor */}
      <motion.div
        className="absolute rounded-full pointer-events-none mix-blend-difference"
        style={{
          left: cursorX,
          top: cursorY,
          transform: 'translate(-50%, -50%)',
          width: isHovered ? 48 : 20,
          height: isHovered ? 48 : 20,
          border: isHovered 
            ? '1.5px solid #00E5FF' 
            : '1.5px solid rgba(0, 229, 255, 0.8)',
          backgroundColor: isHovered 
            ? 'rgba(0, 229, 255, 0.08)' 
            : 'rgba(0, 229, 255, 0.03)',
          boxShadow: isHovered 
            ? '0 0 16px rgba(0, 229, 255, 0.4)' 
            : '0 0 8px rgba(0, 229, 255, 0.1)',
        }}
        animate={{
          scale: isHovered ? 1.15 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25,
        }}
      />
      
      {/* Tiny inner dot */}
      <motion.div
        className="absolute w-1.5 h-1.5 bg-brand-cyan rounded-full pointer-events-none"
        style={{
          left: mouseX,
          top: mouseY,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
}
