import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

export const Anime3DCookbook = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const items = Array.from(gridRef.current.querySelectorAll('.grid-item'));

    // Staggered entrance animation
    items.forEach((item, index) => {
      animate(item as HTMLElement, {
        scale: [0, 1],
        opacity: [0, 1],
        translateZ: [400, 0],
        rotateY: [-90, 0],
        duration: 800,
        delay: index * 100,
        ease: 'out(4)'
      });
    });

    // Continuous floating animation for each item
    items.forEach((item, index) => {
      const floatAnimation = () => {
        animate(item as HTMLElement, {
          translateY: [0, -20, 0],
          duration: 3000,
          ease: 'inOut(2)',
          complete: floatAnimation
        });
      };
      setTimeout(() => floatAnimation(), index * 100);
    });

    // Mouse move parallax
    const handleMouseMove = (e: MouseEvent) => {
      if (!gridRef.current) return;

      const rect = gridRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 20;
      const y = (e.clientY - rect.top - rect.height / 2) / 20;

      items.forEach((item) => {
        animate(item as HTMLElement, {
          rotateY: x,
          rotateX: -y,
          duration: 500,
          ease: 'out(3)'
        });
      });
    };

    gridRef.current.addEventListener('mousemove', handleMouseMove);

    return () => {
      gridRef.current?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const items = [
    { emoji: '🚀', title: 'Innovation', color: 'from-blue-500 to-purple-600' },
    { emoji: '✨', title: 'Creativity', color: 'from-pink-500 to-red-600' },
    { emoji: '⚡', title: 'Speed', color: 'from-yellow-500 to-orange-600' },
    { emoji: '💎', title: 'Quality', color: 'from-cyan-500 to-blue-600' },
    { emoji: '🎨', title: 'Design', color: 'from-purple-500 to-pink-600' },
    { emoji: '🔥', title: 'Energy', color: 'from-orange-500 to-red-600' },
    { emoji: '🌟', title: 'Excellence', color: 'from-green-500 to-teal-600' },
    { emoji: '🎯', title: 'Precision', color: 'from-indigo-500 to-purple-600' }
  ];

  return (
    <section className="py-32 relative border-t border-border bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-creme italic mb-4">
            Interactive Grid
          </h2>
          <p className="text-creme/70 text-lg">
            Move your mouse over the grid
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto"
          style={{ perspective: '1000px' }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="grid-item group cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                className={`relative bg-gradient-to-br ${item.color} rounded-2xl p-8 h-48 flex flex-col items-center justify-center shadow-2xl transition-all duration-300 group-hover:shadow-3xl`}
              >
                <div className="text-6xl mb-3">{item.emoji}</div>
                <h3 className="text-white text-xl font-bold">{item.title}</h3>

                {/* Shine effect */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)',
                    backgroundSize: '200% 200%',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
