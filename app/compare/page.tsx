'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { X } from 'lucide-react';

export default function Compare() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    loadCompare();
  }, []);

  const loadCompare = async () => {
    const data = await api.getCompareList();
    setProducts(data);
  };

  const remove = async (id: string) => {
    await api.removeFromCompare(id);
    loadCompare();
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Compare Products</h1>
        
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No products to compare</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left">Feature</th>
                  {products.map(p => (
                    <th key={p._id} className="p-4 text-center relative">
                      <button onClick={() => remove(p._id)} className="absolute top-2 right-2">
                        <X className="w-5 h-5 text-red-500" />
                      </button>
                      <img src={p.images[0]} alt={p.title} className="w-32 h-32 object-cover mx-auto mb-2 rounded" />
                      <p className="font-semibold">{p.title}</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4 font-semibold">Price</td>
                  {products.map(p => (
                    <td key={p._id} className="p-4 text-center text-primary-500 font-bold">₦{p.price.toLocaleString()}</td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-semibold">Condition</td>
                  {products.map(p => (
                    <td key={p._id} className="p-4 text-center capitalize">{p.condition}</td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-semibold">Location</td>
                  {products.map(p => (
                    <td key={p._id} className="p-4 text-center">{p.location}</td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-semibold">Seller</td>
                  {products.map(p => (
                    <td key={p._id} className="p-4 text-center">{p.seller?.shopName || p.seller?.name}</td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-semibold">Rating</td>
                  {products.map(p => (
                    <td key={p._id} className="p-4 text-center">⭐ {p.seller?.rating || 0}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Action</td>
                  {products.map(p => (
                    <td key={p._id} className="p-4 text-center">
                      <a href={`/product/${p._id}`} className="inline-block px-4 py-2 bg-primary-500 text-white rounded-lg">
                        View
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
