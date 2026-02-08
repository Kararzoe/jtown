"use client";

import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const notifications = [
  { id: 1, text: "New iPhone 15 listed in Bukuru", time: "2m ago", type: "new" },
  { id: 2, text: "Price drop: Smart Watch now ₦285,000", time: "1h ago", type: "price" },
  { id: 3, text: "TechHub Store sent you a message", time: "3h ago", type: "message" },
];

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-full relative"
      >
        <Bell className="w-5 h-5 text-gray-700" />
        {notifications.length > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-72 md:w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 z-50"
          >
            <div className="p-3 md:p-4 border-b dark:border-gray-700">
              <h3 className="font-bold text-sm md:text-base">Notifications</h3>
            </div>
            <div className="max-h-72 md:max-h-96 overflow-y-auto">
              {notifications.map((notif) => (
                <div key={notif.id} className="p-3 md:p-4 hover:bg-gray-50 dark:hover:bg-gray-700 border-b dark:border-gray-700 cursor-pointer">
                  <p className="text-xs md:text-sm">{notif.text}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notif.time}</p>
                </div>
              ))}
            </div>
            <div className="p-2 md:p-3 text-center border-t dark:border-gray-700">
              <button className="text-xs md:text-sm text-primary-600 font-semibold">View All</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
