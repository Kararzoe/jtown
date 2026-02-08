"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, User, Bot } from "lucide-react";
import { useState } from "react";
import AIChatbot from "./AIChatbot";

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAI, setShowAI] = useState(true);

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-3 md:p-4 bg-primary-500 text-white rounded-full shadow-2xl hover:bg-primary-600"
      >
        {isOpen ? <X className="w-5 h-5 md:w-6 md:h-6" /> : <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] max-w-sm md:w-80 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px]"
          >
            {showAI ? (
              <AIChatbot onSwitch={() => setShowAI(false)} />
            ) : (
              <>
                <div className="bg-primary-500 text-white p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg">Chat with us</h3>
                      <p className="text-sm text-primary-100">We typically reply in minutes</p>
                    </div>
                    <button onClick={() => setShowAI(true)} className="text-xs bg-white/20 px-2 py-1 rounded">
                      AI Bot
                    </button>
                  </div>
                </div>

                <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                  <div className="text-center text-xs text-gray-500 mb-4">Connect with sellers directly</div>
                  <div className="mb-4">
                    <div className="flex items-start gap-2">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-primary-600" />
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm max-w-[80%]">
                        <p className="text-xs font-semibold text-gray-700 mb-1">Support Team</p>
                        <p className="text-sm">👋 Hi! Looking for a specific product? I can connect you with the right seller!</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t bg-white">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:border-primary-500"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-primary-500 text-white rounded-full hover:bg-primary-600"
                    >
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
