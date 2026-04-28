"use client";

import { motion } from "framer-motion";
import { Wrench, Zap, Flame, CakeSlice, Paintbrush, Car, Scissors, Hammer, ShowerHead, Shirt, Camera, Laptop, Truck, Baby, Dog, Dumbbell } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const categories = [
  { key: "plumbing", label: "Plumbing", icon: ShowerHead, color: "from-blue-500 to-indigo-600", slug: "plumbing" },
  { key: "electrical", label: "Electricians", icon: Zap, color: "from-amber-500 to-orange-600", slug: "electrical" },
  { key: "ac", label: "AC Installation", icon: Flame, color: "from-cyan-500 to-blue-600", slug: "ac" },
  { key: "baking", label: "Bakers & Catering", icon: CakeSlice, color: "from-pink-500 to-rose-600", slug: "baking" },
  { key: "painting", label: "Painting", icon: Paintbrush, color: "from-purple-500 to-violet-600", slug: "painting" },
  { key: "mechanic", label: "Auto Mechanic", icon: Car, color: "from-red-500 to-pink-600", slug: "mechanic" },
  { key: "barbing", label: "Barbing & Salon", icon: Scissors, color: "from-emerald-500 to-teal-600", slug: "barbing" },
  { key: "carpentry", label: "Carpentry", icon: Hammer, color: "from-yellow-600 to-amber-600", slug: "carpentry" },
  { key: "tailoring", label: "Tailoring", icon: Shirt, color: "from-indigo-500 to-purple-600", slug: "tailoring" },
  { key: "photography", label: "Photography", icon: Camera, color: "from-rose-500 to-red-600", slug: "photography" },
  { key: "tech", label: "Tech & Repairs", icon: Laptop, color: "from-gray-600 to-gray-800", slug: "tech" },
  { key: "logistics", label: "Logistics & Moving", icon: Truck, color: "from-green-500 to-emerald-600", slug: "logistics" },
  { key: "cleaning", label: "Cleaning", icon: Wrench, color: "from-teal-500 to-cyan-600", slug: "cleaning" },
  { key: "childcare", label: "Childcare", icon: Baby, color: "from-sky-400 to-blue-500", slug: "childcare" },
  { key: "pets", label: "Pet Services", icon: Dog, color: "from-orange-500 to-amber-600", slug: "pets" },
  { key: "fitness", label: "Fitness & Gym", icon: Dumbbell, color: "from-lime-500 to-green-600", slug: "fitness" },
];

export default function Categories() {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4"
          >
            Our Services
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Find a{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              Service Provider
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto"
          >
            Trusted professionals in Jos ready to get the job done
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
                    <h3 className="text-center font-semibold text-sm md:text-base text-gray-900 dark:text-white">{category.label}</h3>
                    <p className="text-center text-xs text-gray-400 mt-1 hidden md:block">Explore →</p>
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
