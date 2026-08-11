<script setup lang="ts">
const showTop = ref(false)

onMounted(() => {
  window.addEventListener('scroll', () => {
    showTop.value = window.scrollY > 300
  })
})

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
</script>

<template>
  <div class="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
    <Transition name="fade">
      <UButton v-if="showTop" icon="i-lucide-arrow-up" color="primary" class="rounded-full shadow-lg animate-pulse-glow" @click="scrollTop" />
    </Transition>
    <UButton
      icon="i-lucide-message-circle"
      color="success"
      class="rounded-full shadow-lg"
      @click="() => window.open('https://wa.me/2349043832380', '_blank')"
    />
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
