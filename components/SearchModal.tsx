"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, X, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const trending = ["iPhone 15", "Rice", "3 Bedroom Flat", "Designer Jacket", "Smart Watch"];
  const categories = ["Electronics", "Fashion", "Food", "Home & Properties"];

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.toLowerCase().includes("phone") || searchTerm.toLowerCase().includes("iphone")) {
      router.push("/category/electronics");
    } else if (searchTerm.toLowerCase().includes("rice") || searchTerm.toLowerCase().includes("food")) {
      router.push("/category/food");
    } else if (searchTerm.toLowerCase().includes("flat") || searchTerm.toLowerCase().includes("house")) {
      router.push("/category/home");
    } else if (searchTerm.toLowerCase().includes("jacket") || searchTerm.toLowerCase().includes("fashion")) {
      router.push("/category/fashion");
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-4 right-4 md:left-1/2 md:-translate-x-1/2 z-50 md:w-full md:max-w-2xl"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Search className="w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for products, categories, or locations..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch(query)}
                  className="flex-1 text-lg outline-none"
                  autoFocus
                />
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-semibold">Trending Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trending.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleSearch(term)}
                      className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-primary-100 hover:text-primary-600"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 font-semibold mb-3">Categories</p>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleSearch(cat)}
                      className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:border-primary-500 hover:text-primary-600"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
