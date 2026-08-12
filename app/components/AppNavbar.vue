<script setup lang="ts">
const { auth } = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()
const isOpen = ref(false)
const searchOpen = ref(false)
const searchQuery = ref('')
const { currentLang, setLang } = useLanguage()

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
  await auth.signOut()
  router.push('/')
}

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Categories', to: '/#categories' },
]
</script>

<template>
  <nav class="sticky top-0 z-50 glass border-b border-gray-200/50 dark:border-gray-800/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-14 md:h-16">

        <!-- Logo -->
        <NuxtLink to="/" class="flex flex-col">
          <span class="text-xl md:text-2xl font-black gradient-text leading-none">Jos Marketplace</span>
          <span class="text-xs text-gray-400 hidden md:block">Powered by Plero Digitals</span>
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
            Sell Now
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
            <UDropdownMenu :items="[[
              { label: 'Dashboard', icon: 'i-lucide-layout-dashboard', to: '/dashboard' },
              { label: 'Profile', icon: 'i-lucide-user-circle', to: '/profile' },
              { label: 'Seller Dashboard', icon: 'i-lucide-store', to: '/seller-dashboard' },
              { label: 'Orders', icon: 'i-lucide-package', to: '/orders' },
              { label: 'Wishlist', icon: 'i-lucide-heart', to: '/wishlist' },
              { label: 'Compare', icon: 'i-lucide-scale', to: '/compare' },
              { label: 'Saved Searches', icon: 'i-lucide-bookmark', to: '/saved-searches' },
              { label: 'Admin Dashboard', icon: 'i-lucide-shield', to: '/admin' },
              { label: 'Logout', icon: 'i-lucide-log-out', onSelect: logout }
            ]]">
              <UButton variant="ghost" color="neutral" icon="i-lucide-user-circle" />
            </UDropdownMenu>
          </div>
          <UButton v-else class="hidden md:flex" to="/login" variant="outline" color="primary" size="sm">Login</UButton>

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
              placeholder="Search products, categories..."
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
              <NuxtLink to="/admin" class="text-gray-700 dark:text-gray-300 font-medium px-2 py-1" @click="isOpen = false">Admin Dashboard</NuxtLink>
              <button class="text-left text-red-500 font-medium px-2 py-1" @click="logout">Logout</button>
            </template>
            <NuxtLink v-else to="/login" class="text-gray-700 dark:text-gray-300 font-medium px-2 py-1" @click="isOpen = false">Login</NuxtLink>
            <div class="flex items-center gap-3 px-2 pt-2 border-t border-gray-100 dark:border-gray-800">
              <ClientOnly><UColorModeButton /></ClientOnly>
            </div>
            <NuxtLink to="/become-seller" class="mx-2 px-4 py-2 bg-primary-600 text-white rounded-xl font-semibold text-center" @click="isOpen = false">
              Sell Now
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
