"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Star, MessageCircle } from "lucide-react";
import ReportModal from "./ReportModal";
import ShareButton from "./ShareButton";
import PriceTag from "./PriceTag";
import { useState } from "react";

interface QuickViewProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewProps) {
  const [reportOpen, setReportOpen] = useState(false);
  
  if (!product) return null;

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
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold">Quick View</h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 grid md:grid-cols-2 gap-6">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl flex items-center justify-center text-9xl">
                  {product.image}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="inline-block px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-semibold">
                      {product.category}
                    </div>
                    <ShareButton title={product.name} />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{product.name}</h3>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-gray-600">({product.rating}) • 128 reviews</span>
                  </div>

                  <PriceTag current={product.price} original={product.price * 1.2} currency="₦" />

                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-4xl">{product.seller.avatar}</span>
                      <div>
                        <h4 className="font-semibold text-lg">{product.seller.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span>{product.seller.rating} • {product.seller.sales} sales</span>
                        </div>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-4 py-2 border-2 border-primary-500 text-primary-600 rounded-lg font-semibold hover:bg-primary-50"
                    >
                      Contact Seller
                    </motion.button>
                  </div>

                  <p className="text-gray-600 mb-6">
                    High-quality {product.name.toLowerCase()} with premium features. Perfect for everyday use with excellent durability and style.
                  </p>

                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Contact Seller
                    </motion.button>
                  </div>

                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      💡 <strong>Note:</strong> Payment is made directly to the seller. Contact them to arrange payment and delivery.
                    </p>
                  </div>

                  <button
                    onClick={() => setReportOpen(true)}
                    className="mt-3 text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    🚩 Report this listing
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
          <ReportModal isOpen={reportOpen} onClose={() => setReportOpen(false)} productName={product.name} />
        </>
      )}
    </AnimatePresence>
  );
}
