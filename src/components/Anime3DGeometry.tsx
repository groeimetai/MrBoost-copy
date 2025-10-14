import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

interface Anime3DGeometryProps {
  className?: string;
  shapeCount?: number;
  colorPalette?: string[];
}

export const Anime3DGeometry = ({
  className = '',
  shapeCount = 15,
  colorPalette = ['#10b981', '#06b6d4', '#8b5cf6', '#ec4899'],
}: Anime3DGeometryProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const shapes: HTMLDivElement[] = [];

    // Create floating 3D shapes
    for (let i = 0; i < shapeCount; i++) {
      const shape = document.createElement('div');
      const size = 40 + Math.random() * 100;
      const shapeType = Math.floor(Math.random() * 3);

      shape.className = 'absolute';
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;
      shape.style.left = `${Math.random() * 100}%`;
      shape.style.top = `${Math.random() * 100}%`;
      shape.style.background = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      shape.style.opacity = `${0.1 + Math.random() * 0.3}`;
      shape.style.transformStyle = 'preserve-3d';
      shape.style.willChange = 'transform';
      shape.style.pointerEvents = 'none';

      // Shape types: square, circle, triangle
      if (shapeType === 0) {
        shape.style.borderRadius = '0';
      } else if (shapeType === 1) {
        shape.style.borderRadius = '50%';
      } else {
        shape.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
      }

      container.appendChild(shape);
      shapes.push(shape);
    }

    // Animate each shape with complex 3D transforms
    shapes.forEach((shape, index) => {
      const duration = 8000 + Math.random() * 8000;
      const delay = index * 100;

      animate(shape, {
        translateX: [0, (Math.random() - 0.5) * 400],
        translateY: [0, (Math.random() - 0.5) * 400],
        translateZ: [0, (Math.random() - 0.5) * 600],
        rotateX: [0, Math.random() * 720 - 360],
        rotateY: [0, Math.random() * 720 - 360],
        rotateZ: [0, Math.random() * 720 - 360],
        scale: [1, 0.5 + Math.random() * 1],
        duration: duration,
        delay: delay,
        ease: 'inOut(2)',
        alternate: true,
        loop: true,
      });
    });

    // Mouse move interaction
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = (e.clientX / window.innerWidth - 0.5) * 50;
      const mouseY = (e.clientY / window.innerHeight - 0.5) * 50;

      animate(container, {
        rotateY: mouseX,
        rotateX: -mouseY,
        duration: 800,
        ease: 'out(2)',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      shapes.forEach((shape) => {
        shape.remove();
      });
    };
  }, [shapeCount, colorPalette]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{
        perspective: '1500px',
        perspectiveOrigin: 'center center',
        transformStyle: 'preserve-3d',
        zIndex: 0,
      }}
    />
  );
};
