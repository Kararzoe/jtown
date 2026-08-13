<script setup lang="ts">
const route = useRoute()
const supabase = useSupabaseClient()
const seller = ref<any>(null)
const products = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  const { data: s } = await supabase.from('profiles').select('*').eq('id', route.params.id).single()
  seller.value = s
  const { data: p } = await supabase.from('products').select('*, seller:profiles(*)').eq('seller_id', route.params.id).eq('status', 'active')
  products.value = p || []
  loading.value = false
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
    <div v-if="loading" class="max-w-7xl mx-auto">
      <div class="skeleton h-48 rounded-2xl mb-8" />
    </div>
    <div v-else-if="seller" class="max-w-7xl mx-auto">
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
        <div class="flex items-start gap-6">
          <div class="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center text-5xl">🏪</div>
          <div class="flex-1">
            <h1 class="text-3xl font-black mb-2">{{ seller.shop_name || seller.full_name }}</h1>
            <div class="flex items-center gap-4 mb-4">
              <div class="flex items-center gap-1">
                <UIcon name="i-lucide-star" class="w-5 h-5 text-yellow-400" />
                <span class="font-semibold">{{ seller.rating || 0 }}</span>
              </div>
              <UBadge v-if="seller.is_verified" color="info">✓ Verified</UBadge>
            </div>
            <div class="flex items-center gap-2 text-gray-600 mb-4">
              <UIcon name="i-lucide-map-pin" class="w-4 h-4" />
              <span>{{ seller.location || 'Jos, Nigeria' }}</span>
            </div>
            <p class="text-gray-600 mb-4">{{ seller.shop_description }}</p>
            <div class="flex gap-3">
              <UButton color="success" icon="i-lucide-message-circle" @click="navigateTo(`https://wa.me/${seller.phone}`, { external: true, open: { target: '_blank' } })">Contact</UButton>
              <UButton variant="outline" color="primary" icon="i-lucide-phone" @click="navigateTo(`tel:${seller.phone}`, { external: true })">Call</UButton>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-black mb-6">Products ({{ products.length }})</h2>
      <div v-if="products.length === 0" class="text-center py-12 text-gray-600">No products available</div>
      <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ProductCard v-for="p in products" :key="p.id" :product="p" />
      </div>
    </div>
  </div>
</template>
