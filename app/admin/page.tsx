"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Package, ShoppingCart, Wrench, Trash2, CheckCircle, XCircle, Eye } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function AdminDashboard() {
  const [tab, setTab] = useState<"overview" | "users" | "products" | "providers" | "orders">("overview");
  const [stats, setStats] = useState({ users: 0, products: 0, orders: 0, providers: 0 });
  const [users, setUsers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [providers, setProviders] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);
  const [password, setPassword] = useState("");

  const ADMIN_PASSWORD = "Ojonsman122.";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuth(true);
      localStorage.setItem("admin_auth", "true");
    } else {
      alert("Wrong password");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("admin_auth") === "true") setAuth(true);
  }, []);

  useEffect(() => {
    if (!auth) return;
    fetchData();
  }, [auth]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, usersRes, productsRes, providersRes, ordersRes] = await Promise.all([
        fetch("/api/stats").then(r => r.json()),
        fetch("/api/admin/users").then(r => r.json()).catch(() => []),
        fetch("/api/products").then(r => r.json()).catch(() => ({ products: [] })),
        fetch("/api/services").then(r => r.json()).catch(() => []),
        fetch("/api/orders").then(r => r.json()).catch(() => []),
      ]);
      setStats(statsRes);
      setUsers(Array.isArray(usersRes) ? usersRes : []);
      setProducts(Array.isArray(productsRes.products) ? productsRes.products : Array.isArray(productsRes) ? productsRes : []);
      setProviders(Array.isArray(providersRes) ? providersRes : []);
      setOrders(Array.isArray(ordersRes) ? ordersRes : []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const deleteUser = async (id: string) => {
    if (!confirm("Delete this user?")) return;
    await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    setUsers(users.filter(u => u.id !== id));
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const token = localStorage.getItem("token");
    await fetch(`/api/products/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    setProducts(products.filter(p => p.id !== id));
  };

  const approveProvider = async (id: string) => {
    await fetch(`/api/admin/providers/${id}/approve`, { method: "PATCH" });
    setProviders(providers.map(p => p.id === id ? { ...p, approved: true } : p));
  };

  if (!auth) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
          <form onSubmit={handleLogin} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-sm w-full">
            <h1 className="text-2xl font-bold mb-6 text-center">Admin Access</h1>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 border-2 rounded-xl mb-4 focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <button type="submit" className="w-full py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600">
              Login
            </button>
          </form>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <button onClick={() => { localStorage.removeItem("admin_auth"); setAuth(false); }} className="text-sm text-red-500 hover:underline">
              Logout
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Users", value: stats.users, icon: Users, color: "from-blue-500 to-indigo-500" },
              { label: "Products", value: stats.products, icon: Package, color: "from-emerald-500 to-teal-500" },
              { label: "Orders", value: stats.orders, icon: ShoppingCart, color: "from-amber-500 to-orange-500" },
              { label: "Providers", value: stats.providers, icon: Wrench, color: "from-purple-500 to-pink-500" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {(["overview", "users", "products", "providers", "orders"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  tab === t ? "bg-emerald-500 text-white" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20 text-gray-500">Loading...</div>
          ) : (
            <>
              {/* Users Tab */}
              {tab === "users" && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold">Name</th>
                          <th className="px-4 py-3 text-left font-semibold">Email</th>
                          <th className="px-4 py-3 text-left font-semibold">Role</th>
                          <th className="px-4 py-3 text-left font-semibold">Verified</th>
                          <th className="px-4 py-3 text-left font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y dark:divide-gray-700">
                        {users.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                            <td className="px-4 py-3 font-medium">{user.name}</td>
                            <td className="px-4 py-3 text-gray-500">{user.email}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : user.role === 'seller' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'}`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              {user.verified ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-red-400" />}
                            </td>
                            <td className="px-4 py-3">
                              <button onClick={() => deleteUser(user.id)} className="text-red-500 hover:text-red-700">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {users.length === 0 && <p className="text-center py-8 text-gray-500">No users yet</p>}
                </div>
              )}

              {/* Products Tab */}
              {tab === "products" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <div key={product.id} className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-gray-900 dark:text-white">{product.title}</h3>
                        <button onClick={() => deleteProduct(product.id)} className="text-red-500 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-emerald-600">₦{product.price?.toLocaleString()}</span>
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">{product.category}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                        <Eye className="w-3 h-3" /> {product.views || 0} views
                        <span>• Stock: {product.stock}</span>
                      </div>
                    </div>
                  ))}
                  {products.length === 0 && <p className="col-span-full text-center py-8 text-gray-500">No products yet</p>}
                </div>
              )}

              {/* Providers Tab */}
              {tab === "providers" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {providers.map((provider) => (
                    <div key={provider.id} className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white">{provider.serviceName}</h3>
                          <p className="text-sm text-gray-500">{provider.category} • {provider.location}</p>
                        </div>
                        {provider.approved ? (
                          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full font-medium">Approved</span>
                        ) : (
                          <button onClick={() => approveProvider(provider.id)} className="px-3 py-1 bg-emerald-500 text-white text-xs rounded-full font-medium hover:bg-emerald-600">
                            Approve
                          </button>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{provider.description}</p>
                      <p className="text-sm text-gray-400 mt-2">📞 {provider.phone}</p>
                    </div>
                  ))}
                  {providers.length === 0 && <p className="col-span-full text-center py-8 text-gray-500">No service providers yet</p>}
                </div>
              )}

              {/* Orders Tab */}
              {tab === "orders" && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold">Order ID</th>
                          <th className="px-4 py-3 text-left font-semibold">Product</th>
                          <th className="px-4 py-3 text-left font-semibold">Total</th>
                          <th className="px-4 py-3 text-left font-semibold">Status</th>
                          <th className="px-4 py-3 text-left font-semibold">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y dark:divide-gray-700">
                        {orders.map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                            <td className="px-4 py-3 font-mono text-xs">{order.id?.slice(0, 8)}...</td>
                            <td className="px-4 py-3">{order.product?.title || "—"}</td>
                            <td className="px-4 py-3 font-bold">₦{order.total?.toLocaleString()}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                order.status === 'delivered' ? 'bg-emerald-100 text-emerald-700' :
                                order.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                'bg-blue-100 text-blue-700'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {orders.length === 0 && <p className="text-center py-8 text-gray-500">No orders yet</p>}
                </div>
              )}

              {/* Overview Tab */}
              {tab === "overview" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                    <h3 className="font-bold text-lg mb-4">Recent Users</h3>
                    {users.slice(0, 5).map((user) => (
                      <div key={user.id} className="flex items-center justify-between py-2 border-b dark:border-gray-700 last:border-0">
                        <div>
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">{user.role}</span>
                      </div>
                    ))}
                    {users.length === 0 && <p className="text-gray-500 text-sm">No users yet</p>}
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                    <h3 className="font-bold text-lg mb-4">Recent Products</h3>
                    {products.slice(0, 5).map((product) => (
                      <div key={product.id} className="flex items-center justify-between py-2 border-b dark:border-gray-700 last:border-0">
                        <div>
                          <p className="font-medium text-sm">{product.title}</p>
                          <p className="text-xs text-gray-500">{product.category}</p>
                        </div>
                        <span className="font-bold text-sm text-emerald-600">₦{product.price?.toLocaleString()}</span>
                      </div>
                    ))}
                    {products.length === 0 && <p className="text-gray-500 text-sm">No products yet</p>}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
