<script setup lang="ts">
const supabase = useSupabaseClient()
const route = useRoute()
const products = ref<any[]>([])
const loading = ref(true)
const search = ref((route.query.search as string) || '')
const category = ref((route.query.category as string) || '')
const sortBy = ref('newest')

const categories = ['Electronics', 'Fashion', 'Food', 'Home', 'Sports', 'Automotive', 'Books', 'Services']

const loadProducts = async () => {
  loading.value = true
  let query = supabase.from('products').select('*, seller:profiles(*)').eq('status', 'active')
  if (search.value) query = query.ilike('title', `%${search.value}%`)
  if (category.value) query = query.eq('category', category.value)
  if (sortBy.value === 'newest') query = query.order('created_at', { ascending: false })
  if (sortBy.value === 'price_low') query = query.order('price', { ascending: true })
  if (sortBy.value === 'price_high') query = query.order('price', { ascending: false })
  const { data } = await query.limit(24)
  products.value = data || []
  loading.value = false
}

watch([search, category, sortBy], loadProducts)
onMounted(loadProducts)
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-black mb-6 text-gray-900 dark:text-white">All Products</h1>

      <!-- Filters -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm mb-6 flex flex-wrap gap-3">
        <UInput v-model="search" placeholder="Search products..." icon="i-lucide-search" class="flex-1 min-w-48" @keyup.enter="loadProducts" />
        <USelect v-model="category" :items="['All', ...categories]" placeholder="Category" class="w-40" />
        <USelect v-model="sortBy" :items="[{label:'Newest', value:'newest'},{label:'Price: Low', value:'price_low'},{label:'Price: High', value:'price_high'}]" class="w-40" />
        <UButton color="primary" icon="i-lucide-search" @click="loadProducts">Search</UButton>
      </div>

      <!-- Products Grid -->
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
        <div class="text-6xl mb-4">🔍</div>
        <h3 class="text-xl font-bold mb-2">No products found</h3>
        <p class="text-gray-600">Try a different search term</p>
      </div>

      <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
      </div>
    </div>
  </div>
</template>
