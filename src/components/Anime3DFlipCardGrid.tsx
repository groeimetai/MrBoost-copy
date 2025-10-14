import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';

interface CardData {
  frontTitle: string;
  frontContent: string;
  backTitle: string;
  backContent: string;
  color?: string;
}

interface Anime3DFlipCardGridProps {
  cards: CardData[];
  className?: string;
  triggerMode?: 'hover' | 'scroll' | 'sequential';
  columns?: number;
}

export const Anime3DFlipCardGrid = ({
  cards,
  className = '',
  triggerMode = 'hover',
  columns = 3,
}: Anime3DFlipCardGridProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const cardElements = cardRefs.current;

    // Scroll trigger for sequential flip
    if (triggerMode === 'scroll') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Flip all cards in sequence
              cardElements.forEach((card, index) => {
                if (card) {
                  setTimeout(() => {
                    flipCard(card, true);
                  }, index * 150);
                }
              });
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(container);

      return () => observer.disconnect();
    }

    // Sequential auto-flip mode
    if (triggerMode === 'sequential') {
      cardElements.forEach((card, index) => {
        if (card) {
          setTimeout(() => {
            flipCard(card, true);
            setTimeout(() => {
              flipCard(card, false);
            }, 2000);
          }, index * 800);
        }
      });

      const interval = setInterval(() => {
        cardElements.forEach((card, index) => {
          if (card) {
            setTimeout(() => {
              flipCard(card, true);
              setTimeout(() => {
                flipCard(card, false);
              }, 2000);
            }, index * 800);
          }
        });
      }, (cardElements.length * 800 + 3000));

      return () => clearInterval(interval);
    }
  }, [triggerMode]);

  const flipCard = (card: HTMLDivElement, flip: boolean) => {
    animate(card, {
      rotateY: flip ? 180 : 0,
      duration: 800,
      ease: 'out(3)',
    });
  };

  const handleCardClick = (index: number) => {
    if (triggerMode !== 'hover') return;

    const card = cardRefs.current[index];
    if (!card) return;

    const newFlipped = new Set(flippedCards);
    const isFlipped = newFlipped.has(index);

    if (isFlipped) {
      newFlipped.delete(index);
    } else {
      newFlipped.add(index);
    }

    setFlippedCards(newFlipped);
    flipCard(card, !isFlipped);
  };

  const handleCardHover = (index: number, isEnter: boolean) => {
    if (triggerMode !== 'hover') return;

    const card = cardRefs.current[index];
    if (!card) return;

    if (isEnter) {
      animate(card, {
        scale: 1.05,
        translateZ: 50,
        duration: 400,
        ease: 'out(2)',
      });
    } else {
      animate(card, {
        scale: 1,
        translateZ: 0,
        duration: 400,
        ease: 'out(2)',
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        perspective: '2000px',
        perspectiveOrigin: 'center center',
      }}
    >
      <div
        className={`grid gap-6 md:gap-8`}
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) cardRefs.current[index] = el;
            }}
            className="relative w-full cursor-pointer"
            style={{
              transformStyle: 'preserve-3d',
              willChange: 'transform',
              height: '300px',
            }}
            onClick={() => handleCardClick(index)}
            onMouseEnter={() => handleCardHover(index, true)}
            onMouseLeave={() => handleCardHover(index, false)}
          >
            {/* Front of card */}
            <div
              className="absolute inset-0 rounded-xl p-6 flex flex-col justify-between"
              style={{
                backfaceVisibility: 'hidden',
                backgroundColor: card.color || '#1a1a1a',
                border: '2px solid rgba(255,255,255,0.1)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
              }}
            >
              <div>
                <h3 className="text-2xl font-bold mb-4 text-creme">{card.frontTitle}</h3>
                <p className="text-gray-300">{card.frontContent}</p>
              </div>
              <div className="text-accent text-sm font-semibold">Click to flip →</div>
            </div>

            {/* Back of card */}
            <div
              className="absolute inset-0 rounded-xl p-6 flex flex-col justify-between"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                backgroundColor: card.color || '#1a1a1a',
                border: '2px solid rgba(255,255,255,0.1)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
              }}
            >
              <div>
                <h3 className="text-2xl font-bold mb-4 text-accent">{card.backTitle}</h3>
                <p className="text-gray-300">{card.backContent}</p>
              </div>
              <div className="text-creme text-sm font-semibold">← Click to flip back</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
