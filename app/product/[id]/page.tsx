"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { Star, ShoppingCart } from "lucide-react";

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    // Mock product data
    setProduct({
      id: params.id,
      title: 'iPhone 14 Pro',
      description: 'Latest iPhone with amazing camera and performance',
      price: 999,
      category: 'electronics',
      images: ['/api/placeholder/600/400'],
      seller: { name: 'Tech Store', id: '1' }
    });

    setReviews([
      {
        id: '1',
        rating: 5,
        comment: 'Excellent product!',
        user: { name: 'John Doe' },
        createdAt: new Date()
      }
    ]);
  }, [params.id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img 
            src={product.images[0]} 
            alt={product.title}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-2xl font-bold text-blue-600 mb-4">${product.price}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          
          <button 
            onClick={() => addToCart(product)}
            className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Seller</h3>
            <p>{product.seller.name}</p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6">Reviews</h3>
        <div className="space-y-4">
          {reviews.map((review: any) => (
            <div key={review.id} className="border p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="font-semibold">{review.user.name}</span>
              </div>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}