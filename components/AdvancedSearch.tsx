"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

export default function AdvancedSearch({ onSearch }: any) {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    location: "",
    condition: "",
    minPrice: "",
    maxPrice: "",
    sort: "newest"
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = () => {
    onSearch(filters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-500"
        />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 border rounded-lg hover:bg-gray-50"
        >
          <SlidersHorizontal className="w-5 h-5" />
        </button>
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      {showFilters && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home & Properties">Home & Properties</option>
            <option value="Sports">Sports</option>
            <option value="Books">Books</option>
            <option value="Food">Food</option>
            <option value="Automotive">Automotive</option>
            <option value="Services">Services</option>
          </select>

          <select
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="">All Locations</option>
            <option value="Bukuru">Bukuru</option>
            <option value="Rayfield">Rayfield</option>
            <option value="Terminus">Terminus</option>
            <option value="Lamingo">Lamingo</option>
            <option value="Angwan Rogo">Angwan Rogo</option>
          </select>

          <select
            value={filters.condition}
            onChange={(e) => setFilters({ ...filters, condition: e.target.value })}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="">All Conditions</option>
            <option value="new">New</option>
            <option value="used">Used</option>
            <option value="refurbished">Refurbished</option>
          </select>

          <select
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
          </select>

          <input
            type="number"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
            className="px-4 py-2 border rounded-lg"
          />

          <input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            className="px-4 py-2 border rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
