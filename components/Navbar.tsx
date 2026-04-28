"use client";

import { motion } from "framer-motion";
import { Search, User, Menu, LogOut, Megaphone, Rocket } from "lucide-react";
import { useState } from "react";
import SearchModal from "./SearchModal";
import DarkModeToggle from "./DarkModeToggle";
import LanguageSelector from "./LanguageSelector";
import NotificationCenter from "./NotificationCenter";
import AuthModal from "./AuthModal";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-emerald-100/50 dark:border-gray-700/50 shadow-lg shadow-emerald-500/5"
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-18">
          <motion.a
            href="/"
            whileHover={{ scale: 1.02 }}
            className="relative flex items-center gap-2"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                JosMKT
              </span>
              <span className="hidden sm:inline text-xs text-gray-500 dark:text-gray-400 ml-1.5 font-medium">
                Visibility & Promotions
              </span>
            </div>
          </motion.a>

          <div className="hidden md:flex items-center space-x-1">
            {[
              { href: "/", label: t('home') },
              { href: "/#services", label: t('categories') },
              { href: "/#products", label: "Promotions" },
              { href: "/trending", label: "Trending" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 font-medium text-sm rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/become-seller"
              className="ml-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-emerald-500/25 hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <Megaphone className="w-4 h-4" />
              {t('sell')}
            </a>
          </div>

          <div className="flex items-center space-x-1 md:space-x-2">
            <div className="hidden md:flex items-center space-x-1">
              <NotificationCenter />
              <LanguageSelector />
              <DarkModeToggle />
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 hover:bg-emerald-50 dark:hover:bg-gray-700 rounded-xl transition"
            >
              <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </motion.button>
            {searchOpen && (
              <div className="fixed md:absolute top-16 md:top-full left-0 right-0 md:mt-2 px-4 bg-white dark:bg-gray-900 md:bg-transparent py-4 md:py-0 z-50">
                <div className="relative max-w-2xl mx-auto">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Search services, promotions, businesses..."
                    className="w-full px-5 py-3.5 pr-12 rounded-2xl border-2 border-emerald-200 focus:border-emerald-500 focus:outline-none dark:bg-gray-800 dark:border-gray-700 shadow-lg"
                    autoFocus
                  />
                  <button onClick={handleSearch} className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition">
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
            {user ? (
              <div className="relative group hidden md:block">
                <button className="flex items-center gap-2 p-2 hover:bg-emerald-50 dark:hover:bg-gray-700 rounded-xl transition">
                  <span className="text-2xl">{user.avatar}</span>
                </button>
                <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="p-4 border-b dark:border-gray-700">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <div className="py-1">
                    <a href="/dashboard" className="block px-4 py-2.5 hover:bg-emerald-50 dark:hover:bg-gray-700 text-sm transition">{t('dashboard')}</a>
                    <a href="/seller-dashboard" className="block px-4 py-2.5 hover:bg-emerald-50 dark:hover:bg-gray-700 text-sm transition">Seller Dashboard</a>
                    <a href="/wishlist" className="block px-4 py-2.5 hover:bg-emerald-50 dark:hover:bg-gray-700 text-sm transition">{t('wishlist')}</a>
                    <a href="/compare" className="block px-4 py-2.5 hover:bg-emerald-50 dark:hover:bg-gray-700 text-sm transition">Compare</a>
                    <a href="/saved-searches" className="block px-4 py-2.5 hover:bg-emerald-50 dark:hover:bg-gray-700 text-sm transition">Saved Searches</a>
                    {user.role === 'admin' && (
                      <a href="/admin" className="block px-4 py-2.5 hover:bg-emerald-50 dark:hover:bg-gray-700 text-sm text-purple-600 transition">Admin Dashboard</a>
                    )}
                  </div>
                  <div className="border-t dark:border-gray-700">
                    <button onClick={logout} className="w-full text-left px-4 py-2.5 hover:bg-red-50 dark:hover:bg-gray-700 text-red-600 flex items-center gap-2 text-sm rounded-b-2xl transition">
                      <LogOut className="w-4 h-4" />
                      {t('logout')}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => setAuthOpen(true)} className="hidden md:block p-2.5 hover:bg-emerald-50 dark:hover:bg-gray-700 rounded-xl transition">
                <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </motion.button>
            )}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-emerald-100"
          >
            <div className="flex flex-col space-y-1">
              <a href="/" className="text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition font-medium px-3 py-2.5 rounded-lg">{t('home')}</a>
              <a href="/#services" className="text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition font-medium px-3 py-2.5 rounded-lg">Services</a>
              <a href="/#products" className="text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition font-medium px-3 py-2.5 rounded-lg">Promotions</a>
              <a href="/trending" className="text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition font-medium px-3 py-2.5 rounded-lg">Trending</a>
              {user ? (
                <>
                  <a href="/dashboard" className="text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition font-medium px-3 py-2.5 rounded-lg">{t('dashboard')}</a>
                  <a href="/wishlist" className="text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition font-medium px-3 py-2.5 rounded-lg">{t('wishlist')}</a>
                  <button onClick={logout} className="text-left text-red-600 font-medium px-3 py-2.5 rounded-lg hover:bg-red-50 transition">{t('logout')}</button>
                </>
              ) : (
                <button onClick={() => setAuthOpen(true)} className="text-left text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition font-medium px-3 py-2.5 rounded-lg">Login</button>
              )}
              <div className="flex items-center gap-4 px-3 pt-3 border-t border-emerald-100">
                <NotificationCenter />
                <LanguageSelector />
                <DarkModeToggle />
              </div>
              <a href="/become-seller" className="mx-2 mt-2 px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-xl font-semibold text-center flex items-center justify-center gap-2">
                <Megaphone className="w-4 h-4" />
                {t('sell')}
              </a>
            </div>
          </motion.div>
        )}
      </div>
      </motion.nav>
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
