"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  
  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-primary-100 py-20 px-4 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      >
        <source src="/7669651-hd_1920_1080_25fps.mp4" type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6"
            style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}
          >
            {t('welcome')}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-white mb-8 md:mb-12 max-w-2xl mx-auto px-4"
            style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <input
                type="text"
                placeholder={t('search')}
                className="w-full px-6 py-4 pr-14 rounded-full border-2 border-white/30 bg-white/95 backdrop-blur-sm focus:border-primary-500 focus:outline-none shadow-2xl text-gray-900 placeholder-gray-600"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-500 text-white p-3 rounded-full hover:bg-primary-600 transition shadow-lg">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 md:mt-12 flex flex-wrap justify-center gap-2 md:gap-4 text-sm text-white px-4"
            style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}
          >
            <span className="font-semibold">{t('popular')}:</span>
            {["Electronics", "Fashion", "Home & Garden", "Sports"].map((tag) => (
              <motion.button
                key={tag}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full shadow-lg hover:shadow-xl transition font-medium"
              >
                {tag}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
