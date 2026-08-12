export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxtjs/supabase'],

  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2026-06-30',

  nitro: {
    preset: 'vercel'
  },

  supabase: {
    url: 'https://mtqggkguwshvpdbiwbup.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10cWdna2d1d3NodnBkYml3YnVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY0NDc2OTgsImV4cCI6MjEwMjAyMzY5OH0.aMM3xSkpT7jHOrGZDcROtL1T5JGQcOrGa5ebruqAjMY',
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
