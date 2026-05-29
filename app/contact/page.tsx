"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Phone, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Send to WhatsApp as fallback
    const text = `Name: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`;
    window.open(`https://wa.me/2349115146303?text=${encodeURIComponent(text)}`, "_blank");
    setSent(true);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Contact Us</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Have a question? Send us a message.</p>

          {sent ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
              <p className="text-gray-500">We'll get back to you soon.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm space-y-4">
              <input type="text" required placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 border-2 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              <input type="email" required placeholder="Your email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 border-2 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              <textarea required placeholder="Your message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 border-2 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              <button type="submit" className="w-full py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 flex items-center justify-center gap-2">
                <Send className="w-5 h-5" /> Send Message
              </button>
            </form>
          )}

          <div className="mt-8 grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl">
              <Phone className="w-5 h-5 text-emerald-500" />
              <span className="text-gray-700 dark:text-gray-300">+234 911 514 6303</span>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl">
              <MapPin className="w-5 h-5 text-emerald-500" />
              <span className="text-gray-700 dark:text-gray-300">Jos, Plateau State, Nigeria</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
