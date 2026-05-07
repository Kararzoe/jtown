"use client";

import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FAQ() {
  const { t } = useLanguage();
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
    { q: t('faq4Q'), a: t('faq4A') },
    { q: t('faq5Q'), a: t('faq5A') },
    { q: t('faq6Q'), a: t('faq6A') },
  ];

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4">
            {t('faqTitle')}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">{t('faqTitle')}</h2>
          <p className="text-gray-500 dark:text-gray-400">{t('faqSubtitle')}</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden hover:border-emerald-200 dark:hover:border-emerald-700 transition-colors"
            >
              <button
                onClick={() => setOpen(open === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition"
              >
                <span className="font-semibold text-left text-gray-900 dark:text-white text-sm md:text-base">{faq.q}</span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${open === idx ? 'bg-emerald-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
                  {open === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              {open === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed"
                >
                  {faq.a}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
