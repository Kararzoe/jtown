"use client";

import { motion } from "framer-motion";
import { CreditCard, Shield, Lock } from "lucide-react";
import { useState } from "react";

export default function PaymentModal({ isOpen, onClose, amount }: any) {
  const [method, setMethod] = useState("card");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <Shield className="w-6 h-6 text-green-500" />
          <h2 className="text-2xl font-bold">Secure Payment</h2>
        </div>

        <div className="mb-6">
          <p className="text-3xl font-bold text-primary-600">₦{amount?.toLocaleString()}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Amount to pay</p>
        </div>

        <div className="space-y-4 mb-6">
          <button
            onClick={() => setMethod("card")}
            className={`w-full p-4 border-2 rounded-lg flex items-center gap-3 ${
              method === "card" ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20" : "border-gray-300"
            }`}
          >
            <CreditCard className="w-6 h-6" />
            <div className="text-left">
              <p className="font-semibold">Card Payment</p>
              <p className="text-xs text-gray-600">Visa, Mastercard, Verve</p>
            </div>
          </button>

          <button
            onClick={() => setMethod("transfer")}
            className={`w-full p-4 border-2 rounded-lg flex items-center gap-3 ${
              method === "transfer" ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20" : "border-gray-300"
            }`}
          >
            <span className="text-2xl">🏦</span>
            <div className="text-left">
              <p className="font-semibold">Bank Transfer</p>
              <p className="text-xs text-gray-600">Direct bank transfer</p>
            </div>
          </button>

          <button
            onClick={() => setMethod("wallet")}
            className={`w-full p-4 border-2 rounded-lg flex items-center gap-3 ${
              method === "wallet" ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20" : "border-gray-300"
            }`}
          >
            <span className="text-2xl">💳</span>
            <div className="text-left">
              <p className="font-semibold">Mobile Wallet</p>
              <p className="text-xs text-gray-600">Paystack, Flutterwave</p>
            </div>
          </button>
        </div>

        <div className="flex items-center gap-2 mb-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <Lock className="w-5 h-5 text-blue-600" />
          <p className="text-sm text-blue-800 dark:text-blue-300">
            Your payment is secured with escrow protection
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button className="flex-1 px-4 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600">
            Pay Now
          </button>
        </div>
      </motion.div>
    </div>
  );
}
