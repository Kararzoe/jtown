"use client";

import { motion } from "framer-motion";
import { Store, User, Phone, MapPin, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BecomeSellerPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Store className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Start Selling on Jos Marketplace</h1>
            <p className="text-gray-600">Join thousands of sellers and reach customers across Jos</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <form className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Store className="w-4 h-4" />
                  Shop Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., TechHub Store"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <User className="w-4 h-4" />
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+234 800 000 0000"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="w-4 h-4" />
                  Shop Location
                </label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none">
                  <option>Select location</option>
                  <option>Bukuru</option>
                  <option>Rayfield</option>
                  <option>Terminus</option>
                  <option>Angwan Rogo</option>
                  <option>Lamingo</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  What will you sell?
                </label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none">
                  <option>Select category</option>
                  <option>Electronics</option>
                  <option>Fashion</option>
                  <option>Food</option>
                  <option>Home & Properties</option>
                  <option>Sports</option>
                  <option>Other</option>
                </select>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 bg-primary-500 text-white rounded-lg font-bold text-lg hover:bg-primary-600 shadow-lg"
              >
                Submit Application
              </motion.button>

              <p className="text-center text-sm text-gray-600">
                We'll review your application and contact you within 24 hours
              </p>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 grid md:grid-cols-3 gap-6"
          >
            <div className="text-center">
              <div className="text-4xl mb-2">📦</div>
              <h3 className="font-bold mb-1">List Products</h3>
              <p className="text-sm text-gray-600">Add unlimited products</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">💬</div>
              <h3 className="font-bold mb-1">Connect with Buyers</h3>
              <p className="text-sm text-gray-600">Direct communication</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">💰</div>
              <h3 className="font-bold mb-1">Grow Your Business</h3>
              <p className="text-sm text-gray-600">Reach thousands daily</p>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
