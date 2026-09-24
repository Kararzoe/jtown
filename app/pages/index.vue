<script setup lang="ts">
const supabase = useSupabaseClient()
const { t } = useLanguage()
const products = ref<any[]>([])
const allProviders = ref<any[]>([])
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

const stats: any[] = []

const howTab = ref<'customers' | 'providers'>('customers')

const howItWorksCustomers = computed(() => [
  { icon: '🔍', title: t('hiw1Title'), desc: t('hiw1Desc') },
  { icon: '📍', title: t('hiw2Title'), desc: t('hiw2Desc') },
  { icon: '📞', title: t('hiw3Title'), desc: t('hiw3Desc') },
  { icon: '✅', title: t('hiw4Title'), desc: t('hiw4Desc') },
])

const howItWorksProviders = computed(() => [
  { icon: '📝', title: t('hiw5Title'), desc: t('hiw5Desc') },
  { icon: '🛡️', title: t('hiw6Title'), desc: t('hiw6Desc') },
  { icon: '🌍', title: t('hiw7Title'), desc: t('hiw7Desc') },
  { icon: '📈', title: t('hiw8Title'), desc: t('hiw8Desc') },
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
  const [{ data: p }, { data: prov }] = await Promise.all([
    supabase.from('products').select('*, seller:profiles(*)').eq('status', 'active').limit(8),
    supabase.from('service_providers').select('id,service_name,category,location,phone,image,description,lat,lng').eq('status', 'approved')
  ])
  products.value = p || []
  allProviders.value = prov || []
  loading.value = false
  setInterval(() => { currentBanner.value = (currentBanner.value + 1) % banners.length }, 4000)

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible')
        observer.unobserve(e.target)
      }
    })
  }, { threshold: 0.1 })
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => observer.observe(el))
})
</script>

