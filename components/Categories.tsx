"use client";

import { motion } from "framer-motion";
import { Smartphone, Shirt, Home, Dumbbell, Book, Utensils, Car, Briefcase } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const categories = [
  { key: "electronics", icon: Smartphone, color: "from-blue-500 to-blue-600", slug: "electronics" },
  { key: "fashion", icon: Shirt, color: "from-pink-500 to-pink-600", slug: "fashion" },
  { key: "homeProperties", icon: Home, color: "from-green-500 to-green-600", slug: "home" },
  { key: "sports", icon: Dumbbell, color: "from-orange-500 to-orange-600", slug: "sports" },
  { key: "books", icon: Book, color: "from-purple-500 to-purple-600", slug: "books" },
  { key: "food", icon: Utensils, color: "from-red-500 to-red-600", slug: "food" },
  { key: "automotive", icon: Car, color: "from-gray-500 to-gray-600", slug: "automotive" },
  { key: "services", icon: Briefcase, color: "from-indigo-500 to-indigo-600", slug: "services" },
];

export default function Categories() {
  const { t } = useLanguage();
  
  return (
    <section id="categories" className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('browseCategories')}</h2>
          <p className="text-gray-600">{t('findWhatYouNeed')}</p>
        </motion.div>

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
