<script setup lang="ts">
definePageMeta({ layout: 'default', middleware: 'auth' })
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const router = useRouter()
const profile = ref<any>(null)
const orders = ref<any[]>([])
const favorites = ref<any[]>([])
const myProducts = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  const uid = user.value?.id
  const [{ data: p }, { data: o }, { data: f }, { data: prod }] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', uid).single(),
    supabase.from('orders').select('*, product:products(title,price,images)').eq('buyer_id', uid).order('created_at', { ascending: false }).limit(5),
    supabase.from('favorites').select('*, product:products(title,price,images)').eq('user_id', uid).limit(4),
    supabase.from('products').select('*').eq('seller_id', uid).order('created_at', { ascending: false }).limit(5),
  ])
  profile.value = p
  orders.value = o || []
  favorites.value = f || []
  myProducts.value = prod || []
  loading.value = false
})

const displayName = computed(() => profile.value?.full_name || user.value?.user_metadata?.full_name || user.value?.email?.split('@')[0] || 'User')
const isSeller = computed(() => myProducts.value.length > 0 || profile.value?.role === 'seller')
const isAdmin = computed(() => profile.value?.role === 'admin')

const sellerAnalytics = computed(() => ({
  totalViews: myProducts.value.reduce((s, p) => s + (p.views || 0), 0),
  totalProducts: myProducts.value.length,
  pendingProducts: myProducts.value.filter(p => p.status === 'pending').length,
  activeProducts: myProducts.value.filter(p => p.status === 'active').length,
}))

