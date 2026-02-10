"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Blessing Danjuma", avatar: "👩", rating: 5, text: "Found my dream apartment in Rayfield! The agent was very professional.", category: "Property Buyer" },
  { name: "Ibrahim Musa", avatar: "👨", rating: 5, text: "Sold my iPhone 14 in just 2 days. Great platform for electronics!", category: "Electronics Seller" },
  { name: "Grace Okoro", avatar: "👩", rating: 5, text: "Best place to buy foodstuff in bulk. Prices are competitive!", category: "Food Buyer" },
  { name: "David Gyang", avatar: "👨", rating: 5, text: "My fashion store gets lots of customers from this marketplace.", category: "Fashion Seller" },
];

export default function Testimonials() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What People Say</h2>
          <p className="text-gray-600">Real experiences from our community</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gray-50 rounded-xl md:rounded-2xl p-4 md:p-6 relative"
            >
              <Quote className="w-6 h-6 md:w-8 md:h-8 text-primary-200 absolute top-3 md:top-4 right-3 md:right-4" />
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-100 rounded-full flex items-center justify-center text-xl md:text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-sm md:text-base">{testimonial.name}</h4>
                  <p className="text-xs text-gray-600">{testimonial.category}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-2 md:mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-xs md:text-sm text-gray-700">{testimonial.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
