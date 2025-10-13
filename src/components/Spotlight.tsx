import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const Spotlight = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[5] opacity-70"
      animate={{
        background: [
          `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(74, 222, 128, 0.08), transparent 50%)`,
          `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(74, 222, 128, 0.12), transparent 60%)`,
          `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(74, 222, 128, 0.08), transparent 50%)`,
        ],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};
