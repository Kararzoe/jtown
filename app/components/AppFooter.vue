<script setup lang="ts">
const { t } = useLanguage()
const { findCategory } = useCategories()

const year = new Date().getFullYear()

const serviceLinks = computed(() =>
  ['plumbing', 'electrical', 'mechanic', 'tech', 'fashion-design', 'laundry']
    .flatMap(slug => findCategory(slug) ?? [])
)

const companyLinks = computed(() => [
  { to: '/about', label: t('aboutUs') },
  { to: '/contact', label: t('contact') },
  { to: '/trending', label: t('trending') },
  { to: '/become-seller', label: t('becomeSeller') },
])

const socials = [
  { href: 'https://facebook.com/josmarketplace', icon: 'i-simple-icons-facebook', label: 'Facebook' },
  { href: 'https://twitter.com/josMKTPlace', icon: 'i-simple-icons-x', label: 'X (Twitter)' },
  { href: 'https://instagram.com/josmarketplace_', icon: 'i-simple-icons-instagram', label: 'Instagram' },
  { href: 'https://whatsapp.com/channel/0029Vb8A5EOHAdNUqjm3mC33', icon: 'i-simple-icons-whatsapp', label: 'WhatsApp channel' },
]
</script>

<template>
  <footer class="bg-ink-950 text-ink-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
      <div class="grid grid-cols-2 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">

        <div class="col-span-2 md:col-span-4">
          <img src="/josmkt-logo-2.png" alt="JosMKT" class="h-9 w-auto" >
          <p class="mt-5 text-sm leading-relaxed max-w-xs">{{ t('footerDesc') }}</p>
          <div class="mt-6 flex gap-2">
            <a
              v-for="s in socials"
              :key="s.href"
              :href="s.href"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="s.label"
              class="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-ink-200 hover:text-white hover:border-white/30 transition-colors"
            >
              <UIcon :name="s.icon" class="w-4 h-4" />
            </a>
          </div>
        </div>

        <div class="md:col-span-2 md:col-start-6">
          <h4 class="text-sm font-semibold text-white mb-4">{{ t('services') }}</h4>
          <ul class="space-y-3 text-sm">
            <li v-for="cat in serviceLinks" :key="cat.slug">
              <NuxtLink :to="`/services?category=${cat.slug}`" class="hover:text-white transition-colors">{{ cat.label }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div class="md:col-span-2">
          <h4 class="text-sm font-semibold text-white mb-4">{{ t('company') }}</h4>
          <ul class="space-y-3 text-sm">
            <li v-for="link in companyLinks" :key="link.to">
              <NuxtLink :to="link.to" class="hover:text-white transition-colors">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div class="col-span-2 md:col-span-3">
          <h4 class="text-sm font-semibold text-white mb-4">{{ t('contactUs') }}</h4>
          <ul class="space-y-3 text-sm">
            <li>
              <a href="mailto:josmktforyou@gmail.com" class="flex items-center gap-3 hover:text-white transition-colors">
                <UIcon name="i-lucide-mail" class="w-4 h-4 flex-shrink-0" />
                josmktforyou@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+2349043832380" class="flex items-center gap-3 hover:text-white transition-colors">
                <UIcon name="i-lucide-phone" class="w-4 h-4 flex-shrink-0" />
                +234 904 383 2380
              </a>
            </li>
            <li class="flex items-center gap-3">
              <UIcon name="i-lucide-map-pin" class="w-4 h-4 flex-shrink-0" />
              Jos, Plateau State, Nigeria
            </li>
          </ul>
        </div>
      </div>

      <div class="pt-8 flex flex-col md:flex-row justify-between gap-4 text-xs text-ink-200/70">
        <p>© {{ year }} JosMKT. {{ t('allRightsReserved') }}</p>
        <div class="flex flex-wrap gap-x-6 gap-y-2">
          <NuxtLink to="/privacy" class="hover:text-white transition-colors">{{ t('privacy') }}</NuxtLink>
          <NuxtLink to="/terms" class="hover:text-white transition-colors">{{ t('terms') }}</NuxtLink>
          <span>{{ t('poweredBy') }} Plero Digitals</span>
        </div>
      </div>
    </div>
  </footer>
</template>
