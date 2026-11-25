<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const route = useRoute()
const router = useRouter()
const { t, currentLang, setLang } = useLanguage()

const isOpen = ref(false)
const searchOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref<{ inputRef?: HTMLInputElement } | null>(null)
const isAdmin = ref(false)
const scrolled = ref(false)

watch(user, async (u) => {
  if (!u) { isAdmin.value = false; return }
  const { data } = await supabase.from('profiles').select('role').eq('id', u.id).single()
  isAdmin.value = data?.role === 'admin'
}, { immediate: true })

const onScroll = () => { scrolled.value = window.scrollY > 8 }
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

// Close menus whenever the page changes
watch(() => route.fullPath, () => {
  isOpen.value = false
  searchOpen.value = false
})

const languages = [
  { label: 'English', short: 'EN', value: 'en' },
  { label: 'Hausa', short: 'HA', value: 'ha' },
  { label: 'Pidgin', short: 'PCM', value: 'pcm' },
] as const

const activeLang = computed(() => languages.find(l => l.value === currentLang.value) ?? languages[0])

const languageItems = computed(() => [languages.map(l => ({
  label: l.label,
  icon: l.value === currentLang.value ? 'i-lucide-check' : undefined,
  onSelect: () => setLang(l.value)
}))])

const toggleSearch = async () => {
  searchOpen.value = !searchOpen.value
  if (searchOpen.value) {
    await nextTick()
    searchInput.value?.inputRef?.focus()
  }
}

const handleSearch = () => {
  const q = searchQuery.value.trim()
  if (!q) return
  router.push(`/services?search=${encodeURIComponent(q)}`)
  searchQuery.value = ''
  searchOpen.value = false
}

const logout = async () => {
  isOpen.value = false
  await supabase.auth.signOut()
  router.push('/')
}

const navLinks = computed(() => [
  { label: t('home'), to: '/' },
  { label: t('services'), to: '/services' },
  { label: t('products'), to: '/products' },
  { label: t('trending'), to: '/trending' },
])

const isActive = (to: string) => to === '/' ? route.path === '/' : route.path.startsWith(to)

const accountLinks = computed(() => [
  { label: t('dashboard'), icon: 'i-lucide-layout-dashboard', to: '/dashboard' },
  { label: t('profile'), icon: 'i-lucide-user-round', to: '/profile' },
  { label: t('messages'), icon: 'i-lucide-message-square', to: '/chat' },
  { label: t('sellerDashboard'), icon: 'i-lucide-store', to: '/seller-dashboard' },
  { label: t('orders'), icon: 'i-lucide-package', to: '/orders' },
  { label: t('wishlist'), icon: 'i-lucide-heart', to: '/wishlist' },
  { label: t('compare'), icon: 'i-lucide-scale', to: '/compare' },
  { label: t('savedSearches'), icon: 'i-lucide-bookmark', to: '/saved-searches' },
  ...(isAdmin.value ? [{ label: t('adminDashboard'), icon: 'i-lucide-shield', to: '/admin' }] : []),
])

const userEmail = computed(() => user.value?.email ?? '')
const userInitial = computed(() => (user.value?.user_metadata?.full_name || userEmail.value || '?').charAt(0).toUpperCase())

