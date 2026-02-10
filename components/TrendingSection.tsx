'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { TrendingUp, Eye, Heart } from 'lucide-react';

export default function TrendingSection() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    api.getTrending('7d').then(data => setProducts(Array.isArray(data) ? data.slice(0, 4) : []));
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-primary-500" />
            <h2 className="text-3xl font-bold">Trending This Week</h2>
          </div>
          <a href="/trending" className="text-primary-500 hover:underline">View All</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product: any, index) => (
            <a key={product._id} href={`/product/${product._id}`} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition group">
              <div className="relative">
                <img src={product.images[0]} alt={product.title} className="w-full h-48 object-cover group-hover:scale-105 transition" />
                <div className="absolute top-2 left-2 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  #{index + 1}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2 line-clamp-2">{product.title}</h3>
                <p className="text-2xl font-bold text-primary-500 mb-2">₦{product.price.toLocaleString()}</p>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {product.views}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {product.favorites?.length || 0}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
