"use client";

import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Jos Marketplace</h3>
            <p className="text-sm mb-4">Your trusted platform for buying and selling anything, anywhere.</p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <motion.a key={i} whileHover={{ scale: 1.2, y: -2 }} href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary-500 transition">
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary-500 transition">About Us</a></li>
              <li><a href="#" className="hover:text-primary-500 transition">How It Works</a></li>
              <li><a href="#" className="hover:text-primary-500 transition">Pricing</a></li>
              <li><a href="#" className="hover:text-primary-500 transition">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary-500 transition">Help Center</a></li>
              <li><a href="#" className="hover:text-primary-500 transition">Safety Tips</a></li>
              <li><a href="#" className="hover:text-primary-500 transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary-500 transition">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center"><Mail className="w-4 h-4 mr-2" /> support@jos.com</li>
              <li className="flex items-center"><Phone className="w-4 h-4 mr-2" /> +234 904 383 2380</li>
              <li className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> Jos, Nigeria</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2024 Jos Marketplace. All rights reserved.</p>
          <p className="mt-2 text-gray-500">Powered by Plero Digitals</p>
        </div>
      </div>
    </footer>
  );
}
