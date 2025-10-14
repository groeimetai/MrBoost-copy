import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';

interface Anime3DTiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glareEffect?: boolean;
}

export const Anime3DTiltCard = ({
  children,
  className = '',
  intensity = 15,
  glareEffect = true,
}: Anime3DTiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -intensity;
      const rotateY = ((x - centerX) / centerX) * intensity;
      const translateZ = 50;

      animate(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        translateZ: translateZ,
        duration: 600,
        ease: 'out(2)',
      });

      // Glare effect
      if (glareEffect && glareRef.current) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;

        animate(glareRef.current, {
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
          opacity: 1,
          duration: 300,
          ease: 'out(2)',
        });
      }
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      animate(card, {
        scale: 1.05,
        duration: 800,
        ease: 'outElastic(1, .6)',
      });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      animate(card, {
        rotateX: 0,
        rotateY: 0,
        translateZ: 0,
        scale: 1,
        duration: 1000,
        ease: 'outElastic(1, .5)',
      });

      if (glareEffect && glareRef.current) {
        animate(glareRef.current, {
          opacity: 0,
          duration: 600,
          ease: 'out(2)',
        });
      }
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity, glareEffect]);

  return (
    <div
      style={{
        perspective: '1500px',
        perspectiveOrigin: 'center center',
      }}
    >
      <div
        ref={cardRef}
        className={`relative ${className}`}
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {children}
        {glareEffect && (
          <div
            ref={glareRef}
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0,
              borderRadius: 'inherit',
              mixBlendMode: 'overlay',
            }}
          />
        )}
      </div>
    </div>
  );
};
