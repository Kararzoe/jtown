'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('stats');
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    if (user.role !== 'admin') {
      router.push('/');
      return;
    }
    loadData();
  }, [user, activeTab]);

  const loadData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      if (activeTab === 'stats') {
        const data = await api.getStats();
        setStats(data);
      } else if (activeTab === 'users') {
        const data = await api.getAllUsers();
        setUsers(Array.isArray(data) ? data : []);
      } else if (activeTab === 'products') {
        const data = await api.getAllProducts();
        setProducts(Array.isArray(data) ? data : []);
      } else if (activeTab === 'reports') {
        const data = await api.getAllReports();
        setReports(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm('Delete this user and all their products?')) return;
    await api.deleteUser(id);
    loadData();
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    await api.deleteProductAdmin(id);
    loadData();
  };

  const handleUpdateReport = async (id: string, status: string) => {
    await api.updateReportStatus(id, status);
    loadData();
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (user.role !== 'admin') return null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

          <div className="flex gap-4 mb-8 border-b overflow-x-auto">
            {['stats', 'users', 'products', 'reports'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium capitalize whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-b-2 border-primary-500 text-primary-500'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : (
            <>
              {activeTab === 'stats' && stats && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-600 text-sm mb-2">Total Users</h3>
                    <p className="text-3xl font-bold text-primary-500">{stats.totalUsers}</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-600 text-sm mb-2">Total Products</h3>
                    <p className="text-3xl font-bold text-primary-500">{stats.totalProducts}</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-600 text-sm mb-2">Total Orders</h3>
                    <p className="text-3xl font-bold text-primary-500">{stats.totalOrders}</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-600 text-sm mb-2">Pending Reports</h3>
                    <p className="text-3xl font-bold text-red-500">{stats.pendingReports}</p>
                  </div>
                </div>
              )}

              {activeTab === 'users' && (
                <div className="bg-white rounded-lg shadow overflow-x-auto">
                  {users.length === 0 ? (
                    <p className="p-8 text-center text-gray-600">No users found</p>
                  ) : (
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {users.map(u => (
                          <tr key={u._id}>
                            <td className="px-6 py-4 whitespace-nowrap">{u.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{u.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded ${
                                u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {u.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(u.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {u.role !== 'admin' && (
                                <button
                                  onClick={() => handleDeleteUser(u._id)}
                                  className="text-red-600 hover:text-red-800 text-sm"
                                >
                                  Delete
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {activeTab === 'products' && (
                <div className="bg-white rounded-lg shadow overflow-x-auto">
                  {products.length === 0 ? (
                    <p className="p-8 text-center text-gray-600">No products found</p>
                  ) : (
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seller</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {products.map(p => (
                          <tr key={p._id}>
                            <td className="px-6 py-4">{p.title}</td>
                            <td className="px-6 py-4">{p.seller?.name || 'N/A'}</td>
                            <td className="px-6 py-4">₦{p.price?.toLocaleString()}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 text-xs rounded ${
                                p.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {p.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => handleDeleteProduct(p._id)}
                                className="text-red-600 hover:text-red-800 text-sm"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {activeTab === 'reports' && (
                <div className="bg-white rounded-lg shadow overflow-x-auto">
                  {reports.length === 0 ? (
                    <p className="p-8 text-center text-gray-600">No reports found</p>
                  ) : (
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reporter</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {reports.map(r => (
                          <tr key={r._id}>
                            <td className="px-6 py-4">{r.reportType}</td>
                            <td className="px-6 py-4">{r.reporter?.name || 'N/A'}</td>
                            <td className="px-6 py-4">{r.reason}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 text-xs rounded ${
                                r.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                r.status === 'resolved' ? 'bg-green-100 text-green-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {r.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              {r.status === 'pending' && (
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleUpdateReport(r._id, 'resolved')}
                                    className="text-green-600 hover:text-green-800 text-sm"
                                  >
                                    Resolve
                                  </button>
                                  <button
                                    onClick={() => handleUpdateReport(r._id, 'rejected')}
                                    className="text-red-600 hover:text-red-800 text-sm"
                                  >
                                    Reject
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
