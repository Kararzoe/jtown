"use client";

import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  { q: "How do I contact a seller?", a: "Click on any product, then use the 'Contact Seller' button to chat or call them directly." },
  { q: "Is payment done on the platform?", a: "No, all payments are made directly to sellers. You arrange payment and delivery with them." },
  { q: "How do I become a seller?", a: "Click 'Sell' in the navigation menu and fill out the registration form. We'll review and contact you within 24 hours." },
  { q: "Are sellers verified?", a: "Yes, all sellers go through a verification process before they can list products on Jos Marketplace." },
  { q: "Can I negotiate prices?", a: "Absolutely! Contact the seller directly to discuss pricing and arrange the best deal." },
  { q: "What areas does Jos Marketplace cover?", a: "We cover all areas in Jos including Bukuru, Rayfield, Terminus, Lamingo, and surrounding areas." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">Everything you need to know</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="border-2 border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <span className="font-semibold text-left">{faq.q}</span>
                {open === idx ? (
                  <Minus className="w-5 h-5 text-primary-600 flex-shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              {open === idx && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="px-6 pb-4 text-gray-600"
                >
                  {faq.a}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
