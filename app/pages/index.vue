<script setup lang="ts">
const supabase = useSupabaseClient()
const products = ref<any[]>([])
const loading = ref(true)

const categories = [
  { name: 'Electronics', icon: '📱', color: 'bg-blue-100', href: '/category/electronics' },
  { name: 'Fashion', icon: '👗', color: 'bg-pink-100', href: '/category/fashion' },
  { name: 'Food', icon: '🍎', color: 'bg-orange-100', href: '/category/food' },
  { name: 'Home', icon: '🏠', color: 'bg-purple-100', href: '/category/home' },
  { name: 'Sports', icon: '⚽', color: 'bg-green-100', href: '/category/sports' },
  { name: 'Automotive', icon: '🚗', color: 'bg-yellow-100', href: '/category/automotive' },
  { name: 'Books', icon: '📚', color: 'bg-red-100', href: '/category/books' },
  { name: 'Services', icon: '🔧', color: 'bg-gray-100', href: '/category/services' },
]

const stats = [
  { label: 'Active Users', value: '50,000+', icon: 'i-lucide-users' },
  { label: 'Products Listed', value: '100,000+', icon: 'i-lucide-package' },
  { label: 'Orders Completed', value: '25,000+', icon: 'i-lucide-shopping-bag' },
  { label: 'Success Rate', value: '98%', icon: 'i-lucide-trending-up' },
]

onMounted(async () => {
  const { data } = await supabase.from('products').select('*, seller:profiles(*)').eq('status', 'active').limit(8)
  products.value = data || []
  loading.value = false
})
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="hero-gradient min-h-[85vh] flex items-center px-4 relative overflow-hidden">
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-20 right-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl animate-float" />
        <div class="absolute bottom-20 left-10 w-96 h-96 bg-green-200/20 rounded-full blur-3xl animate-float" style="animation-delay: 1s" />
      </div>

      <div class="max-w-7xl mx-auto w-full relative z-10">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="animate-fade-left">
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-6">
              <UIcon name="i-lucide-zap" class="w-4 h-4" />
              #1 Marketplace in Jos
            </div>
            <h1 class="text-4xl md:text-6xl font-black text-gray-900 leading-tight mb-6">
              Buy & Sell
              <span class="gradient-text block">Anything in Jos</span>
            </h1>
            <p class="text-lg text-gray-600 mb-8 leading-relaxed">
              Connect with thousands of buyers and sellers across Jos, Plateau State. Find the best deals on electronics, fashion, food, and more.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 mb-8">
              <div class="flex-1 relative">
                <UInput placeholder="Search products, categories..." size="xl" icon="i-lucide-search" class="w-full" @keyup.enter="(e: any) => navigateTo(`/products?search=${e.target.value}`)" />
              </div>
              <UButton size="xl" color="primary" icon="i-lucide-search" class="animate-pulse-glow">
                Search
              </UButton>
            </div>
            <div class="flex flex-wrap gap-2">
              <span class="text-sm text-gray-500">Trending:</span>
              <UBadge v-for="tag in ['iPhone 15', 'Rice', 'Laptop', 'Shoes']" :key="tag" variant="soft" color="primary" class="cursor-pointer hover:bg-primary-100" @click="navigateTo(`/products?search=${tag}`)">
                {{ tag }}
              </UBadge>
            </div>
          </div>

          <div class="hidden md:grid grid-cols-2 gap-4 animate-fade-right">
            <div v-for="(cat, i) in categories.slice(0, 4)" :key="cat.name"
              class="card-hover rounded-2xl p-6 text-center cursor-pointer shadow-md"
              :class="[cat.color, i % 2 === 1 ? 'mt-8' : '']"
              @click="navigateTo(cat.href)"
            >
              <div class="text-4xl mb-3">{{ cat.icon }}</div>
              <p class="font-semibold text-gray-800">{{ cat.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="py-16 bg-primary-600">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="stat in stats" :key="stat.label" class="text-center text-white">
            <UIcon :name="stat.icon" class="w-8 h-8 mx-auto mb-3 text-primary-200" />
            <p class="text-3xl font-black mb-1">{{ stat.value }}</p>
            <p class="text-primary-200 text-sm">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section id="categories" class="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">Browse Categories</h2>
          <p class="text-gray-600 dark:text-gray-400">Find exactly what you're looking for</p>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
          <NuxtLink
            v-for="cat in categories"
            :key="cat.name"
            :to="cat.href"
            class="card-hover rounded-2xl p-4 text-center shadow-sm"
            :class="cat.color"
          >
            <div class="text-3xl mb-2">{{ cat.icon }}</div>
            <p class="text-xs font-semibold text-gray-700">{{ cat.name }}</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section id="products" class="py-16 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center justify-between mb-12">
          <div>
            <h2 class="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2">Featured Products</h2>
            <p class="text-gray-600 dark:text-gray-400">Discover amazing deals from local sellers</p>
          </div>
          <UButton to="/products" variant="outline" color="primary" trailing-icon="i-lucide-arrow-right">
            View All
          </UButton>
        </div>

        <div v-if="loading" class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div v-for="i in 8" :key="i" class="rounded-2xl overflow-hidden shadow-md">
            <div class="skeleton aspect-square" />
            <div class="p-4 space-y-2">
              <div class="skeleton h-4 rounded w-3/4" />
              <div class="skeleton h-4 rounded w-1/2" />
            </div>
          </div>
        </div>

        <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <ProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div class="max-w-7xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-black mb-12">How It Works</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="(step, i) in [
            { icon: '🔍', title: 'Browse Products', desc: 'Search and discover thousands of products from local sellers' },
            { icon: '💬', title: 'Contact Seller', desc: 'Chat directly with sellers via WhatsApp or our built-in chat' },
            { icon: '🤝', title: 'Make a Deal', desc: 'Agree on price and arrange delivery or pickup' }
          ]" :key="i" class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md card-hover">
            <div class="text-5xl mb-4">{{ step.icon }}</div>
            <div class="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4">{{ i + 1 }}</div>
            <h3 class="text-xl font-bold mb-2">{{ step.title }}</h3>
            <p class="text-gray-600 dark:text-gray-400">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 px-4 bg-primary-600 text-white text-center">
      <div class="max-w-3xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-black mb-4">Start Selling Today</h2>
        <p class="text-primary-100 mb-8 text-lg">Join thousands of sellers and reach customers across Jos</p>
        <UButton to="/become-seller" size="xl" color="white" class="font-bold">
          Become a Seller
        </UButton>
      </div>
    </section>
  </div>
</template>
