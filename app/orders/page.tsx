"use client";

import { useState, useEffect } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(setOrders);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      
      <div className="space-y-4">
        {orders.map((order: any) => (
          <div key={order.id} className="border p-6 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold">Order #{order.id}</h3>
                <p className="text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                order.status === 'completed' ? 'bg-green-100 text-green-800' :
                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {order.status}
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <img 
                src={order.product?.images?.[0] || '/api/placeholder/80/80'} 
                alt={order.product?.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h4 className="font-semibold">{order.product?.title}</h4>
                <p className="text-gray-600">${order.total}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}