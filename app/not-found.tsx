"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, Wrench, Store, UserPlus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-lg"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t('comingSoon')}</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">{t('onboardingVendors')}</p>
        
        <div className="flex flex-wrap gap-4 justify-center mb-10">
          <Link href="/become-seller">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
            >
              <UserPlus className="w-5 h-5" />
              {t('registerShop')}
            </motion.button>
          </Link>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 rounded-xl font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all"
            >
              <Home className="w-5 h-5" />
              {t('home')}
            </motion.button>
          </Link>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/#services" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition">
            <Wrench className="w-4 h-4" />
            {t('ourServices')}
          </Link>
          <Link href="/#marketplace" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition">
            <Store className="w-4 h-4" />
            {t('browseCategories')}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
