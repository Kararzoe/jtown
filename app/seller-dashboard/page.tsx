'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TrendingUp, Package, Eye, Heart, AlertTriangle, Zap, Tag, Gift, Store } from 'lucide-react';

export default function SellerDashboard() {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('analytics');
  const [products, setProducts] = useState<any[]>([]);
  const [shops, setShops] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user, activeTab]);

  const loadData = async () => {
    if (activeTab === 'analytics') {
      const data = await api.getSellerAnalytics();
      setAnalytics(data);
    } else if (activeTab === 'inventory') {
      const data = await api.getMyProducts();
      setProducts(data);
    } else if (activeTab === 'shops') {
      const data = await api.getShops();
      setShops(data);
    }
  };

  const handlePromote = async (productId: string) => {
    const plan = prompt('Enter plan (basic/premium/featured):');
    const duration = prompt('Enter duration in days:');
    if (!plan) return;
    await api.promoteProduct(productId, plan, parseInt(duration || '7'));
    alert('Product promoted!');
  };

  const handleFlashSale = async (productId: string) => {
    const discount = prompt('Enter discount percentage:');
    const duration = prompt('Enter duration in hours:');
    await api.createFlashSale(productId, parseInt(discount || '10'), parseInt(duration || '24'));
    alert('Flash sale created!');
    loadData();
  };

  const handleStockUpdate = async (productId: string, currentStock: number) => {
    const stock = prompt('Enter new stock quantity:', currentStock.toString());
    if (stock) {
      await api.updateStock(productId, parseInt(stock));
      loadData();
    }
  };

  const handleCreateShop = async () => {
    const name = prompt('Shop name:');
    const description = prompt('Shop description:');
    if (name) {
      await api.createShop({ name, description, isActive: true });
      loadData();
    }
  };

  if (!user) return null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Seller Dashboard</h1>

          <div className="flex gap-4 mb-8 border-b overflow-x-auto">
            {['analytics', 'inventory', 'promotions', 'shops'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium capitalize whitespace-nowrap ${
                  activeTab === tab ? 'border-b-2 border-primary-500 text-primary-500' : 'text-gray-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'analytics' && analytics && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-lg shadow">
                  <Package className="w-8 h-8 text-primary-500 mb-2" />
                  <p className="text-gray-600 text-sm">Products</p>
                  <p className="text-2xl font-bold">{analytics.totalProducts}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <Eye className="w-8 h-8 text-blue-500 mb-2" />
                  <p className="text-gray-600 text-sm">Total Views</p>
                  <p className="text-2xl font-bold">{analytics.totalViews}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <Heart className="w-8 h-8 text-red-500 mb-2" />
                  <p className="text-gray-600 text-sm">Favorites</p>
                  <p className="text-2xl font-bold">{analytics.totalFavorites}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <AlertTriangle className="w-8 h-8 text-orange-500 mb-2" />
                  <p className="text-gray-600 text-sm">Low Stock</p>
                  <p className="text-2xl font-bold">{analytics.lowStock}</p>
                </div>
              </div>

              {analytics.lowStockProducts?.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="font-bold text-lg mb-4">Low Stock Alert</h3>
                  <div className="space-y-2">
                    {analytics.lowStockProducts.map((p: any) => (
                      <div key={p._id} className="flex justify-between items-center p-3 bg-orange-50 rounded">
                        <span>{p.title}</span>
                        <span className="text-orange-600 font-bold">{p.stock} left</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {products.map(p => (
                    <tr key={p._id}>
                      <td className="px-6 py-4">{p.title}</td>
                      <td className="px-6 py-4">
                        <span className={p.stock <= p.lowStockAlert ? 'text-orange-600 font-bold' : ''}>
                          {p.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4">{p.views}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleStockUpdate(p._id, p.stock)}
                          className="text-primary-500 hover:underline text-sm mr-3"
                        >
                          Update Stock
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'promotions' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <Zap className="w-12 h-12 text-yellow-500 mb-4" />
                  <h3 className="font-bold text-lg mb-2">Promote Product</h3>
                  <p className="text-sm text-gray-600 mb-4">Boost visibility with paid ads</p>
                  <select
                    onChange={(e) => e.target.value && handlePromote(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select Product</option>
                    {products.map(p => (
                      <option key={p._id} value={p._id}>{p.title}</option>
                    ))}
                  </select>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                  <Tag className="w-12 h-12 text-red-500 mb-4" />
                  <h3 className="font-bold text-lg mb-2">Flash Sale</h3>
                  <p className="text-sm text-gray-600 mb-4">Create time-limited deals</p>
                  <select
                    onChange={(e) => e.target.value && handleFlashSale(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select Product</option>
                    {products.map(p => (
                      <option key={p._id} value={p._id}>{p.title}</option>
                    ))}
                  </select>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                  <Gift className="w-12 h-12 text-green-500 mb-4" />
                  <h3 className="font-bold text-lg mb-2">Loyalty Points</h3>
                  <p className="text-sm text-gray-600 mb-4">Your points: {user.loyaltyPoints || 0}</p>
                  <button className="w-full py-2 bg-primary-500 text-white rounded-lg">
                    Redeem Points
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'shops' && (
            <div className="space-y-6">
              <button
                onClick={handleCreateShop}
                className="px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold"
              >
                Create New Shop
              </button>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {shops.map((shop, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-lg shadow">
                    <Store className="w-12 h-12 text-primary-500 mb-4" />
                    <h3 className="font-bold text-lg mb-2">{shop.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{shop.description}</p>
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      shop.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {shop.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
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
