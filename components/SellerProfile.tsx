"use client";

import { motion } from "framer-motion";
import { Star, MapPin, Clock, MessageCircle, Store } from "lucide-react";

export default function SellerProfile({ seller }: any) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center text-4xl">
          {seller.avatar}
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{seller.name}</h2>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span>{seller.rating} rating</span>
            </div>
            <div className="flex items-center gap-1">
              <Store className="w-4 h-4" />
              <span>{seller.sales} sales</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>Jos, Nigeria</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>Joined 2023</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600"
        >
          <MessageCircle className="w-5 h-5" />
          Chat Now
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:border-primary-500 hover:text-primary-600"
        >
          View Store
        </motion.button>
      </div>
    </div>
  );
}
