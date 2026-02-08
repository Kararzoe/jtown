"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdvancedSearch from "@/components/AdvancedSearch";
import { api } from "@/lib/api";
import { Heart, MessageCircle, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const filters: any = {};
    if (params.get('search')) filters.search = params.get('search');
    if (params.get('category')) filters.category = params.get('category');
    loadProducts(filters);
  }, []);

  const loadProducts = async (filters: any) => {
    setLoading(true);
    try {
      const data = await api.getProducts(filters);
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products');
    }
    setLoading(false);
  };

  const toggleFavorite = async (id: string) => {
    if (!user) {
      alert('Please login to add favorites');
      return;
    }
    try {
      await api.toggleFavorite(id);
      loadProducts({});
    } catch (error) {
      console.error('Failed to toggle favorite');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">All Products</h1>
          
          <AdvancedSearch onSearch={loadProducts} />

          {loading ? (
            <p>Loading...</p>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-600 py-12">No products found</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product: any) => (
                <motion.div
                  key={product._id}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all"
                >
                  <div className="relative">
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                      {product.images?.[0] ? (
                        <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-7xl">📦</span>
                      )}
                    </div>
                    <button
                      onClick={() => toggleFavorite(product._id)}
                      className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md"
                    >
                      <Heart className={`w-5 h-5 ${product.favorites?.includes(user?._id) ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
                    </button>
                    <div className="absolute top-4 left-4 px-3 py-1 bg-primary-500 text-white text-xs font-semibold rounded-full">
                      {product.category}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 truncate mb-2">{product.title}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-gray-600">{product.seller?.shopName || product.seller?.name}</span>
                      {product.seller?.isVerified && <span className="text-blue-600 text-xs">✓</span>}
                    </div>
                    <div className="flex items-center mb-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-sm text-gray-600">{product.seller?.rating || 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">₦{product.price.toLocaleString()}</span>
                      <button
                        onClick={() => window.open(`https://wa.me/${product.seller?.phone}?text=Hi, I'm interested in ${product.title}`, '_blank')}
                        className="p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                      >
                        <MessageCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
