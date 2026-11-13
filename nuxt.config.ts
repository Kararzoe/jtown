export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxtjs/supabase'],

  devtools: { enabled: false },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/josmkt-logo.png' },
        { rel: 'apple-touch-icon', href: '/josmkt-logo.png' }
      ],
      title: 'JosMKT — Jos Marketplace'
    }
  },

  compatibilityDate: '2025-01-01',

  ssr: false,

  nitro: {
    preset: 'vercel'
  },

  runtimeConfig: {
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
    public: {
      supabaseUrl: 'https://mtqggkguwshvpdbiwbup.supabase.co',
      mapboxToken: process.env.NUXT_PUBLIC_MAPBOX_TOKEN ?? ''
    }
  },
  supabase: {
    url: 'https://mtqggkguwshvpdbiwbup.supabase.co',
    key: process.env.NUXT_PUBLIC_SUPABASE_KEY ?? '',
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    cookieOptions: {
      secure: true
    },
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: [
        '/',
        '/login',
        '/confirm',
        '/forgot-password',
        '/reset-password',
        '/products',
        '/products/*',
        '/product/*',
        '/seller/*',
        '/category/*',
        '/services',
        '/services/*',
        '/become-seller',
        '/about',
        '/privacy',
        '/terms',
        '/contact',
        '/trending',
        '/provider/*',
        '/qr',
        '/admin',
        '/admin-login',
      ]
    }
  }
})
