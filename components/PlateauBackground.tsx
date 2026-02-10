"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PlateauBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const icons = [
    { emoji: "🏔️", size: "text-6xl md:text-9xl", duration: 25 },
    { emoji: "☀️", size: "text-5xl md:text-8xl", duration: 30 },
    { emoji: "🌾", size: "text-4xl md:text-7xl", duration: 35 },
    { emoji: "🌄", size: "text-5xl md:text-8xl", duration: 28 },
    { emoji: "🌳", size: "text-4xl md:text-6xl", duration: 32 },
    { emoji: "💎", size: "text-4xl md:text-7xl", duration: 27 },
    { emoji: "🏘️", size: "text-4xl md:text-6xl", duration: 33 },
    { emoji: "⛰️", size: "text-5xl md:text-8xl", duration: 29 },
  ];
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {icons.map((item, i) => (
        <motion.div
          key={i}
          className={`absolute ${item.size} opacity-20`}
          initial={{ 
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
          }}
          animate={{
            x: [
              Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            ],
            y: [
              Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            ],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
      
      <motion.div
        className="absolute top-20 left-20 text-6xl md:text-9xl opacity-30"
        animate={{
          y: [0, -30, 0],
          rotate: [-10, 10, -10],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        🏔️
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-20 text-6xl md:text-9xl opacity-30"
        animate={{
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        ☀️
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl md:text-[200px] opacity-10"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        🌄
      </motion.div>

      <motion.div
        className="absolute top-40 right-1/4 text-5xl md:text-8xl opacity-25"
        animate={{
          y: [0, -20, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        🌾
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-primary-50/30 via-transparent to-primary-50/30" />
    </div>
  );
}
