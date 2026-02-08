"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setTimeout(() => setShow(true), 2000);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookieConsent", "true");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 z-50 border dark:border-gray-700"
        >
          <button onClick={() => setShow(false)} className="absolute top-4 right-4 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-start gap-3 mb-4">
            <Cookie className="w-6 h-6 text-primary-500 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">We use cookies</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We use cookies to improve your experience and analyze site traffic. By continuing, you agree to our use of cookies.
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={accept}
              className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600"
            >
              Accept
            </button>
            <button
              onClick={() => setShow(false)}
              className="px-4 py-2 border dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Decline
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
