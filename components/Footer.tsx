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
              <motion.a whileHover={{ scale: 1.1, y: -2 }} href="https://whatsapp.com/channel/0029Vb8A5EOHAdNUqjm3mC33" target="_blank" className="p-2.5 bg-gray-800/80 rounded-xl hover:bg-green-600 transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
              </motion.a>
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
