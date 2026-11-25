<script setup lang="ts">
const showTop = ref(false)

const onScroll = () => { showTop.value = window.scrollY > 600 }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
</script>

<template>
  <ClientOnly>
    <div class="fixed bottom-5 right-5 flex flex-col items-end gap-3 z-40">
      <Transition name="fade-up">
        <button
          v-if="showTop"
          type="button"
          aria-label="Back to top"
          class="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 shadow-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          @click="scrollTop"
        >
          <UIcon name="i-lucide-arrow-up" class="w-4 h-4" />
        </button>
      </Transition>

      <a
        href="https://wa.me/2349043832380"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with JosMKT on WhatsApp"
        title="Chat on WhatsApp"
        class="w-12 h-12 rounded-full flex items-center justify-center text-white bg-[#25D366] hover:bg-[#1ebe5b] shadow-lg transition-colors"
      >
        <UIcon name="i-simple-icons-whatsapp" class="w-6 h-6" />
      </a>
    </div>
  </ClientOnly>
</template>

<style scoped>
.fade-up-enter-active, .fade-up-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.fade-up-enter-from, .fade-up-leave-to { opacity: 0; transform: translateY(8px); }
</style>
