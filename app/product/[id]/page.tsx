"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { api } from "@/lib/api";
import { Heart, Share2, MapPin, Star, MessageCircle, Phone, Flag, GitCompare } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import ShareButtons from "@/components/ShareButtons";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (params.id) {
      api.getProduct(params.id as string).then(data => {
        setProduct(data);
        setIsFavorite(data.favorites?.includes(user?._id));
        setLoading(false);
      });
      api.getRelated(params.id as string).then(setRelated);
    }
  }, [params.id, user]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl p-6 shadow-lg">
            <div>
              <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4">
                {product.images?.[selectedImage] ? (
                  <img src={product.images[selectedImage]} alt={product.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-9xl">📦</div>
                )}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images?.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${selectedImage === i ? 'border-primary-500' : 'border-gray-200'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-semibold">{product.category}</span>
                  <h1 className="text-3xl font-bold mt-2">{product.title}</h1>
                </div>
                <div className="flex gap-2">
                  <ShareButtons product={product} />
                  <button
                    onClick={async () => {
                      if (!user) return alert('Please login');
                      await api.toggleFavorite(product._id);
                      setIsFavorite(!isFavorite);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                  <button
                    onClick={async () => {
                      if (!user) return alert('Please login');
                      await api.addToCompare(product._id);
                      alert('Added to compare');
                    }}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <GitCompare className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="text-4xl font-bold text-primary-600 mb-4">₦{product.price.toLocaleString()}</div>

              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">{product.condition}</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{product.location}</span>
                </div>
              </div>

              <div className="border-t border-b py-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-2xl">
                    {product.seller?.shopLogo || '🏪'}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{product.seller?.shopName || product.seller?.name}</h3>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm">{product.seller?.rating || 0}</span>
                      {product.seller?.isVerified && <span className="text-blue-600 text-xs">✓</span>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-lg mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => window.open(`https://wa.me/${product.seller?.phone}?text=Hi, I'm interested in ${product.title}`, '_blank')}
                  className="flex-1 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contact
                </button>
                <button
                  onClick={() => window.open(`tel:${product.seller?.phone}`)}
                  className="px-6 py-3 border-2 border-primary-500 text-primary-500 rounded-lg font-semibold hover:bg-primary-50"
                >
                  <Phone className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Related Products</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {related.map((p: any) => (
                  <a key={p._id} href={`/product/${p._id}`} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
                    <img src={p.images[0]} alt={p.title} className="w-full h-40 object-cover" />
                    <div className="p-3">
                      <h3 className="font-semibold text-sm line-clamp-2 mb-1">{p.title}</h3>
                      <p className="text-primary-500 font-bold">₦{p.price.toLocaleString()}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
