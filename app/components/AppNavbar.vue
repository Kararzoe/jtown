<script setup lang="ts">
const supabase = useSupabaseClient()
const { auth } = supabase
const user = useSupabaseUser()
const router = useRouter()
const isOpen = ref(false)
const searchOpen = ref(false)
const searchQuery = ref('')
const { t, currentLang, setLang } = useLanguage()
const isAdmin = ref(false)
const scrolled = ref(false)

watch(user, async (u) => {
  if (!u) { isAdmin.value = false; return }
  const { data } = await supabase.from('profiles').select('role').eq('id', u.id).single()
  isAdmin.value = data?.role === 'admin'
}, { immediate: true })

onMounted(() => {
  window.addEventListener('scroll', () => {
    scrolled.value = window.scrollY > 20
  })
})

const languages = [
  { label: 'English', value: 'en', flag: '🇬🇧' },
  { label: 'Hausa', value: 'ha', flag: '🇳🇬' },
  { label: 'Pidgin', value: 'pcm', flag: '🇳🇬' },
]

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push(`/products?search=${encodeURIComponent(searchQuery.value)}`)
    searchOpen.value = false
  }
}

const logout = async () => {
  await supabase.auth.signOut()
  router.push('/')
}

const navLinks = computed(() => [
  { label: t('home'), to: '/' },
  { label: t('products'), to: '/products' },
  { label: t('services'), to: '/services' },
  { label: t('trending'), to: '/trending' },
])

const userMenuItems = computed(() => [[
  { label: t('dashboard'), icon: 'i-lucide-layout-dashboard', to: '/dashboard' },
  { label: t('profile'), icon: 'i-lucide-user-circle', to: '/profile' },
  { label: t('messages'), icon: 'i-lucide-message-square', to: '/chat' },
  { label: t('sellerDashboard'), icon: 'i-lucide-store', to: '/seller-dashboard' },
  { label: t('orders'), icon: 'i-lucide-package', to: '/orders' },
  { label: t('wishlist'), icon: 'i-lucide-heart', to: '/wishlist' },
  { label: t('compare'), icon: 'i-lucide-scale', to: '/compare' },
  { label: t('savedSearches'), icon: 'i-lucide-bookmark', to: '/saved-searches' },
  ...(isAdmin.value ? [{ label: t('adminDashboard'), icon: 'i-lucide-shield', to: '/admin' }] : []),
  { label: t('logout'), icon: 'i-lucide-log-out', onSelect: logout }
]])
</script>

