'use client';

import { Share2, Facebook, Twitter, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function ShareButtons({ product }: { product: any }) {
  const [showMenu, setShowMenu] = useState(false);
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const text = `Check out ${product.title} for ₦${product.price.toLocaleString()}`;

  const share = (platform: string) => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
    };
    window.open((urls as any)[platform], '_blank', 'width=600,height=400');
    setShowMenu(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
      >
        <Share2 className="w-5 h-5" />
        Share
      </button>
      
      {showMenu && (
        <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border p-2 z-10">
          <button
            onClick={() => share('facebook')}
            className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-50 rounded"
          >
            <Facebook className="w-5 h-5 text-blue-600" />
            Facebook
          </button>
          <button
            onClick={() => share('twitter')}
            className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-50 rounded"
          >
            <Twitter className="w-5 h-5 text-blue-400" />
            Twitter
          </button>
          <button
            onClick={() => share('whatsapp')}
            className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-50 rounded"
          >
            <MessageCircle className="w-5 h-5 text-green-600" />
            WhatsApp
          </button>
        </div>
      )}
    </div>
  );
}