const userMenuItems = computed(() => [
  [{ label: userEmail.value, type: 'label' as const }],
  accountLinks.value,
  [{ label: t('logout'), icon: 'i-lucide-log-out', color: 'error' as const, onSelect: logout }]
])
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-200"
    :class="scrolled
      ? 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-gray-200 dark:border-gray-800 shadow-[0_1px_12px_-6px_rgba(15,23,42,0.12)]'
      : 'bg-white dark:bg-gray-950 border-gray-100 dark:border-gray-900'"
  >
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main">
      <div class="flex items-center justify-between h-16 gap-4">

        <!-- Logo + links -->
        <div class="flex items-center gap-8 min-w-0">
          <NuxtLink to="/" class="flex-shrink-0" aria-label="JosMKT home">
            <img src="/josmkt-logo.png" alt="JosMKT" class="h-8 w-auto dark:hidden" >
            <img src="/josmkt-logo-2.png" alt="JosMKT" class="h-8 w-auto hidden dark:block" >
          </NuxtLink>

          <ul class="hidden lg:flex items-center gap-1">
            <li v-for="link in navLinks" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="relative inline-flex items-center h-16 px-3 text-sm font-medium transition-colors"
                :class="isActive(link.to)
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'"
              >
                {{ link.label }}
                <span
                  v-if="isActive(link.to)"
                  class="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-[var(--ui-primary)]"
                />
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-1">
          <UButton
            icon="i-lucide-search"
            variant="ghost"
            color="neutral"
            :aria-label="t('search')"
            :aria-expanded="searchOpen"
            @click="toggleSearch"
          />

          <ClientOnly>
            <UDropdownMenu :items="languageItems" :content="{ align: 'end' }">
              <UButton
                variant="ghost"
                color="neutral"
                icon="i-lucide-globe"
                class="hidden sm:inline-flex"
                :aria-label="t('language')"
              >
                <span class="text-xs font-semibold">{{ activeLang.short }}</span>
              </UButton>
            </UDropdownMenu>

            <UColorModeButton class="hidden sm:inline-flex" />
          </ClientOnly>

          <div class="hidden lg:flex items-center gap-2 ml-2 pl-3 border-l border-gray-200 dark:border-gray-800">
            <UDropdownMenu v-if="user" :items="userMenuItems" :content="{ align: 'end' }">
              <button
                type="button"
                class="w-9 h-9 rounded-full bg-ink-900 dark:bg-gray-800 text-white text-sm font-semibold flex items-center justify-center ring-2 ring-transparent hover:ring-gray-200 dark:hover:ring-gray-700 transition"
                aria-label="Account menu"
              >
                {{ userInitial }}
              </button>
            </UDropdownMenu>
            <UButton v-else to="/login" variant="ghost" color="neutral">
              {{ t('login') }}
            </UButton>

            <NuxtLink
              to="/become-seller"
              class="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-brand-orange hover:bg-brand-orange-dark text-white text-sm font-semibold transition-colors"
            >
              {{ t('registerYourBusiness') }}
            </NuxtLink>
          </div>

          <UButton
            class="lg:hidden"
            :icon="isOpen ? 'i-lucide-x' : 'i-lucide-menu'"
            variant="ghost"
            color="neutral"
            aria-label="Open menu"
            @click="isOpen = true"
          />
        </div>
      </div>

      <!-- Search bar -->
      <Transition name="slide-down">
        <form v-if="searchOpen" class="pb-4 flex gap-2" role="search" @submit.prevent="handleSearch">
          <UInput
            ref="searchInput"
            v-model="searchQuery"
            icon="i-lucide-search"
            :placeholder="t('searchPlaceholder')"
            size="lg"
            class="flex-1"
            @keydown.esc="searchOpen = false"
          />
          <UButton type="submit" size="lg">{{ t('search') }}</UButton>
        </form>
      </Transition>
    </nav>

    <!-- Mobile drawer -->
    <USlideover v-model:open="isOpen" side="right" title="Menu" :ui="{ content: 'max-w-xs' }">
      <template #body>
        <div class="flex flex-col gap-6">
          <ul class="flex flex-col">
            <li v-for="link in navLinks" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="flex items-center px-3 py-2.5 rounded-lg text-base font-medium transition-colors"
                :class="isActive(link.to)
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900'"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>

          <div v-if="user">
            <p class="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">{{ userEmail }}</p>
            <ul class="flex flex-col">
              <li v-for="item in accountLinks" :key="item.to">
                <NuxtLink
                  :to="item.to"
                  class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  <UIcon :name="item.icon" class="w-4 h-4 text-gray-400" />
                  {{ item.label }}
                </NuxtLink>
              </li>
              <li>
                <button
                  type="button"
                  class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                  @click="logout"
                >
                  <UIcon name="i-lucide-log-out" class="w-4 h-4" />
                  {{ t('logout') }}
                </button>
              </li>
            </ul>
          </div>

          <div class="border-t border-gray-100 dark:border-gray-800 pt-5">
            <p class="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">{{ t('language') }}</p>
            <div class="grid grid-cols-3 gap-1 p-1 rounded-lg bg-gray-100 dark:bg-gray-900">
              <button
                v-for="l in languages"
                :key="l.value"
                type="button"
                class="py-1.5 rounded-md text-sm font-medium transition-colors"
                :class="currentLang === l.value
                  ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'"
                @click="setLang(l.value)"
              >
                {{ l.label }}
              </button>
            </div>
            <div class="flex items-center justify-between px-3 mt-4">
              <span class="text-sm text-gray-600 dark:text-gray-300">{{ t('theme') }}</span>
              <ClientOnly><UColorModeSwitch /></ClientOnly>
            </div>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex flex-col gap-2 w-full">
          <NuxtLink
            to="/become-seller"
            class="flex items-center justify-center h-11 rounded-lg bg-brand-orange hover:bg-brand-orange-dark text-white text-sm font-semibold transition-colors"
          >
            {{ t('registerYourBusiness') }}
          </NuxtLink>
          <UButton v-if="!user" to="/login" variant="outline" color="neutral" size="lg" block>
            {{ t('login') }}
          </UButton>
        </div>
      </template>
    </USlideover>
  </header>
</template>

<style scoped>
.slide-down-enter-active, .slide-down-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.slide-down-enter-from, .slide-down-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
