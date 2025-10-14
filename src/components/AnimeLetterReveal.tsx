import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';

interface AnimeLetterRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  triggerOnScroll?: boolean;
}

export const AnimeLetterReveal = ({
  text,
  className = '',
  delay = 0,
  staggerDelay = 30,
  triggerOnScroll = true,
}: AnimeLetterRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const letters = containerRef.current.querySelectorAll('.letter');

    const animateLetters = () => {
      if (hasAnimated) return;
      setHasAnimated(true);

      animate(letters, {
        translateY: [100, 0],
        translateZ: [200, 0],
        rotateX: [90, 0],
        opacity: [0, 1],
        duration: 1400,
        delay: (el, i) => delay + i * staggerDelay,
        ease: 'out(4)',
      });

      // Add a subtle wave effect after initial reveal
      setTimeout(() => {
        animate(letters, {
          translateY: [0, -8, 0],
          duration: 800,
          delay: (el, i) => {
            const middle = Math.floor(letters.length / 2);
            return Math.abs(i - middle) * 40;
          },
          ease: 'inOut(2)',
        });
      }, delay + letters.length * staggerDelay + 200);
    };

    if (triggerOnScroll) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated) {
              animateLetters();
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(containerRef.current);

      return () => {
        if (containerRef.current) {
          observer.unobserve(containerRef.current);
        }
      };
    } else {
      animateLetters();
    }
  }, [delay, staggerDelay, triggerOnScroll, hasAnimated]);

  const renderLetters = () => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        className="letter inline-block"
        style={{
          opacity: 0,
          transformStyle: 'preserve-3d',
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        perspective: '1000px',
        perspectiveOrigin: 'center center',
        overflow: 'hidden',
      }}
    >
      {renderLetters()}
    </div>
  );
};