<template>
  <nav
    class="sticky top-0 z-50 transition-all duration-300"
    :class="scrolled
      ? 'glass border-b border-gray-200/40 dark:border-white/5 shadow-sm'
      : 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-b border-gray-100 dark:border-gray-900'"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">

        <!-- Logo -->
        <NuxtLink to="/" class="flex-shrink-0 group">
          <img src="/josmkt-logo.png" alt="Jos Marketplace" class="h-9 w-auto dark:hidden transition-transform group-hover:scale-105 duration-200" />
          <img src="/josmkt-logo-2.png" alt="Jos Marketplace" class="h-9 w-auto hidden dark:block transition-transform group-hover:scale-105 duration-200" />
        </NuxtLink>

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center gap-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="relative px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl transition-all duration-200 group"
            active-class="text-emerald-600 dark:text-emerald-400"
          >
            {{ link.label }}
            <span class="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 rounded-full bg-emerald-500 group-hover:w-1/2 transition-all duration-300" />
          </NuxtLink>
        </div>

        <!-- Right section -->
        <div class="flex items-center gap-1 md:gap-2">

          <!-- Sell CTA (desktop) -->
          <NuxtLink
            to="/become-seller"
            class="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-sm font-bold transition-all duration-200 hover:scale-105 hover:shadow-lg"
            style="background: linear-gradient(135deg, #16a34a, #0d9488); box-shadow: 0 4px 12px rgba(22,163,74,0.3);"
          >
            <UIcon name="i-lucide-store" class="w-3.5 h-3.5" />
            {{ t('sell') }}
          </NuxtLink>

          <!-- Search -->
          <UButton
            icon="i-lucide-search"
            variant="ghost"
            color="neutral"
            class="rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            @click="searchOpen = !searchOpen"
          />

          <!-- Language Selector -->
          <ClientOnly>
            <UDropdownMenu :items="[[
              { label: '🇬🇧 English', onSelect: () => setLang('en') },
              { label: '🇳🇬 Hausa', onSelect: () => setLang('ha') },
              { label: '🇳🇬 Pidgin', onSelect: () => setLang('pcm') },
            ]]">
              <UButton variant="ghost" color="neutral" size="sm" class="rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                {{ languages.find(l => l.value === currentLang)?.flag }}
                <span class="hidden lg:inline ml-1 text-xs font-medium">{{ languages.find(l => l.value === currentLang)?.label }}</span>
              </UButton>
            </UDropdownMenu>
          </ClientOnly>

          <!-- Dark Mode -->
          <ClientOnly>
            <UColorModeButton class="rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" />
          </ClientOnly>

          <!-- User -->
          <div v-if="user" class="hidden md:block">
            <UDropdownMenu :items="userMenuItems">
              <button class="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105" style="background: linear-gradient(135deg, rgba(34,197,94,0.15), rgba(20,184,166,0.15)); border: 1px solid rgba(34,197,94,0.2);">
                <UIcon name="i-lucide-user-circle" class="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </button>
            </UDropdownMenu>
          </div>
          <UButton v-else class="hidden md:flex" to="/login" size="sm" class="rounded-xl font-semibold" variant="outline" color="primary">{{ t('login') }}</UButton>

          <!-- Mobile Menu Button -->
          <button
            class="md:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:bg-gray-100 dark:hover:bg-gray-800"
            @click="isOpen = !isOpen"
          >
            <UIcon :name="isOpen ? 'i-lucide-x' : 'i-lucide-menu'" class="w-5 h-5 text-gray-600 dark:text-gray-400 transition-all" />
          </button>
        </div>
      </div>

      <!-- Search Bar -->
      <Transition name="slide-down">
        <div v-if="searchOpen" class="pb-4">
          <div class="relative flex items-center gap-2 p-1.5 rounded-2xl" style="background: rgba(0,0,0,0.03); border: 1px solid rgba(0,0,0,0.07);">
            <UIcon name="i-lucide-search" class="w-4 h-4 text-gray-400 ml-3 flex-shrink-0" />
            <UInput
              v-model="searchQuery"
              :placeholder="t('searchPlaceholderNav')"
              size="md"
              class="flex-1 border-0 bg-transparent focus:ring-0"
              @keyup.enter="handleSearch"
            />
            <UButton size="sm" color="primary" class="rounded-xl font-semibold" @click="handleSearch">
              Search
            </UButton>
          </div>
        </div>
      </Transition>

      <!-- Mobile Menu -->
      <Transition name="slide-down">
        <div v-if="isOpen" class="md:hidden pb-5 border-t border-gray-100 dark:border-gray-800/50 pt-4">
          <div class="flex flex-col gap-1">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              class="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all"
              @click="isOpen = false"
            >
              {{ link.label }}
            </NuxtLink>

            <div class="h-px bg-gray-100 dark:bg-gray-800 my-2" />

            <template v-if="user">
              <NuxtLink to="/dashboard" class="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all" @click="isOpen = false">{{ t('dashboard') }}</NuxtLink>
              <NuxtLink to="/profile" class="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all" @click="isOpen = false">{{ t('profile') }}</NuxtLink>
              <NuxtLink to="/seller-dashboard" class="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all" @click="isOpen = false">{{ t('sellerDashboard') }}</NuxtLink>
              <NuxtLink to="/orders" class="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all" @click="isOpen = false">{{ t('orders') }}</NuxtLink>
              <NuxtLink to="/wishlist" class="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all" @click="isOpen = false">{{ t('wishlist') }}</NuxtLink>
              <NuxtLink v-if="isAdmin" to="/admin" class="px-4 py-2.5 rounded-xl text-sm font-semibold text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/20 transition-all" @click="isOpen = false">{{ t('adminDashboard') }}</NuxtLink>
              <button class="text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all" @click="logout">{{ t('logout') }}</button>
            </template>
            <NuxtLink v-else to="/login" class="px-4 py-2.5 rounded-xl text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-all" @click="isOpen = false">{{ t('login') }}</NuxtLink>

            <div class="h-px bg-gray-100 dark:bg-gray-800 my-2" />

            <div class="flex items-center gap-3 px-3 py-2">
              <ClientOnly><UColorModeButton /></ClientOnly>
            </div>

            <NuxtLink
              to="/become-seller"
              class="mx-1 mt-1 px-4 py-3 rounded-xl text-white font-bold text-sm text-center transition-all hover:scale-[1.02]"
              style="background: linear-gradient(135deg, #16a34a, #0d9488);"
              @click="isOpen = false"
            >
              🚀 {{ t('sell') }}
            </NuxtLink>
          </div>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<style scoped>
.slide-down-enter-active, .slide-down-leave-active { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-down-enter-from, .slide-down-leave-to { opacity: 0; transform: translateY(-12px); }
</style>
