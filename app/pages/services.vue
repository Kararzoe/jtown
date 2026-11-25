<script setup lang="ts">
const supabase = useSupabaseClient()
const { t } = useLanguage()
const route = useRoute()
const router = useRouter()
const category = ref((route.query.category as string) || '')
const search = ref((route.query.search as string) || '')
const providers = ref<any[]>([])
const loading = ref(false)

const imgUrl = (url: string, w = 400) => {
  if (!url || !url.includes('cloudinary.com')) return url
  return url.replace('/upload/', `/upload/f_auto,q_auto,w_${w}/`)
}

const { categories } = useCategories()

const loadProviders = async () => {
  if (!category.value && !search.value) return
  loading.value = true
  let query = supabase.from('service_providers').select('*').eq('status', 'approved')
  if (category.value) query = query.eq('category', category.value)
  const { data } = await query
  providers.value = data || []
  loading.value = false
}

const userLat = ref<number | null>(null)
const userLng = ref<number | null>(null)
const sortByNearest = ref(false)
const gettingLocation = ref(false)

const getDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat/2) ** 2 + Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) * Math.sin(dLng/2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

const distanceLabel = (provider: any) => {
  if (!userLat.value || !userLng.value || !provider.lat || !provider.lng) return null
  const d = getDistance(userLat.value, userLng.value, provider.lat, provider.lng)
  return d < 1 ? `${Math.round(d * 1000)}m away` : `${d.toFixed(1)}km away`
}

const findNearest = () => {
  if (!navigator.geolocation) return
  gettingLocation.value = true
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      userLat.value = pos.coords.latitude
      userLng.value = pos.coords.longitude
      sortByNearest.value = true
      gettingLocation.value = false
    },
    () => { gettingLocation.value = false },
    { enableHighAccuracy: true }
  )
}

const selectCategory = (slug: string) => {
  category.value = slug
  search.value = ''
  router.push({ query: { category: slug } })
}

watch(category, loadProviders)
onMounted(loadProviders)

const activeCat = computed(() => categories.value.find(c => c.slug === category.value))

