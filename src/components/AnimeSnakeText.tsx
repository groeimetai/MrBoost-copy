import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface AnimeSnakeTextProps {
  text: string;
  className?: string;
}

export const AnimeSnakeText = ({ text, className = "" }: AnimeSnakeTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress relative to this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Animate the startOffset to move text along the path
  const startOffset = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "-50%"]
  );

  return (
    <section ref={containerRef} className="relative h-[100vh] overflow-hidden border-t border-border">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          viewBox="0 0 2000 800"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Define a wavy path for text to follow */}
            <path
              id="wavePath"
              d="M -500,400 Q -250,840 0,400 T 500,400 T 1000,400 T 1500,400 T 2000,400 T 2500,400 T 3000,400"
              fill="none"
              stroke="none"
            />
          </defs>

          {/* Text following the path - duplicate for seamless loop */}
          <text
            style={{
              fontFamily: "'Gilroy-Bold', 'Gilroy', Arial, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(80px, 12vw, 160px)",
              fill: "#eae5db",
              textTransform: "uppercase",
              letterSpacing: "-0.05em",
              fontStyle: "italic",
            }}
          >
            <motion.textPath
              href="#wavePath"
              style={{ startOffset }}
            >
              {text} · {text} · {text} · {text}
            </motion.textPath>
          </text>
        </svg>
      </div>

      {/* Gradient overlays for smooth entrance/exit */}
      <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
    </section>
  );
};
