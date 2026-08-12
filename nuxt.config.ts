export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxtjs/supabase'],

  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2026-06-30',

  nitro: {
    preset: 'vercel'
  },

  runtimeConfig: {
    public: {
      supabase: {
        url: process.env.NUXT_PUBLIC_SUPABASE_URL || '',
        key: process.env.NUXT_PUBLIC_SUPABASE_KEY || '',
      }
    }
  },

  supabase: {
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
      ]
    }
  }
})
