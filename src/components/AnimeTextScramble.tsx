import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';

interface AnimeTextScrambleProps {
  text: string;
  className?: string;
  speed?: number;
  glitchIntensity?: number;
  triggerMode?: 'onMount' | 'onScroll' | 'onHover' | 'continuous';
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export const AnimeTextScramble = ({
  text,
  className = '',
  speed = 50,
  glitchIntensity = 3,
  triggerMode = 'onScroll',
  as: Component = 'h2',
}: AnimeTextScrambleProps) => {
  const textRef = useRef<HTMLElement>(null);
  const [displayText, setDisplayText] = useState('');
  const hasTriggered = useRef(false);
  const scrambleInterval = useRef<NodeJS.Timeout>();

  const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  const scrambleText = () => {
    if (!text) return;

    let iteration = 0;
    const maxIterations = text.length * glitchIntensity;

    if (scrambleInterval.current) {
      clearInterval(scrambleInterval.current);
    }

    scrambleInterval.current = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';

            // Gradually reveal correct letters
            if (iteration > index * glitchIntensity) {
              return text[index];
            }

            // Scramble unrevealed letters
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      iteration += 1;

      if (iteration >= maxIterations) {
        setDisplayText(text);
        if (scrambleInterval.current) {
          clearInterval(scrambleInterval.current);
        }
      }
    }, speed);
  };

  useEffect(() => {
    if (!textRef.current) return;

    const element = textRef.current;

    // Animate letters with 3D transforms
    const animateLetters = () => {
      const letters = element.querySelectorAll('.scramble-letter');

      letters.forEach((letter, i) => {
        animate(letter as HTMLElement, {
          translateY: [-50, 0],
          translateZ: [200, 0],
          rotateX: [90, 0],
          opacity: [0, 1],
          scale: [0.5, 1],
          duration: 800,
          delay: i * 30,
          ease: 'out(3)',
        });

        // Add glitch effect
        if (Math.random() > 0.7) {
          setTimeout(() => {
            animate(letter as HTMLElement, {
              translateX: [(Math.random() - 0.5) * 20, 0],
              duration: 100,
              ease: 'out(2)',
            });
          }, i * 30 + 200);
        }
      });
    };

    if (triggerMode === 'onMount') {
      scrambleText();
      setTimeout(animateLetters, 100);
    } else if (triggerMode === 'onScroll') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasTriggered.current) {
              hasTriggered.current = true;
              scrambleText();
              setTimeout(animateLetters, 100);
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(element);

      return () => observer.disconnect();
    } else if (triggerMode === 'continuous') {
      const continuousScramble = () => {
        scrambleText();
        setTimeout(animateLetters, 100);
      };

      continuousScramble();
      const interval = setInterval(continuousScramble, 5000);

      return () => clearInterval(interval);
    }

    return () => {
      if (scrambleInterval.current) {
        clearInterval(scrambleInterval.current);
      }
    };
  }, [text, triggerMode, speed, glitchIntensity]);

  const handleHover = () => {
    if (triggerMode === 'onHover') {
      hasTriggered.current = false;
      scrambleText();
    }
  };

  return (
    <Component
      ref={textRef as any}
      className={`relative ${className}`}
      onMouseEnter={handleHover}
      style={{
        perspective: '1000px',
        perspectiveOrigin: 'center center',
      }}
    >
      <span className="inline-block" style={{ transformStyle: 'preserve-3d' }}>
        {(displayText || text).split('').map((char, index) => (
          <span
            key={index}
            className="scramble-letter inline-block"
            style={{
              transformStyle: 'preserve-3d',
              display: char === ' ' ? 'inline' : 'inline-block',
              minWidth: char === ' ' ? '0.3em' : 'auto',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>

      {/* Glitch overlay effect */}
      <span
        className="absolute inset-0 pointer-events-none"
        style={{
          textShadow: `
            ${Math.random() * 2 - 1}px ${Math.random() * 2 - 1}px 0 rgba(255, 0, 0, 0.7),
            ${Math.random() * 2 - 1}px ${Math.random() * 2 - 1}px 0 rgba(0, 255, 255, 0.7)
          `,
          opacity: hasTriggered.current ? 0 : 0.5,
          transition: 'opacity 0.5s',
        }}
      >
        {text}
      </span>
    </Component>
  );
};
