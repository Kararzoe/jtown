"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Blessing Danjuma", avatar: "👩", rating: 5, text: "My restaurant got 3x more customers after listing on JosMKT. The visibility boost is real!", category: "Restaurant Owner" },
  { name: "Ibrahim Musa", avatar: "👨", rating: 5, text: "Sold out my electronics stock in a week thanks to the promotion package. Incredible platform.", category: "Electronics Seller" },
  { name: "Grace Okoro", avatar: "👩", rating: 5, text: "The branding service helped me create a professional image for my fashion business.", category: "Fashion Designer" },
  { name: "David Gyang", avatar: "👨", rating: 5, text: "From zero online presence to hundreds of daily views. JosMKT changed my business.", category: "Service Provider" },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4">
            Success Stories
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">What Business Owners Say</h2>
          <p className="text-gray-500 dark:text-gray-400">Real results from real businesses in Jos</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 relative border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all"
            >
              <Quote className="w-8 h-8 text-emerald-100 dark:text-emerald-900/50 absolute top-4 right-4" />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-xl flex items-center justify-center text-xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">{testimonial.name}</h4>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{testimonial.category}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{testimonial.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
