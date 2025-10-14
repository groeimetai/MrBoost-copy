import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

interface AnimeParticleBurstProps {
  children: React.ReactNode;
  className?: string;
  particleCount?: number;
  colorPalette?: string[];
  burst?: 'onScroll' | 'continuous' | 'onClick';
}

export const AnimeParticleBurst = ({
  children,
  className = '',
  particleCount = 30,
  colorPalette = ['#10b981', '#06b6d4', '#8b5cf6', '#ec4899', '#f59e0b'],
  burst = 'onScroll',
}: AnimeParticleBurstProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Create particle elements
    const createParticles = () => {
      // Clear existing particles
      particlesRef.current.forEach((p) => p.remove());
      particlesRef.current = [];

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = 4 + Math.random() * 12;
        const shapeType = Math.floor(Math.random() * 3);

        particle.className = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.background =
          colorPalette[Math.floor(Math.random() * colorPalette.length)];
        particle.style.transformStyle = 'preserve-3d';
        particle.style.willChange = 'transform';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '10';
        particle.style.opacity = '0';
        particle.style.boxShadow = `0 0 ${size * 2}px ${particle.style.background}`;

        // Shape variations
        if (shapeType === 0) {
          particle.style.borderRadius = '0';
        } else if (shapeType === 1) {
          particle.style.borderRadius = '50%';
        } else {
          particle.style.borderRadius = '20%';
          particle.style.transform = 'rotate(45deg)';
        }

        container.appendChild(particle);
        particlesRef.current.push(particle);
      }
    };

    // Burst animation
    const burstParticles = () => {
      particlesRef.current.forEach((particle, i) => {
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 200 + Math.random() * 400;
        const velocityZ = (Math.random() - 0.5) * 800;

        const targetX = Math.cos(angle) * velocity;
        const targetY = Math.sin(angle) * velocity;

        animate(particle, {
          translateX: [0, targetX],
          translateY: [0, targetY],
          translateZ: [0, velocityZ],
          rotateX: [0, Math.random() * 720 - 360],
          rotateY: [0, Math.random() * 720 - 360],
          rotateZ: [0, Math.random() * 1080 - 540],
          scale: [0, 1, 0.3],
          opacity: [0, 1, 0],
          duration: 2000 + Math.random() * 1000,
          delay: i * 10,
          ease: 'out(3)',
        });
      });
    };

    // Initialize particles
    createParticles();

    // Continuous burst mode
    if (burst === 'continuous') {
      const interval = setInterval(() => {
        createParticles();
        setTimeout(burstParticles, 50);
      }, 3500);

      return () => {
        clearInterval(interval);
        particlesRef.current.forEach((p) => p.remove());
      };
    }

    // On scroll trigger
    if (burst === 'onScroll') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasTriggered.current) {
              hasTriggered.current = true;
              setTimeout(() => {
                burstParticles();
              }, 200);
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(container);

      return () => {
        observer.disconnect();
        particlesRef.current.forEach((p) => p.remove());
      };
    }

    // On click trigger
    if (burst === 'onClick') {
      const handleClick = () => {
        createParticles();
        setTimeout(burstParticles, 50);
      };

      container.addEventListener('click', handleClick);

      return () => {
        container.removeEventListener('click', handleClick);
        particlesRef.current.forEach((p) => p.remove());
      };
    }
  }, [particleCount, colorPalette, burst]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        perspective: '2000px',
        perspectiveOrigin: 'center center',
      }}
    >
      {children}
    </div>
  );
};
