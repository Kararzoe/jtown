"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, Search, Wrench } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <img src="/josmkt-logo-2.png" alt="JosMKT" className="w-20 h-20 mx-auto object-contain mb-6" />
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">{t('noResults')}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
            >
              <Home className="w-5 h-5" />
              {t('home')}
            </motion.button>
          </Link>
          <Link href="/#services">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 rounded-xl font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all"
            >
              <Wrench className="w-5 h-5" />
              {t('ourServices')}
            </motion.button>
          </Link>
          <Link href="/#marketplace">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 border-2 border-amber-500 text-amber-600 dark:text-amber-400 rounded-xl font-semibold hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all"
            >
              <Search className="w-5 h-5" />
              {t('browseCategories')}
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
