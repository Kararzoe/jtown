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

watch(user, async (u) => {
  if (!u) { isAdmin.value = false; return }
  const { data } = await supabase.from('profiles').select('role').eq('id', u.id).single()
  isAdmin.value = data?.role === 'admin'
}, { immediate: true })

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
  <nav class="sticky top-0 z-50 glass border-b border-gray-200/50 dark:border-gray-800/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-14 md:h-16">

        <!-- Logo -->
        <NuxtLink to="/">
          <img src="/josmkt-logo.png" alt="Jos Marketplace" class="h-8 md:h-10 w-auto dark:hidden" />
          <img src="/josmkt-logo-2.png" alt="Jos Marketplace" class="h-8 md:h-10 w-auto hidden dark:block" />
        </NuxtLink>

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center gap-8">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="text-gray-600 hover:text-primary-600 font-medium transition-colors relative group"
          >
            {{ link.label }}
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300" />
          </NuxtLink>
          <NuxtLink to="/become-seller" class="px-4 py-2 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all hover:scale-105">
            {{ t('sell') }}
          </NuxtLink>
        </div>

        <!-- Right Icons -->
        <div class="flex items-center gap-1 md:gap-2">
          <!-- Search -->
          <UButton icon="i-lucide-search" variant="ghost" color="neutral" @click="searchOpen = !searchOpen" />

          <!-- Language Selector -->
          <ClientOnly>
            <UDropdownMenu :items="[[
              { label: '🇬🇧 English', onSelect: () => setLang('en') },
              { label: '🇳🇬 Hausa', onSelect: () => setLang('ha') },
              { label: '🇳🇬 Pidgin', onSelect: () => setLang('pcm') },
            ]]">
              <UButton variant="ghost" color="neutral" size="sm">
                {{ languages.find(l => l.value === currentLang)?.flag }}
                <span class="hidden md:inline ml-1 text-xs">{{ languages.find(l => l.value === currentLang)?.label }}</span>
              </UButton>
            </UDropdownMenu>
          </ClientOnly>

          <!-- Dark Mode -->
          <ClientOnly>
            <UColorModeButton />
          </ClientOnly>

          <!-- User -->
          <div v-if="user" class="hidden md:block">
            <UDropdownMenu :items="userMenuItems">
              <UButton variant="ghost" color="neutral" icon="i-lucide-user-circle" />
            </UDropdownMenu>
          </div>
          <UButton v-else class="hidden md:flex" to="/login" variant="outline" color="primary" size="sm">{{ t('login') }}</UButton>

          <!-- Mobile Menu -->
          <UButton class="md:hidden" icon="i-lucide-menu" variant="ghost" color="neutral" @click="isOpen = !isOpen" />
        </div>
      </div>

      <!-- Search Bar -->
      <Transition name="slide-down">
        <div v-if="searchOpen" class="pb-3">
          <div class="relative">
            <UInput
              v-model="searchQuery"
              :placeholder="t('searchPlaceholderNav')"
              icon="i-lucide-search"
              size="lg"
              class="w-full"
              @keyup.enter="handleSearch"
            />
            <UButton class="absolute right-2 top-1/2 -translate-y-1/2" size="sm" color="primary" @click="handleSearch">
              Search
            </UButton>
          </div>
        </div>
      </Transition>

      <!-- Mobile Menu -->
      <Transition name="slide-down">
        <div v-if="isOpen" class="md:hidden pb-4 border-t border-gray-100 dark:border-gray-800 pt-3">
          <div class="flex flex-col gap-3">
            <NuxtLink v-for="link in navLinks" :key="link.to" :to="link.to" class="text-gray-700 dark:text-gray-300 font-medium px-2 py-1" @click="isOpen = false">
              {{ link.label }}
            </NuxtLink>
            <template v-if="user">
              <NuxtLink to="/dashboard" class="text-gray-700 dark:text-gray-300 font-medium px-2 py-1" @click="isOpen = false">Dashboard</NuxtLink>
              <NuxtLink to="/profile" class="text-gray-700 dark:text-gray-300 font-medium px-2 py-1" @click="isOpen = false">Profile</NuxtLink>
              <NuxtLink to="/seller-dashboard" class="text-gray-700 dark:text-gray-300 font-medium px-2 py-1" @click="isOpen = false">Seller Dashboard</NuxtLink>
              <NuxtLink to="/orders" class="text-gray-700 dark:text-gray-300 font-medium px-2 py-1" @click="isOpen = false">Orders</NuxtLink>
              <NuxtLink to="/wishlist" class="text-gray-700 dark:text-gray-300 font-medium px-2 py-1" @click="isOpen = false">Wishlist</NuxtLink>
              <NuxtLink to="/compare" class="text-gray-700 dark:text-gray-300 font-medium px-2 py-1" @click="isOpen = false">Compare</NuxtLink>
              <NuxtLink to="/saved-searches" class="text-gray-700 dark:text-gray-300 font-medium px-2 py-1" @click="isOpen = false">Saved Searches</NuxtLink>
              <NuxtLink v-if="isAdmin" to="/admin" class="text-gray-700 dark:text-gray-300 font-medium px-2 py-1" @click="isOpen = false">Admin Dashboard</NuxtLink>
              <button class="text-left text-red-500 font-medium px-2 py-1" @click="logout">{{ t('logout') }}</button>
            </template>
            <NuxtLink v-else to="/login" class="text-gray-700 dark:text-gray-300 font-medium px-2 py-1" @click="isOpen = false">{{ t('login') }}</NuxtLink>
            <div class="flex items-center gap-3 px-2 pt-2 border-t border-gray-100 dark:border-gray-800">
              <ClientOnly><UColorModeButton /></ClientOnly>
            </div>
            <NuxtLink to="/become-seller" class="mx-2 px-4 py-2 bg-primary-600 text-white rounded-xl font-semibold text-center" @click="isOpen = false">
              {{ t('sell') }}
            </NuxtLink>
          </div>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<style scoped>
.slide-down-enter-active, .slide-down-leave-active { transition: all 0.3s ease; }
.slide-down-enter-from, .slide-down-leave-to { opacity: 0; transform: translateY(-10px); }
</style>
