<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const toast = useToast()
const tab = ref('overview')
const loading = ref(true)

const stats = ref({ users: 0, products: 0, orders: 0, revenue: 0 })
const users = ref<any[]>([])
const products = ref<any[]>([])
const orders = ref<any[]>([])

// Guard: only allow admin
const isAdmin = computed(() => user.value?.email === 'kararzoe@gmail.com' || user.value?.user_metadata?.role === 'admin')

onMounted(async () => {
  if (!isAdmin.value) return navigateTo('/dashboard')

  const [{ data: u }, { data: p }, { data: o }] = await Promise.all([
    supabase.from('profiles').select('*').order('created_at', { ascending: false }),
    supabase.from('products').select('*, seller:profiles(full_name)').order('created_at', { ascending: false }),
    supabase.from('orders').select('*, product:products(title, price), buyer:profiles(full_name)').order('created_at', { ascending: false })
  ])
  users.value = u || []
  products.value = p || []
  orders.value = o || []
  stats.value = {
    users: users.value.length,
    products: products.value.length,
    orders: orders.value.length,
    revenue: orders.value.filter(o => o.status === 'completed').reduce((s, o) => s + (o.product?.price || 0), 0)
  }
  loading.value = false
})

const deleteProduct = async (id: string) => {
  await supabase.from('products').delete().eq('id', id)
  products.value = products.value.filter(p => p.id !== id)
  stats.value.products--
  toast.add({ title: 'Product deleted', color: 'success' })
}

const updateOrderStatus = async (id: string, status: string) => {
  await supabase.from('orders').update({ status }).eq('id', id)
  const o = orders.value.find(o => o.id === id)
  if (o) o.status = status
  toast.add({ title: 'Order updated', color: 'success' })
}

const tabs = [
  { label: 'Overview', value: 'overview', icon: 'i-lucide-layout-dashboard' },
  { label: 'Users', value: 'users', icon: 'i-lucide-users' },
  { label: 'Products', value: 'products', icon: 'i-lucide-package' },
  { label: 'Orders', value: 'orders', icon: 'i-lucide-shopping-bag' },
]

