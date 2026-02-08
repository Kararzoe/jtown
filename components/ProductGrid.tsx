"use client";

import { motion } from "framer-motion";
import { Heart, MessageCircle, Star, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import QuickViewModal from "./QuickViewModal";
import SkeletonCard from "./SkeletonCard";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ProductGrid() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    api.getProducts({ status: 'active' })
      .then(data => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setLoading(false);
      });
  }, []);

  const openQuickView = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const toggleFavorite = async (id: string) => {
    if (!user) {
      alert('Please login to add favorites');
      return;
    }
    try {
      await api.toggleFavorite(id);
      setProducts(products.map((p: any) => 
        p._id === id ? { ...p, favorites: p.favorites?.includes(user._id) 
          ? p.favorites.filter((f: string) => f !== user._id) 
          : [...(p.favorites || []), user._id] } : p
      ));
    } catch (error) {
      console.error('Failed to toggle favorite');
    }
  };

  if (loading) {
    return (
      <section id="products" className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
    <section id="products" className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('featuredProducts')}</h2>
          <p className="text-gray-600">{t('discover')}</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product: any, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => window.location.href = `/product/${product._id}`}
              className="group bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all cursor-pointer"
            >
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                  {product.images?.[0] ? (
                    <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-5xl md:text-7xl">📦</span>
                  )}
                </div>
                <div className="absolute top-2 md:top-4 right-2 md:right-4 flex gap-1 md:gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <motion.button 
                    whileHover={{ scale: 1.1 }} 
                    whileTap={{ scale: 0.9 }} 
                    onClick={() => toggleFavorite(product._id)}
                    className="p-2 bg-white rounded-full shadow-md"
                  >
                    <Heart className={`w-5 h-5 ${product.favorites?.includes(user?._id) ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => openQuickView(product)}
                    className="p-2 bg-white rounded-full shadow-md"
                  >
                    <Eye className="w-5 h-5 text-gray-600" />
                  </motion.button>
                </div>
                <div className="absolute top-2 md:top-4 left-2 md:left-4 px-2 md:px-3 py-1 bg-primary-500 text-white text-xs font-semibold rounded-full">
                  {product.category}
                </div>
              </div>

              <div className="p-3 md:p-4">
                <div className="flex items-center gap-1 md:gap-2 mb-2">
                  <h3 className="font-semibold text-sm md:text-base text-gray-900 truncate">{product.title}</h3>
                  {product.seller?.isVerified && (
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full flex items-center gap-1">
                      ✓
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 md:gap-2 mb-2">
                  <span className="text-lg md:text-xl">{product.seller?.shopLogo || '🏪'}</span>
                  <span className="text-xs text-gray-600 truncate">{product.seller?.shopName || product.seller?.name}</span>
                </div>
                <div className="flex items-center mb-2">
                  <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-yellow-400" />
                  <span className="ml-1 text-xs md:text-sm text-gray-600">{product.seller?.rating || 0}</span>
                  <span className="ml-1 text-xs text-gray-400">({product.views || 0})</span>
                </div>
                <div className="mb-2 md:mb-3">
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">{t(product.condition)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg md:text-2xl font-bold text-gray-900">₦{product.price.toLocaleString()}</span>
                  <motion.button 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }} 
                    onClick={() => window.open(`https://wa.me/${product.seller?.phone}?text=Hi, I'm interested in ${product.title}`, '_blank')}
                    className="p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-12">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-3 bg-primary-500 text-white rounded-full font-semibold hover:bg-primary-600 transition shadow-lg">
            {t('viewAll')}
          </motion.button>
        </motion.div>
      </div>

      <QuickViewModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
    </>
  );
}
