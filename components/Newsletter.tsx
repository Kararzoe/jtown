"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Newsletter() {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-emerald-950 to-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-16 h-16 rounded-2xl overflow-hidden mx-auto mb-6 shadow-lg shadow-emerald-500/20">
            <img src="/photo_2026-05-10_20-15-36.jpg" alt="JosMKT" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('readyToGrow')}</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">{t('weeklyTips')}</p>

          <div className="max-w-md mx-auto px-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder={t('enterEmail')}
                className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 backdrop-blur-sm transition"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-5 h-5" />
                {t('subscribe')}
              </motion.button>
            </div>
            <p className="text-xs text-gray-500 mt-3">{t('freeForever')}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
