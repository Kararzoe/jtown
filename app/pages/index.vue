<script setup lang="ts">
const supabase = useSupabaseClient()
const { t } = useLanguage()
const { categories, featuredCategories } = useCategories()
const products = ref<any[]>([])
const allProviders = ref<any[]>([])

const categoryHref = (slug: string) => `/services?category=${slug}`

const heroSearch = ref('')
const doHeroSearch = () => {
  if (heroSearch.value.trim()) navigateTo(`/services?search=${encodeURIComponent(heroSearch.value.trim())}`)
}

const popularTags = computed(() => [
  { label: t('plumbing'), slug: 'plumbing' },
  { label: t('electricians'), slug: 'electrical' },
  { label: t('acRepair'), slug: 'ac' },
  { label: t('mechanicCat'), slug: 'mechanic' },
])

const trustPoints = computed(() => [
  { icon: 'i-lucide-badge-check', label: t('trustVerified') },
  { icon: 'i-lucide-handshake', label: t('trustNoCommission') },
  { icon: 'i-lucide-phone', label: t('trustDirect') },
])

const howItWorks = computed(() => [
  { icon: 'i-lucide-search', title: t('hiw1Title'), desc: t('hiw1Desc') },
  { icon: 'i-lucide-map-pin', title: t('hiw2Title'), desc: t('hiw2Desc') },
  { icon: 'i-lucide-message-circle', title: t('hiw3Title'), desc: t('hiw3Desc') },
  { icon: 'i-lucide-check', title: t('hiw4Title'), desc: t('hiw4Desc') },
])

const providerSteps = computed(() => [
  { title: t('hiw5Title'), desc: t('hiw5Desc') },
  { title: t('hiw6Title'), desc: t('hiw6Desc') },
  { title: t('hiw7Title'), desc: t('hiw7Desc') },
  { title: t('hiw8Title'), desc: t('hiw8Desc') },
])

const faqs = computed(() => [1, 2, 3, 4, 5, 6].map(n => ({
  label: t(`faq${n}Q`),
  content: t(`faq${n}A`)
})))

