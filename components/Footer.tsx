"use client";

import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-950 text-gray-400 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/josmkt-logo-3.png" alt="JosMKT" className="w-10 h-10 object-contain" />
              <h3 className="text-xl font-bold text-white">JosMKT</h3>
            </div>
            <p className="text-sm mb-5 leading-relaxed">{t('subtitle')}</p>
            <div className="flex space-x-3">
              {[
                { icon: Facebook, href: "https://facebook.com/josmarketplace" },
                { icon: Twitter, href: "https://twitter.com/josMKTPlace" },
                { icon: Instagram, href: "https://instagram.com/josmarketplace_" },
              ].map(({ icon: Icon, href }, i) => (
                <motion.a key={i} whileHover={{ scale: 1.1, y: -2 }} href={href} target="_blank" className="p-2.5 bg-gray-800/80 rounded-xl hover:bg-emerald-600 transition-all">
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
              <motion.a whileHover={{ scale: 1.1, y: -2 }} href="https://tiktok.com/@jos.market.place" target="_blank" className="p-2.5 bg-gray-800/80 rounded-xl hover:bg-emerald-600 transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.88 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .56.04.82.11v-3.5a6.37 6.37 0 00-.82-.05A6.34 6.34 0 003.15 15.6a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.4a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.83z"/></svg>
              </motion.a>
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
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-emerald-500" /> +234 911 514 6303</li>
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
