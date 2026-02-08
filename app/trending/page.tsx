'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { TrendingUp, Heart, Eye } from 'lucide-react';

export default function Trending() {
  const [products, setProducts] = useState<any[]>([]);
  const [period, setPeriod] = useState('7d');

  useEffect(() => {
    loadTrending();
  }, [period]);

  const loadTrending = async () => {
    const data = await api.getTrending(period);
    setProducts(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-primary-500" />
            <h1 className="text-2xl md:text-3xl font-bold">Trending Products</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPeriod('24h')}
              className={`px-3 md:px-4 py-2 rounded-lg text-sm md:text-base ${period === '24h' ? 'bg-primary-500 text-white' : 'bg-white'}`}
            >
              24 Hours
            </button>
            <button
              onClick={() => setPeriod('7d')}
              className={`px-3 md:px-4 py-2 rounded-lg text-sm md:text-base ${period === '7d' ? 'bg-primary-500 text-white' : 'bg-white'}`}
            >
              7 Days
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <div key={product._id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="relative">
                <img src={product.images[0]} alt={product.title} className="w-full h-40 md:h-48 object-cover" />
                <div className="absolute top-2 left-2 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  #{index + 1}
                </div>
              </div>
              <div className="p-3 md:p-4">
                <h3 className="font-semibold text-sm md:text-base mb-2 line-clamp-2">{product.title}</h3>
                <p className="text-lg md:text-2xl font-bold text-primary-500 mb-3">₦{product.price.toLocaleString()}</p>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {product.views}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {product.favorites?.length || 0}
                  </div>
                </div>
                <a
                  href={`/product/${product._id}`}
                  className="block w-full py-2 bg-primary-500 text-white text-center rounded-lg hover:bg-primary-600"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
