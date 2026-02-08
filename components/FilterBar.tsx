"use client";

import { motion } from "framer-motion";
import { SlidersHorizontal, ArrowUpDown, MapPin, DollarSign, Package } from "lucide-react";
import { useState } from "react";

export default function FilterBar() {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    location: "all",
    minPrice: "",
    maxPrice: "",
    condition: "all",
    category: "all"
  });

  return (
    <div className="bg-white border-b border-gray-200 py-4 px-4 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Advanced Filters
          </motion.button>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-2"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-600" />
                <select 
                  value={filters.location}
                  onChange={(e) => setFilters({...filters, location: e.target.value})}
                  className="px-3 py-2 border rounded-lg text-sm"
                >
                  <option value="all">All Locations</option>
                  <option value="bukuru">Bukuru</option>
                  <option value="rayfield">Rayfield</option>
                  <option value="terminus">Terminus</option>
                  <option value="lamingo">Lamingo</option>
                  <option value="angwan-rogo">Angwan Rogo</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gray-600" />
                <input
                  type="number"
                  placeholder="Min Price"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                  className="w-24 px-3 py-2 border rounded-lg text-sm"
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max Price"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                  className="w-24 px-3 py-2 border rounded-lg text-sm"
                />
              </div>

              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-gray-600" />
                <select
                  value={filters.condition}
                  onChange={(e) => setFilters({...filters, condition: e.target.value})}
                  className="px-3 py-2 border rounded-lg text-sm"
                >
                  <option value="all">All Conditions</option>
                  <option value="new">Brand New</option>
                  <option value="used">Used</option>
                  <option value="refurbished">Refurbished</option>
                </select>
              </div>

              <select
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                className="px-3 py-2 border rounded-lg text-sm"
              >
                <option value="all">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="home">Home</option>
                <option value="food">Food</option>
              </select>

              <button className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm hover:bg-primary-600">
                Apply
              </button>
              <button 
                onClick={() => setFilters({ location: "all", minPrice: "", maxPrice: "", condition: "all", category: "all" })}
                className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
              >
                Clear
              </button>
            </motion.div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-gray-600" />
          <select className="px-4 py-2 border rounded-lg text-sm">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
            <option>Best Rating</option>
            <option>Most Reviewed</option>
          </select>
        </div>
      </div>
    </div>
  );
}