const logout = async () => {
  await supabase.auth.signOut()
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
    </div>

    <div v-else class="max-w-7xl mx-auto px-4 py-8">

      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-2xl overflow-hidden bg-emerald-100 dark:bg-emerald-900/30 flex-shrink-0 border-2 border-emerald-200 dark:border-emerald-800">
            <img v-if="profile?.avatar_url" :src="profile.avatar_url" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full flex items-center justify-center text-2xl font-bold text-emerald-600">
              {{ displayName.charAt(0).toUpperCase() }}
            </div>
          </div>
          <div>
            <h1 class="text-2xl font-black text-gray-900 dark:text-white">Welcome, {{ displayName }}! 👋</h1>
            <p class="text-sm text-gray-500">{{ user?.email }}</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <UBadge v-if="isAdmin" color="error" icon="i-lucide-shield">Admin</UBadge>
          <UBadge v-else-if="isSeller" color="success" icon="i-lucide-store">Seller</UBadge>
          <UBadge v-else color="primary" icon="i-lucide-user">Buyer</UBadge>
          <UButton to="/profile" variant="outline" color="neutral" size="sm" icon="i-lucide-settings">Edit Profile</UButton>
        </div>
      </div>

      <!-- BUYER SECTION -->
      <div class="mb-10">
        <div class="flex items-center gap-2 mb-5">
          <div class="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center">
            <UIcon name="i-lucide-shopping-bag" class="w-4 h-4 text-white" />
          </div>
          <h2 class="text-lg font-bold text-gray-900 dark:text-white">My Shopping</h2>
        </div>

        <!-- Buyer Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
            <div class="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center mb-3">
              <UIcon name="i-lucide-package" class="w-5 h-5 text-white" />
            </div>
            <p class="text-2xl font-black text-gray-900 dark:text-white">{{ orders.length }}</p>
            <p class="text-xs text-gray-500">Total Orders</p>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
            <div class="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center mb-3">
              <UIcon name="i-lucide-heart" class="w-5 h-5 text-white" />
            </div>
            <p class="text-2xl font-black text-gray-900 dark:text-white">{{ favorites.length }}</p>
            <p class="text-xs text-gray-500">Wishlist Items</p>
          </div>
          <NuxtLink to="/services" class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:border-emerald-300 transition group">
            <div class="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center mb-3">
              <UIcon name="i-lucide-wrench" class="w-5 h-5 text-white" />
            </div>
            <p class="text-sm font-bold text-gray-900 dark:text-white group-hover:text-emerald-600">Find Services</p>
            <p class="text-xs text-gray-500">Browse artisans</p>
          </NuxtLink>
          <NuxtLink to="/products" class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:border-emerald-300 transition group">
            <div class="w-10 h-10 bg-violet-500 rounded-xl flex items-center justify-center mb-3">
              <UIcon name="i-lucide-store" class="w-5 h-5 text-white" />
            </div>
            <p class="text-sm font-bold text-gray-900 dark:text-white group-hover:text-violet-600">Shop Products</p>
            <p class="text-xs text-gray-500">Browse listings</p>
          </NuxtLink>
        </div>

        <!-- Recent Orders + Wishlist -->
        <div class="grid md:grid-cols-2 gap-5">
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-bold text-gray-900 dark:text-white">Recent Orders</h3>
              <NuxtLink to="/orders" class="text-xs text-emerald-600 hover:underline">View all</NuxtLink>
            </div>
            <div v-if="orders.length === 0" class="text-center py-8">
              <div class="text-4xl mb-2">🛍️</div>
              <p class="text-sm text-gray-500">No orders yet</p>
              <UButton to="/products" size="xs" color="primary" class="mt-3">Start Shopping</UButton>
            </div>
            <div v-else class="space-y-3">
              <div v-for="order in orders" :key="order.id" class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div class="w-10 h-10 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                  <img v-if="order.product?.images?.[0]" :src="order.product.images[0]" class="w-full h-full object-cover" />
                  <div v-else class="w-full h-full flex items-center justify-center text-lg">📦</div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold truncate text-gray-900 dark:text-white">{{ order.product?.title }}</p>
                  <p class="text-xs text-emerald-600 font-semibold">₦{{ order.product?.price?.toLocaleString() }}</p>
                </div>
                <UBadge :color="order.status === 'completed' ? 'success' : order.status === 'cancelled' ? 'error' : 'warning'" size="xs">{{ order.status }}</UBadge>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-bold text-gray-900 dark:text-white">Wishlist</h3>
              <NuxtLink to="/wishlist" class="text-xs text-emerald-600 hover:underline">View all</NuxtLink>
            </div>
            <div v-if="favorites.length === 0" class="text-center py-8">
              <div class="text-4xl mb-2">❤️</div>
              <p class="text-sm text-gray-500">Nothing saved yet</p>
              <UButton to="/products" size="xs" color="primary" class="mt-3">Browse Products</UButton>
            </div>
            <div v-else class="grid grid-cols-2 gap-2">
              <div v-for="fav in favorites" :key="fav.id" class="rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                <div class="h-20 bg-gray-100 dark:bg-gray-700">
                  <img v-if="fav.product?.images?.[0]" :src="fav.product.images[0]" class="w-full h-full object-cover" />
                  <div v-else class="w-full h-full flex items-center justify-center text-2xl">📦</div>
                </div>
                <div class="p-2">
                  <p class="text-xs font-semibold truncate text-gray-900 dark:text-white">{{ fav.product?.title }}</p>
                  <p class="text-xs text-emerald-600 font-bold">₦{{ fav.product?.price?.toLocaleString() }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SELLER SECTION -->
      <div class="mb-10">
        <div class="flex items-center justify-between mb-5">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center">
              <UIcon name="i-lucide-store" class="w-4 h-4 text-white" />
            </div>
            <h2 class="text-lg font-bold text-gray-900 dark:text-white">My Business</h2>
          </div>
          <UButton to="/upload-product" color="primary" size="sm" icon="i-lucide-plus">Add Product</UButton>
        </div>

        <!-- Seller Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
            <div class="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center mb-3">
              <UIcon name="i-lucide-package" class="w-5 h-5 text-white" />
            </div>
            <p class="text-2xl font-black text-gray-900 dark:text-white">{{ sellerAnalytics.totalProducts }}</p>
            <p class="text-xs text-gray-500">Total Products</p>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
            <div class="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center mb-3">
              <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-white" />
            </div>
            <p class="text-2xl font-black text-gray-900 dark:text-white">{{ sellerAnalytics.activeProducts }}</p>
            <p class="text-xs text-gray-500">Active Listings</p>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
            <div class="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center mb-3">
              <UIcon name="i-lucide-clock" class="w-5 h-5 text-white" />
            </div>
            <p class="text-2xl font-black text-gray-900 dark:text-white">{{ sellerAnalytics.pendingProducts }}</p>
            <p class="text-xs text-gray-500">Pending Approval</p>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
            <div class="w-10 h-10 bg-violet-500 rounded-xl flex items-center justify-center mb-3">
              <UIcon name="i-lucide-eye" class="w-5 h-5 text-white" />
            </div>
            <p class="text-2xl font-black text-gray-900 dark:text-white">{{ sellerAnalytics.totalViews }}</p>
            <p class="text-xs text-gray-500">Total Views</p>
          </div>
        </div>

        <!-- My Products -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div class="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700">
            <h3 class="font-bold text-gray-900 dark:text-white">My Products</h3>
            <NuxtLink to="/seller-dashboard" class="text-xs text-emerald-600 hover:underline">Full dashboard →</NuxtLink>
          </div>
          <div v-if="myProducts.length === 0" class="text-center py-12">
            <div class="text-4xl mb-3">🏪</div>
            <p class="text-gray-500 mb-4">You haven't listed any products yet</p>
            <UButton to="/upload-product" color="primary">Upload Your First Product</UButton>
          </div>
          <div v-else class="divide-y divide-gray-100 dark:divide-gray-700">
            <div v-for="p in myProducts" :key="p.id" class="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
              <div class="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                <img v-if="p.images?.[0]" :src="p.images[0]" class="w-full h-full object-cover" />
                <div v-else class="w-full h-full flex items-center justify-center text-xl">📦</div>
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-semibold text-gray-900 dark:text-white truncate">{{ p.title }}</p>
                <p class="text-sm text-emerald-600 font-bold">₦{{ p.price?.toLocaleString() }}</p>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xs text-gray-400">{{ p.views || 0 }} views</span>
                <UBadge :color="p.status === 'active' ? 'success' : p.status === 'rejected' ? 'error' : 'warning'" size="xs">{{ p.status }}</UBadge>
              </div>
              <NuxtLink :to="`/product/${p.id}`" class="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-emerald-100 transition">
                <UIcon name="i-lucide-eye" class="w-4 h-4 text-gray-500" />
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Become a service provider CTA -->
        <div class="mt-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 p-5 text-white flex items-center justify-between gap-4">
          <div>
            <p class="font-bold text-lg">List your service on JosMKT</p>
            <p class="text-emerald-100 text-sm">Get discovered by thousands of customers in Jos</p>
          </div>
          <UButton to="/become-seller" color="white" size="sm" class="flex-shrink-0 font-bold">Register Now</UButton>
        </div>
      </div>

      <!-- Quick Links -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <NuxtLink to="/profile" class="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-emerald-300 transition">
          <UIcon name="i-lucide-user-circle" class="w-5 h-5 text-emerald-500" />
          <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Edit Profile</span>
        </NuxtLink>
        <NuxtLink to="/chat" class="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-emerald-300 transition">
          <UIcon name="i-lucide-message-circle" class="w-5 h-5 text-emerald-500" />
          <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Messages</span>
        </NuxtLink>
        <NuxtLink to="/compare" class="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-emerald-300 transition">
          <UIcon name="i-lucide-scale" class="w-5 h-5 text-emerald-500" />
          <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Compare</span>
        </NuxtLink>
        <NuxtLink v-if="isAdmin" to="/admin" class="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-800 hover:border-red-400 transition">
          <UIcon name="i-lucide-shield" class="w-5 h-5 text-red-500" />
          <span class="text-sm font-semibold text-red-600 dark:text-red-400">Admin Panel</span>
        </NuxtLink>
        <button v-else class="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-red-300 transition" @click="logout">
          <UIcon name="i-lucide-log-out" class="w-5 h-5 text-red-400" />
          <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Logout</span>
        </button>
      </div>

    </div>
  </div>
</template>
