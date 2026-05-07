"use client";

import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Rocket } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-950 text-gray-400 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Rocket className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">JosMKT</h3>
            </div>
            <p className="text-sm mb-5 leading-relaxed">{t('subtitle')}</p>
            <div className="flex space-x-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <motion.a key={i} whileHover={{ scale: 1.1, y: -2 }} href="#" className="p-2.5 bg-gray-800/80 rounded-xl hover:bg-emerald-600 transition-all">
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t('categories')}</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition">{t('phones')}</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition">{t('gadgets')}</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition">{t('electronics')}</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition">{t('fashion')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t('aboutUs')}</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition">{t('aboutUs')}</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition">{t('helpCenter')}</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition">{t('termsOfService')}</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition">{t('privacyPolicy')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t('contactUs')}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-emerald-500" /> support@josmkt.ng.com</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-emerald-500" /> +234 904 383 2380</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-500" /> Jos, Plateau State, Nigeria</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; 2024 JosMKT. {t('allRightsReserved')}.</p>
          <p className="text-gray-600">Powered by <span className="text-emerald-500 font-medium">Plero Digitals</span></p>
        </div>
      </div>
    </footer>
  );
}
