"use client";

import { motion } from "framer-motion";
import { Star, MessageCircle, Phone, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Breadcrumb from "./Breadcrumb";

interface CategoryPageProps {
  category: string;
}

const categoryProducts = {
  electronics: [
    { product: "Wireless Headphones", sellers: [
      { name: "TechHub Store", avatar: "🏪", logo: "💻", price: 89.99, rating: 4.8, phone: "+234 801 234 5678", location: "Bukuru" },
      { name: "Gadget World", avatar: "⚡", logo: "🔌", price: 85.00, rating: 4.7, phone: "+234 802 345 6789", location: "Rayfield" },
      { name: "Electronics Plus", avatar: "📱", logo: "🔋", price: 92.50, rating: 4.6, phone: "+234 803 456 7890", location: "Terminus" },
    ]},
    { product: "Smart Watch", sellers: [
      { name: "TechHub Store", avatar: "🏪", logo: "💻", price: 299.99, rating: 4.8, phone: "+234 801 234 5678", location: "Bukuru" },
      { name: "Gadget World", avatar: "⚡", logo: "🔌", price: 285.00, rating: 4.7, phone: "+234 802 345 6789", location: "Rayfield" },
    ]},
    { product: "iPhone 15 Pro", sellers: [
      { name: "TechHub Store", avatar: "🏪", logo: "💻", price: 1250000, rating: 4.8, phone: "+234 801 234 5678", location: "Bukuru" },
      { name: "Gadget World", avatar: "⚡", logo: "🔌", price: 1200000, rating: 4.7, phone: "+234 802 345 6789", location: "Rayfield" },
      { name: "Phone Palace", avatar: "📱", logo: "📱", price: 1280000, rating: 4.9, phone: "+234 807 890 1234", location: "Terminus" },
    ]},
    { product: "Samsung Galaxy S24", sellers: [
      { name: "Gadget World", avatar: "⚡", logo: "🔌", price: 950000, rating: 4.7, phone: "+234 802 345 6789", location: "Rayfield" },
      { name: "Phone Palace", avatar: "📱", logo: "📱", price: 920000, rating: 4.9, phone: "+234 807 890 1234", location: "Terminus" },
      { name: "Mobile Hub", avatar: "📞", logo: "📡", price: 975000, rating: 4.6, phone: "+234 808 901 2345", location: "Bukuru" },
    ]},
    { product: "Infinix Note 30", sellers: [
      { name: "Phone Palace", avatar: "📱", logo: "📱", price: 185000, rating: 4.9, phone: "+234 807 890 1234", location: "Terminus" },
      { name: "Mobile Hub", avatar: "📞", logo: "📡", price: 175000, rating: 4.6, phone: "+234 808 901 2345", location: "Bukuru" },
      { name: "TechHub Store", avatar: "🏪", logo: "💻", price: 190000, rating: 4.8, phone: "+234 801 234 5678", location: "Bukuru" },
    ]},
    { product: "Tecno Spark 10 Pro", sellers: [
      { name: "Mobile Hub", avatar: "📞", logo: "📡", price: 125000, rating: 4.6, phone: "+234 808 901 2345", location: "Bukuru" },
      { name: "Gadget World", avatar: "⚡", logo: "🔌", price: 120000, rating: 4.7, phone: "+234 802 345 6789", location: "Rayfield" },
    ]},
  ],
  fashion: [
    { product: "Designer Jacket", sellers: [
      { name: "Fashion Boutique", avatar: "👗", logo: "👗", price: 149.99, rating: 4.9, phone: "+234 804 567 8901", location: "Bukuru" },
      { name: "Urban Style", avatar: "🎨", logo: "👔", price: 135.00, rating: 4.7, phone: "+234 805 678 9012", location: "Rayfield" },
      { name: "Trendy Wears", avatar: "👔", logo: "👚", price: 155.00, rating: 4.5, phone: "+234 806 789 0123", location: "Terminus" },
    ]},
  ],
  food: [
    { product: "Bag of Rice (50kg)", sellers: [
      { name: "Mama Blessing Store", avatar: "🏪", logo: "🍚", price: 85000, rating: 4.8, phone: "+234 809 012 3456", location: "Bukuru Market" },
      { name: "Alhaji Provisions", avatar: "🛒", logo: "🌾", price: 82000, rating: 4.7, phone: "+234 810 123 4567", location: "Terminus Market" },
      { name: "Grace Foodstuff", avatar: "🌾", logo: "🍞", price: 87000, rating: 4.6, phone: "+234 811 234 5678", location: "Rayfield" },
    ]},
    { product: "Beans (Paint Bucket)", sellers: [
      { name: "Mama Blessing Store", avatar: "🏪", price: 12000, rating: 4.8, phone: "+234 809 012 3456", location: "Bukuru Market" },
      { name: "Alhaji Provisions", avatar: "🛒", price: 11500, rating: 4.7, phone: "+234 810 123 4567", location: "Terminus Market" },
    ]},
    { product: "Groundnut Oil (4 Litres)", sellers: [
      { name: "Grace Foodstuff", avatar: "🌾", price: 8500, rating: 4.6, phone: "+234 811 234 5678", location: "Rayfield" },
      { name: "Mama Blessing Store", avatar: "🏪", price: 9000, rating: 4.8, phone: "+234 809 012 3456", location: "Bukuru Market" },
      { name: "Fresh Mart", avatar: "🥜", price: 8200, rating: 4.9, phone: "+234 812 345 6789", location: "Terminus Market" },
    ]},
    { product: "Tomatoes (Big Basket)", sellers: [
      { name: "Fresh Mart", avatar: "🥜", price: 15000, rating: 4.9, phone: "+234 812 345 6789", location: "Terminus Market" },
      { name: "Mama Blessing Store", avatar: "🏪", price: 16000, rating: 4.8, phone: "+234 809 012 3456", location: "Bukuru Market" },
    ]},
    { product: "Yam Tubers (10 pieces)", sellers: [
      { name: "Alhaji Provisions", avatar: "🛒", price: 12000, rating: 4.7, phone: "+234 810 123 4567", location: "Terminus Market" },
      { name: "Grace Foodstuff", avatar: "🌾", price: 11500, rating: 4.6, phone: "+234 811 234 5678", location: "Rayfield" },
      { name: "Fresh Mart", avatar: "🥜", price: 13000, rating: 4.9, phone: "+234 812 345 6789", location: "Terminus Market" },
    ]},
    { product: "Garri (Paint Bucket)", sellers: [
      { name: "Mama Blessing Store", avatar: "🏪", price: 4500, rating: 4.8, phone: "+234 809 012 3456", location: "Bukuru Market" },
      { name: "Alhaji Provisions", avatar: "🛒", price: 4200, rating: 4.7, phone: "+234 810 123 4567", location: "Terminus Market" },
    ]},
    { product: "Palm Oil (4 Litres)", sellers: [
      { name: "Grace Foodstuff", avatar: "🌾", price: 7500, rating: 4.6, phone: "+234 811 234 5678", location: "Rayfield" },
      { name: "Fresh Mart", avatar: "🥜", price: 7200, rating: 4.9, phone: "+234 812 345 6789", location: "Terminus Market" },
      { name: "Mama Blessing Store", avatar: "🏪", price: 7800, rating: 4.8, phone: "+234 809 012 3456", location: "Bukuru Market" },
    ]},
  ],
};

export default function CategoryPage({ category }: CategoryPageProps) {
  const products = categoryProducts[category as keyof typeof categoryProducts] || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb items={[{ label: category.charAt(0).toUpperCase() + category.slice(1), href: "" }]} />
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
          className="flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-6"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2 capitalize">{category}</h1>
          <p className="text-gray-600">Compare prices from different sellers and contact them directly</p>
        </motion.div>

        <div className="space-y-8">
          {products.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-4">
                <h2 className="text-2xl font-bold">{item.product}</h2>
                <p className="text-primary-100 text-sm">{item.sellers.length} sellers available</p>
              </div>

              <div className="p-6">
                <div className="grid gap-4">
                  {item.sellers.map((seller, sellerIdx) => (
                    <motion.div
                      key={sellerIdx}
                      whileHover={{ scale: 1.01 }}
                      className="border-2 border-gray-200 rounded-xl p-4 hover:border-primary-500 transition-all"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <a href="/shop" className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center border-2 border-gray-300 dark:border-gray-600 hover:border-primary-500 transition cursor-pointer">
                            <span className="text-gray-400 text-xs">Logo</span>
                          </a>
                          <div className="flex-1">
                            <h3 className="font-bold text-xl mb-2">{seller.name}</h3>
                            <div className="space-y-1 text-sm">
                              <div className="flex items-center gap-2 text-gray-600">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <span className="font-semibold">{seller.rating}</span>
                                <span>rating</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="font-medium">{seller.location}, Jos</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-600">
                                <Phone className="w-4 h-4" />
                                <span className="font-medium">{seller.phone}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-center md:text-right">
                          <div className="text-2xl md:text-4xl font-bold text-primary-600 mb-1">₦{seller.price.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">Contact for availability</div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200 flex gap-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600"
                        >
                          <MessageCircle className="w-5 h-5" />
                          Chat Seller
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-primary-500 text-primary-600 rounded-lg font-semibold hover:bg-primary-50"
                        >
                          <Phone className="w-5 h-5" />
                          {seller.phone}
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