onMounted(async () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible')
        observer.unobserve(e.target)
      }
    })
  }, { threshold: 0.1 })
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

  const [{ data: p }, { data: prov }] = await Promise.all([
    supabase.from('products').select('*, seller:profiles(*)').eq('status', 'active').limit(4),
    supabase.from('service_providers').select('id,service_name,category,location,phone,image,description,lat,lng').eq('status', 'approved')
  ])
  products.value = p || []
  allProviders.value = prov || []
})
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-20 lg:pb-24 grid lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-7">
          <p class="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 mb-6">
            <UIcon name="i-lucide-map-pin" class="w-4 h-4 text-brand-orange" />
            Jos, Plateau State
          </p>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.08]">
            {{ t('heroTitle') }}
            <span class="text-[var(--ui-primary)]">{{ t('heroHighlight') }}</span>
            <span class="block text-gray-500 dark:text-gray-400 font-semibold">{{ t('heroSubtitle') }}</span>
          </h1>

          <p class="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed">
            {{ t('heroDescription') }}
          </p>

          <form class="mt-8 max-w-xl flex flex-col sm:flex-row gap-2" role="search" @submit.prevent="doHeroSearch">
            <UInput
              v-model="heroSearch"
              icon="i-lucide-search"
              size="xl"
              :placeholder="t('searchPlaceholder')"
              class="flex-1"
              :ui="{ base: 'bg-white dark:bg-gray-900 shadow-sm' }"
            />
            <UButton type="submit" size="xl" class="justify-center px-6">{{ t('search') }}</UButton>
          </form>

          <div class="mt-5 flex flex-wrap items-center gap-2 text-sm">
            <span class="text-gray-500 dark:text-gray-400 mr-1">{{ t('popular') }}:</span>
            <NuxtLink
              v-for="tag in popularTags"
              :key="tag.slug"
              :to="categoryHref(tag.slug)"
              class="px-3 py-1 rounded-full border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
            >
              {{ tag.label }}
            </NuxtLink>
          </div>

          <ul class="mt-10 flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-3 text-sm text-gray-700 dark:text-gray-300">
            <li v-for="point in trustPoints" :key="point.label" class="flex items-center gap-2">
              <UIcon :name="point.icon" class="w-4 h-4 text-[var(--ui-primary)]" />
              {{ point.label }}
            </li>
          </ul>
        </div>

        <div class="lg:col-span-5 relative">
          <div class="relative aspect-[4/3] lg:aspect-[4/5] max-w-xl mx-auto lg:max-w-none rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800 shadow-xl">
            <img
              src="/images/hero-electrician.webp"
              alt="Electrician at work installing a power meter"
              class="w-full h-full object-cover"
              fetchpriority="high"
            >
          </div>
          <div
            v-if="allProviders.length >= 10"
            class="absolute -bottom-5 left-4 sm:left-8 lg:-left-6 flex items-center gap-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-lg px-4 py-3"
          >
            <span class="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-950/50 flex items-center justify-center">
              <UIcon name="i-lucide-shield-check" class="w-5 h-5 text-[var(--ui-primary)]" />
            </span>
            <div>
              <p class="text-lg font-bold text-gray-900 dark:text-white leading-none">{{ allProviders.length }}+</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ t('verifiedInJos') }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular categories -->
    <section id="services" class="py-20 bg-white dark:bg-gray-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-end justify-between gap-4 mb-10 reveal">
          <div>
            <span class="eyebrow">{{ t('ourServices') }}</span>
            <h2 class="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              {{ t('popularCategories') }}
            </h2>
            <p class="mt-3 text-gray-600 dark:text-gray-400 max-w-xl">{{ t('trustedProfessionals') }}</p>
          </div>
          <UButton to="/services" variant="link" color="neutral" trailing-icon="i-lucide-arrow-right" class="hidden sm:inline-flex">
            {{ t('seeAll') }}
          </UButton>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <NuxtLink
            v-for="cat in featuredCategories"
            :key="cat.slug"
            :to="categoryHref(cat.slug)"
            class="reveal group relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900"
          >
            <img
              :src="cat.image"
              :alt="cat.label"
              loading="lazy"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div class="absolute inset-x-0 bottom-0 p-4 md:p-5 flex items-end justify-between gap-2">
              <h3 class="text-white font-semibold text-base md:text-lg">{{ cat.label }}</h3>
              <span class="hidden md:flex w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
              </span>
            </div>
          </NuxtLink>
        </div>

        <!-- All categories -->
        <div class="mt-16 reveal">
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">{{ t('allCategories') }}</h3>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            <NuxtLink
              v-for="cat in categories"
              :key="cat.slug"
              :to="categoryHref(cat.slug)"
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-gray-100 dark:border-gray-800 text-sm text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <UIcon :name="cat.icon" class="w-4 h-4 flex-shrink-0 text-gray-400" />
              <span class="truncate">{{ cat.label }}</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="py-20 bg-gray-50 dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-2xl mb-12 reveal">
          <span class="eyebrow">{{ t('simpleProcess') }}</span>
          <h2 class="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{{ t('howItWorks') }}</h2>
          <p class="mt-3 text-gray-600 dark:text-gray-400">{{ t('howItWorksDesc') }}</p>
        </div>

        <ol class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <li
            v-for="(step, i) in howItWorks"
            :key="i"
            class="reveal relative rounded-xl bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 p-6"
          >
            <div class="flex items-center justify-between mb-5">
              <span class="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-950/50 flex items-center justify-center">
                <UIcon :name="step.icon" class="w-5 h-5 text-[var(--ui-primary)]" />
              </span>
              <span class="text-sm font-semibold text-gray-300 dark:text-gray-700 tabular-nums">0{{ i + 1 }}</span>
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">{{ step.title }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{{ step.desc }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- Map -->
    <section class="py-20 bg-white dark:bg-gray-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 reveal">
          <div class="max-w-2xl">
            <span class="eyebrow">{{ t('liveServiceMap') }}</span>
            <h2 class="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              {{ t('findServicesNear') }} {{ t('nearYou') }}
            </h2>
            <p class="mt-3 text-gray-600 dark:text-gray-400">{{ t('mapDesc') }}</p>
          </div>
          <UButton to="/services" color="neutral" variant="outline" trailing-icon="i-lucide-arrow-right" class="self-start md:self-auto">
            {{ t('browseAllServices') }}
          </UButton>
        </div>
        <div class="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
          <ProvidersMap :providers="allProviders" height="460px" />
        </div>
      </div>
    </section>

    <!-- Featured products (only when there are any) -->
    <section v-if="products.length" class="py-20 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-end justify-between gap-4 mb-8">
          <div>
            <span class="eyebrow">{{ t('products') }}</span>
            <h2 class="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{{ t('featuredListings') }}</h2>
          </div>
          <UButton to="/products" variant="link" color="neutral" trailing-icon="i-lucide-arrow-right">{{ t('viewAll') }}</UButton>
        </div>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <ProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>
      </div>
    </section>

    <!-- For businesses -->
    <section class="py-20 bg-ink-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div class="relative order-last lg:order-first reveal">
          <div class="aspect-[4/3] rounded-2xl overflow-hidden bg-ink-800">
            <img src="/images/shop-owner.webp" alt="Shop owner standing behind the counter of her store" loading="lazy" class="w-full h-full object-cover" >
          </div>
        </div>

        <div class="reveal">
          <span class="text-xs font-semibold uppercase tracking-[0.08em] text-brand-orange">{{ t('forBusinesses') }}</span>
          <h2 class="mt-2 text-3xl md:text-4xl font-bold tracking-tight">{{ t('areYouProvider') }}</h2>
          <p class="mt-4 text-ink-200 text-lg">{{ t('listBusinessDesc') }}</p>

          <ol class="mt-8 space-y-5">
            <li v-for="(step, i) in providerSteps" :key="i" class="flex gap-4">
              <span class="flex-shrink-0 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-sm font-semibold">
                {{ i + 1 }}
              </span>
              <div>
                <h3 class="font-semibold">{{ step.title }}</h3>
                <p class="text-sm text-ink-200 mt-1 leading-relaxed">{{ step.desc }}</p>
              </div>
            </li>
          </ol>

          <NuxtLink
            to="/become-seller"
            class="mt-10 inline-flex items-center gap-2 h-12 px-6 rounded-lg bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold transition-colors"
          >
            {{ t('registerBusinessCta') }}
            <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-20 bg-white dark:bg-gray-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-10">
        <div class="reveal">
          <span class="eyebrow">FAQ</span>
          <h2 class="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{{ t('faqTitle') }}</h2>
          <p class="mt-3 text-gray-600 dark:text-gray-400">{{ t('faqSubtitle') }}</p>
          <UButton to="/contact" variant="outline" color="neutral" class="mt-6" trailing-icon="i-lucide-arrow-right">
            {{ t('contactUs') }}
          </UButton>
        </div>
        <div class="lg:col-span-2 reveal">
          <UAccordion
            :items="faqs"
            :ui="{
              item: 'border-b border-gray-200 dark:border-gray-800',
              trigger: 'py-5 text-base font-medium text-gray-900 dark:text-white',
              body: 'pb-5 text-gray-600 dark:text-gray-400 leading-relaxed'
            }"
          />
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="relative py-24 overflow-hidden">
      <img src="/images/market.webp" alt="" aria-hidden="true" loading="lazy" class="absolute inset-0 w-full h-full object-cover" >
      <div class="absolute inset-0 bg-ink-950/80" />
      <div class="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 class="text-3xl md:text-5xl font-bold tracking-tight">{{ t('readyToGrow') }}</h2>
        <p class="mt-4 text-lg text-ink-100/90">{{ t('joinThousands') }}</p>
        <div class="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <NuxtLink
            to="/become-seller"
            class="inline-flex items-center justify-center h-12 px-6 rounded-lg bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold transition-colors"
          >
            {{ t('getStartedFree') }}
          </NuxtLink>
          <NuxtLink
            to="/services"
            class="inline-flex items-center justify-center h-12 px-6 rounded-lg border border-white/30 hover:bg-white/10 text-white font-semibold transition-colors"
          >
            {{ t('browseAllServices') }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