const filtered = computed(() => {
  let list = providers.value
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    list = list.filter(p =>
      p.service_name?.toLowerCase().includes(q) ||
      p.location?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q)
    )
  }
  return list
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">

    <!-- Header -->
    <div class="bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 px-4 sm:px-6 lg:px-8 pt-8 pb-10">
      <div class="max-w-7xl mx-auto">
        <button
          type="button"
          class="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors mb-6"
          @click="router.back()"
        >
          <UIcon name="i-lucide-arrow-left" class="w-4 h-4" />
          {{ t('back') }}
        </button>

        <div v-if="activeCat" class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-xl bg-green-50 dark:bg-green-950/50 flex items-center justify-center flex-shrink-0">
            <UIcon :name="activeCat.icon" class="w-7 h-7 text-[var(--ui-primary)]" />
          </div>
          <div>
            <h1 class="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{{ activeCat.label }}</h1>
            <p class="text-gray-500 dark:text-gray-400 text-sm mt-1 flex items-center gap-1.5">
              <UIcon name="i-lucide-map-pin" class="w-3.5 h-3.5" />
              Jos, Plateau State · {{ t('verifiedProfessionals') }}
            </p>
          </div>
        </div>
        <div v-else>
          <span class="eyebrow">{{ t('allServices') }}</span>
          <h1 class="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{{ t('findA') }} {{ t('findServiceProvider') }}</h1>
          <p class="mt-2 text-gray-600 dark:text-gray-400">{{ t('trustedProfessionals') }}</p>
        </div>

        <UInput
          v-model="search"
          icon="i-lucide-search"
          size="xl"
          :placeholder="t('searchServices')"
          class="mt-6 w-full max-w-lg"
        />
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <!-- Category Scroll Pills -->
      <div class="flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-hide">
        <button
          v-for="cat in categories"
          :key="cat.slug"
          :class="[
            'flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 border',
            category === cat.slug
              ? 'bg-ink-900 text-white border-ink-900 dark:bg-white dark:text-gray-900 dark:border-white'
              : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
          ]"
          @click="selectCategory(cat.slug)"
        >
          <UIcon :name="cat.icon" class="w-4 h-4" />
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
      <div v-else-if="!category && !search" class="text-center py-24">
        <div class="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <UIcon name="i-lucide-layout-grid" class="w-7 h-7 text-gray-400" />
        </div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ t('pickCategory') }}</h3>
        <p class="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">{{ t('pickCategoryDesc') }}</p>
      </div>

      <!-- Empty Results -->
      <div v-else-if="filtered.length === 0 && !loading" class="text-center py-20">
        <div class="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <UIcon :name="activeCat?.icon || 'i-lucide-search'" class="w-7 h-7 text-gray-400" />
        </div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {{ search ? t('noResultsFor') + ' "' + search + '"' : t('noProvidersIn') + ' ' + activeCat?.label }}
        </h3>
        <p class="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">
          {{ search ? t('tryDifferentSearch') : t('beFirstInCategory') }}
        </p>
        <div class="flex gap-3 justify-center flex-wrap">
          <button v-if="search" class="px-5 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition" @click="search = ''">
            {{ t('clearSearch') }}
          </button>
        </div>
      </div>

      <!-- Providers Grid -->
      <div v-else>
        <div class="flex items-center justify-between mb-5">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            <span class="font-semibold text-gray-900 dark:text-white">{{ filtered.length }}</span> {{ filtered.length !== 1 ? t('providersFoundPlural') : t('providersFound') }}
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="provider in filtered"
            :key="provider.id"
            class="card-hover bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 overflow-hidden"
          >

            <div class="p-5">
              <!-- Provider Header -->
              <div class="flex items-start gap-3 mb-4">
                <div class="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                  <img v-if="provider.image" :src="imgUrl(provider.image, 200)" :alt="provider.service_name" class="w-full h-full object-cover" >
                  <span v-else class="text-gray-500 dark:text-gray-400 font-semibold text-xl">{{ provider.service_name?.charAt(0) }}</span>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between gap-2">
                    <h3 class="font-bold text-gray-900 dark:text-white leading-tight truncate">{{ provider.service_name }}</h3>
                    <div class="flex flex-col items-end gap-1 flex-shrink-0">
                      <span class="flex items-center gap-1 px-2 py-0.5 bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-400 text-xs font-medium rounded-full">
                        <UIcon name="i-lucide-badge-check" class="w-3 h-3" /> {{ t('verified') }}
                      </span>
                    </div>
                  </div>
                  <div class="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
                    <UIcon name="i-lucide-map-pin" class="w-3 h-3" />
                    {{ provider.location }}
                  </div>
                </div>
              </div>

              <!-- Description -->
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">{{ provider.description }}</p>

              <!-- Meta Info -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span v-if="provider.experience" class="flex items-center gap-1 px-2.5 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs text-gray-600 dark:text-gray-400">
                  <UIcon name="i-lucide-clock" class="w-3 h-3" /> {{ provider.experience }}
                </span>
                <span v-if="provider.price_range" class="flex items-center gap-1 px-2.5 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs text-gray-700 dark:text-gray-300 font-medium">
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
                  :src="imgUrl(img, 200)"
                  class="w-16 h-16 object-cover rounded-xl border border-gray-100 dark:border-gray-700"
                >
                <div v-if="provider.gallery.length > 3" class="w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-semibold text-gray-500">
                  +{{ provider.gallery.length - 3 }}
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-2">
                <a
                  :href="`tel:${provider.phone}`"
                  class="flex-1 flex items-center justify-center gap-2 py-2.5 bg-ink-900 hover:bg-ink-800 dark:bg-white dark:hover:bg-gray-200 dark:text-gray-900 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  <UIcon name="i-lucide-phone" class="w-4 h-4" /> {{ t('call') }}
                </a>
                <a
                  :href="`https://wa.me/${provider.phone?.replace(/[^0-9]/g, '')}?text=Hi, I found you on JosMKT. I need your ${provider.service_name} service`"
                  target="_blank"
                  class="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#25D366] hover:bg-[#1ebe5b] text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  <UIcon name="i-simple-icons-whatsapp" class="w-4 h-4" /> {{ t('whatsapp') }}
                </a>
                <NuxtLink :to="`/provider/${provider.id}`" class="flex items-center justify-center px-3 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors" :aria-label="provider.service_name">
                  <UIcon name="i-lucide-eye" class="w-4 h-4" />
                </NuxtLink>
                <a v-if="provider.lat && provider.lng" :href="`https://www.google.com/maps?q=${provider.lat},${provider.lng}`" target="_blank" class="flex items-center justify-center px-3 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors" title="View on Google Maps">
                  <UIcon name="i-lucide-map-pin" class="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="mt-16 rounded-2xl bg-ink-900 text-white overflow-hidden grid md:grid-cols-5">
        <div class="md:col-span-3 p-8 md:p-12">
          <h3 class="text-2xl md:text-3xl font-bold tracking-tight">{{ t('areYouProvider') }}</h3>
          <p class="mt-3 text-ink-200 max-w-md">{{ t('listBusinessDesc') }}</p>
          <NuxtLink
            to="/become-seller"
            class="mt-8 inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-brand-orange hover:bg-brand-orange-dark text-white text-sm font-semibold transition-colors"
          >
            {{ t('registerBusinessCta') }}
            <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
          </NuxtLink>
        </div>
        <div class="hidden md:block md:col-span-2 relative min-h-56">
          <img src="/images/shop-owner.webp" alt="" aria-hidden="true" loading="lazy" class="absolute inset-0 w-full h-full object-cover" >
        </div>
      </div>
    </div>
  </div>
</template>

