"use client";

import { motion } from "framer-motion";
import { Search, User, Menu, LogOut } from "lucide-react";
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
        className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm"
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative"
          >
            <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-clip-text text-transparent">
              Jos
            </span>
            <span className="text-2xl md:text-3xl font-light text-gray-700 dark:text-gray-300 ml-1">
              Marketplace
            </span>
            <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-primary-600 to-transparent"></div>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 font-medium relative group">
              {t('home')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="/#categories" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 font-medium relative group">
              {t('categories')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="/#products" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 font-medium relative group">
              {t('products')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="/become-seller" className="px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
              {t('sell')}
            </a>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <NotificationCenter />
            <LanguageSelector />
            <DarkModeToggle />
            <motion.button 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.95 }} 
              onClick={() => setSearchOpen(!searchOpen)} 
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <Search className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </motion.button>
            {searchOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 px-4">
                <div className="relative max-w-2xl mx-auto">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Search products..."
                    className="w-full px-4 py-3 pr-12 rounded-lg border-2 focus:border-primary-500 focus:outline-none"
                    autoFocus
                  />
                  <button onClick={handleSearch} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary-500 text-white rounded-lg">
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                  <span className="text-2xl">{user.avatar}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="p-3 border-b dark:border-gray-700">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{user.email}</p>
                  </div>
                  <a href="/dashboard" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700">{t('dashboard')}</a>
                  <a href="/seller-dashboard" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700">Seller Dashboard</a>
                  <a href="/wishlist" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700">{t('wishlist')}</a>
                  <a href="/compare" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700">Compare</a>
                  <a href="/saved-searches" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700">Saved Searches</a>
                  {user.role === 'admin' && (
                    <a href="/admin" className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-purple-600">Admin Dashboard</a>
                  )}
                  <button onClick={logout} className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-red-600 flex items-center gap-2">
                    <LogOut className="w-4 h-4" />
                    {t('logout')}
                  </button>
                </div>
              </div>
            ) : (
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => setAuthOpen(true)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <User className="w-5 h-5 text-gray-700 dark:text-gray-300" />
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
            className="md:hidden py-4 border-t"
          >
            <div className="flex flex-col space-y-4">
              <a href="/" className="text-gray-700 hover:text-primary-600 transition font-medium">{t('home')}</a>
              <a href="/#categories" className="text-gray-700 hover:text-primary-600 transition font-medium">{t('categories')}</a>
              <a href="/#products" className="text-gray-700 hover:text-primary-600 transition font-medium">{t('products')}</a>
              <a href="/become-seller" className="px-4 py-2 bg-primary-500 text-white rounded-lg font-semibold text-center">{t('sell')}</a>
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
