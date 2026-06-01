"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Package, ShoppingCart, Wrench, Trash2, CheckCircle, XCircle, Eye } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function AdminDashboard() {
  const [tab, setTab] = useState<"overview" | "users" | "products" | "providers" | "orders" | "addProduct" | "addProvider">("overview");
  const [stats, setStats] = useState({ users: 0, products: 0, orders: 0, providers: 0 });
  const [users, setUsers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [providers, setProviders] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [newProduct, setNewProduct] = useState({ title: "", description: "", price: "", category: "", stock: "1" });
  const [newProvider, setNewProvider] = useState({ serviceName: "", category: "", description: "", location: "", phone: "", experience: "", priceRange: "", image: "" });
  const [uploading, setUploading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (!res.ok || !data.token) throw new Error(data.error || "Login failed");
      if (data.user?.role !== "admin") throw new Error("Access denied. Admin only.");
      localStorage.setItem("token", data.token);
      localStorage.setItem("admin_auth", "true");
      setAuth(true);
    } catch (err: any) {
      setLoginError(err.message);
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
    const token = localStorage.getItem("token");
    const authHeaders = { Authorization: `Bearer ${token}` };
    try {
      const [statsRes, usersRes, productsRes, providersRes, ordersRes] = await Promise.all([
        fetch("/api/stats").then(r => r.json()),
        fetch("/api/admin/users", { headers: authHeaders }).then(r => r.json()).catch(() => []),
        fetch("/api/products").then(r => r.json()).catch(() => ({ products: [] })),
        fetch("/api/admin/providers", { headers: authHeaders }).then(r => r.json()).catch(() => []),
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

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...newProduct, price: parseFloat(newProduct.price), stock: parseInt(newProduct.stock), images: [] }),
    });
    if (res.ok) {
      setNewProduct({ title: "", description: "", price: "", category: "", stock: "1" });
      setTab("products");
      fetchData();
    } else {
      alert("Failed to add product");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) setNewProvider({ ...newProvider, image: data.url });
    } catch (err) {
      alert("Upload failed");
    }
    setUploading(false);
  };

  const addProvider = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/providers/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProvider),
    });
    if (res.ok) {
      setNewProvider({ serviceName: "", category: "", description: "", location: "", phone: "", experience: "", priceRange: "", image: "" });
      setTab("providers");
      fetchData();
    } else {
      alert("Failed to add provider");
    }
  };

  if (!auth) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
          <form onSubmit={handleLogin} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-sm w-full">
            <h1 className="text-2xl font-bold mb-6 text-center">Admin Access</h1>
            {loginError && <p className="text-red-500 text-sm mb-4 text-center">{loginError}</p>}
            <input
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              placeholder="Admin email"
              className="w-full px-4 py-3 border-2 rounded-xl mb-4 focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <input
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="Password"
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
            <button onClick={() => { localStorage.removeItem("admin_auth"); localStorage.removeItem("token"); setAuth(false); }} className="text-sm text-red-500 hover:underline">
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

          <div className="flex gap-2 mb-6 overflow-x-auto">
            {(["overview", "users", "products", "addProduct", "providers", "addProvider", "orders"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  tab === t ? "bg-emerald-500 text-white" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                }`}
              >
                {t === "addProduct" ? "+ Product" : t === "addProvider" ? "+ Provider" : t.charAt(0).toUpperCase() + t.slice(1)}
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

              {/* Add Product Tab */}
              {tab === "addProduct" && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm max-w-2xl">
                  <h3 className="font-bold text-lg mb-6">Add New Product</h3>
                  <form onSubmit={addProduct} className="space-y-4">
                    <input type="text" required placeholder="Product title" value={newProduct.title} onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} className="w-full px-4 py-3 border-2 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    <textarea required placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} className="w-full px-4 py-3 border-2 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white" rows={3} />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="number" required placeholder="Price (₦)" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} className="w-full px-4 py-3 border-2 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                      <input type="number" required placeholder="Stock" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} className="w-full px-4 py-3 border-2 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    </div>
                    <select required value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} className="w-full px-4 py-3 border-2 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <option value="">Select category</option>
                      <option value="phones">Phones</option>
                      <option value="gadgets">Gadgets</option>
                      <option value="electronics">Electronics</option>
                      <option value="fashion">Fashion</option>
                      <option value="food">Food</option>
                      <option value="furniture">Furniture</option>
                    </select>
                    <button type="submit" className="w-full py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600">Add Product</button>
                  </form>
                </div>
              )}

              {/* Add Provider Tab */}
              {tab === "addProvider" && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm max-w-2xl">
                  <h3 className="font-bold text-lg mb-6">Add Service Provider</h3>
                  <form onSubmit={addProvider} className="space-y-4">
                    <input type="text" required placeholder="Service/Business name" value={newProvider.serviceName} onChange={(e) => setNewProvider({ ...newProvider, serviceName: e.target.value })} className="w-full px-4 py-3 border-2 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    <textarea required placeholder="Description" value={newProvider.description} onChange={(e) => setNewProvider({ ...newProvider, description: e.target.value })} className="w-full px-4 py-3 border-2 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white" rows={3} />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="tel" required placeholder="Phone number" value={newProvider.phone} onChange={(e) => setNewProvider({ ...newProvider, phone: e.target.value })} className="w-full px-4 py-3 border-2 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                      <input type="text" placeholder="Location" value={newProvider.location} onChange={(e) => setNewProvider({ ...newProvider, location: e.target.value })} className="w-full px-4 py-3 border-2 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="Experience (e.g. 5 years)" value={newProvider.experience} onChange={(e) => setNewProvider({ ...newProvider, experience: e.target.value })} className="w-full px-4 py-3 border-2 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                      <input type="text" placeholder="Price range (e.g. ₦5,000 - ₦50,000)" value={newProvider.priceRange} onChange={(e) => setNewProvider({ ...newProvider, priceRange: e.target.value })} className="w-full px-4 py-3 border-2 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    </div>
                    <select required value={newProvider.category} onChange={(e) => setNewProvider({ ...newProvider, category: e.target.value })} className="w-full px-4 py-3 border-2 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <option value="">Select category</option>
                      <option value="plumbing">Plumbing</option>
                      <option value="electrical">Electricians</option>
                      <option value="ac">AC Installation</option>
                      <option value="baking">Bakers & Catering</option>
                      <option value="painting">Painting</option>
                      <option value="mechanic">Auto Mechanic</option>
                      <option value="barbing">Barbing & Salon</option>
                      <option value="carpentry">Carpentry</option>
                      <option value="tailoring">Tailoring</option>
                      <option value="photography">Photography</option>
                      <option value="tech">Tech & Repairs</option>
                      <option value="logistics">Logistics & Moving</option>
                      <option value="cleaning">Cleaning</option>
                      <option value="fashion">Fashion</option>
                      <option value="electronics">Electronics</option>
                      <option value="food">Food</option>
                    </select>
                    <div>
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Business Photo</label>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full px-4 py-3 border-2 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                      {uploading && <p className="text-sm text-emerald-500 mt-1">Uploading...</p>}
                      {newProvider.image && <img src={newProvider.image} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-xl" />}
                    </div>
                    <button type="submit" className="w-full py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600">Add Provider</button>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
