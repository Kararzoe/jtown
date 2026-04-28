"use client";

import { motion } from "framer-motion";
import { UserPlus, Megaphone, Eye, TrendingUp } from "lucide-react";

const steps = [
  { icon: UserPlus, title: "Create Your Profile", desc: "Sign up and set up your business or service profile in minutes" },
  { icon: Megaphone, title: "Choose a Promo Plan", desc: "Pick a visibility package that fits your budget and goals" },
  { icon: Eye, title: "Get Discovered", desc: "Your business gets seen by thousands of active buyers in Jos" },
  { icon: TrendingUp, title: "Grow & Scale", desc: "Track results, get reviews, and watch your business grow" },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4">
            Simple Process
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Four simple steps to boost your business visibility
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative text-center"
              >
                <div className="relative inline-block mb-4">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                    <Icon className="w-7 h-7 md:w-9 md:h-9 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 md:w-8 md:h-8 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center text-white dark:text-gray-900 font-bold text-xs md:text-sm shadow-md">
                    {idx + 1}
                  </div>
                </div>
                <h3 className="font-bold text-sm md:text-lg mb-2 text-gray-900 dark:text-white">{step.title}</h3>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-emerald-300 to-transparent" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
