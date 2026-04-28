"use client";

import { motion } from "framer-motion";
import { Rocket, Send } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-emerald-950 to-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
            <Rocket className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Grow Your Business?</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">Get weekly tips on visibility, promotions, and business growth delivered to your inbox</p>

          <div className="max-w-md mx-auto px-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 backdrop-blur-sm transition"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-5 h-5" />
                Subscribe
              </motion.button>
            </div>
            <p className="text-xs text-gray-500 mt-3">Free forever. Unsubscribe anytime.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
