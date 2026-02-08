"use client";

import { motion } from "framer-motion";
import { Heart, MessageCircle, Package, Settings, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }

    Promise.all([
      api.getMyOrders(),
      api.getFavorites()
    ]).then(([ordersData, favoritesData]) => {
      setOrders(ordersData);
      setFavorites(favoritesData);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [user, router]);

  if (!user) return null;

  const stats = [
    { icon: Package, label: t('orders'), value: orders.length.toString(), color: "from-blue-500 to-blue-600" },
    { icon: Heart, label: t('wishlist'), value: favorites.length.toString(), color: "from-pink-500 to-pink-600" },
    { icon: MessageCircle, label: t('messages'), value: "0", color: "from-green-500 to-green-600" },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold mb-2">{t('welcomeBack')}, {user.name}!</h1>
            <p className="text-gray-600 dark:text-gray-400">{t('manageAccount')}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-3xl font-bold mb-1">{stat.value}</p>
                  <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-4">{t('recentOrders')}</h2>
              {loading ? (
                <p>Loading...</p>
              ) : orders.length === 0 ? (
                <p className="text-gray-600">{t('noOrders')}</p>
              ) : (
                <div className="space-y-4">
                  {orders.slice(0, 3).map((order: any) => (
                    <div key={order._id} className="flex items-center gap-4 p-4 border dark:border-gray-700 rounded-lg">
                      <div className="text-4xl">📦</div>
                      <div className="flex-1">
                        <p className="font-semibold">{order.product?.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{order.status}</p>
                      </div>
                      <p className="font-bold">₦{order.product?.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-4">{t('quickActions')}</h2>
              <div className="space-y-3">
                <button onClick={() => router.push('/wishlist')} className="w-full text-left p-4 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3">
                  <Heart className="w-5 h-5" />
                  <span>{t('viewWishlist')}</span>
                </button>
                {user.role === 'seller' && (
                  <button onClick={() => router.push('/upload-product')} className="w-full text-left p-4 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3">
                    <Package className="w-5 h-5" />
                    <span>{t('uploadProduct')}</span>
                  </button>
                )}
                <button className="w-full text-left p-4 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3">
                  <Settings className="w-5 h-5" />
                  <span>{t('settings')}</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
