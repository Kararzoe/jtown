"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Send, Store } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const API = "https://josmkt-com-ng-335845.hostingersite.com/api";

const categories = [
  "plumbing", "electrical", "ac", "furniture", "catering", "painting",
  "mechanic", "barbing", "carpentry", "fashion-design", "shoemaking",
  "photography", "tech", "logistics", "laundry", "education",
  "perfumery", "makeup", "event-planning", "rentals", "mason",
  "phone-accessories", "legal", "housing-agent", "e-wallet"
];

export default function GetStartedPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    serviceName: "",
    category: "",
    description: "",
    phone: "",
    location: "",
    experience: "",
    priceRange: "",
    image: "",
    gallery: [] as string[],
  });

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "jos_marketplace");
    formData.append("cloud_name", "dfye3j2bs");
    const res = await fetch("https://api.cloudinary.com/v1_1/dfye3j2bs/image/upload", { method: "POST", body: formData });
    const data = await res.json();
    return data.secure_url || "";
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API}/services/apply-public`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data._id || data.success) {
        setSubmitted(true);
      } else {
        alert(data.message || "Failed to submit. Please try again.");
      }
    } catch {
      alert("Network error. Please check your connection and try again.");
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
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your business registration is under review. We'll contact you once approved and your profile will be live on JosMKT.
            </p>
            <a href="/" className="inline-block px-6 py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600">
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4">
                <Store className="w-4 h-4" />
                Register Your Business
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">Get Started on JosMKT</h1>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                List your service or business and get discovered by thousands of customers in Jos
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg space-y-5">
              <div>
                <label className="block text-sm font-semibold mb-2">Business / Service Name *</label>
                <input
                  type="text"
                  required
                  value={form.serviceName}
                  onChange={(e) => setForm({ ...form, serviceName: e.target.value })}
                  placeholder="e.g. Bright Plumbing Services"
                  className="w-full px-4 py-3 border-2 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Category *</label>
                <select
                  required
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-3 border-2 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="">Select your category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Describe your business *</label>
                <textarea
                  required
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Tell customers what you do, what makes you special..."
                  className="w-full px-4 py-3 border-2 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="e.g. 08012345678"
                    className="w-full px-4 py-3 border-2 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Location *</label>
                  <input
                    type="text"
                    required
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="e.g. Terminus, Jos"
                    className="w-full px-4 py-3 border-2 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Experience</label>
                  <input
                    type="text"
                    value={form.experience}
                    onChange={(e) => setForm({ ...form, experience: e.target.value })}
                    placeholder="e.g. 3 years"
                    className="w-full px-4 py-3 border-2 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Price Range</label>
                  <input
                    type="text"
                    value={form.priceRange}
                    onChange={(e) => setForm({ ...form, priceRange: e.target.value })}
                    placeholder="e.g. ₦5,000 - ₦50,000"
                    className="w-full px-4 py-3 border-2 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Business Logo / Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setUploading(true);
                    const url = await uploadImage(file);
                    if (url) setForm({ ...form, image: url });
                    setUploading(false);
                  }}
                  className="w-full px-4 py-3 border-2 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
                />
                {uploading && <p className="text-sm text-emerald-500 mt-1">Uploading...</p>}
                {form.image && <img src={form.image} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded-xl" />}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Work Samples / Gallery (optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={async (e) => {
                    const files = e.target.files;
                    if (!files) return;
                    setUploading(true);
                    const urls: string[] = [];
                    for (let i = 0; i < files.length; i++) {
                      const url = await uploadImage(files[i]);
                      if (url) urls.push(url);
                    }
                    setForm({ ...form, gallery: [...form.gallery, ...urls] });
                    setUploading(false);
                  }}
                  className="w-full px-4 py-3 border-2 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
                />
                {form.gallery.length > 0 && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {form.gallery.map((url, i) => (
                      <img key={i} src={url} alt={`Gallery ${i}`} className="w-20 h-20 object-cover rounded-lg" />
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || uploading}
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-emerald-500/25 disabled:opacity-50 flex items-center justify-center gap-2 text-lg transition-all"
              >
                <Send className="w-5 h-5" />
                {loading ? "Submitting..." : "Submit Application"}
              </button>

              <p className="text-center text-xs text-gray-400">
                Your application will be reviewed within 24 hours. Once approved, your business will be visible to thousands.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
