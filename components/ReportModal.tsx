"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Flag, X } from "lucide-react";
import { useState } from "react";

export default function ReportModal({ isOpen, onClose, productName }: any) {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = () => {
    alert("Report submitted! We'll review this listing within 24 hours.");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Flag className="w-5 h-5 text-red-500" />
                  <h2 className="text-xl font-bold">Report Listing</h2>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-4">Report: {productName}</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Reason</label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="">Select reason</option>
                    <option value="fake">Fake/Counterfeit Product</option>
                    <option value="scam">Suspected Scam</option>
                    <option value="misleading">Misleading Information</option>
                    <option value="inappropriate">Inappropriate Content</option>
                    <option value="duplicate">Duplicate Listing</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Additional Details</label>
                  <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Provide more information..."
                    className="w-full px-4 py-2 border rounded-lg h-24 resize-none"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!reason}
                  className="w-full py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 disabled:bg-gray-300"
                >
                  Submit Report
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
