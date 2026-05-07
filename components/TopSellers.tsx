"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TopSellers() {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 dark:bg-amber-900/30 rounded-full text-amber-600 dark:text-amber-400 text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            {t('featuredBusinesses')}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">{t('topPromoted')}</h2>
          <p className="text-gray-500 dark:text-gray-400">{t('topPromotedDesc')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-12"
        >
          <TrendingUp className="w-14 h-14 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('noFeatured')}</h3>
          <p className="text-gray-500 dark:text-gray-400">{t('noFeaturedDesc')}</p>
        </motion.div>
      </div>
    </section>
  );
}
