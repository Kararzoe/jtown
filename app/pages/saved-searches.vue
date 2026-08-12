<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const router = useRouter()

interface SavedSearch { id: string; query: string; filters: Record<string, any>; savedAt: string }

const searches = ref<SavedSearch[]>([])

onMounted(() => {
  const saved = localStorage.getItem('saved_searches')
  searches.value = saved ? JSON.parse(saved) : []
})

const runSearch = (s: SavedSearch) => {
  const params = new URLSearchParams({ search: s.query, ...s.filters })
  router.push(`/products?${params.toString()}`)
}

const remove = (id: string) => {
  searches.value = searches.value.filter(s => s.id !== id)
  localStorage.setItem('saved_searches', JSON.stringify(searches.value))
}

const clearAll = () => {
  searches.value = []
  localStorage.removeItem('saved_searches')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
    <div class="max-w-3xl mx-auto">
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-3">
          <UButton to="/dashboard" icon="i-lucide-arrow-left" variant="ghost" color="neutral" />
          <h1 class="text-3xl font-black text-gray-900 dark:text-white">Saved Searches</h1>
        </div>
        <UButton v-if="searches.length" icon="i-lucide-trash" color="error" variant="outline" size="sm" @click="clearAll">Clear All</UButton>
      </div>

      <div v-if="searches.length === 0" class="text-center py-20">
        <div class="text-6xl mb-4">🔍</div>
        <h3 class="text-xl font-bold mb-2">No saved searches</h3>
        <p class="text-gray-500 mb-6">Save searches from the products page to quickly find items later</p>
        <UButton to="/products" color="primary">Browse Products</UButton>
      </div>

      <div v-else class="space-y-3">
        <div
          v-for="s in searches"
          :key="s.id"
          class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md flex items-center gap-4 card-hover"
        >
          <div class="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
            <UIcon name="i-lucide-search" class="w-5 h-5 text-primary-600" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-bold truncate">{{ s.query || 'All Products' }}</p>
            <div class="flex flex-wrap gap-1 mt-1">
              <UBadge v-for="(val, key) in s.filters" :key="key" color="neutral" variant="soft" size="xs">
                {{ key }}: {{ val }}
              </UBadge>
            </div>
            <p class="text-xs text-gray-400 mt-1">Saved {{ new Date(s.savedAt).toLocaleDateString() }}</p>
          </div>
          <div class="flex gap-2">
            <UButton icon="i-lucide-play" color="primary" size="xs" @click="runSearch(s)">Run</UButton>
            <UButton icon="i-lucide-trash" color="error" variant="ghost" size="xs" @click="remove(s.id)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
