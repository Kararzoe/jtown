<script setup lang="ts">
const supabase = useSupabaseClient()
const { t } = useLanguage()
const route = useRoute()
const router = useRouter()
const category = ref((route.query.category as string) || '')
const search = ref('')
const providers = ref<any[]>([])
const loading = ref(false)

const categories = [
  { label: 'Plumbing', icon: '🔧', slug: 'plumbing' },
  { label: 'Electricians', icon: '⚡', slug: 'electrical' },
  { label: 'AC Installation', icon: '❄️', slug: 'ac' },
  { label: 'Furniture', icon: '🛋️', slug: 'furniture' },
  { label: 'Catering & Food', icon: '🍰', slug: 'catering' },
  { label: 'Painting', icon: '🎨', slug: 'painting' },
  { label: 'Auto Mechanic', icon: '🚗', slug: 'mechanic' },
  { label: 'Barbing & Salon', icon: '✂️', slug: 'barbing' },
  { label: 'Carpentry', icon: '🔨', slug: 'carpentry' },
  { label: 'Fashion Design', icon: '👗', slug: 'fashion-design' },
  { label: 'Shoe Making', icon: '👟', slug: 'shoemaking' },
  { label: 'Photography', icon: '📷', slug: 'photography' },
  { label: 'Tech & Repairs', icon: '💻', slug: 'tech' },
  { label: 'Logistics', icon: '🚚', slug: 'logistics' },
  { label: 'Laundry & Cleaning', icon: '🧺', slug: 'laundry' },
  { label: 'Education', icon: '🎓', slug: 'education' },
  { label: 'Perfumery', icon: '✨', slug: 'perfumery' },
  { label: 'Make Up', icon: '💄', slug: 'makeup' },
  { label: 'Event Planning', icon: '📅', slug: 'event-planning' },
  { label: 'Rentals', icon: '🏠', slug: 'rentals' },
  { label: 'Mason', icon: '🧱', slug: 'mason' },
  { label: 'Phone Accessories', icon: '📱', slug: 'phone-accessories' },
  { label: 'Legal & Solicitors', icon: '⚖️', slug: 'legal' },
  { label: 'Housing Agent', icon: '🏡', slug: 'housing-agent' },
  { label: 'E-Wallet Services', icon: '💳', slug: 'e-wallet' },
]

const loadProviders = async () => {
  if (!category.value) return
  loading.value = true
  const { data } = await supabase
    .from('service_providers')
    .select('*')
    .eq('category', category.value)
    .eq('status', 'approved')
  providers.value = data || []
  loading.value = false
}

const selectCategory = (slug: string) => {
  category.value = slug
  search.value = ''
  router.push({ query: { category: slug } })
}

watch(category, loadProviders)
onMounted(loadProviders)

const activeCat = computed(() => categories.find(c => c.slug === category.value))

