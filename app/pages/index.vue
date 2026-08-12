<script setup lang="ts">
const supabase = useSupabaseClient()
const { t } = useLanguage()
const products = ref<any[]>([])
const loading = ref(true)
const currentBanner = ref(0)
const openFaq = ref<number | null>(null)

const banners = [
  { text: '🚀 Register your business on JosMKT — Get discovered by thousands in Jos!', bg: 'from-emerald-600 to-teal-600' },
  { text: '📍 Find trusted plumbers, electricians, bakers & more in Jos', bg: 'from-purple-600 to-indigo-600' },
  { text: '📢 List your service for FREE — Start getting customers today', bg: 'from-amber-600 to-orange-600' },
]

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

const categoryHref = (slug: string) => `/services?category=${slug}`

const stats = [
  { label: 'Monthly Views', value: '50,000+', icon: 'i-lucide-eye' },
  { label: 'Businesses Listed', value: '1,000+', icon: 'i-lucide-store' },
  { label: 'Growth Rate', value: '98%', icon: 'i-lucide-trending-up' },
  { label: 'Happy Customers', value: '25,000+', icon: 'i-lucide-users' },
]

const howItWorks = computed(() => [
  { icon: '👤', title: t('step1Title'), desc: t('step1Desc') },
  { icon: '📢', title: t('step2Title'), desc: t('step2Desc') },
  { icon: '👁️', title: t('step3Title'), desc: t('step3Desc') },
  { icon: '📈', title: t('step4Title'), desc: t('step4Desc') },
])

const trust = computed(() => [
  { icon: 'i-lucide-shield', title: t('verifiedSellers'), desc: t('verifiedSellersDesc') },
  { icon: 'i-lucide-check-circle', title: t('qualityAssured'), desc: t('qualityAssuredDesc') },
  { icon: 'i-lucide-lock', title: t('secureContacts'), desc: t('secureContactsDesc') },
  { icon: 'i-lucide-users', title: t('communityTrust'), desc: t('communityTrustDesc') },
])

const faqs = computed(() => [
  { q: t('faq1Q'), a: t('faq1A') },
  { q: t('faq2Q'), a: t('faq2A') },
  { q: t('faq3Q'), a: t('faq3A') },
  { q: t('faq4Q'), a: t('faq4A') },
  { q: t('faq5Q'), a: t('faq5A') },
  { q: t('faq6Q'), a: t('faq6A') },
])

onMounted(async () => {
  const { data } = await supabase.from('products').select('*, seller:profiles(*)').eq('status', 'active').limit(8)
  products.value = data || []
  loading.value = false
  setInterval(() => { currentBanner.value = (currentBanner.value + 1) % banners.length }, 4000)
})
</script>

