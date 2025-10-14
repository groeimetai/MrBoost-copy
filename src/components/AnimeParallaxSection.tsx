import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

interface AnimeParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  rotationIntensity?: number;
}

export const AnimeParallaxSection = ({
  children,
  className = '',
  speed = 0.5,
  rotationIntensity = 5,
}: AnimeParallaxSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const parallaxElements = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const elements = section.querySelectorAll('[data-parallax-depth]');
    parallaxElements.current = Array.from(elements) as HTMLElement[];

    const handleScroll = () => {
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollProgress = 1 - (rect.top + rect.height / 2) / window.innerHeight;
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;

      if (!isInView) return;

      parallaxElements.current.forEach((el) => {
        const depth = parseFloat(el.getAttribute('data-parallax-depth') || '1');
        const translateY = scrollProgress * -100 * speed * depth;
        const rotateX = scrollProgress * rotationIntensity * depth;
        const scale = 1 + scrollProgress * 0.1 * depth;

        animate(el, {
          translateY: translateY,
          translateZ: depth * 50,
          rotateX: rotateX,
          scale: scale,
          duration: 0,
        });
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, rotationIntensity]);

  return (
    <div
      ref={sectionRef}
      className={className}
      style={{
        perspective: '2000px',
        perspectiveOrigin: 'center center',
      }}
    >
      {children}
    </div>
  );
};
