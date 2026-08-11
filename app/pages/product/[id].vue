<script setup lang="ts">
const route = useRoute()
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()
const product = ref<any>(null)
const related = ref<any[]>([])
const selectedImage = ref(0)
const loading = ref(true)

onMounted(async () => {
  const { data } = await supabase.from('products').select('*, seller:profiles(*)').eq('id', route.params.id).single()
  product.value = data
  loading.value = false
  if (data) {
    const { data: rel } = await supabase.from('products').select('*, seller:profiles(*)').eq('category', data.category).neq('id', data.id).limit(4)
    related.value = rel || []
    await supabase.from('products').update({ views: (data.views || 0) + 1 }).eq('id', data.id)
  }
})

const toggleFav = async () => {
  if (!user.value) return toast.add({ title: 'Please login first', color: 'error' })
  await supabase.from('favorites').insert({ user_id: user.value.id, product_id: product.value.id })
  toast.add({ title: 'Added to wishlist!', color: 'success' })
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
    <div v-if="loading" class="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
      <div class="skeleton aspect-square rounded-2xl" />
      <div class="space-y-4">
        <div class="skeleton h-8 rounded w-3/4" />
        <div class="skeleton h-6 rounded w-1/2" />
        <div class="skeleton h-12 rounded w-1/3" />
      </div>
    </div>

    <div v-else-if="product" class="max-w-7xl mx-auto">
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8">
        <div class="grid md:grid-cols-2 gap-8">
          <div>
            <div class="aspect-square bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden mb-4">
              <img v-if="product.images?.[selectedImage]" :src="product.images[selectedImage]" :alt="product.title" class="w-full h-full object-cover" />
              <div v-else class="w-full h-full flex items-center justify-center text-8xl">📦</div>
            </div>
            <div class="grid grid-cols-4 gap-2">
              <button v-for="(img, i) in product.images" :key="i" class="aspect-square rounded-lg overflow-hidden border-2 transition-colors" :class="selectedImage === i ? 'border-primary-500' : 'border-gray-200'" @click="selectedImage = i">
                <img :src="img" :alt="product.title" class="w-full h-full object-cover" />
              </button>
            </div>
          </div>

          <div>
            <div class="flex items-start justify-between mb-4">
              <div>
                <UBadge color="primary" class="mb-2">{{ product.category }}</UBadge>
                <h1 class="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">{{ product.title }}</h1>
              </div>
              <UButton icon="i-lucide-heart" variant="ghost" color="error" @click="toggleFav" />
            </div>

            <p class="text-4xl font-black text-primary-600 mb-4">₦{{ product.price?.toLocaleString() }}</p>

            <div class="flex items-center gap-3 mb-6">
              <UBadge variant="soft" color="neutral">{{ product.condition }}</UBadge>
              <div class="flex items-center gap-1 text-gray-600">
                <UIcon name="i-lucide-map-pin" class="w-4 h-4" />
                <span class="text-sm">{{ product.location }}</span>
              </div>
            </div>

            <div class="border-t border-b dark:border-gray-700 py-4 mb-6">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-2xl">🏪</div>
                <div>
                  <p class="font-bold">{{ product.seller?.shop_name || product.seller?.full_name }}</p>
                  <div class="flex items-center gap-1">
                    <UIcon name="i-lucide-star" class="w-4 h-4 text-yellow-400" />
                    <span class="text-sm text-gray-600">{{ product.seller?.rating || 0 }}</span>
                  </div>
                </div>
                <UButton :to="`/seller/${product.seller?.id}`" variant="outline" size="sm" class="ml-auto">View Shop</UButton>
              </div>
            </div>

            <div class="mb-6">
              <h3 class="font-bold text-lg mb-2">Description</h3>
              <p class="text-gray-600 dark:text-gray-400 leading-relaxed">{{ product.description }}</p>
            </div>

            <div class="flex gap-3">
              <UButton color="success" size="lg" icon="i-lucide-message-circle" class="flex-1" @click="() => window.open(`https://wa.me/${product.seller?.phone}?text=Hi, I'm interested in ${product.title}`, '_blank')">
                WhatsApp Seller
              </UButton>
              <UButton variant="outline" color="primary" size="lg" icon="i-lucide-phone" @click="() => window.open(`tel:${product.seller?.phone}`)" />
            </div>
          </div>
        </div>
      </div>

      <div v-if="related.length > 0">
        <h2 class="text-2xl font-black mb-6">Related Products</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ProductCard v-for="p in related" :key="p.id" :product="p" />
        </div>
      </div>
    </div>
  </div>
</template>
