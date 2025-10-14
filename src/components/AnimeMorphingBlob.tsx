import { useEffect, useRef } from 'react';
import { animate, createTimeline } from 'animejs';

interface AnimeMorphingBlobProps {
  className?: string;
  blobCount?: number;
  colorPalette?: string[];
  speed?: number;
}

export const AnimeMorphingBlob = ({
  className = '',
  blobCount = 3,
  colorPalette = ['#10b981', '#06b6d4', '#8b5cf6'],
  speed = 1,
}: AnimeMorphingBlobProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<SVGPathElement[]>([]);
  const isActiveRef = useRef(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    isActiveRef.current = true;

    // Generate organic blob path
    const generateBlobPath = (centerX: number, centerY: number, radius: number) => {
      const points = 8;
      const angleStep = (Math.PI * 2) / points;
      const path: string[] = [];

      for (let i = 0; i <= points; i++) {
        const angle = i * angleStep;
        const variance = 0.3 + Math.random() * 0.4;
        const r = radius * variance;
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;

        if (i === 0) {
          path.push(`M ${x} ${y}`);
        } else {
          // Add smooth curves with control points
          const prevAngle = (i - 1) * angleStep;
          const prevR = radius * (0.3 + Math.random() * 0.4);
          const cpOffset = radius * 0.3;

          const cp1x = centerX + Math.cos(prevAngle + angleStep * 0.3) * (prevR + cpOffset);
          const cp1y = centerY + Math.sin(prevAngle + angleStep * 0.3) * (prevR + cpOffset);
          const cp2x = centerX + Math.cos(angle - angleStep * 0.3) * (r + cpOffset);
          const cp2y = centerY + Math.sin(angle - angleStep * 0.3) * (r + cpOffset);

          path.push(`C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x} ${y}`);
        }
      }

      return path.join(' ') + ' Z';
    };

    // Create blobs
    for (let i = 0; i < blobCount; i++) {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 500 500');
      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      svg.style.position = 'absolute';
      svg.style.width = '100%';
      svg.style.height = '100%';
      svg.style.top = '0';
      svg.style.left = '0';
      svg.style.zIndex = '0';
      svg.style.opacity = '0.15';
      svg.style.mixBlendMode = 'screen';

      const blob = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      blob.setAttribute('fill', colorPalette[i % colorPalette.length]);
      blob.setAttribute('d', generateBlobPath(250, 250, 150));
      blob.style.filter = 'blur(40px)';

      svg.appendChild(blob);
      container.appendChild(svg);
      blobsRef.current.push(blob);
    }

    // Animate blob morphing with continuous loop
    blobsRef.current.forEach((blob, index) => {
      const morphBlob = () => {
        if (!isActiveRef.current) return;

        const duration = (8000 + Math.random() * 4000) / speed;
        const newPath = generateBlobPath(
          250 + (Math.random() - 0.5) * 200,
          250 + (Math.random() - 0.5) * 200,
          120 + Math.random() * 80
        );

        animate(blob, {
          d: newPath,
          duration: duration,
          ease: 'inOut(3)',
          complete: () => {
            // Add delay before next morph to prevent stack overflow
            if (isActiveRef.current) {
              setTimeout(() => {
                morphBlob();
              }, 500); // 500ms delay between morphs
            }
          },
        });
      };

      // Start with different delays for staggered effect
      setTimeout(() => {
        if (isActiveRef.current) {
          morphBlob();
        }
      }, index * 1000);

      // Animate blob movement in 3D
      const blobParent = blob.parentElement;
      if (blobParent) {
        animate(blobParent, {
          translateX: [
            (Math.random() - 0.5) * 300,
            (Math.random() - 0.5) * 300,
            (Math.random() - 0.5) * 300,
          ],
          translateY: [
            (Math.random() - 0.5) * 300,
            (Math.random() - 0.5) * 300,
            (Math.random() - 0.5) * 300,
          ],
          translateZ: [(Math.random() - 0.5) * 200, (Math.random() - 0.5) * 200],
          scale: [0.8, 1.2, 0.9, 1.1],
          rotate: [0, 180, 360],
          duration: (15000 + Math.random() * 5000) / speed,
          ease: 'inOut(2)',
          loop: true,
        });
      }
    });

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = (e.clientX / window.innerWidth - 0.5) * 100;
      const mouseY = (e.clientY / window.innerHeight - 0.5) * 100;

      blobsRef.current.forEach((blob, i) => {
        const parent = blob.parentElement;
        if (parent) {
          const multiplier = 1 + i * 0.3;
          animate(parent, {
            translateX: mouseX * multiplier,
            translateY: mouseY * multiplier,
            duration: 2000,
            ease: 'out(3)',
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      isActiveRef.current = false;
      window.removeEventListener('mousemove', handleMouseMove);
      blobsRef.current.forEach((blob) => {
        blob.parentElement?.remove();
      });
      blobsRef.current = [];
    };
  }, [blobCount, colorPalette, speed]);

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
