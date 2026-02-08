"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { api } from "@/lib/api";
import { Star, MapPin, Phone, MessageCircle } from "lucide-react";

export default function SellerPage() {
  const params = useParams();
  const [seller, setSeller] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      api.getSellerInfo(params.id as string).then(data => {
        setSeller(data);
        setLoading(false);
      });
      
      api.getProducts({ seller: params.id }).then(data => {
        setProducts(Array.isArray(data) ? data : []);
      });
    }
  }, [params.id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!seller) return <div className="min-h-screen flex items-center justify-center">Seller not found</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center text-5xl">
                {seller.shopLogo || '🏪'}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{seller.shopName || seller.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold">{seller.rating || 0}</span>
                    <span className="text-gray-600">({seller.totalReviews || 0} reviews)</span>
                  </div>
                  {seller.isVerified && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                      ✓ Verified Seller
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{seller.location || 'Jos, Nigeria'}</span>
                </div>
                <p className="text-gray-600 mb-4">{seller.shopDescription}</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => window.open(`https://wa.me/${seller.phone}`, '_blank')}
                    className="px-6 py-2 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 flex items-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Contact Seller
                  </button>
                  <button
                    onClick={() => window.open(`tel:${seller.phone}`)}
                    className="px-6 py-2 border-2 border-primary-500 text-primary-500 rounded-lg font-semibold hover:bg-primary-50 flex items-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    Call
                  </button>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6">Products ({seller.totalProducts || 0})</h2>
          
          {products.length === 0 ? (
            <p className="text-center text-gray-600 py-12">No products available</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product: any) => (
                <div
                  key={product._id}
                  onClick={() => window.location.href = `/product/${product._id}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all cursor-pointer"
                >
                  <div className="aspect-square bg-gray-100">
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-7xl">📦</div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold truncate mb-2">{product.title}</h3>
                    <div className="text-2xl font-bold text-primary-600">₦{product.price.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
