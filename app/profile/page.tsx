"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    shopName: "",
    shopDescription: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      location: user.location || "",
      shopName: user.shopName || "",
      shopDescription: user.shopDescription || ""
    });
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.updateProfile(formData);
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Failed to update profile");
    }
    setLoading(false);
  };

  if (!user) return null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:border-primary-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:border-primary-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:border-primary-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Location</label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:border-primary-500 focus:outline-none"
              >
                <option value="">Select Location</option>
                <option value="Bukuru">Bukuru</option>
                <option value="Rayfield">Rayfield</option>
                <option value="Terminus">Terminus</option>
                <option value="Lamingo">Lamingo</option>
                <option value="Angwan Rogo">Angwan Rogo</option>
              </select>
            </div>

            {user.role === 'seller' && (
              <>
                <div>
                  <label className="block font-semibold mb-2">Shop Name</label>
                  <input
                    type="text"
                    value={formData.shopName}
                    onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:border-primary-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2">Shop Description</label>
                  <textarea
                    rows={4}
                    value={formData.shopDescription}
                    onChange={(e) => setFormData({ ...formData, shopDescription: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:border-primary-500 focus:outline-none"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary-500 text-white rounded-lg font-bold hover:bg-primary-600 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
