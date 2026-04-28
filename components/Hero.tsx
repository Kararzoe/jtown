"use client";

import { motion } from "framer-motion";
import { Search, Rocket, Eye, TrendingUp, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-gray-900 via-emerald-950 to-gray-900 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      >
        <source src="/7669651-hd_1920_1080_25fps.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-emerald-900/40 to-gray-900/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10 px-4 py-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-300 text-sm font-medium mb-8 backdrop-blur-sm"
          >
            <Zap className="w-4 h-4" />
            Your #1 Platform for Finding Help in Jos
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Find the{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Right Help
            </span>
            <br />
            When You{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-300 bg-clip-text text-transparent">
              Need It
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Plumbers, electricians, bakers, mechanics & more — find trusted service providers in Jos, fast.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-2xl mx-auto mb-10"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search for a service... e.g. plumber, electrician"
                className="w-full px-6 py-5 pr-14 rounded-2xl border-2 border-white/10 bg-white/10 backdrop-blur-md focus:border-emerald-400 focus:bg-white/15 focus:outline-none text-white placeholder-gray-400 shadow-2xl transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-3.5 rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {["Plumbing", "Electricians", "AC Repair", "Bakers"].map((tag) => (
              <motion.button
                key={tag}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 bg-white/10 backdrop-blur-sm text-white rounded-full border border-white/20 hover:bg-emerald-500/20 hover:border-emerald-400/40 transition-all text-sm font-medium"
              >
                {tag}
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-3 gap-6 max-w-lg mx-auto"
          >
            {[
              { icon: Eye, value: "—", label: "Monthly Views" },
              { icon: Rocket, value: "—", label: "Businesses" },
              { icon: TrendingUp, value: "—", label: "Growth Rate" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-gray-400">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
