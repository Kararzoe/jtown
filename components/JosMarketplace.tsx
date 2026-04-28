"use client";

import { motion } from "framer-motion";
import { Store, MapPin, Star, Phone, ShoppingBag, Shirt, Sparkles, Smartphone, UtensilsCrossed, Sofa, Pill } from "lucide-react";
import { useState } from "react";

const marketCategories = [
  { key: "all", label: "All", icon: ShoppingBag },
  { key: "fashion", label: "Fashion", icon: Shirt },
  { key: "cosmetics", label: "Cosmetics", icon: Sparkles },
  { key: "electronics", label: "Electronics", icon: Smartphone },
  { key: "food", label: "Food", icon: UtensilsCrossed },
  { key: "furniture", label: "Furniture", icon: Sofa },
  { key: "pharmacy", label: "Pharmacy", icon: Pill },
];

const vendors = [
  // Fashion
  { name: "Mr R Maleek", category: "fashion", type: "Men's Fashion & Shoes", location: "Terminus Market, Jos", rating: 4.8, phone: "+234XXXXXXXXXX", avatar: "👔" },
  { name: "Shoe Food", category: "fashion", type: "Sneakers & Footwear", location: "Terminus, Jos", rating: 4.7, phone: "+234XXXXXXXXXX", avatar: "👟" },
  { name: "Tonero", category: "fashion", type: "Fashion & Streetwear", location: "Jos", rating: 4.9, phone: "+234XXXXXXXXXX", avatar: "🧥" },
  { name: "House of Fabrics", category: "fashion", type: "Fabrics & Traditional Wear", location: "Bukuru, Jos", rating: 4.6, phone: "+234XXXXXXXXXX", avatar: "🪡" },

  // Cosmetics
  { name: "Glow Beauty Hub", category: "cosmetics", type: "Skincare & Makeup", location: "Rayfield, Jos", rating: 4.8, phone: "+234XXXXXXXXXX", avatar: "💄" },
  { name: "Scent Palace", category: "cosmetics", type: "Perfumes & Fragrances", location: "Terminus, Jos", rating: 4.7, phone: "+234XXXXXXXXXX", avatar: "🧴" },
  { name: "Natural Hair Studio", category: "cosmetics", type: "Hair Products & Extensions", location: "Angwan Rogo, Jos", rating: 4.5, phone: "+234XXXXXXXXXX", avatar: "💇" },

  // Electronics
  { name: "TechHub Jos", category: "electronics", type: "Phones & Laptops", location: "Ahmadu Bello Way, Jos", rating: 4.9, phone: "+234XXXXXXXXXX", avatar: "📱" },
  { name: "Gadget World", category: "electronics", type: "Gadgets & Accessories", location: "Terminus, Jos", rating: 4.6, phone: "+234XXXXXXXXXX", avatar: "⚡" },
  { name: "Solar King", category: "electronics", type: "Solar Panels & Inverters", location: "Bukuru, Jos", rating: 4.7, phone: "+234XXXXXXXXXX", avatar: "☀️" },

  // Food
  { name: "Jos Grills", category: "food", type: "Grills & BBQ", location: "Rayfield, Jos", rating: 4.8, phone: "+234XXXXXXXXXX", avatar: "🍖" },
  { name: "Mama's Kitchen", category: "food", type: "Local Dishes & Catering", location: "Lamingo, Jos", rating: 4.9, phone: "+234XXXXXXXXXX", avatar: "🍲" },
  { name: "Fresh Farm Produce", category: "food", type: "Fresh Fruits & Vegetables", location: "Farin Gada Market, Jos", rating: 4.5, phone: "+234XXXXXXXXXX", avatar: "🥬" },
  { name: "Plateau Bakery", category: "food", type: "Bread, Cakes & Pastries", location: "Terminus, Jos", rating: 4.7, phone: "+234XXXXXXXXXX", avatar: "🎂" },

  // Furniture
  { name: "Royal Furniture", category: "furniture", type: "Home & Office Furniture", location: "Bukuru, Jos", rating: 4.6, phone: "+234XXXXXXXXXX", avatar: "🛋️" },
  { name: "WoodCraft Jos", category: "furniture", type: "Custom Woodwork", location: "Lamingo, Jos", rating: 4.8, phone: "+234XXXXXXXXXX", avatar: "🪑" },

  // Pharmacy
  { name: "HealthPlus Jos", category: "pharmacy", type: "Pharmacy & Wellness", location: "Ahmadu Bello Way, Jos", rating: 4.9, phone: "+234XXXXXXXXXX", avatar: "💊" },
  { name: "MedCare Pharmacy", category: "pharmacy", type: "Drugs & Medical Supplies", location: "Terminus, Jos", rating: 4.7, phone: "+234XXXXXXXXXX", avatar: "🏥" },
];

export default function JosMarketplace() {
  const [activeCategory, setActiveCategory] = useState("all");

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
            Jos Marketplace
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Shop from{" "}
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              Jos Vendors
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto"
          >
            Discover real shops and vendors selling in Jos — fashion, food, electronics & more
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
          {filtered.map((vendor, idx) => (
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
                  <Phone className="w-4 h-4" /> Contact
                </a>
                <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 border-2 border-amber-500 text-amber-600 dark:text-amber-400 rounded-xl text-sm font-semibold hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all">
                  <Store className="w-4 h-4" /> Visit
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
