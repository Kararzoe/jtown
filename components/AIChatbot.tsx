"use client";

import { motion } from "framer-motion";
import { Bot, Send } from "lucide-react";
import { useState } from "react";

const responses: any = {
  "how to buy": "To buy: 1) Browse products 2) Click 'Contact Seller' 3) Negotiate price 4) Arrange payment & delivery directly with seller",
  "payment": "All payments are made directly to sellers. We don't handle transactions. Arrange payment method with the seller.",
  "delivery": "Delivery is arranged between buyer and seller. We partner with logistics companies for safe delivery.",
  "sell": "To sell: Click 'Sell' in the menu, fill the registration form, and we'll contact you within 24 hours!",
  "safe": "Safety tips: Meet in public places, verify products before payment, use our verified sellers, report suspicious listings.",
};

export default function AIChatbot({ onSwitch }: { onSwitch?: () => void }) {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm Jos AI Assistant. Ask me about buying, selling, payments, or safety!", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { text: input, sender: "user" }]);

    const lowerInput = input.toLowerCase();
    let response = "I can help with: buying, selling, payments, delivery, or safety tips. What would you like to know?";

    for (const [key, value] of Object.entries(responses)) {
      if (lowerInput.includes(key)) {
        response = value as string;
        break;
      }
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { text: response, sender: "bot" }]);
    }, 500);

    setInput("");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 bg-primary-500 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="w-6 h-6" />
          <div>
            <h3 className="font-bold">Jos AI Assistant</h3>
            <p className="text-xs text-primary-100">Always here to help</p>
          </div>
        </div>
        {onSwitch && (
          <button onClick={onSwitch} className="text-xs bg-white/20 px-2 py-1 rounded">
            Human
          </button>
        )}
      </div>

      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-3 ${msg.sender === "user" ? "text-right" : ""}`}>
            <div className={`inline-block p-3 rounded-lg max-w-[80%] ${
              msg.sender === "user" 
                ? "bg-primary-500 text-white" 
                : "bg-white shadow-sm"
            }`}>
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t bg-white flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask me anything..."
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:border-primary-500"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          className="p-2 bg-primary-500 text-white rounded-full hover:bg-primary-600"
        >
          <Send className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