const statCards = computed(() => [
  { label: 'Total Users', value: stats.value.users, icon: 'i-lucide-users', color: 'bg-blue-500' },
  { label: 'Total Products', value: stats.value.products, icon: 'i-lucide-package', color: 'bg-purple-500' },
  { label: 'Total Orders', value: stats.value.orders, icon: 'i-lucide-shopping-bag', color: 'bg-orange-500' },
  { label: 'Revenue', value: `₦${stats.value.revenue.toLocaleString()}`, icon: 'i-lucide-trending-up', color: 'bg-green-500' },
])
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-3">
          <UButton to="/dashboard" icon="i-lucide-arrow-left" variant="ghost" color="neutral" />
          <div>
            <h1 class="text-3xl font-black text-gray-900 dark:text-white">Admin Dashboard</h1>
            <p class="text-sm text-gray-500">Jos Marketplace Control Panel</p>
          </div>
        </div>
        <UBadge color="error" size="lg" icon="i-lucide-shield">Admin</UBadge>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div v-for="s in statCards" :key="s.label" class="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 shadow-md card-hover">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-3" :class="s.color">
            <UIcon :name="s.icon" class="w-5 h-5 text-white" />
          </div>
          <p class="text-2xl font-black">{{ s.value }}</p>
          <p class="text-xs text-gray-500">{{ s.label }}</p>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex gap-2 mb-6 flex-wrap">
        <UButton v-for="t in tabs" :key="t.value" :icon="t.icon" :variant="tab === t.value ? 'solid' : 'outline'" :color="tab === t.value ? 'primary' : 'neutral'" size="sm" @click="tab = t.value">
          {{ t.label }}
        </UButton>
      </div>

      <div v-if="loading" class="space-y-3">
        <div v-for="i in 5" :key="i" class="skeleton h-16 rounded-xl" />
      </div>

      <!-- Overview -->
      <div v-else-if="tab === 'overview'" class="grid md:grid-cols-2 gap-6">
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
          <h3 class="font-black text-lg mb-4">Recent Users</h3>
          <div class="space-y-3">
            <div v-for="u in users.slice(0, 5)" :key="u.id" class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center overflow-hidden">
                <img v-if="u.avatar_url" :src="u.avatar_url" class="w-full h-full object-cover" />
                <UIcon v-else name="i-lucide-user" class="w-4 h-4 text-primary-600" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-semibold text-sm truncate">{{ u.full_name || 'No name' }}</p>
                <p class="text-xs text-gray-400 truncate">{{ u.id }}</p>
              </div>
              <p class="text-xs text-gray-400">{{ new Date(u.created_at).toLocaleDateString() }}</p>
            </div>
          </div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
          <h3 class="font-black text-lg mb-4">Recent Products</h3>
          <div class="space-y-3">
            <div v-for="p in products.slice(0, 5)" :key="p.id" class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden flex-shrink-0">
                <img v-if="p.images?.[0]" :src="p.images[0]" class="w-full h-full object-cover" />
                <div v-else class="w-full h-full flex items-center justify-center text-lg">📦</div>
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-semibold text-sm truncate">{{ p.title }}</p>
                <p class="text-xs text-primary-600 font-bold">₦{{ p.price?.toLocaleString() }}</p>
              </div>
              <UButton icon="i-lucide-trash" variant="ghost" color="error" size="xs" @click="deleteProduct(p.id)" />
            </div>
          </div>
        </div>
      </div>

      <!-- Users Tab -->
      <div v-else-if="tab === 'users'" class="space-y-3">
        <div v-for="u in users" :key="u.id" class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm flex items-center gap-4">
          <div class="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center overflow-hidden flex-shrink-0">
            <img v-if="u.avatar_url" :src="u.avatar_url" class="w-full h-full object-cover" />
            <UIcon v-else name="i-lucide-user" class="w-5 h-5 text-primary-600" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-bold truncate">{{ u.full_name || 'No name' }}</p>
            <p class="text-sm text-gray-500 truncate">{{ u.phone || 'No phone' }}</p>
          </div>
          <p class="text-xs text-gray-400 hidden md:block">{{ new Date(u.created_at).toLocaleDateString() }}</p>
          <NuxtLink :to="`/seller/${u.id}`">
            <UButton icon="i-lucide-eye" variant="ghost" size="xs" />
          </NuxtLink>
        </div>
      </div>

      <!-- Products Tab -->
      <div v-else-if="tab === 'products'" class="space-y-3">
        <div v-for="p in products" :key="p.id" class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm flex items-center gap-4">
          <div class="w-14 h-14 rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden flex-shrink-0">
            <img v-if="p.images?.[0]" :src="p.images[0]" :alt="p.title" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full flex items-center justify-center text-2xl">📦</div>
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-bold truncate">{{ p.title }}</p>
            <p class="text-sm text-primary-600 font-semibold">₦{{ p.price?.toLocaleString() }}</p>
            <p class="text-xs text-gray-400">by {{ p.seller?.full_name || 'Unknown' }}</p>
          </div>
          <div class="flex gap-2">
            <NuxtLink :to="`/product/${p.id}`">
              <UButton icon="i-lucide-eye" variant="ghost" size="xs" />
            </NuxtLink>
            <UButton icon="i-lucide-trash" variant="ghost" color="error" size="xs" @click="deleteProduct(p.id)" />
          </div>
        </div>
      </div>

      <!-- Orders Tab -->
      <div v-else-if="tab === 'orders'" class="space-y-3">
        <div v-for="o in orders" :key="o.id" class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm flex items-center gap-4">
          <div class="text-3xl">📦</div>
          <div class="flex-1 min-w-0">
            <p class="font-bold truncate">{{ o.product?.title }}</p>
            <p class="text-sm text-gray-500">{{ o.buyer?.full_name || 'Unknown buyer' }}</p>
            <p class="text-xs text-gray-400">{{ new Date(o.created_at).toLocaleDateString() }}</p>
          </div>
          <p class="font-black text-primary-600 hidden md:block">₦{{ o.product?.price?.toLocaleString() }}</p>
          <USelect
            :model-value="o.status"
            :items="['pending', 'processing', 'completed', 'cancelled']"
            size="xs"
            class="w-32"
            @update:model-value="updateOrderStatus(o.id, $event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
