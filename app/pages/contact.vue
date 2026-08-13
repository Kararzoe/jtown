<script setup lang="ts">
const form = reactive({ name: '', email: '', message: '' })
const sent = ref(false)

const handleSubmit = () => {
  const text = `Name: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`
  navigateTo(`https://wa.me/2349043832380?text=${encodeURIComponent(text)}`, { external: true, open: { target: '_blank' } })
  sent.value = true
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Contact Us</h1>
      <p class="text-gray-500 dark:text-gray-400 mb-8">Have a question? Send us a message.</p>

      <div v-if="sent" class="text-center py-12">
        <div class="text-6xl mb-4">✅</div>
        <h2 class="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Message Sent!</h2>
        <p class="text-gray-500">We'll get back to you soon.</p>
        <UButton class="mt-6" color="primary" @click="sent = false">Send Another</UButton>
      </div>

      <form v-else class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm space-y-4" @submit.prevent="handleSubmit">
        <UInput v-model="form.name" required placeholder="Your name" size="lg" />
        <UInput v-model="form.email" type="email" required placeholder="Your email" size="lg" />
        <UTextarea v-model="form.message" required placeholder="Your message" :rows="5" size="lg" />
        <UButton type="submit" color="primary" size="lg" block icon="i-lucide-send">Send Message via WhatsApp</UButton>
      </form>

      <div class="mt-8 grid md:grid-cols-2 gap-4">
        <div class="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
          <UIcon name="i-lucide-phone" class="w-5 h-5 text-emerald-500" />
          <span class="text-gray-700 dark:text-gray-300">+234 904 383 2380</span>
        </div>
        <div class="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
          <UIcon name="i-lucide-map-pin" class="w-5 h-5 text-emerald-500" />
          <span class="text-gray-700 dark:text-gray-300">Jos, Plateau State, Nigeria</span>
        </div>
        <div class="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
          <UIcon name="i-lucide-mail" class="w-5 h-5 text-emerald-500" />
          <span class="text-gray-700 dark:text-gray-300">support@josmkt.com.ng</span>
        </div>
        <a href="https://wa.me/2349043832380" target="_blank" class="flex items-center gap-3 bg-green-50 dark:bg-green-900/20 p-4 rounded-xl shadow-sm hover:bg-green-100 dark:hover:bg-green-900/30 transition">
          <UIcon name="i-lucide-message-circle" class="w-5 h-5 text-green-500" />
          <span class="text-green-700 dark:text-green-400 font-medium">Chat on WhatsApp</span>
        </a>
      </div>
    </div>
  </div>
</template>
