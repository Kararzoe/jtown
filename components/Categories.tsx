"use client";

import { motion } from "framer-motion";
import { Wrench, Zap, Flame, CakeSlice, Paintbrush, Car, Scissors, Hammer, ShowerHead, Shirt, Camera, Laptop, Truck, Sofa, GraduationCap, Sparkles, Calendar, Home, Brick } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const categories = [
  { key: "plumbing", icon: ShowerHead, color: "from-blue-500 to-indigo-600", slug: "plumbing", label: "Plumbing" },
  { key: "electrical", icon: Zap, color: "from-amber-500 to-orange-600", slug: "electrical", label: "Electricians" },
  { key: "ac", icon: Flame, color: "from-cyan-500 to-blue-600", slug: "ac", label: "AC Installation" },
  { key: "furniture", icon: Sofa, color: "from-yellow-600 to-amber-600", slug: "furniture", label: "Furniture" },
  { key: "catering", icon: CakeSlice, color: "from-pink-500 to-rose-600", slug: "catering", label: "Catering & Food" },
  { key: "painting", icon: Paintbrush, color: "from-purple-500 to-violet-600", slug: "painting", label: "Painting" },
  { key: "mechanic", icon: Car, color: "from-red-500 to-pink-600", slug: "mechanic", label: "Auto Mechanic" },
  { key: "barbing", icon: Scissors, color: "from-emerald-500 to-teal-600", slug: "barbing", label: "Barbing & Salon" },
  { key: "carpentry", icon: Hammer, color: "from-yellow-600 to-amber-600", slug: "carpentry", label: "Carpentry" },
  { key: "fashionDesign", icon: Shirt, color: "from-indigo-500 to-purple-600", slug: "fashion-design", label: "Fashion Design" },
  { key: "shoemaking", icon: Wrench, color: "from-orange-500 to-amber-600", slug: "shoemaking", label: "Shoe Making" },
  { key: "photography", icon: Camera, color: "from-rose-500 to-red-600", slug: "photography", label: "Photography" },
  { key: "tech", icon: Laptop, color: "from-gray-600 to-gray-800", slug: "tech", label: "Tech & Repairs" },
  { key: "logistics", icon: Truck, color: "from-green-500 to-emerald-600", slug: "logistics", label: "Logistics" },
  { key: "laundry", icon: Wrench, color: "from-teal-500 to-cyan-600", slug: "laundry", label: "Laundry & Cleaning" },
  { key: "education", icon: GraduationCap, color: "from-sky-400 to-blue-500", slug: "education", label: "Education" },
  { key: "perfumery", icon: Sparkles, color: "from-pink-400 to-purple-500", slug: "perfumery", label: "Perfumery" },
  { key: "makeup", icon: Sparkles, color: "from-rose-400 to-pink-500", slug: "makeup", label: "Make Up" },
  { key: "eventPlanning", icon: Calendar, color: "from-violet-500 to-purple-600", slug: "event-planning", label: "Event Planning" },
  { key: "rentals", icon: Home, color: "from-emerald-500 to-green-600", slug: "rentals", label: "Rentals" },
  { key: "mason", icon: Brick, color: "from-stone-500 to-gray-600", slug: "mason", label: "Mason" },
  { key: "phoneAccessories", icon: Laptop, color: "from-blue-400 to-indigo-500", slug: "phone-accessories", label: "Phone Accessories" },
  { key: "legalSolicitors", icon: GraduationCap, color: "from-slate-600 to-gray-700", slug: "legal", label: "Legal & Solicitors" },
];

export default function Categories() {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-20 px-4 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-300/20 rounded-full blur-3xl animate-blob" />
      <div className="absolute top-40 right-0 w-72 h-72 bg-teal-300/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-cyan-300/20 rounded-full blur-3xl animate-blob animation-delay-4000" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4"
          >
            {t('ourServices')}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {t('findA')}{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              {t('findServiceProvider')}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto"
          >
            {t('trustedProfessionals')}
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link key={category.key} href={`/services?category=${category.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="group cursor-pointer"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 md:p-7 shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-700">
                    <div className={`w-12 h-12 md:w-14 md:h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                      <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    <h3 className="text-center font-semibold text-sm md:text-base text-gray-900 dark:text-white">{(category as any).label || t(category.key)}</h3>
                    <p className="text-center text-xs text-gray-400 mt-1 hidden md:block">{t('explore')}</p>
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
