"use client";

import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="py-16 px-4 bg-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-gray-400 mb-8">Get the latest deals and new listings delivered to your inbox</p>
          
          <div className="max-w-md mx-auto px-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-4 bg-primary-500 text-white rounded-full font-semibold hover:bg-primary-600 flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                Subscribe
              </motion.button>
            </div>
            <p className="text-xs text-gray-500 mt-3">We respect your privacy. Unsubscribe anytime.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
