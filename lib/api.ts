const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

const headers = () => ({
  'Content-Type': 'application/json',
  ...(getToken() && { Authorization: `Bearer ${getToken()}` })
});

export const api = {
  register: (data: any) => fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json()),

  login: (data: any) => fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json()),

  getProfile: () => fetch(`${API_URL}/auth/profile`, {
    headers: headers()
  }).then(r => r.json()),

  updateProfile: (data: any) => fetch(`${API_URL}/auth/profile`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(data)
  }).then(r => r.json()),

  getProducts: (params: any) => {
    const query = new URLSearchParams(params).toString();
    return fetch(`${API_URL}/products?${query}`).then(r => r.json());
  },

  getProduct: (id: string) => fetch(`${API_URL}/products/${id}`).then(r => r.json()),

  createProduct: (formData: any) => fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${getToken()}` },
    body: formData
  }).then(r => r.json()),

  updateProduct: (id: string, data: any) => fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(data)
  }).then(r => r.json()),

  deleteProduct: (id: string) => fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
    headers: headers()
  }).then(r => r.json()),

  toggleFavorite: (id: string) => fetch(`${API_URL}/products/${id}/favorite`, {
    method: 'POST',
    headers: headers()
  }).then(r => r.json()),

  getMyProducts: () => fetch(`${API_URL}/products/my-products`, {
    headers: headers()
  }).then(r => r.json()),

  getFavorites: () => fetch(`${API_URL}/products/favorites`, {
    headers: headers()
  }).then(r => r.json()),

  getChats: () => fetch(`${API_URL}/chats`, {
    headers: headers()
  }).then(r => r.json()),

  getChat: (id: string) => fetch(`${API_URL}/chats/${id}`, {
    headers: headers()
  }).then(r => r.json()),

  createChat: (data: any) => fetch(`${API_URL}/chats`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(data)
  }).then(r => r.json()),

  sendMessage: (chatId: string, content: string) => fetch(`${API_URL}/chats/${chatId}/message`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ content })
  }).then(r => r.json()),

  createReview: (data: any) => fetch(`${API_URL}/reviews`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(data)
  }).then(r => r.json()),

  getSellerReviews: (sellerId: string) => fetch(`${API_URL}/reviews/seller/${sellerId}`).then(r => r.json()),

  createOrder: (data: any) => fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(data)
  }).then(r => r.json()),

  getMyOrders: () => fetch(`${API_URL}/orders/my-orders`, {
    headers: headers()
  }).then(r => r.json()),

  getSellerOrders: () => fetch(`${API_URL}/orders/seller-orders`, {
    headers: headers()
  }).then(r => r.json()),

  updateOrderStatus: (id: string, status: string) => fetch(`${API_URL}/orders/${id}/status`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify({ status })
  }).then(r => r.json()),

  toggleFollow: (sellerId: string) => fetch(`${API_URL}/users/follow/${sellerId}`, {
    method: 'POST',
    headers: headers()
  }).then(r => r.json()),

  toggleBlock: (userId: string) => fetch(`${API_URL}/users/block/${userId}`, {
    method: 'POST',
    headers: headers()
  }).then(r => r.json()),

  sendVerificationCode: () => fetch(`${API_URL}/users/send-verification`, {
    method: 'POST',
    headers: headers()
  }).then(r => r.json()),

  verifyPhone: (code: string) => fetch(`${API_URL}/users/verify-phone`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ code })
  }).then(r => r.json()),

  getRecommendations: () => fetch(`${API_URL}/users/recommendations`, {
    headers: headers()
  }).then(r => r.json()),

  getSellerInfo: (sellerId: string) => fetch(`${API_URL}/users/seller/${sellerId}`).then(r => r.json()),

  createReport: (data: any) => fetch(`${API_URL}/reports`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(data)
  }).then(r => r.json()),

  getStats: () => fetch(`${API_URL}/admin/stats`, {
    headers: headers()
  }).then(r => r.json()),

  getAllUsers: () => fetch(`${API_URL}/admin/users`, {
    headers: headers()
  }).then(r => r.json()),

  deleteUser: (id: string) => fetch(`${API_URL}/admin/users/${id}`, {
    method: 'DELETE',
    headers: headers()
  }).then(r => r.json()),

  getAllProducts: () => fetch(`${API_URL}/admin/products`, {
    headers: headers()
  }).then(r => r.json()),

  deleteProductAdmin: (id: string) => fetch(`${API_URL}/admin/products/${id}`, {
    method: 'DELETE',
    headers: headers()
  }).then(r => r.json()),

  getAllReports: () => fetch(`${API_URL}/admin/reports`, {
    headers: headers()
  }).then(r => r.json()),

  updateReportStatus: (id: string, status: string) => fetch(`${API_URL}/admin/reports/${id}`, {
    method: 'PATCH',
    headers: headers(),
    body: JSON.stringify({ status })
  }).then(r => r.json()),

  getProductAnalytics: (id: string) => fetch(`${API_URL}/products/${id}/analytics`, {
    headers: headers()
  }).then(r => r.json()),

  getTrending: (period: string) => fetch(`${API_URL}/products/trending?period=${period}`).then(r => r.json()),

  getRelated: (id: string) => fetch(`${API_URL}/products/${id}/related`).then(r => r.json()),

  saveDraft: (data: any) => fetch(`${API_URL}/products/draft`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(data)
  }).then(r => r.json()),

  getDrafts: () => fetch(`${API_URL}/products/drafts`, {
    headers: headers()
  }).then(r => r.json()),

  bulkDelete: (ids: string[]) => fetch(`${API_URL}/products/bulk-delete`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ ids })
  }).then(r => r.json()),

  bulkUpdate: (ids: string[], updates: any) => fetch(`${API_URL}/products/bulk-update`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ ids, updates })
  }).then(r => r.json()),

  searchNearby: (lat: number, lng: number, radius: number) => fetch(`${API_URL}/products/nearby?lat=${lat}&lng=${lng}&radius=${radius}`).then(r => r.json()),

  saveSearch: (data: any) => fetch(`${API_URL}/users/saved-searches`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(data)
  }).then(r => r.json()),

  getSavedSearches: () => fetch(`${API_URL}/users/saved-searches`, {
    headers: headers()
  }).then(r => r.json()),

  deleteSavedSearch: (id: string) => fetch(`${API_URL}/users/saved-searches/${id}`, {
    method: 'DELETE',
    headers: headers()
  }).then(r => r.json()),

  getNotifications: () => fetch(`${API_URL}/users/notifications`, {
    headers: headers()
  }).then(r => r.json()),

  markNotificationRead: (id: string) => fetch(`${API_URL}/users/notifications/${id}/read`, {
    method: 'PATCH',
    headers: headers()
  }).then(r => r.json()),

  addToCompare: (productId: string) => fetch(`${API_URL}/users/compare/${productId}`, {
    method: 'POST',
    headers: headers()
  }).then(r => r.json()),

  removeFromCompare: (productId: string) => fetch(`${API_URL}/users/compare/${productId}`, {
    method: 'DELETE',
    headers: headers()
  }).then(r => r.json()),

  getCompareList: () => fetch(`${API_URL}/users/compare`, {
    headers: headers()
  }).then(r => r.json()),

  getRecentlyViewed: () => fetch(`${API_URL}/users/recently-viewed`, {
    headers: headers()
  }).then(r => r.json()),

  uploadVerification: (data: any) => fetch(`${API_URL}/users/verification`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(data)
  }).then(r => r.json()),

  upgradeSubscription: (plan: string, duration: number) => fetch(`${API_URL}/users/subscription`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ plan, duration })
  }).then(r => r.json()),

  promoteProduct: (productId: string, plan: string, duration: number) => fetch(`${API_URL}/business/promote`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ productId, plan, duration })
  }).then(r => r.json()),

  createFlashSale: (productId: string, discountPercent: number, duration: number) => fetch(`${API_URL}/business/flash-sale`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ productId, discountPercent, duration })
  }).then(r => r.json()),

  getFlashSales: () => fetch(`${API_URL}/business/flash-sales`).then(r => r.json()),

  createCoupon: (data: any) => fetch(`${API_URL}/business/coupon`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(data)
  }).then(r => r.json()),

  applyCoupon: (code: string, amount: number) => fetch(`${API_URL}/business/apply-coupon`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ code, amount })
  }).then(r => r.json()),

  addLoyaltyPoints: (points: number) => fetch(`${API_URL}/business/loyalty/add`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ points })
  }).then(r => r.json()),

  redeemPoints: (points: number) => fetch(`${API_URL}/business/loyalty/redeem`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ points })
  }).then(r => r.json()),

  getSellerAnalytics: () => fetch(`${API_URL}/business/analytics`, {
    headers: headers()
  }).then(r => r.json()),

  updateStock: (productId: string, stock: number) => fetch(`${API_URL}/business/stock`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ productId, stock })
  }).then(r => r.json()),

  createShop: (data: any) => fetch(`${API_URL}/business/shop`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(data)
  }).then(r => r.json()),

  getShops: () => fetch(`${API_URL}/business/shops`, {
    headers: headers()
  }).then(r => r.json())
};
