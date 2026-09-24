<script setup lang="ts">
const email = ref('')
const status = ref<'idle' | 'loading' | 'success'>('idle')
const supabase = useSupabaseClient()

const { t } = useLanguage()

const subscribe = async () => {
  if (!email.value) return
  status.value = 'loading'
  await supabase.from('newsletter').upsert({ email: email.value }).select()
  status.value = 'success'
  email.value = ''
}
</script>

<template>
  <section class="relative py-24 px-4 overflow-hidden" style="background: linear-gradient(135deg, #030a03 0%, #051a09 50%, #030a15 100%);">
    <!-- Decorations -->
    <div class="absolute top-0 left-0 right-0 h-px" style="background: linear-gradient(90deg, transparent, rgba(34,197,94,0.3), rgba(20,184,166,0.3), transparent);" />
    <div class="absolute bottom-0 left-0 right-0 h-px" style="background: linear-gradient(90deg, transparent, rgba(34,197,94,0.2), transparent);" />
    <div class="absolute top-0 left-1/4 w-64 h-64 bg-emerald-500/8 rounded-full blur-3xl animate-float" />
    <div class="absolute bottom-0 right-1/4 w-48 h-48 bg-teal-500/8 rounded-full blur-3xl animate-float" style="animation-delay: 2s" />
    <div class="absolute inset-0 opacity-[0.025]" style="background-image: radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px); background-size: 24px 24px;" />

    <div class="max-w-2xl mx-auto text-center relative z-10">
      <!-- Logo -->
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-8 mx-auto" style="background: linear-gradient(135deg, rgba(34,197,94,0.15), rgba(20,184,166,0.15)); border: 1px solid rgba(34,197,94,0.25); backdrop-filter: blur(12px);">
        <img src="/josmkt-logo-2.png" alt="JosMKT" class="w-10 h-10 object-contain" />
      </div>

      <!-- Badge -->
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-emerald-300 text-xs font-semibold mb-6" style="background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.2);">
        <div class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Newsletter
      </div>

      <h2 class="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">{{ t('newsletterTitle') }}</h2>
      <p class="text-gray-500 mb-10 max-w-md mx-auto text-sm leading-relaxed">{{ t('newsletterDesc') }}</p>

      <!-- Form -->
      <div class="max-w-md mx-auto">
        <div v-if="status === 'success'" class="flex items-center justify-center gap-3 py-5">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background: rgba(34,197,94,0.15); border: 1px solid rgba(34,197,94,0.3);">
            <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-emerald-400" />
          </div>
          <span class="text-emerald-400 font-semibold">{{ t('subscribedSuccess') }}</span>
        </div>

        <form v-else class="flex flex-col sm:flex-row gap-2.5" @submit.prevent="subscribe">
          <div class="flex-1 relative">
            <UIcon name="i-lucide-mail" class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 z-10" />
            <UInput
              v-model="email"
              type="email"
              required
              :placeholder="t('emailPlaceholder')"
              size="lg"
              class="w-full pl-10"
            />
          </div>
          <UButton
            type="submit"
            size="lg"
            :loading="status === 'loading'"
            class="font-bold transition-all hover:scale-105 flex-shrink-0"
            style="background: linear-gradient(135deg, #16a34a, #0d9488); box-shadow: 0 4px 15px rgba(22,163,74,0.4);"
          >
            <UIcon name="i-lucide-send" class="w-4 h-4 mr-2" />
            {{ t('subscribe') }}
          </UButton>
        </form>

        <p class="text-xs text-gray-600 mt-4 flex items-center justify-center gap-1.5">
          <UIcon name="i-lucide-shield-check" class="w-3.5 h-3.5 text-emerald-600" />
          {{ t('noSpam') }}
        </p>
      </div>
    </div>
  </section>
</template>
