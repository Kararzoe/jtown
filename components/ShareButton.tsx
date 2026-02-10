"use client";

import { Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ShareButton({ title, url }: { title: string; url?: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = url || window.location.href;
    
    if (navigator.share) {
      await navigator.share({ title, url: shareUrl });
    } else {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleShare}
      className="p-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-500 relative"
    >
      <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      {copied && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap">
          Link copied!
        </span>
      )}
    </motion.button>
  );
}
