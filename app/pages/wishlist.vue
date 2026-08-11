<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const favorites = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  const { data } = await supabase.from('favorites').select('*, product:products(*, seller:profiles(*))').eq('user_id', user.value?.id)
  favorites.value = data || []
  loading.value = false
})

const remove = async (id: string) => {
  await supabase.from('favorites').delete().eq('id', id)
  favorites.value = favorites.value.filter(f => f.id !== id)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-black mb-8 text-gray-900 dark:text-white">My Wishlist</h1>
      <div v-if="loading" class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="i in 4" :key="i" class="skeleton aspect-square rounded-2xl" />
      </div>
      <div v-else-if="favorites.length === 0" class="text-center py-20">
        <div class="text-6xl mb-4">❤️</div>
        <h3 class="text-xl font-bold mb-2">No favorites yet</h3>
        <UButton to="/products" color="primary">Browse Products</UButton>
      </div>
      <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="fav in favorites" :key="fav.id" class="relative">
          <ProductCard :product="fav.product" />
          <UButton icon="i-lucide-x" color="error" size="xs" class="absolute top-2 right-2 rounded-full" @click="remove(fav.id)" />
        </div>
      </div>
    </div>
  </div>
</template>
