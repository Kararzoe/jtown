"use client";

import { motion } from "framer-motion";
import { Shield, CheckCircle, Lock, Users } from "lucide-react";

const features = [
  { icon: Shield, title: "Verified Sellers", desc: "All sellers are verified before listing" },
  { icon: CheckCircle, title: "Quality Assured", desc: "Products checked for authenticity" },
  { icon: Lock, title: "Secure Contacts", desc: "Your information is protected" },
  { icon: Users, title: "Community Trust", desc: "Ratings from real buyers" },
];

export default function TrustSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop with Confidence</h2>
          <p className="text-gray-600">Your safety is our priority</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-4 md:p-6 rounded-xl hover:bg-gray-50 transition"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary-600" />
                </div>
                <h3 className="font-bold text-sm md:text-lg mb-2">{feature.title}</h3>
                <p className="text-xs md:text-sm text-gray-600">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
