'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Heart, MapPin } from 'lucide-react';

export default function Wishlist() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const data = await api.getFavorites();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const removeFavorite = async (id: string) => {
    await api.toggleFavorite(id);
    loadFavorites();
  };

  if (loading) return <div className="min-h-screen pt-20 flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
        
        {products.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600">No items in your wishlist</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map(product => (
              <div key={product._id} className="bg-white rounded-lg shadow overflow-hidden group">
                <div className="relative">
                  <img src={product.images[0]} alt={product.title} className="w-full h-40 md:h-48 object-cover" />
                  <button
                    onClick={() => removeFavorite(product._id)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow"
                  >
                    <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                  </button>
                </div>
                <div className="p-3 md:p-4">
                  <h3 className="font-semibold text-sm md:text-base mb-2 line-clamp-2">{product.title}</h3>
                  <p className="text-lg md:text-2xl font-bold text-primary-500 mb-2">₦{product.price.toLocaleString()}</p>
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {product.location}
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
        )}
      </div>
    </div>
  );
}
