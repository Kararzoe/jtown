"use client";

import { motion } from "framer-motion";
import { Smartphone, Shirt, Home, Dumbbell, Book, Utensils, Car, Briefcase, Phone, Laptop } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const categories = [
  { key: "phones", icon: Phone, color: "from-blue-500 to-blue-600", slug: "phones" },
  { key: "gadgets", icon: Laptop, color: "from-purple-500 to-purple-600", slug: "gadgets" },
  { key: "electronics", icon: Smartphone, color: "from-cyan-500 to-cyan-600", slug: "electronics" },
  { key: "fashion", icon: Shirt, color: "from-pink-500 to-pink-600", slug: "fashion" },
  { key: "homeProperties", icon: Home, color: "from-green-500 to-green-600", slug: "home" },
  { key: "sports", icon: Dumbbell, color: "from-orange-500 to-orange-600", slug: "sports" },
  { key: "books", icon: Book, color: "from-violet-500 to-violet-600", slug: "books" },
  { key: "food", icon: Utensils, color: "from-red-500 to-red-600", slug: "food" },
];

export default function Categories() {
  const { t } = useLanguage();
  
  return (
    <section id="categories" className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            {t('browseCategories').split('').map((char: string, i: number) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03, duration: 0.4 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-600 text-lg"
          >
            {t('findWhatYouNeed')}
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-600 mx-auto mt-4 rounded-full"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link key={category.key} href={`/products?category=${category.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group cursor-pointer"
                >
                  <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-md hover:shadow-xl transition-all border border-gray-100">
                    <div className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    <h3 className="text-center font-semibold text-sm md:text-base text-gray-900">{t(category.key)}</h3>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
