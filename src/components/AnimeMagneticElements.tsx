import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

interface AnimeMagneticElementsProps {
  children: React.ReactNode;
  strength?: number;
  distance?: number;
  className?: string;
}

export const AnimeMagneticElements = ({
  children,
  strength = 0.3,
  distance = 200,
  className = '',
}: AnimeMagneticElementsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const elements = container.querySelectorAll('[data-magnetic]');

    const handleMouseMove = (e: MouseEvent) => {
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const elementCenterX = rect.left + rect.width / 2;
        const elementCenterY = rect.top + rect.height / 2;

        const distanceX = e.clientX - elementCenterX;
        const distanceY = e.clientY - elementCenterY;
        const distanceToMouse = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        if (distanceToMouse < distance) {
          const pullStrength = (1 - distanceToMouse / distance) * strength;
          const translateX = distanceX * pullStrength * 100;
          const translateY = distanceY * pullStrength * 100;
          const scale = 1 + pullStrength * 0.1;
          const rotateZ = (distanceX / distance) * 5;

          animate(element, {
            translateX: translateX,
            translateY: translateY,
            translateZ: pullStrength * 50,
            scale: scale,
            rotateZ: rotateZ,
            duration: 800,
            ease: 'out(3)',
          });
        } else {
          // Return to original position
          animate(element, {
            translateX: 0,
            translateY: 0,
            translateZ: 0,
            scale: 1,
            rotateZ: 0,
            duration: 1200,
            ease: 'outElastic(1, 0.5)',
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [strength, distance]);

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
