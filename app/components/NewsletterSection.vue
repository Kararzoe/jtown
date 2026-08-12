<script setup lang="ts">
const email = ref('')
const status = ref<'idle' | 'loading' | 'success'>('idle')
const supabase = useSupabaseClient()

const subscribe = async () => {
  if (!email.value) return
  status.value = 'loading'
  await supabase.from('newsletter').upsert({ email: email.value }).select()
  status.value = 'success'
  email.value = ''
}
</script>

<template>
  <section class="py-20 px-4 bg-gradient-to-br from-gray-900 via-emerald-950 to-gray-900">
    <div class="max-w-4xl mx-auto text-center">
      <div class="w-16 h-16 rounded-2xl overflow-hidden mx-auto mb-6">
        <img src="/josmkt-logo-2.png" alt="JosMKT" class="w-full h-full object-contain" />
      </div>
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Stay Updated with JosMKT</h2>
      <p class="text-gray-400 mb-8 max-w-md mx-auto">Get weekly tips, new service providers, and exclusive deals delivered to your inbox.</p>

      <div class="max-w-md mx-auto">
        <div v-if="status === 'success'" class="flex items-center justify-center gap-2 text-emerald-400 py-4">
          <UIcon name="i-lucide-check-circle" class="w-5 h-5" />
          <span class="font-medium">Subscribed successfully!</span>
        </div>
        <form v-else class="flex flex-col sm:flex-row gap-2" @submit.prevent="subscribe">
          <UInput
            v-model="email"
            type="email"
            required
            placeholder="Enter your email address"
            size="lg"
            class="flex-1"
          />
          <UButton type="submit" color="primary" size="lg" icon="i-lucide-send" :loading="status === 'loading'">
            Subscribe
          </UButton>
        </form>
        <p class="text-xs text-gray-500 mt-3">Free forever. No spam. Unsubscribe anytime.</p>
      </div>
    </div>
  </section>
</template>
