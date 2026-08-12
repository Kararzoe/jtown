<script setup lang="ts">
const route = useRoute()
const provider = ref<any>(null)
const loading = ref(true)
const selectedImage = ref<string | null>(null)

const API = 'https://jos-backend.onrender.com/api'

onMounted(async () => {
  try {
    const data = await $fetch<any>(`${API}/services/${route.params.id}`)
    if (data?._id) provider.value = data
  } catch {}
  loading.value = false
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
    </div>

    <div v-else-if="!provider" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="text-6xl mb-4">😕</div>
        <p class="text-gray-500 text-lg">Provider not found</p>
        <UButton to="/services" class="mt-4" color="primary">Browse Services</UButton>
      </div>
    </div>

    <div v-else>
      <!-- Hero Banner -->
      <div class="relative h-48 md:h-64 bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500">
        <div class="absolute inset-0 bg-black/20" />
        <div class="max-w-5xl mx-auto px-4 h-full flex items-start pt-4 relative z-10">
          <button class="flex items-center gap-2 text-white/80 hover:text-white transition" @click="$router.back()">
            <UIcon name="i-lucide-arrow-left" class="w-5 h-5" /> Back
          </button>
        </div>
      </div>

      <!-- Profile Card -->
      <div class="max-w-5xl mx-auto px-4 -mt-16 relative z-10 pb-10">
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-xl mb-6">
          <div class="flex flex-col md:flex-row gap-6">
            <div class="flex-shrink-0">
              <img v-if="provider.image" :src="provider.image" :alt="provider.serviceName" class="w-28 h-28 md:w-36 md:h-36 rounded-2xl object-cover border-4 border-white shadow-lg" />
              <div v-else class="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40 flex items-center justify-center text-emerald-600 font-bold text-4xl border-4 border-white shadow-lg">
                {{ provider.serviceName?.charAt(0) }}
              </div>
            </div>

            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{{ provider.serviceName }}</h1>
                <UIcon name="i-lucide-check-circle" class="w-6 h-6 text-emerald-500" />
              </div>
              <p class="text-gray-500 capitalize mb-4">{{ provider.category?.replace(/-/g, ' ') }}</p>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                <div class="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <UIcon name="i-lucide-map-pin" class="w-5 h-5 text-emerald-500" />
                  <span>{{ provider.location }}</span>
                </div>
                <div v-if="provider.experience" class="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <UIcon name="i-lucide-clock" class="w-5 h-5 text-emerald-500" />
                  <span>{{ provider.experience }} experience</span>
                </div>
                <div v-if="provider.priceRange" class="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span class="text-emerald-500 font-bold">₦</span>
                  <span>{{ provider.priceRange }}</span>
                </div>
                <div v-if="provider.rating > 0" class="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <UIcon name="i-lucide-star" class="w-5 h-5 text-yellow-400" />
                  <span>{{ provider.rating }} ({{ provider.totalReviews }} reviews)</span>
                </div>
              </div>

              <div class="flex gap-3">
                <a :href="`tel:${provider.phone}`" class="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition">
                  <UIcon name="i-lucide-phone" class="w-5 h-5" /> Call Now
                </a>
                <a :href="`https://wa.me/${provider.phone?.replace(/[^0-9]/g, '')}?text=Hi, I found you on JosMKT. I need your ${provider.serviceName} service.`" target="_blank" class="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition">
                  <UIcon name="i-lucide-message-circle" class="w-5 h-5" /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- About -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm mb-6">
          <h2 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">About</h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">{{ provider.description }}</p>
        </div>

        <!-- Gallery -->
        <div v-if="provider.gallery?.length" class="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm mb-6">
          <h2 class="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
            <UIcon name="i-lucide-image" class="w-5 h-5" /> Gallery
          </h2>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <img
              v-for="(img, idx) in provider.gallery"
              :key="idx"
              :src="img"
              :alt="`Work ${idx + 1}`"
              class="w-full h-40 object-cover rounded-xl border border-gray-200 dark:border-gray-700 hover:border-emerald-300 transition cursor-pointer hover:scale-105"
              @click="selectedImage = img"
            />
          </div>
        </div>

        <!-- CTA -->
        <div class="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 md:p-8 shadow-sm text-white">
          <h2 class="text-xl font-bold mb-2">Need this service?</h2>
          <p class="text-emerald-100 mb-4">Contact {{ provider.serviceName }} directly and get started today.</p>
          <div class="flex flex-wrap gap-3">
            <a :href="`tel:${provider.phone}`" class="px-5 py-2.5 bg-white text-emerald-600 rounded-xl font-semibold hover:bg-emerald-50 transition flex items-center gap-2">
              <UIcon name="i-lucide-phone" class="w-4 h-4" /> {{ provider.phone }}
            </a>
            <a :href="`https://wa.me/${provider.phone?.replace(/[^0-9]/g, '')}?text=Hi, I need your service.`" target="_blank" class="px-5 py-2.5 bg-white/20 text-white border border-white/30 rounded-xl font-semibold hover:bg-white/30 transition flex items-center gap-2">
              <UIcon name="i-lucide-message-circle" class="w-4 h-4" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <div v-if="selectedImage" class="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4" @click="selectedImage = null">
      <img :src="selectedImage" alt="Gallery" class="max-w-full max-h-[90vh] rounded-xl" />
    </div>
  </div>
</template>
