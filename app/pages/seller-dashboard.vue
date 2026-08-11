<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const tab = ref('products')
const products = ref<any[]>([])
const orders = ref<any[]>([])
const analytics = ref({ totalViews: 0, totalOrders: 0, totalRevenue: 0 })
const loading = ref(true)

onMounted(async () => {
  const [{ data: p }, { data: o }] = await Promise.all([
    supabase.from('products').select('*').eq('seller_id', user.value?.id).order('created_at', { ascending: false }),
    supabase.from('orders').select('*, product:products(*)').eq('seller_id', user.value?.id)
  ])
  products.value = p || []
  orders.value = o || []
  analytics.value = {
    totalViews: products.value.reduce((s, p) => s + (p.views || 0), 0),
    totalOrders: orders.value.length,
    totalRevenue: orders.value.filter(o => o.status === 'completed').reduce((s, o) => s + (o.product?.price || 0), 0)
  }
  loading.value = false
})

const deleteProduct = async (id: string) => {
  await supabase.from('products').delete().eq('id', id)
  products.value = products.value.filter(p => p.id !== id)
}

const tabs = [
  { label: 'Products', value: 'products', icon: 'i-lucide-package' },
  { label: 'Orders', value: 'orders', icon: 'i-lucide-shopping-bag' },
  { label: 'Analytics', value: 'analytics', icon: 'i-lucide-bar-chart' },
]
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-black text-gray-900 dark:text-white">Seller Dashboard</h1>
        <UButton to="/upload-product" color="primary" icon="i-lucide-plus">Add Product</UButton>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-3 gap-4 mb-8">
        <div v-for="(val, key) in analytics" :key="key" class="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 shadow-md text-center">
          <p class="text-2xl md:text-3xl font-black text-primary-600">{{ key === 'totalRevenue' ? `₦${val.toLocaleString()}` : val }}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400 capitalize">{{ key.replace('total', 'Total ') }}</p>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex gap-2 mb-6">
        <UButton v-for="t in tabs" :key="t.value" :icon="t.icon" :variant="tab === t.value ? 'solid' : 'outline'" :color="tab === t.value ? 'primary' : 'neutral'" @click="tab = t.value">
          {{ t.label }}
        </UButton>
      </div>

      <!-- Products Tab -->
      <div v-if="tab === 'products'">
        <div v-if="loading" class="space-y-3">
          <div v-for="i in 4" :key="i" class="skeleton h-20 rounded-xl" />
        </div>
        <div v-else-if="products.length === 0" class="text-center py-12">
          <p class="text-gray-500 mb-4">No products yet</p>
          <UButton to="/upload-product" color="primary">Upload First Product</UButton>
        </div>
        <div v-else class="space-y-3">
          <div v-for="p in products" :key="p.id" class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm flex items-center gap-4">
            <div class="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              <img v-if="p.images?.[0]" :src="p.images[0]" :alt="p.title" class="w-full h-full object-cover" />
              <div v-else class="w-full h-full flex items-center justify-center text-2xl">📦</div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-bold truncate">{{ p.title }}</p>
              <p class="text-primary-600 font-semibold">₦{{ p.price?.toLocaleString() }}</p>
              <div class="flex items-center gap-2 text-xs text-gray-500">
                <span>{{ p.views || 0 }} views</span>
                <span>Stock: {{ p.stock }}</span>
              </div>
            </div>
            <div class="flex gap-2">
              <UButton :to="`/product/${p.id}`" icon="i-lucide-eye" variant="ghost" size="xs" />
              <UButton icon="i-lucide-trash" variant="ghost" color="error" size="xs" @click="deleteProduct(p.id)" />
            </div>
          </div>
        </div>
      </div>

      <!-- Orders Tab -->
      <div v-if="tab === 'orders'">
        <div v-if="orders.length === 0" class="text-center py-12 text-gray-500">No orders yet</div>
        <div v-else class="space-y-3">
          <div v-for="o in orders" :key="o.id" class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm flex items-center gap-4">
            <div class="text-3xl">📦</div>
            <div class="flex-1">
              <p class="font-bold">{{ o.product?.title }}</p>
              <p class="text-sm text-gray-500">{{ new Date(o.created_at).toLocaleDateString() }}</p>
            </div>
            <UBadge :color="o.status === 'completed' ? 'success' : o.status === 'cancelled' ? 'error' : 'warning'">{{ o.status }}</UBadge>
          </div>
        </div>
      </div>

      <!-- Analytics Tab -->
      <div v-if="tab === 'analytics'" class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
        <h3 class="font-black text-xl mb-6">Performance Overview</h3>
        <div class="space-y-4">
          <div v-for="p in products.slice(0, 5)" :key="p.id" class="flex items-center gap-4">
            <p class="flex-1 truncate text-sm font-medium">{{ p.title }}</p>
            <div class="w-32 bg-gray-100 rounded-full h-2">
              <div class="bg-primary-500 h-2 rounded-full" :style="`width: ${Math.min((p.views || 0) / 100 * 100, 100)}%`" />
            </div>
            <span class="text-sm text-gray-500 w-16 text-right">{{ p.views || 0 }} views</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
