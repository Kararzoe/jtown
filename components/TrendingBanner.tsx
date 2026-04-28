"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const deals = [
  { id: 1, title: "🚀 Boost Your Business — Get 50% Off Promotions This Week!", bg: "from-emerald-600 to-teal-600" },
  { id: 2, title: "✨ New: Premium Business Listings Now Available", bg: "from-purple-600 to-indigo-600" },
  { id: 3, title: "📢 Free Visibility Boost for New Sellers — Limited Time", bg: "from-amber-600 to-orange-600" },
];

export default function TrendingBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % deals.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={`relative bg-gradient-to-r ${deals[current].bg} py-2.5 md:py-3 px-4 overflow-hidden transition-all duration-500`}>
      <div className="max-w-7xl mx-auto relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-center gap-2 md:gap-4 text-white px-8"
          >
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
            <h3 className="text-xs md:text-sm font-semibold text-center">{deals[current].title}</h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:block px-4 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full font-medium hover:bg-white/30 text-xs border border-white/30 transition"
            >
              Learn More
            </motion.button>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={() => setCurrent((prev) => (prev - 1 + deals.length) % deals.length)}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-1 text-white/70 hover:text-white transition"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => setCurrent((prev) => (prev + 1) % deals.length)}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-white/70 hover:text-white transition"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
