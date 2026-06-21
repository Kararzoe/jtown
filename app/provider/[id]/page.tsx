"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Star, MessageCircle, ArrowLeft, CheckCircle, Image } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const API = "https://josmkt-com-ng-335845.hostingersite.com/api";

export default function ProviderProfile() {
  const params = useParams();
  const [provider, setProvider] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      fetch(`${API}/services/${params.id}`)
        .then((r) => r.json())
        .then((data) => { if (data._id) setProvider(data); })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [params.id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full" />
        </div>
      </>
    );
  }

  if (!provider) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500 text-lg">Provider not found</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Banner */}
        <div className="relative h-48 md:h-64 bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500">
          <div className="absolute inset-0 bg-black/20" />
          <div className="max-w-5xl mx-auto px-4 h-full flex items-end pb-6 relative z-10">
            <button onClick={() => window.history.back()} className="absolute top-4 left-4 flex items-center gap-2 text-white/80 hover:text-white">
              <ArrowLeft className="w-5 h-5" /> Back
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="max-w-5xl mx-auto px-4 -mt-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-xl"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                {provider.image ? (
                  <img src={provider.image} alt={provider.serviceName} className="w-28 h-28 md:w-36 md:h-36 rounded-2xl object-cover border-4 border-white shadow-lg" />
                ) : (
                  <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center text-emerald-600 font-bold text-4xl border-4 border-white shadow-lg">
                    {provider.serviceName?.charAt(0)}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{provider.serviceName}</h1>
                  <CheckCircle className="w-6 h-6 text-emerald-500" />
                </div>
                <p className="text-gray-500 capitalize mb-4">{provider.category?.replace(/-/g, " ")}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <MapPin className="w-5 h-5 text-emerald-500" />
                    <span>{provider.location}</span>
                  </div>
                  {provider.experience && (
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Clock className="w-5 h-5 text-emerald-500" />
                      <span>{provider.experience} experience</span>
                    </div>
                  )}
                  {provider.priceRange && (
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <span className="text-emerald-500 font-bold">₦</span>
                      <span>{provider.priceRange}</span>
                    </div>
                  )}
                  {provider.rating > 0 && (
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span>{provider.rating} ({provider.totalReviews} reviews)</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <a
                    href={`tel:${provider.phone}`}
                    className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition"
                  >
                    <Phone className="w-5 h-5" /> Call Now
                  </a>
                  <a
                    href={`https://wa.me/${provider.phone?.replace(/[^0-9]/g, '')}?text=Hi, I found you on JosMKT. I need your ${provider.serviceName} service.`}
                    target="_blank"
                    className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition"
                  >
                    <MessageCircle className="w-5 h-5" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm mt-6"
          >
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">About</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
              {provider.description}
            </p>
          </motion.div>

          {/* Gallery Section */}
          {provider.gallery && provider.gallery.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm mt-6"
            >
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <Image className="w-5 h-5" /> Gallery
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {provider.gallery.map((img: string, idx: number) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.03 }}
                    className="cursor-pointer"
                    onClick={() => setSelectedImage(img)}
                  >
                    <img src={img} alt={`Work ${idx + 1}`} className="w-full h-40 object-cover rounded-xl border border-gray-200 dark:border-gray-700 hover:border-emerald-300 transition" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 md:p-8 shadow-sm mt-6 mb-10 text-white"
          >
            <h2 className="text-xl font-bold mb-2">Need this service?</h2>
            <p className="text-emerald-100 mb-4">Contact {provider.serviceName} directly and get started today.</p>
            <div className="flex flex-wrap gap-3">
              <a href={`tel:${provider.phone}`} className="px-5 py-2.5 bg-white text-emerald-600 rounded-xl font-semibold hover:bg-emerald-50 transition flex items-center gap-2">
                <Phone className="w-4 h-4" /> {provider.phone}
              </a>
              <a
                href={`https://wa.me/${provider.phone?.replace(/[^0-9]/g, '')}?text=Hi, I need your service.`}
                target="_blank"
                className="px-5 py-2.5 bg-white/20 text-white border border-white/30 rounded-xl font-semibold hover:bg-white/30 transition flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Image Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Gallery" className="max-w-full max-h-[90vh] rounded-xl" />
        </div>
      )}

      <Footer />
    </>
  );
}
