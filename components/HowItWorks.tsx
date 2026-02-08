"use client";

import { motion } from "framer-motion";
import { Search, MessageCircle, Star } from "lucide-react";

const steps = [
  { icon: Search, title: "Browse & Search", desc: "Find products from verified sellers across Jos" },
  { icon: MessageCircle, title: "Contact Seller", desc: "Chat or call sellers directly for details" },
  { icon: Star, title: "Meet & Negotiate", desc: "Arrange payment and delivery with seller" },
  { icon: Star, title: "Rate & Review", desc: "Share your experience to help others" },
];

export default function HowItWorks() {
  return (
    <section className="py-8 md:py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">How It Works</h2>
          <p className="text-sm md:text-base text-gray-600">Simple steps to buy or sell anything</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="w-12 h-12 md:w-20 md:h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4 relative">
                    <Icon className="w-6 h-6 md:w-10 md:h-10 text-white" />
                    <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-5 h-5 md:w-8 md:h-8 bg-primary-700 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm">
                      {idx + 1}
                    </div>
                  </div>
                  <h3 className="font-bold text-xs md:text-lg mb-1 md:mb-2">{step.title}</h3>
                  <p className="text-xs md:text-sm text-gray-600">{step.desc}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-primary-200" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
