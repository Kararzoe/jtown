<script setup lang="ts">
definePageMeta({ layout: 'default' })
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const products = ref<any[]>([])
const compareList = ref<any[]>([])
const loading = ref(true)
const searchQ = ref('')

onMounted(async () => {
  const saved = localStorage.getItem('compare_ids')
  if (saved) {
    const ids = JSON.parse(saved) as string[]
    if (ids.length) {
      const { data } = await supabase.from('products').select('*, seller:profiles(full_name, avatar_url)').in('id', ids)
      compareList.value = data || []
    }
  }
  loading.value = false
})

const removeFromCompare = (id: string) => {
  compareList.value = compareList.value.filter(p => p.id !== id)
  localStorage.setItem('compare_ids', JSON.stringify(compareList.value.map(p => p.id)))
}

const clearAll = () => {
  compareList.value = []
  localStorage.removeItem('compare_ids')
}

const fields = ['price', 'category', 'condition', 'location', 'stock']
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-3">
          <UButton to="/dashboard" icon="i-lucide-arrow-left" variant="ghost" color="neutral" />
          <h1 class="text-3xl font-black text-gray-900 dark:text-white">Compare Products</h1>
        </div>
        <UButton v-if="compareList.length" icon="i-lucide-trash" color="error" variant="outline" @click="clearAll">Clear All</UButton>
      </div>

      <div v-if="loading" class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="i in 3" :key="i" class="skeleton h-64 rounded-2xl" />
      </div>

      <div v-else-if="compareList.length === 0" class="text-center py-20">
        <div class="text-6xl mb-4">⚖️</div>
        <h3 class="text-xl font-bold mb-2">Nothing to compare</h3>
        <p class="text-gray-500 mb-6">Add products to compare by clicking the compare button on product pages</p>
        <UButton to="/products" color="primary">Browse Products</UButton>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr>
              <td class="w-32 p-3 font-bold text-gray-500 text-sm uppercase">Feature</td>
              <th v-for="p in compareList" :key="p.id" class="p-3 min-w-48">
                <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md relative">
                  <UButton icon="i-lucide-x" variant="ghost" color="error" size="xs" class="absolute top-2 right-2" @click="removeFromCompare(p.id)" />
                  <div class="w-full aspect-square rounded-xl overflow-hidden bg-gray-100 mb-3">
                    <img v-if="p.images?.[0]" :src="p.images[0]" :alt="p.title" class="w-full h-full object-cover" />
                    <div v-else class="w-full h-full flex items-center justify-center text-4xl">📦</div>
                  </div>
                  <p class="font-bold text-sm line-clamp-2">{{ p.title }}</p>
                  <NuxtLink :to="`/product/${p.id}`" class="text-xs text-primary-600 hover:underline">View Product</NuxtLink>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="field in fields" :key="field" class="border-t border-gray-200 dark:border-gray-700">
              <td class="p-3 text-sm font-semibold text-gray-600 dark:text-gray-400 capitalize">{{ field }}</td>
              <td v-for="p in compareList" :key="p.id" class="p-3 text-center">
                <span v-if="field === 'price'" class="font-black text-primary-600">₦{{ p.price?.toLocaleString() }}</span>
                <span v-else-if="field === 'stock'" :class="p.stock > 0 ? 'text-green-600' : 'text-red-500'" class="font-semibold">
                  {{ p.stock > 0 ? `${p.stock} available` : 'Out of stock' }}
                </span>
                <span v-else class="text-gray-700 dark:text-gray-300 capitalize">{{ p[field] || '-' }}</span>
              </td>
            </tr>
            <tr class="border-t border-gray-200 dark:border-gray-700">
              <td class="p-3 text-sm font-semibold text-gray-600 dark:text-gray-400">Seller</td>
              <td v-for="p in compareList" :key="p.id" class="p-3 text-center text-sm">{{ p.seller?.full_name || 'Unknown' }}</td>
            </tr>
            <tr class="border-t border-gray-200 dark:border-gray-700">
              <td class="p-3" />
              <td v-for="p in compareList" :key="p.id" class="p-3 text-center">
                <UButton :to="`https://wa.me/234${p.seller?.whatsapp?.replace(/\D/g,'').slice(-10)}`" target="_blank" color="success" size="sm" icon="i-lucide-message-circle">
                  Contact
                </UButton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