<template>
  <div>
    <!-- Trending Banner -->
    <div :class="`bg-gradient-to-r ${banners[currentBanner].bg} py-3 px-4 transition-all duration-700 relative overflow-hidden`">
      <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px); background-size: 20px 20px;" />
      <div class="max-w-7xl mx-auto flex items-center justify-center gap-3 text-white relative z-10">
        <UIcon name="i-lucide-sparkles" class="w-4 h-4 flex-shrink-0 animate-spin-slow" />
        <p class="text-xs md:text-sm font-semibold text-center">{{ banners[currentBanner].text }}</p>
        <NuxtLink to="/become-seller" class="px-3.5 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/35 text-xs border border-white/30 transition-all hover:scale-105 whitespace-nowrap shadow-sm">
          Get Started →
        </NuxtLink>
      </div>
    </div>

    <!-- Hero -->
    <section class="relative min-h-[92vh] flex items-center overflow-hidden" style="background: linear-gradient(135deg, #030a03 0%, #041a09 40%, #050e15 100%);">
      <!-- Radial mesh overlays -->
      <div class="absolute inset-0" style="background: radial-gradient(ellipse at 20% 50%, rgba(34,197,94,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(20,184,166,0.06) 0%, transparent 50%);" />

      <!-- Video -->
      <video autoplay loop muted playsinline class="absolute inset-0 w-full h-full object-cover opacity-[0.18]">
        <source :src="'/7669651-hd_1920_1080_25fps.mp4'" type="video/mp4" />
      </video>

      <!-- Gradient Overlay -->
      <div class="absolute inset-0" style="background: linear-gradient(to bottom, rgba(3,10,3,0.55) 0%, rgba(4,26,9,0.3) 50%, rgba(3,10,3,0.75) 100%);" />

      <!-- Animated orbs -->
      <div class="absolute top-16 left-8 w-40 h-40 bg-emerald-500/15 rounded-full blur-3xl animate-orb-pulse" />
      <div class="absolute top-1/3 right-12 w-56 h-56 bg-teal-500/10 rounded-full blur-3xl animate-orb-pulse" style="animation-delay: 2s" />
      <div class="absolute bottom-24 left-1/3 w-36 h-36 bg-emerald-400/10 rounded-full blur-3xl animate-orb-pulse" style="animation-delay: 4s" />
      <div class="absolute bottom-16 right-8 w-48 h-48 bg-cyan-500/8 rounded-full blur-3xl animate-float" style="animation-delay: 1s" />

      <!-- Geometric lines -->
      <div class="absolute top-20 right-1/4 w-px h-32 bg-gradient-to-b from-transparent via-emerald-400/30 to-transparent" />
      <div class="absolute bottom-20 left-1/4 w-px h-24 bg-gradient-to-b from-transparent via-teal-400/20 to-transparent" />

      <div class="max-w-7xl mx-auto relative z-10 px-4 py-24 w-full">
        <div class="text-center">
          <!-- Premium badge -->
          <div class="inline-flex items-center gap-2.5 px-5 py-2.5 mb-10 animate-fade-up" style="background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.25); border-radius: 100px; backdrop-filter: blur(12px);">
            <div class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span class="text-emerald-300 text-sm font-semibold tracking-wide">{{ t('tagline') }}</span>
            <UIcon name="i-lucide-zap" class="w-3.5 h-3.5 text-emerald-400" />
          </div>

          <!-- Main heading -->
          <h1 class="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[1.0] tracking-tight animate-slide-up">
            {{ t('heroTitle') }}
            <span class="relative inline-block">
              <span class="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent animate-gradient" style="background-size: 200% 200%;"> {{ t('heroHighlight') }}</span>
              <svg class="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 8 Q50 2 100 6 Q150 10 198 4" stroke="url(#heroGrad)" stroke-width="3" stroke-linecap="round" fill="none"/><defs><linearGradient id="heroGrad" x1="0" y1="0" x2="200" y2="0"><stop offset="0%" stop-color="#34d399"/><stop offset="100%" stop-color="#2dd4bf"/></linearGradient></defs></svg>
            </span>
            <br />
            <span class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-300 mt-2 block">{{ t('heroSubtitle') }}</span>
          </h1>

          <p class="text-base md:text-lg text-gray-400 mb-12 max-w-xl mx-auto leading-relaxed animate-fade-up" style="animation-delay:0.3s">
            {{ t('heroDescription') }}
          </p>

          <!-- Search Bar -->
          <div class="max-w-2xl mx-auto mb-12 animate-fade-up" style="animation-delay:0.5s">
            <div class="flex items-center gap-2 p-2 rounded-2xl" style="background: rgba(255,255,255,0.07); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.12); box-shadow: 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06);">
              <UIcon name="i-lucide-search" class="w-5 h-5 text-gray-400 ml-3 flex-shrink-0" />
              <UInput
                :placeholder="t('searchPlaceholder')"
                class="flex-1"
              />
              <button class="px-5 py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:scale-105 flex-shrink-0" style="background: linear-gradient(135deg, #16a34a, #0d9488); box-shadow: 0 4px 15px rgba(22,163,74,0.4);">
                Search
              </button>
            </div>
          </div>

          <!-- Popular tags -->
          <div class="flex flex-wrap justify-center gap-2.5 animate-fade-up" style="animation-delay:0.7s">
            <span class="text-gray-500 text-sm self-center">{{ t('popular') }}:</span>
            <button
              v-for="tag in [t('plumbing'), t('electricians'), t('acRepair'), t('bakers')]"
              :key="tag"
              class="px-4 py-2 text-white rounded-xl border text-sm font-medium transition-all hover:scale-105 hover:bg-emerald-500/20 hover:border-emerald-400/40"
              style="background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.12); backdrop-filter: blur(8px);"
              @click="navigateTo(`/services?category=${tag.toLowerCase()}`)"
            >
              {{ tag }}
            </button>
          </div>

          <!-- Scroll indicator -->
          <div class="mt-20 flex justify-center animate-fade-up" style="animation-delay:1s">
            <div class="flex flex-col items-center gap-2 text-gray-500">
              <span class="text-xs font-medium tracking-widest uppercase">Scroll</span>
              <div class="w-px h-10 bg-gradient-to-b from-gray-500 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>



    <!-- Categories -->
    <section id="services" class="py-24 px-4 bg-white dark:bg-gray-950 relative overflow-hidden">
      <div class="absolute top-0 left-0 w-96 h-96 bg-emerald-100/60 dark:bg-emerald-900/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-teal-100/60 dark:bg-teal-900/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div class="max-w-7xl mx-auto relative z-10">
        <div class="text-center mb-16 reveal">
          <div class="inline-flex items-center gap-2 px-5 py-2 rounded-full text-emerald-700 dark:text-emerald-400 text-sm font-semibold mb-5" style="background: linear-gradient(135deg, rgba(34,197,94,0.1), rgba(20,184,166,0.1)); border: 1px solid rgba(34,197,94,0.2);">
            <div class="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            {{ t('ourServices') }}
          </div>
          <h2 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-5 leading-tight">
            {{ t('findA') }} <span class="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">{{ t('findServiceProvider') }}</span>
          </h2>
          <div class="section-divider" />
          <p class="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">{{ t('trustedProfessionals') }}</p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          <NuxtLink
            v-for="(cat, i) in categories"
            :key="cat.slug"
            :to="categoryHref(cat.slug)"
            class="reveal-scale category-card group bg-white dark:bg-gray-900 rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100/80 dark:border-gray-800 text-center"
            :style="`transition-delay: ${(i % 8) * 0.05}s`"
          >
            <div class="text-3xl mb-3 group-hover:scale-125 group-hover:rotate-6 transition-transform duration-300">{{ cat.icon }}</div>
            <h3 class="font-semibold text-xs md:text-sm text-gray-800 dark:text-gray-200 leading-tight">{{ cat.label }}</h3>
            <p class="text-[10px] text-emerald-500 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity font-medium">Explore →</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="py-20 px-4 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/30 dark:from-emerald-950/30 dark:to-transparent" />
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="text-center mb-10 reveal">
          <div class="inline-flex items-center gap-2 px-5 py-2 rounded-full text-emerald-700 dark:text-emerald-400 text-sm font-semibold mb-5" style="background: linear-gradient(135deg, rgba(34,197,94,0.1), rgba(20,184,166,0.1)); border: 1px solid rgba(34,197,94,0.2);">
            <UIcon name="i-lucide-map-pin" class="w-4 h-4" /> {{ t('liveServiceMap') }}
          </div>
          <h2 class="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-3">
            {{ t('findServicesNear') }} <span class="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">{{ t('nearYou') }}</span>
          </h2>
          <div class="section-divider" />
          <p class="text-gray-500 dark:text-gray-400 max-w-md mx-auto">{{ t('mapDesc') }}</p>
        </div>
        <div class="rounded-3xl overflow-hidden" style="box-shadow: 0 25px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(34,197,94,0.08);">
          <ProvidersMap :providers="allProviders" height="500px" />
        </div>
        <div class="text-center mt-8">
          <UButton to="/services" color="primary" size="lg" trailing-icon="i-lucide-arrow-right">{{ t('browseAllServices') }}</UButton>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-20 px-4 bg-white dark:bg-gray-950">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-end justify-between mb-12 reveal">
          <div>
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-3" style="background: linear-gradient(135deg, rgba(34,197,94,0.1), rgba(20,184,166,0.1)); border: 1px solid rgba(34,197,94,0.2);">
              <UIcon name="i-lucide-star" class="w-3.5 h-3.5" /> Featured
            </div>
            <h2 class="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2">{{ t('featuredListings') }}</h2>
            <p class="text-gray-500 dark:text-gray-400">{{ t('discoverServices') }}</p>
          </div>
          <UButton to="/products" variant="outline" color="primary" trailing-icon="i-lucide-arrow-right">{{ t('viewAll') }}</UButton>
        </div>

        <div v-if="loading" class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div v-for="i in 8" :key="i" class="rounded-2xl overflow-hidden">
            <div class="skeleton aspect-square" />
            <div class="p-4 space-y-2.5">
              <div class="skeleton h-4 rounded w-3/4" />
              <div class="skeleton h-3 rounded w-1/2" />
              <div class="skeleton h-8 rounded w-full" />
            </div>
          </div>
        </div>

        <div v-else-if="products.length === 0" class="text-center py-20 reveal">
          <div class="w-24 h-24 rounded-3xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center mx-auto mb-6 text-5xl shadow-inner">🏪</div>
          <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">{{ t('noListingsYet') }}</h3>
          <p class="text-gray-500 mb-6">{{ t('beFirstToList') }}</p>
          <UButton to="/upload-product" color="primary" size="lg">{{ t('listYourService') }}</UButton>
        </div>

        <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div v-for="(product, i) in products" :key="product.id" class="reveal-scale" :style="`transition-delay: ${i * 0.07}s`">
            <ProductCard :product="product" />
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="py-24 px-4 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent dark:via-emerald-700/30" />
      <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent dark:via-emerald-700/30" />

      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12 reveal">
          <div class="inline-flex items-center gap-2 px-5 py-2 rounded-full text-emerald-700 dark:text-emerald-400 text-sm font-semibold mb-5" style="background: linear-gradient(135deg, rgba(34,197,94,0.1), rgba(20,184,166,0.1)); border: 1px solid rgba(34,197,94,0.2);">
            <div class="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            {{ t('simpleProcess') }}
          </div>
          <h2 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">{{ t('howItWorks') }}</h2>
          <div class="section-divider" />
          <p class="text-gray-500 dark:text-gray-400 max-w-md mx-auto">{{ t('howItWorksDesc') }}</p>
        </div>

        <!-- Tab switcher -->
        <div class="flex justify-center mb-12">
          <div class="inline-flex rounded-2xl p-1.5 gap-1" style="background: rgba(0,0,0,0.04); border: 1px solid rgba(0,0,0,0.06);">
            <button
              :class="['px-7 py-3 rounded-xl text-sm font-bold transition-all duration-300', howTab === 'customers' ? 'bg-white dark:bg-gray-800 text-emerald-600 shadow-md' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300']"
              @click="howTab = 'customers'"
            >
              🔍 {{ t('forCustomers') }}
            </button>
            <button
              :class="['px-7 py-3 rounded-xl text-sm font-bold transition-all duration-300', howTab === 'providers' ? 'bg-white dark:bg-gray-800 text-emerald-600 shadow-md' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300']"
              @click="howTab = 'providers'"
            >
              💼 {{ t('forProviders') }}
            </button>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div
            v-for="(step, i) in (howTab === 'customers' ? howItWorksCustomers : howItWorksProviders)"
            :key="i"
            class="reveal relative text-center group"
            :style="`transition-delay: ${i * 0.1}s`"
          >
            <div v-if="i < 3" class="hidden md:block absolute top-10 left-[60%] right-[-40%] h-px" style="background: linear-gradient(90deg, rgba(34,197,94,0.4), transparent);" />
            <div class="relative inline-block mb-5">
              <div class="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto shadow-lg text-3xl group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300" style="background: linear-gradient(135deg, #16a34a, #0d9488); box-shadow: 0 12px 30px rgba(22,163,74,0.3);">
                {{ step.icon }}
              </div>
              <div class="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center font-black text-xs shadow-md text-white" style="background: linear-gradient(135deg, #1e293b, #0f172a);">
                {{ i + 1 }}
              </div>
            </div>
            <h3 class="font-bold text-sm md:text-base mb-2 text-gray-900 dark:text-white">{{ step.title }}</h3>
            <p class="text-xs md:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>

        <div v-if="howTab === 'providers'" class="text-center mt-12">
          <UButton to="/become-seller" color="primary" size="lg" trailing-icon="i-lucide-arrow-right">{{ t('registerBusinessCta') }}</UButton>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <NewsletterSection />

    <!-- FAQ -->
    <section class="py-24 px-4 bg-white dark:bg-gray-950">
      <div class="max-w-3xl mx-auto">
        <div class="text-center mb-16 reveal">
          <div class="inline-flex items-center gap-2 px-5 py-2 rounded-full text-emerald-700 dark:text-emerald-400 text-sm font-semibold mb-5" style="background: linear-gradient(135deg, rgba(34,197,94,0.1), rgba(20,184,166,0.1)); border: 1px solid rgba(34,197,94,0.2);">
            <div class="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            FAQ
          </div>
          <h2 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">{{ t('faqTitle') }}</h2>
          <div class="section-divider" />
          <p class="text-gray-500 dark:text-gray-400">{{ t('faqSubtitle') }}</p>
        </div>

        <div class="space-y-3">
          <div
            v-for="(faq, i) in faqs"
            :key="i"
            class="reveal rounded-2xl overflow-hidden border transition-all duration-300"
            :class="openFaq === i ? 'border-emerald-200 dark:border-emerald-800 shadow-md' : 'border-gray-100 dark:border-gray-800 hover:border-emerald-100 dark:hover:border-emerald-900'"
            :style="`transition-delay: ${i * 0.08}s`"
          >
            <button
              class="w-full px-6 py-5 flex items-center justify-between transition-colors duration-200"
              :class="openFaq === i ? 'bg-emerald-50/50 dark:bg-emerald-950/30' : 'hover:bg-gray-50 dark:hover:bg-gray-900/50'"
              @click="openFaq = openFaq === i ? null : i"
            >
              <span class="font-semibold text-left text-gray-900 dark:text-white text-sm md:text-base">{{ faq.q }}</span>
              <div class="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ml-4 transition-all duration-300" :class="openFaq === i ? 'text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'" :style="openFaq === i ? 'background: linear-gradient(135deg, #16a34a, #0d9488);' : ''">
                <UIcon :name="openFaq === i ? 'i-lucide-minus' : 'i-lucide-plus'" class="w-4 h-4" />
              </div>
            </button>
            <Transition name="faq">
              <div v-if="openFaq === i" class="px-6 pb-5 text-gray-600 dark:text-gray-400 text-sm leading-relaxed border-t border-emerald-100 dark:border-emerald-900/50 pt-4">
                {{ faq.a }}
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="py-20 px-4 relative overflow-hidden" style="background: linear-gradient(135deg, #064e3b 0%, #065f46 40%, #059669 100%);">
      <div class="absolute inset-0 opacity-40" style="background-image: radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 30px 30px;" />
      <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-300/30 to-transparent" />
      <div class="absolute top-10 left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-float" />
      <div class="absolute bottom-10 right-10 w-56 h-56 bg-teal-300/10 rounded-full blur-3xl animate-float" style="animation-delay:2s" />

      <div class="max-w-3xl mx-auto text-center relative z-10 reveal">
        <div class="inline-flex items-center gap-2 px-5 py-2 rounded-full text-emerald-200 text-sm font-semibold mb-8" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15); backdrop-filter: blur(8px);">
          <UIcon name="i-lucide-rocket" class="w-4 h-4" />
          Join the Revolution
        </div>
        <h2 class="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">{{ t('readyToGrow') }}</h2>
        <p class="text-emerald-100/80 mb-10 text-lg max-w-lg mx-auto">{{ t('joinThousands') }}</p>
        <UButton to="/become-seller" size="xl" color="white" class="font-black hover:scale-105 transition-transform shadow-2xl animate-pulse-glow-white">{{ t('getStartedFree') }}</UButton>
      </div>
    </section>
  </div>
</template>

<style scoped>
.faq-enter-active { transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
.faq-leave-active { transition: all 0.25s ease; }
.faq-enter-from, .faq-leave-to { opacity: 0; transform: translateY(-10px); }
</style>
