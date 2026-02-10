"use client";

import { motion } from "framer-motion";
import { Star, Store } from "lucide-react";

const topSellers = [
  { name: "TechHub Store", avatar: "🏪", rating: 4.8, sales: 1200, products: 45 },
  { name: "Fashion Boutique", avatar: "👗", rating: 4.9, sales: 850, products: 120 },
  { name: "Gadget World", avatar: "⚡", rating: 4.7, sales: 2100, products: 78 },
  { name: "Sports Arena", avatar: "🏃", rating: 4.6, sales: 950, products: 65 },
];

export default function TopSellers() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Sellers</h2>
          <p className="text-gray-600">Shop from verified sellers with excellent ratings</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {topSellers.map((seller, index) => (
            <motion.div
              key={seller.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white border-2 border-gray-200 rounded-xl md:rounded-2xl p-4 md:p-6 hover:border-primary-500 hover:shadow-xl transition-all cursor-pointer"
            >
              <div className="text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 md:mb-4 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center text-3xl md:text-4xl">
                  {seller.avatar}
                </div>
                <h3 className="font-bold text-sm md:text-lg mb-2">{seller.name}</h3>
                <div className="flex items-center justify-center gap-1 mb-2 md:mb-3">
                  <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs md:text-sm font-semibold">{seller.rating}</span>
                  <span className="text-xs md:text-sm text-gray-500">({seller.sales} sales)</span>
                </div>
                <div className="flex items-center justify-center gap-1 text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
                  <Store className="w-3 h-3 md:w-4 md:h-4" />
                  <span>{seller.products} products</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-3 md:px-4 py-2 bg-primary-500 text-white rounded-lg text-sm md:text-base font-semibold hover:bg-primary-600"
                >
                  Visit Store
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
