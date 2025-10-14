import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

interface Anime3DCardsProps {
  children: React.ReactNode;
  className?: string;
}

export const Anime3DCards = ({ children, className = '' }: Anime3DCardsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll('.anime-3d-card');

    // Initial 3D entrance animation
    animate(cards, {
      translateZ: [1000, 0],
      rotateX: [90, 0],
      opacity: [0, 1],
      scale: [0.5, 1],
      duration: 1800,
      delay: (el, i) => 300 + i * 150,
      ease: 'out(4)',
    });

    // Floating animation loop
    animate(cards, {
      translateY: (el, i) => [0, -20 + (i % 3) * 8],
      translateX: (el, i) => [0, (i % 2 === 0 ? 5 : -5)],
      rotateZ: (el, i) => [0, (i % 2 === 0 ? 2 : -2)],
      duration: 3000,
      alternate: true,
      loop: true,
      ease: 'inOut(2)',
      delay: (el, i) => i * 200,
    });

    // Add mouse move 3D tilt effect
    const handleMouseMove = (e: MouseEvent) => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        animate(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          duration: 400,
          ease: 'out(2)',
        });
      });
    };

    const handleMouseLeave = () => {
      animate(cards, {
        rotateX: 0,
        rotateY: 0,
        duration: 600,
        ease: 'outElastic(1, .5)',
      });
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);
    containerRef.current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        perspective: '1500px',
        perspectiveOrigin: 'center center',
      }}
    >
      {children}
    </div>
  );
};
