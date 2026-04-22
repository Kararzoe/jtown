"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Send } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const serviceCategories: Record<string, string[]> = {
  electronics: ["Phone Repair", "Laptop Repair", "TV Repair", "Electrical Installation", "CCTV Installation", "Solar Installation"],
  fashion: ["Tailoring", "Fashion Design", "Shoe Making", "Laundry & Dry Cleaning", "Hair Styling", "Makeup Artist"],
  home: ["Plumbing", "Painting", "Carpentry", "Interior Design", "Cleaning Service", "Fumigation"],
  food: ["Catering", "Baking", "Event Decoration", "Food Delivery", "Meal Prep Service"],
  phones: ["Phone Repair", "Screen Replacement", "Software Fix", "Phone Accessories"],
  gadgets: ["Gadget Repair", "Computer Networking", "Printer Repair", "Console Repair"],
  sports: ["Personal Training", "Sports Coaching", "Gym Instructor", "Physiotherapy"],
  books: ["Tutoring", "Assignment Help", "Translation", "Proofreading"],
};

export default function ApplyServicePage() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    category: "",
    serviceName: "",
    description: "",
    phone: "",
    location: "",
    experience: "",
    priceRange: "",
  });

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setForm((f) => ({ ...f, category: cat }));
  }, [searchParams]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!user) return alert("Please login first");
    setLoading(true);
    try {
      const res = await api.applyAsProvider(form);
      if (res._id) {
        setSubmitted(true);
      } else {
        alert(res.message || "Failed to submit application");
      }
    } catch {
      alert("Something went wrong");
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full text-center shadow-xl"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your service provider application is under review. You'll be notified once approved.
            </p>
            <a href="/" className="inline-block px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600">
              Back to Home
            </a>
          </motion.div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => window.history.back()} className="flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-6">
            <ArrowLeft className="w-5 h-5" /> Back
          </button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold mb-2">Apply as Service Provider</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Offer your services to thousands of customers on Jos Marketplace
            </p>

            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg space-y-5">
              <div>
                <label className="block text-sm font-semibold mb-2">Category</label>
                <select
                  required
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value, serviceName: "" })}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:border-primary-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="">Select a category</option>
                  {Object.keys(serviceCategories).map((cat) => (
                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                  ))}
                </select>
              </div>

              {form.category && (
                <div>
                  <label className="block text-sm font-semibold mb-2">Service Type</label>
                  <select
                    required
                    value={form.serviceName}
                    onChange={(e) => setForm({ ...form, serviceName: e.target.value })}
                    className="w-full px-4 py-3 border-2 rounded-lg focus:border-primary-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option value="">Select your service</option>
                    {serviceCategories[form.category]?.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea
                  required
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe your service and experience..."
                  className="w-full px-4 py-3 border-2 rounded-lg focus:border-primary-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+234..."
                    className="w-full px-4 py-3 border-2 rounded-lg focus:border-primary-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Location</label>
                  <input
                    type="text"
                    required
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="e.g. Bukuru, Jos"
                    className="w-full px-4 py-3 border-2 rounded-lg focus:border-primary-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Experience</label>
                  <input
                    type="text"
                    value={form.experience}
                    onChange={(e) => setForm({ ...form, experience: e.target.value })}
                    placeholder="e.g. 5 years"
                    className="w-full px-4 py-3 border-2 rounded-lg focus:border-primary-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Price Range</label>
                  <input
                    type="text"
                    value={form.priceRange}
                    onChange={(e) => setForm({ ...form, priceRange: e.target.value })}
                    placeholder="e.g. ₦5,000 - ₦50,000"
                    className="w-full px-4 py-3 border-2 rounded-lg focus:border-primary-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-primary-500 text-white rounded-lg font-bold hover:bg-primary-600 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
