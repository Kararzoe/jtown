"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Star, MessageCircle, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const API = "https://jos-backend.onrender.com/api";

export default function ServicesPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";
  const [providers, setProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (category) {
      fetch(`${API}/services/category/${category}`)
        .then((r) => r.json())
        .then((data) => setProviders(Array.isArray(data) ? data : []))
        .catch(() => setProviders([]))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [category]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <button onClick={() => window.history.back()} className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 mb-6">
            <ArrowLeft className="w-5 h-5" /> Back
          </button>

          <h1 className="text-3xl font-bold mb-2 capitalize">{category.replace(/-/g, " ")} Services</h1>
          <p className="text-gray-500 mb-8">Verified professionals ready to help you</p>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow animate-pulse">
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-3" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : providers.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No service providers in this category yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {providers.map((provider, idx) => (
                <motion.div
                  key={provider._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-lg">{provider.serviceName}</h3>
                      <p className="text-sm text-gray-500">{provider.location}</p>
                    </div>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                      Verified
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {provider.description}
                  </p>

                  <div className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-500" />
                      {provider.location}
                    </div>
                    {provider.experience && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-emerald-500" />
                        {provider.experience} experience
                      </div>
                    )}
                    {provider.priceRange && (
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-500 font-bold text-xs">₦</span>
                        {provider.priceRange}
                      </div>
                    )}
                    {provider.rating > 0 && (
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        {provider.rating} ({provider.totalReviews} reviews)
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={`tel:${provider.phone}`}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-emerald-500 text-white rounded-xl text-sm font-semibold hover:bg-emerald-600"
                    >
                      <Phone className="w-4 h-4" /> Call
                    </a>
                    <a
                      href={`https://wa.me/${provider.phone.replace(/[^0-9]/g, '')}?text=Hi, I need your ${provider.serviceName} service`}
                      target="_blank"
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 border-2 border-emerald-500 text-emerald-600 rounded-xl text-sm font-semibold hover:bg-emerald-50 dark:hover:bg-gray-700"
                    >
                      <MessageCircle className="w-4 h-4" /> WhatsApp
                    </a>
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
