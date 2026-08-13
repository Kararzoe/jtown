<script setup lang="ts">
definePageMeta({ layout: 'default' })
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const orders = ref<any[]>([])
const favorites = ref<any[]>([])
const profile = ref<any>(null)
const loading = ref(true)

onMounted(async () => {
  const [{ data: o }, { data: f }, { data: p }] = await Promise.all([
    supabase.from('orders').select('*, product:products(*)').eq('buyer_id', user.value?.id).order('created_at', { ascending: false }).limit(5),
    supabase.from('favorites').select('*, product:products(*)').eq('user_id', user.value?.id).limit(5),
    supabase.from('profiles').select('*').eq('id', user.value?.id).single()
  ])
  orders.value = o || []
  favorites.value = f || []
  profile.value = p
  loading.value = false
})

const displayName = computed(() => profile.value?.full_name || user.value?.user_metadata?.full_name || user.value?.email?.split('@')[0] || 'User')
const isAdmin = computed(() => user.value?.email === 'kararzoe@gmail.com' || user.value?.user_metadata?.role === 'admin')

const stats = computed(() => [
  { label: 'Orders', value: orders.value.length, icon: 'i-lucide-package', color: 'bg-blue-500' },
  { label: 'Wishlist', value: favorites.value.length, icon: 'i-lucide-heart', color: 'bg-pink-500' },
  { label: 'Messages', value: 0, icon: 'i-lucide-message-circle', color: 'bg-green-500' },
])
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="mb-8 animate-fade-up flex items-center gap-4">
        <div class="w-14 h-14 rounded-full overflow-hidden bg-primary-100 dark:bg-primary-900/30 ring-4 ring-primary-500/20 flex-shrink-0">
          <img v-if="profile?.avatar_url" :src="profile.avatar_url" alt="Avatar" class="w-full h-full object-cover" />
          <div v-else class="w-full h-full flex items-center justify-center text-2xl">👤</div>
        </div>
        <div>
          <h1 class="text-3xl font-black text-gray-900 dark:text-white mb-1">Welcome back, {{ displayName }}! 👋</h1>
          <p class="text-gray-600 dark:text-gray-400">{{ user?.email }}</p>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-4 md:gap-6 mb-8">
        <div v-for="stat in stats" :key="stat.label" class="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 shadow-md card-hover animate-fade-up">
          <div class="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-3 md:mb-4" :class="stat.color">
            <UIcon :name="stat.icon" class="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <p class="text-2xl md:text-3xl font-black mb-1">{{ stat.value }}</p>
          <p class="text-xs md:text-sm text-gray-600 dark:text-gray-400">{{ stat.label }}</p>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
          <h2 class="text-xl font-black mb-4">Recent Orders</h2>
          <div v-if="loading" class="space-y-3">
            <div v-for="i in 3" :key="i" class="skeleton h-16 rounded-xl" />
          </div>
          <div v-else-if="orders.length === 0" class="text-center py-8 text-gray-500">No orders yet</div>
          <div v-else class="space-y-3">
            <div v-for="order in orders" :key="order.id" class="flex items-center gap-3 p-3 border dark:border-gray-700 rounded-xl">
              <div class="text-3xl">📦</div>
              <div class="flex-1 min-w-0">
                <p class="font-semibold truncate">{{ order.product?.title }}</p>
                <UBadge :color="order.status === 'completed' ? 'success' : order.status === 'cancelled' ? 'error' : 'warning'" size="xs">{{ order.status }}</UBadge>
              </div>
              <p class="font-bold text-primary-600">₦{{ order.product?.price?.toLocaleString() }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
          <h2 class="text-xl font-black mb-4">Quick Actions</h2>
          <div class="space-y-3">
            <UButton to="/wishlist" variant="outline" color="neutral" block icon="i-lucide-heart" class="justify-start">View Wishlist</UButton>
            <UButton to="/orders" variant="outline" color="neutral" block icon="i-lucide-package" class="justify-start">All Orders</UButton>
            <UButton to="/upload-product" variant="outline" color="neutral" block icon="i-lucide-plus" class="justify-start">Upload Product</UButton>
            <UButton to="/seller-dashboard" variant="outline" color="neutral" block icon="i-lucide-store" class="justify-start">Seller Dashboard</UButton>
            <UButton to="/compare" variant="outline" color="neutral" block icon="i-lucide-scale" class="justify-start">Compare Products</UButton>
            <UButton to="/saved-searches" variant="outline" color="neutral" block icon="i-lucide-bookmark" class="justify-start">Saved Searches</UButton>
            <UButton to="/profile" variant="outline" color="neutral" block icon="i-lucide-user-circle" class="justify-start">Edit Profile</UButton>
            <UButton v-if="isAdmin" to="/admin" color="error" variant="outline" block icon="i-lucide-shield" class="justify-start">Admin Dashboard</UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