const filtered = computed(() => {
  if (!search.value.trim()) return providers.value
  const q = search.value.toLowerCase()
  return providers.value.filter(p =>
    p.service_name?.toLowerCase().includes(q) ||
    p.location?.toLowerCase().includes(q) ||
    p.description?.toLowerCase().includes(q)
  )
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">

    <!-- Hero Header -->
    <div class="bg-gradient-to-br from-gray-900 via-emerald-950 to-gray-900 text-white py-12 px-4 relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="flex items-center gap-3 mb-6">
          <button
            class="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition backdrop-blur-sm border border-white/10"
            @click="router.back()"
          >
            <UIcon name="i-lucide-arrow-left" class="w-4 h-4" />
          </button>
          <span class="text-sm text-emerald-300 font-medium">All Services</span>
        </div>

        <div v-if="activeCat" class="flex items-center gap-4 mb-4">
          <div class="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl border border-white/10">
            {{ activeCat.icon }}
          </div>
          <div>
            <h1 class="text-3xl md:text-4xl font-bold">{{ activeCat.label }}</h1>
            <p class="text-emerald-300 text-sm mt-1 flex items-center gap-1.5">
              <UIcon name="i-lucide-map-pin" class="w-3.5 h-3.5" />
              Jos, Plateau State · Verified professionals
            </p>
          </div>
        </div>
        <div v-else>
          <h1 class="text-3xl md:text-4xl font-bold mb-2">Find a Service Provider</h1>
          <p class="text-emerald-300 text-sm">Browse trusted professionals in Jos</p>
        </div>

        <!-- Search -->
        <div class="mt-6 relative max-w-lg">
          <UIcon name="i-lucide-search" class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
          <input
            v-model="search"
            type="text"
            placeholder="Search by name, location..."
            class="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:bg-white/15 transition text-sm"
          />
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-8">

      <!-- Category Scroll Pills -->
      <div class="flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-hide">
        <button
          v-for="cat in categories"
          :key="cat.slug"
          :class="[
            'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 border',
            category === cat.slug
              ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/25'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-emerald-300 hover:text-emerald-600 dark:hover:border-emerald-600'
          ]"
          @click="selectCategory(cat.slug)"
        >
          <span>{{ cat.icon }}</span>
          <span>{{ cat.label }}</span>
        </button>
      </div>

      <!-- Loading Skeletons -->
      <div v-if="loading" class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div v-for="i in 6" :key="i" class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 animate-pulse">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-14 h-14 rounded-2xl bg-gray-200 dark:bg-gray-700" />
            <div class="flex-1 space-y-2">
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-2/3" />
              <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/3" />
            </div>
          </div>
          <div class="space-y-2 mb-4">
            <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded-lg w-4/5" />
          </div>
          <div class="flex gap-2">
            <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl flex-1" />
            <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl flex-1" />
          </div>
        </div>
      </div>

      <!-- No Category Selected -->
      <div v-else-if="!category" class="text-center py-24">
        <div class="w-24 h-24 bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-4xl">
          🗂️
        </div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Pick a category to get started</h3>
        <p class="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">Choose from the categories above to see verified service providers in Jos</p>
      </div>

      <!-- Empty Results -->
      <div v-else-if="filtered.length === 0 && !loading" class="text-center py-20">
        <div class="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6 text-4xl">
          {{ activeCat?.icon || '🔧' }}
        </div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {{ search ? 'No results for "' + search + '"' : 'No providers yet in ' + activeCat?.label }}
        </h3>
        <p class="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">
          {{ search ? 'Try a different search term or clear the filter.' : 'Be the first verified professional in this category.' }}
        </p>
        <div class="flex gap-3 justify-center flex-wrap">
          <button v-if="search" class="px-5 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition" @click="search = ''">
            Clear Search
          </button>
          <UButton to="/become-seller" color="primary" size="lg">Register Your Business</UButton>
        </div>
      </div>

      <!-- Providers Grid -->
      <div v-else>
        <div class="flex items-center justify-between mb-5">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            <span class="font-semibold text-gray-900 dark:text-white">{{ filtered.length }}</span> provider{{ filtered.length !== 1 ? 's' : '' }} found
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="provider in filtered"
            :key="provider.id"
            class="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-700 overflow-hidden hover:-translate-y-1"
          >
            <!-- Top accent -->
            <div class="h-1 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div class="p-5">
              <!-- Provider Header -->
              <div class="flex items-start gap-3 mb-4">
                <div class="w-14 h-14 rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40 flex items-center justify-center flex-shrink-0 border border-emerald-100 dark:border-emerald-800">
                  <img v-if="provider.image" :src="provider.image" :alt="provider.service_name" class="w-full h-full object-cover" />
                  <span v-else class="text-emerald-600 dark:text-emerald-400 font-bold text-xl">{{ provider.service_name?.charAt(0) }}</span>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between gap-2">
                    <h3 class="font-bold text-gray-900 dark:text-white leading-tight truncate">{{ provider.service_name }}</h3>
                    <span class="flex-shrink-0 flex items-center gap-1 px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold rounded-full border border-emerald-100 dark:border-emerald-800">
                      <UIcon name="i-lucide-badge-check" class="w-3 h-3" /> Verified
                    </span>
                  </div>
                  <div class="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
                    <UIcon name="i-lucide-map-pin" class="w-3 h-3 text-emerald-500" />
                    {{ provider.location }}
                  </div>
                </div>
              </div>

              <!-- Description -->
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">{{ provider.description }}</p>

              <!-- Meta Info -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span v-if="provider.experience" class="flex items-center gap-1 px-2.5 py-1 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-xs text-gray-600 dark:text-gray-400">
                  <UIcon name="i-lucide-clock" class="w-3 h-3 text-emerald-500" /> {{ provider.experience }}
                </span>
                <span v-if="provider.price_range" class="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                  ₦ {{ provider.price_range }}
                </span>
                <span v-if="provider.rating > 0" class="flex items-center gap-1 px-2.5 py-1 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-xs text-amber-700 dark:text-amber-400">
                  <UIcon name="i-lucide-star" class="w-3 h-3 fill-amber-400 text-amber-400" /> {{ provider.rating }}
                </span>
              </div>

              <!-- Gallery -->
              <div v-if="provider.gallery?.length" class="flex gap-1.5 mb-4">
                <img
                  v-for="(img, i) in provider.gallery.slice(0, 3)"
                  :key="i"
                  :src="img"
                  class="w-16 h-16 object-cover rounded-xl border border-gray-100 dark:border-gray-700"
                />
                <div v-if="provider.gallery.length > 3" class="w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-semibold text-gray-500">
                  +{{ provider.gallery.length - 3 }}
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-2">
                <a
                  :href="`tel:${provider.phone}`"
                  class="flex-1 flex items-center justify-center gap-2 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-emerald-500/25"
                >
                  <UIcon name="i-lucide-phone" class="w-4 h-4" /> Call
                </a>
                <a
                  :href="`https://wa.me/${provider.phone?.replace(/[^0-9]/g, '')}?text=Hi, I found you on JosMKT. I need your ${provider.service_name} service`"
                  target="_blank"
                  class="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-green-500/25"
                >
                  <UIcon name="i-lucide-message-circle" class="w-4 h-4" /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="mt-16 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-500 p-8 md:p-12 text-white text-center relative overflow-hidden">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
        <div class="relative z-10">
          <div class="text-4xl mb-4">💼</div>
          <h3 class="text-2xl md:text-3xl font-bold mb-3">Are you a service provider?</h3>
          <p class="text-emerald-100 mb-8 max-w-md mx-auto">Join thousands of professionals getting discovered by customers in Jos every day.</p>
          <UButton to="/become-seller" color="white" size="lg" class="font-bold hover:scale-105 transition-transform">
            Register Your Business — It's Free
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
