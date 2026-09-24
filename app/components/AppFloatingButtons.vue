<script setup lang="ts">
const showTop = ref(false)

onMounted(() => {
  window.addEventListener('scroll', () => {
    showTop.value = window.scrollY > 300
  })
})

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
const openWhatsApp = () => window.open('https://wa.me/2349043832380', '_blank')
</script>

<template>
  <ClientOnly>
    <div class="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      <!-- Scroll to top -->
      <Transition name="fade-up">
        <button
          v-if="showTop"
          class="w-12 h-12 rounded-2xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 active:scale-95"
          style="background: linear-gradient(135deg, #16a34a, #0d9488); box-shadow: 0 4px 20px rgba(22,163,74,0.5); animation: pulse-glow 2s infinite;"
          @click="scrollTop"
        >
          <UIcon name="i-lucide-arrow-up" class="w-5 h-5" />
        </button>
      </Transition>

      <!-- WhatsApp -->
      <button
        class="w-12 h-12 rounded-2xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 active:scale-95 group relative"
        style="background: #25D366; box-shadow: 0 4px 20px rgba(37,211,102,0.5);"
        @click="openWhatsApp"
      >
        <UIcon name="i-lucide-message-circle" class="w-5 h-5" />
        <!-- Tooltip -->
        <span class="absolute right-full mr-3 bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0 pointer-events-none" style="box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
          Chat on WhatsApp
        </span>
      </button>
    </div>
  </ClientOnly>
</template>

<style scoped>
.fade-up-enter-active, .fade-up-leave-active { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.fade-up-enter-from, .fade-up-leave-to { opacity: 0; transform: translateY(12px); }
</style>
