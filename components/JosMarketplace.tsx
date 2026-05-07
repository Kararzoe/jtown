"use client";

import { motion } from "framer-motion";
import { Store, MapPin, Star, Phone, ShoppingBag, Shirt, Sparkles, Smartphone, UtensilsCrossed, Sofa, Pill } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function JosMarketplace() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");

  const marketCategories = [
    { key: "all", label: t('all'), icon: ShoppingBag },
    { key: "fashion", label: t('fashion'), icon: Shirt },
    { key: "cosmetics", label: t('cosmetics'), icon: Sparkles },
    { key: "electronics", label: t('electronics'), icon: Smartphone },
    { key: "food", label: t('food'), icon: UtensilsCrossed },
    { key: "furniture", label: t('furniture'), icon: Sofa },
    { key: "pharmacy", label: t('pharmacy'), icon: Pill },
  ];

  const vendors: any[] = [];
  const filtered = activeCategory === "all" ? vendors : vendors.filter((v) => v.category === activeCategory);

  return (
    <section id="marketplace" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 dark:bg-amber-900/30 rounded-full text-amber-600 dark:text-amber-400 text-sm font-medium mb-4"
          >
            <Store className="w-4 h-4" />
            {t('josMarketplace')}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {t('shopFrom')}{" "}
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              {t('shopFromVendors')}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto"
          >
            {t('vendorDescription')}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {marketCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.key
                    ? "bg-amber-500 text-white shadow-lg shadow-amber-500/25"
                    : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:border-amber-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-16"
          >
            <Store className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('comingSoon')}</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              {t('onboardingVendors')}
            </p>
            <a
              href="/become-seller"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition-all"
            >
              <Store className="w-4 h-4" /> {t('registerShop')}
            </a>
          </motion.div>
        ) : (
          filtered.map((vendor, idx) => (
            <motion.div
              key={vendor.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.03 }}
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 hover:border-amber-200 dark:hover:border-amber-700 hover:shadow-xl transition-all"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  {vendor.avatar}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-gray-900 dark:text-white truncate">{vendor.name}</h3>
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">{vendor.type}</p>
                </div>
              </div>

              <div className="space-y-1.5 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-xs">{vendor.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{vendor.rating}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <a
                  href={`tel:${vendor.phone}`}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition-all"
                >
                  <Phone className="w-4 h-4" /> {t('contact')}
                </a>
                <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 border-2 border-amber-500 text-amber-600 dark:text-amber-400 rounded-xl text-sm font-semibold hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all">
                  <Store className="w-4 h-4" /> {t('visit')}
                </button>
              </div>
            </motion.div>
          ))
        )}
        </div>
      </div>
    </section>
  );
}
