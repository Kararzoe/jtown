"use client";

import { motion } from "framer-motion";
import { Star, MapPin, Phone, MessageCircle, Mail, Package } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

const shopData = {
  name: "TechHub Store",
  logo: "💻",
  rating: 4.8,
  sales: 1200,
  location: "Bukuru, Jos",
  phone: "+234 801 234 5678",
  email: "techhub@example.com",
  description: "Your trusted electronics store in Jos. We sell quality phones, laptops, and accessories.",
  products: [
    { id: 1, name: "iPhone 15 Pro", price: 1250000, image: "📱", stock: 5 },
    { id: 2, name: "MacBook Pro", price: 2100000, image: "💻", stock: 3 },
    { id: 3, name: "AirPods Pro", price: 185000, image: "🎧", stock: 10 },
    { id: 4, name: "iPad Air", price: 850000, image: "📱", stock: 7 },
  ],
};

export default function ShopPage() {
  const [enquiry, setEnquiry] = useState({ name: "", phone: "", product: "", message: "" });

  const handleEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hi ${shopData.name}! I'm interested in: ${enquiry.product}. ${enquiry.message}`;
    const whatsappUrl = `https://wa.me/${shopData.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setEnquiry({ name: "", phone: "", product: "", message: "" });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={[{ label: "Shops", href: "" }, { label: shopData.name, href: "" }]} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-6xl border-2">
                {shopData.logo}
              </div>

              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{shopData.name}</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{shopData.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold">{shopData.rating}</span>
                    <span className="text-gray-600">({shopData.sales} sales)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{shopData.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4" />
                    <span>{shopData.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4" />
                    <span>{shopData.email}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.open(`https://wa.me/${shopData.phone.replace(/[^0-9]/g, '')}`, '_blank')}
                    className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.location.href = `tel:${shopData.phone}`}
                    className="flex items-center gap-2 px-6 py-3 border-2 border-primary-500 text-primary-600 rounded-lg font-semibold hover:bg-primary-50"
                  >
                    <Phone className="w-5 h-5" />
                    Call
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Package className="w-6 h-6" />
                  Available Products
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {shopData.products.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i }}
                      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
                    >
                      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center text-8xl">
                        {product.image}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-2xl font-bold text-primary-600">₦{product.price.toLocaleString()}</span>
                          <span className="text-sm text-gray-600">Stock: {product.stock}</span>
                        </div>
                        <button className="w-full py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 flex items-center justify-center gap-2"
                          onClick={() => {
                            const msg = `Hi! I'm interested in ${product.name} (₦${product.price.toLocaleString()})`;
                            window.open(`https://wa.me/${shopData.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
                          }}
                        >
                          <MessageCircle className="w-4 h-4" />
                          WhatsApp Seller
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg sticky top-24"
              >
                <h2 className="text-xl font-bold mb-4">Product Enquiry</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Can't find what you're looking for? Send us an enquiry!
                </p>

                <form onSubmit={handleEnquiry} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      value={enquiry.name}
                      onChange={(e) => setEnquiry({ ...enquiry, name: e.target.value })}
                      className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:border-primary-500 focus:outline-none dark:bg-gray-700"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={enquiry.phone}
                      onChange={(e) => setEnquiry({ ...enquiry, phone: e.target.value })}
                      className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:border-primary-500 focus:outline-none dark:bg-gray-700"
                      placeholder="+234 800 000 0000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Product Name</label>
                    <input
                      type="text"
                      required
                      value={enquiry.product}
                      onChange={(e) => setEnquiry({ ...enquiry, product: e.target.value })}
                      className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:border-primary-500 focus:outline-none dark:bg-gray-700"
                      placeholder="e.g., Samsung Galaxy S24"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Message</label>
                    <textarea
                      required
                      value={enquiry.message}
                      onChange={(e) => setEnquiry({ ...enquiry, message: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:border-primary-500 focus:outline-none dark:bg-gray-700"
                      placeholder="Tell us what you're looking for..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Send via WhatsApp
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
