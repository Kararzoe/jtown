"use client";

import { motion } from "framer-motion";
import { Smartphone, Download } from "lucide-react";

export default function AppDownload() {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-primary-600 to-primary-700">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-4xl font-bold mb-4">Get the Jos Marketplace App</h2>
            <p className="text-primary-100 mb-6">Shop on the go. Available on Android & iOS</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold"
              >
                <Download className="w-5 h-5" />
                Google Play
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold"
              >
                <Download className="w-5 h-5" />
                App Store
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-9xl"
          >
            📱
          </motion.div>
        </div>
      </div>
    </section>
  );
}
