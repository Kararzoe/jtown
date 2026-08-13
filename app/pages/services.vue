<script setup lang="ts">
const supabase = useSupabaseClient()
const { t } = useLanguage()
const route = useRoute()
const router = useRouter()
const category = ref((route.query.category as string) || '')
const providers = ref<any[]>([])
const loading = ref(false)

const categories = [
  { label: 'Plumbing', slug: 'plumbing' },
  { label: 'Electricians', slug: 'electrical' },
  { label: 'AC Installation', slug: 'ac' },
  { label: 'Furniture', slug: 'furniture' },
  { label: 'Catering & Food', slug: 'catering' },
  { label: 'Painting', slug: 'painting' },
  { label: 'Auto Mechanic', slug: 'mechanic' },
  { label: 'Barbing & Salon', slug: 'barbing' },
  { label: 'Carpentry', slug: 'carpentry' },
  { label: 'Fashion Design', slug: 'fashion-design' },
  { label: 'Shoe Making', slug: 'shoemaking' },
  { label: 'Photography', slug: 'photography' },
  { label: 'Tech & Repairs', slug: 'tech' },
  { label: 'Logistics', slug: 'logistics' },
  { label: 'Laundry & Cleaning', slug: 'laundry' },
  { label: 'Education', slug: 'education' },
  { label: 'Perfumery', slug: 'perfumery' },
  { label: 'Make Up', slug: 'makeup' },
  { label: 'Event Planning', slug: 'event-planning' },
  { label: 'Rentals', slug: 'rentals' },
  { label: 'Mason', slug: 'mason' },
  { label: 'Phone Accessories', slug: 'phone-accessories' },
  { label: 'Legal & Solicitors', slug: 'legal' },
  { label: 'Housing Agent', slug: 'housing-agent' },
  { label: 'E-Wallet Services', slug: 'e-wallet' },
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
  router.push({ query: { category: slug } })
}

watch(category, loadProviders)
onMounted(loadProviders)

const categoryLabel = computed(() => categories.find(c => c.slug === category.value)?.label || category.value.replace(/-/g, ' '))
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
    <div class="max-w-7xl mx-auto">

      <!-- Header -->
      <div class="flex items-center gap-3 mb-6">
        <UButton icon="i-lucide-arrow-left" variant="ghost" color="neutral" @click="router.back()" />
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white capitalize">
            {{ category ? categoryLabel + ' ' + t('servicesTitle') : t('allServices') }}
          </h1>
          <p class="text-gray-500 text-sm">{{ t('verifiedPros') }}</p>
        </div>
      </div>

      <!-- Category Pills -->
      <div class="flex gap-2 flex-wrap mb-8">
        <button
          v-for="cat in categories"
          :key="cat.slug"
          :class="`px-4 py-2 rounded-full text-sm font-medium transition-all ${category === cat.slug ? 'bg-emerald-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'}`"
          @click="selectCategory(cat.slug)"
        >
          {{ cat.label }}
        </button>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="i in 6" :key="i" class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow">
          <div class="flex items-center gap-3 mb-3">
            <div class="skeleton w-12 h-12 rounded-full" />
            <div class="flex-1 space-y-2">
              <div class="skeleton h-4 rounded w-2/3" />
              <div class="skeleton h-3 rounded w-1/3" />
            </div>
          </div>
          <div class="skeleton h-3 rounded w-full mb-2" />
          <div class="skeleton h-3 rounded w-4/5 mb-4" />
          <div class="flex gap-2">
            <div class="skeleton h-9 rounded-lg flex-1" />
            <div class="skeleton h-9 rounded-lg flex-1" />
          </div>
        </div>
      </div>

      <!-- No category selected -->
      <div v-else-if="!category" class="text-center py-20">
        <div class="text-6xl mb-4">🔧</div>
        <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">{{ t('selectCategory') }}</h3>
        <p class="text-gray-500">{{ t('selectCategoryDesc') }}</p>
      </div>

      <!-- Empty -->
      <div v-else-if="providers.length === 0" class="text-center py-16">
        <div class="text-6xl mb-4">🔍</div>
        <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">{{ t('noProviders') }}</h3>
        <p class="text-gray-500 mb-6">{{ t('noProvidersDesc') }}</p>
        <UButton to="/become-seller" color="primary" size="lg">{{ t('beFirstToApply') }}</UButton>
      </div>

      <!-- Providers Grid -->
      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="(provider, idx) in providers"
          :key="provider._id"
          class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-700 group relative overflow-hidden"
        >
          <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />

          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-full overflow-hidden bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                <img v-if="provider.image" :src="provider.image" :alt="provider.service_name" class="w-full h-full object-cover" />
                <span v-else class="text-emerald-600 font-bold text-lg">{{ provider.service_name?.charAt(0) }}</span>
              </div>
              <div>
                <h3 class="font-bold text-lg leading-tight">{{ provider.service_name }}</h3>
                <p class="text-sm text-gray-500">{{ provider.location }}</p>
              </div>
            </div>
            <span class="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold rounded-full flex-shrink-0">Verified</span>
          </div>

          <p class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{{ provider.description }}</p>

          <div class="space-y-1.5 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-map-pin" class="w-4 h-4 text-emerald-500" />
              {{ provider.location }}
            </div>
            <div v-if="provider.experience" class="flex items-center gap-2">
              <UIcon name="i-lucide-clock" class="w-4 h-4 text-emerald-500" />
              {{ provider.experience }} {{ t('experience') }}
            </div>
            <div v-if="provider.price_range" class="flex items-center gap-2">
              <span class="text-emerald-500 font-bold text-xs">₦</span>
              {{ provider.price_range }}
            </div>
            <div v-if="provider.rating > 0" class="flex items-center gap-2">
              <UIcon name="i-lucide-star" class="w-4 h-4 text-yellow-400" />
              {{ provider.rating }} ({{ provider.totalReviews }} reviews)
            </div>
          </div>

          <!-- Gallery -->
          <div v-if="provider.gallery?.length" class="flex gap-1 mb-4">
            <img v-for="(img, i) in provider.gallery.slice(0, 3)" :key="i" :src="img" class="w-16 h-16 object-cover rounded-lg" />
          </div>

          <div class="flex gap-2">
            <a
              :href="`tel:${provider.phone}`"
              class="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-emerald-500 text-white rounded-xl text-sm font-semibold hover:bg-emerald-600 transition"
            >
              <UIcon name="i-lucide-phone" class="w-4 h-4" /> {{ t('call') }}
            </a>
            <a
              :href="`https://wa.me/${provider.phone?.replace(/[^0-9]/g, '')}?text=Hi, I found you on JosMKT. I need your ${provider.service_name} service`"
              target="_blank"
              class="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-green-500 text-white rounded-xl text-sm font-semibold hover:bg-green-600 transition"
            >
              <UIcon name="i-lucide-message-circle" class="w-4 h-4" /> {{ t('whatsapp') }}
            </a>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="mt-12 text-center bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-8 text-white">
        <h3 class="text-2xl font-bold mb-2">{{ t('areYouProvider') }}</h3>
        <p class="text-emerald-100 mb-6">{{ t('listBusinessDesc') }}</p>
        <UButton to="/become-seller" color="white" size="lg" class="font-bold">{{ t('registerBusiness') }}</UButton>
      </div>
    </div>
  </div>
</template>
