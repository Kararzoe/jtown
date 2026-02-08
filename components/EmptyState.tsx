"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function EmptyState({ 
  icon = "🔍", 
  title = "No results found", 
  description = "Try adjusting your filters or search terms",
  action
}: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16"
    >
      <div className="text-8xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">{description}</p>
      {action && (
        <button className="px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600">
          {action.label}
        </button>
      )}
    </motion.div>
  );
}
