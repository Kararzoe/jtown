<script setup lang="ts">
const supabase = useSupabaseClient()
const products = ref<any[]>([])
const loading = ref(true)
const period = ref('7d')

const loadTrending = async () => {
  loading.value = true
  const { data } = await supabase
    .from('products')
    .select('*, seller:profiles(*)')
    .eq('status', 'active')
    .order('views', { ascending: false })
    .limit(20)
  products.value = data || []
  loading.value = false
}

watch(period, loadTrending)
onMounted(loadTrending)
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-trending-up" class="w-8 h-8 text-emerald-500" />
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Trending Products</h1>
        </div>
        <div class="flex gap-2">
          <UButton :variant="period === '24h' ? 'solid' : 'outline'" :color="period === '24h' ? 'primary' : 'neutral'" size="sm" @click="period = '24h'">24 Hours</UButton>
          <UButton :variant="period === '7d' ? 'solid' : 'outline'" :color="period === '7d' ? 'primary' : 'neutral'" size="sm" @click="period = '7d'">7 Days</UButton>
        </div>
      </div>

      <div v-if="loading" class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="i in 8" :key="i" class="rounded-2xl overflow-hidden">
          <div class="skeleton aspect-square" />
          <div class="p-4 space-y-2">
            <div class="skeleton h-4 rounded w-3/4" />
            <div class="skeleton h-4 rounded w-1/2" />
          </div>
        </div>
      </div>

      <div v-else-if="products.length === 0" class="text-center py-20">
        <div class="text-6xl mb-4">📈</div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">No trending products yet</h3>
        <UButton to="/products" color="primary">Browse All Products</UButton>
      </div>

      <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <NuxtLink
          v-for="(product, index) in products"
          :key="product.id"
          :to="`/product/${product.id}`"
          class="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all group"
        >
          <div class="relative">
            <div class="aspect-square bg-gray-100 dark:bg-gray-700 overflow-hidden">
              <img v-if="product.images?.[0]" :src="product.images[0]" :alt="product.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div v-else class="w-full h-full flex items-center justify-center text-7xl">📦</div>
            </div>
            <div class="absolute top-2 left-2 px-3 py-1 bg-emerald-500 text-white text-sm font-bold rounded-full">
              #{{ index + 1 }}
            </div>
          </div>
          <div class="p-3 md:p-4">
            <h3 class="font-semibold text-sm md:text-base mb-2 line-clamp-2 text-gray-900 dark:text-white">{{ product.title }}</h3>
            <p class="text-lg md:text-2xl font-bold text-emerald-600 mb-2">₦{{ product.price?.toLocaleString() }}</p>
            <div class="flex items-center justify-between text-sm text-gray-500">
              <div class="flex items-center gap-1">
                <UIcon name="i-lucide-eye" class="w-4 h-4" />
                {{ product.views || 0 }}
              </div>
              <div class="flex items-center gap-1">
                <UIcon name="i-lucide-heart" class="w-4 h-4" />
                {{ product.favorites_count || 0 }}
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
