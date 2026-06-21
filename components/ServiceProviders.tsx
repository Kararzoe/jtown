"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Phone, MapPin, MessageCircle, Wrench, Clock } from "lucide-react";
import { api } from "@/lib/api";
import Link from "next/link";

export default function ServiceProviders({ category }: { category: string }) {
  const [providers, setProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getServiceProviders(category)
      .then((data) => setProviders(Array.isArray(data) ? data : []))
      .catch(() => setProviders([]))
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Wrench className="w-6 h-6 text-primary-500" />
            Service Providers
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Verified professionals ready to help you
          </p>
        </div>
        <Link
          href={`/services/apply?category=${category}`}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 text-sm"
        >
          Offer Your Service
        </Link>
      </div>

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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow"
        >
          <Wrench className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 mb-4">No service providers in this category yet</p>
          <Link
            href={`/services/apply?category=${category}`}
            className="inline-block px-5 py-2 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 text-sm"
          >
            Be the first to apply
          </Link>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {providers.map((provider, idx) => (
            <motion.div
              key={provider._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 relative overflow-hidden group"
            >
              {/* Animated gradient accent */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 animate-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-start justify-between mb-3">
                <a href={`/provider/${provider._id}`} className="flex items-center gap-3 hover:opacity-80 transition">
                  {provider.image ? (
                    <img src={provider.image} alt={provider.serviceName} className="w-12 h-12 rounded-full object-cover border-2 border-emerald-200" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-lg">
                      {provider.serviceName?.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-lg">{provider.serviceName}</h3>
                    <p className="text-sm text-gray-500">{provider.location}</p>
                  </div>
                </a>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                  Verified
                </span>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                {provider.description}
              </p>

              <div className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary-500" />
                  {provider.location}
                </div>
                {provider.experience && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary-500" />
                    {provider.experience} experience
                  </div>
                )}
                {provider.priceRange && (
                  <div className="flex items-center gap-2">
                    <span className="text-primary-500 font-bold text-xs">₦</span>
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
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-500 text-white rounded-lg text-sm font-semibold hover:bg-emerald-600"
                >
                  <Phone className="w-4 h-4" /> Call
                </a>
                <a
                  href={`https://wa.me/${provider.phone?.replace(/[^0-9]/g, '')}?text=Hi, I found you on JosMKT. I need your service.`}
                  target="_blank"
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