<template>
  <div>
    <!-- Trending Banner -->
    <div :class="`bg-gradient-to-r ${banners[currentBanner].bg} py-2.5 px-4 transition-all duration-500`">
      <div class="max-w-7xl mx-auto flex items-center justify-center gap-3 text-white">
        <UIcon name="i-lucide-sparkles" class="w-4 h-4 flex-shrink-0" />
        <p class="text-xs md:text-sm font-semibold text-center">{{ banners[currentBanner].text }}</p>
        <NuxtLink to="/become-seller" class="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full font-medium hover:bg-white/30 text-xs border border-white/30 transition whitespace-nowrap">
          Get Started
        </NuxtLink>
      </div>
    </div>

    <!-- Hero -->
    <section class="relative min-h-[85vh] flex items-center bg-gradient-to-br from-gray-900 via-emerald-950 to-gray-900 overflow-hidden">
      <video autoplay loop muted playsinline class="absolute inset-0 w-full h-full object-cover opacity-30">
        <source :src="'/7669651-hd_1920_1080_25fps.mp4'" type="video/mp4" />
      </video>
      <div class="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-emerald-900/40 to-gray-900/80" />

      <div class="max-w-7xl mx-auto relative z-10 px-4 py-20 w-full">
        <div class="text-center">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-300 text-sm font-medium mb-8 backdrop-blur-sm">
            <UIcon name="i-lucide-zap" class="w-4 h-4" />
            {{ t('tagline') }}
          </div>

          <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {{ t('heroTitle1') }}
            <span class="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent"> {{ t('heroHighlight1') }}</span>
            <br />{{ t('heroTitle2') }}
            <span class="bg-gradient-to-r from-amber-400 to-orange-300 bg-clip-text text-transparent"> {{ t('heroHighlight2') }}</span>
          </h1>

          <p class="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            {{ t('heroDescription') }}
          </p>

          <div class="max-w-2xl mx-auto mb-10">
            <div class="relative">
              <UInput
                :placeholder="t('searchPlaceholder')"
                size="xl"
                icon="i-lucide-search"
                class="w-full"
                @keyup.enter="(e: any) => navigateTo(`/products?search=${e.target.value}`)"
              />
            </div>
          </div>

          <div class="flex flex-wrap justify-center gap-3">
            <span class="text-gray-400 text-sm">{{ t('popular') }}:</span>
            <button
              v-for="tag in [t('plumbing'), t('electricians'), t('acRepair'), t('bakers')]"
              :key="tag"
              class="px-5 py-2.5 bg-white/10 backdrop-blur-sm text-white rounded-full border border-white/20 hover:bg-emerald-500/20 hover:border-emerald-400/40 transition-all text-sm font-medium"
              @click="navigateTo(`/services?category=${tag.toLowerCase()}`)"
            >
              {{ tag }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="py-16 bg-emerald-600">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="stat in stats" :key="stat.label" class="text-center text-white">
            <UIcon :name="stat.icon" class="w-8 h-8 mx-auto mb-3 text-emerald-200" />
            <p class="text-3xl font-black mb-1">{{ stat.value }}</p>
            <p class="text-emerald-200 text-sm">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section id="services" class="py-20 px-4 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div class="absolute top-0 left-0 w-72 h-72 bg-emerald-300/20 rounded-full blur-3xl" />
      <div class="absolute bottom-0 right-0 w-72 h-72 bg-teal-300/20 rounded-full blur-3xl" />

      <div class="max-w-7xl mx-auto relative z-10">
        <div class="text-center mb-14">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4">
            {{ t('ourServices') }}
          </div>
          <h2 class="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {{ t('findA') }} <span class="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">{{ t('findServiceProvider') }}</span>
          </h2>
          <p class="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">{{ t('trustedProfessionals') }}</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          <NuxtLink
            v-for="cat in categories"
            :key="cat.slug"
            :to="categoryHref(cat.slug)"
            class="group bg-white dark:bg-gray-800 rounded-2xl p-5 md:p-7 shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-700"
          >
            <div class="text-3xl md:text-4xl mx-auto mb-4 text-center group-hover:scale-110 transition-transform duration-300">{{ cat.icon }}</div>
            <h3 class="text-center font-semibold text-sm md:text-base text-gray-900 dark:text-white">{{ cat.label }}</h3>
            <p class="text-center text-xs text-gray-400 mt-1 hidden md:block">Explore →</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-16 px-4 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center justify-between mb-12">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{{ t('featuredListings') }}</h2>
            <p class="text-gray-600 dark:text-gray-400">{{ t('discoverServices') }}</p>
          </div>
          <UButton to="/products" variant="outline" color="primary" trailing-icon="i-lucide-arrow-right">{{ t('viewAll') }}</UButton>
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

        <div v-else-if="products.length === 0" class="text-center py-16">
          <div class="text-6xl mb-4">🏪</div>
          <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">{{ t('noListingsYet') }}</h3>
          <p class="text-gray-500 mb-6">{{ t('beFirstToList') }}</p>
          <UButton to="/upload-product" color="primary" size="lg">{{ t('listYourService') }}</UButton>
        </div>

        <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <ProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-14">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4">
            {{ t('simpleProcess') }}
          </div>
          <h2 class="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">{{ t('howItWorks') }}</h2>
          <p class="text-gray-500 dark:text-gray-400 max-w-md mx-auto">{{ t('fourSteps') }}</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div v-for="(step, i) in howItWorks" :key="i" class="relative text-center">
            <div class="relative inline-block mb-4">
              <div class="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg text-3xl">
                {{ step.icon }}
              </div>
              <div class="absolute -top-2 -right-2 w-7 h-7 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center text-white dark:text-gray-900 font-bold text-xs shadow-md">
                {{ i + 1 }}
              </div>
            </div>
            <h3 class="font-bold text-sm md:text-lg mb-2 text-gray-900 dark:text-white">{{ step.title }}</h3>
            <p class="text-xs md:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Trust Section -->
    <section class="py-16 px-4 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{{ t('shopWithConfidence') }}</h2>
          <p class="text-gray-600 dark:text-gray-400">{{ t('safetyPriority') }}</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div v-for="f in trust" :key="f.title" class="text-center p-4 md:p-6 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            <div class="w-12 h-12 md:w-16 md:h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <UIcon :name="f.icon" class="w-6 h-6 md:w-8 md:h-8 text-emerald-600" />
            </div>
            <h3 class="font-bold text-sm md:text-lg mb-2 text-gray-900 dark:text-white">{{ f.title }}</h3>
            <p class="text-xs md:text-sm text-gray-600 dark:text-gray-400">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-20 px-4 bg-white dark:bg-gray-900">
      <div class="max-w-3xl mx-auto">
        <div class="text-center mb-14">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4">
            {{ t('faqTitle') }}
          </div>
          <h2 class="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">{{ t('faqTitle') }}</h2>
          <p class="text-gray-500 dark:text-gray-400">{{ t('faqSubtitle') }}</p>
        </div>

        <div class="space-y-3">
          <div
            v-for="(faq, i) in faqs"
            :key="i"
            class="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden hover:border-emerald-200 dark:hover:border-emerald-700 transition-colors"
          >
            <button
              class="w-full px-6 py-4 flex items-center justify-between hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition"
              @click="openFaq = openFaq === i ? null : i"
            >
              <span class="font-semibold text-left text-gray-900 dark:text-white text-sm md:text-base">{{ faq.q }}</span>
              <div :class="`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${openFaq === i ? 'bg-emerald-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`">
                <UIcon :name="openFaq === i ? 'i-lucide-minus' : 'i-lucide-plus'" class="w-4 h-4" />
              </div>
            </button>
            <div v-if="openFaq === i" class="px-6 pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {{ faq.a }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center">
      <div class="max-w-3xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">{{ t('readyToGrow') }}</h2>
        <p class="text-emerald-100 mb-8 text-lg">{{ t('joinThousands') }}</p>
        <UButton to="/become-seller" size="xl" color="white" class="font-bold">{{ t('getStartedFree') }}</UButton>
      </div>
    </section>
  </div>
</template>
