"use client";

import { motion } from "framer-motion";
import { Star, Eye, TrendingUp } from "lucide-react";

const topSellers = [
  { name: "TechHub Store", avatar: "🏪", rating: 4.8, views: 12000, services: 8 },
  { name: "Fashion Boutique", avatar: "👗", rating: 4.9, views: 8500, services: 15 },
  { name: "Gadget World", avatar: "⚡", rating: 4.7, views: 21000, services: 12 },
  { name: "Sports Arena", avatar: "🏃", rating: 4.6, views: 9500, services: 6 },
];

export default function TopSellers() {
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
            Featured Businesses
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Top Promoted Businesses</h2>
          <p className="text-gray-500 dark:text-gray-400">Businesses with the highest visibility and engagement</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {topSellers.map((seller, index) => (
            <motion.div
              key={seller.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 md:p-6 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-xl hover:shadow-emerald-500/5 transition-all cursor-pointer"
            >
              <div className="text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-2xl flex items-center justify-center text-3xl md:text-4xl">
                  {seller.avatar}
                </div>
                <h3 className="font-bold text-sm md:text-lg mb-2 text-gray-900 dark:text-white">{seller.name}</h3>
                <div className="flex items-center justify-center gap-1 mb-3">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{seller.rating}</span>
                </div>
                <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-4">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{seller.views.toLocaleString()} views</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
                >
                  View Profile
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
