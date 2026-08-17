export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxtjs/supabase'],

  devtools: { enabled: false },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2025-01-01',

  ssr: false,

  nitro: {
    preset: 'vercel'
  },

  supabase: {
    url: 'https://mtqggkguwshvpdbiwbup.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10cWdna2d1d3NodnBkYml3YnVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY0NDc2OTgsImV4cCI6MjEwMjAyMzY5OH0.aMM3xSkpT7jHOrGZDcROtL1T5JGQcOrGa5ebruqAjMY',
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
      ]
    }
  }
})
