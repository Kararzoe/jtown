"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";
import { useState, useEffect } from "react";

const deals = [
  { id: 1, title: "Flash Sale: 50% Off Electronics", bg: "from-red-500 to-orange-500", emoji: "⚡" },
  { id: 2, title: "New Arrivals: Fashion Collection", bg: "from-purple-500 to-pink-500", emoji: "✨" },
  { id: 3, title: "Weekend Special: Free Shipping", bg: "from-blue-500 to-cyan-500", emoji: "🚚" },
];

export default function TrendingBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % deals.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-gray-900 py-2 md:py-4 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-4 text-white px-4"
          >
            <Flame className="w-4 h-4 md:w-6 md:h-6 text-orange-400" />
            <span className="text-lg md:text-3xl">{deals[current].emoji}</span>
            <h3 className="text-xs md:text-xl font-bold text-center">{deals[current].title}</h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 md:px-6 py-1 md:py-2 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 text-xs md:text-base"
            >
              Shop Now
            </motion.button>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={() => setCurrent((prev) => (prev - 1 + deals.length) % deals.length)}
          className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 p-2 text-white hover:bg-white/10 rounded-full"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
        </button>
        <button
          onClick={() => setCurrent((prev) => (prev + 1) % deals.length)}
          className="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 p-2 text-white hover:bg-white/10 rounded-full"
        >
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </div>
    </section>
  );
}
