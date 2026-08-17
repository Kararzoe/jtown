<script setup lang="ts">
definePageMeta({ layout: 'default' })
const supabase = useSupabaseClient()
const toast = useToast()
const email = ref('')
const loading = ref(false)
const sent = ref(false)

const submit = async () => {
  loading.value = true
  const { error } = await supabase.auth.resetPasswordForEmail(email.value, {
    redirectTo: 'https://josmkt.com.ng/reset-password'
  })
  if (error) {
    toast.add({ title: error.message, color: 'error' })
  } else {
    sent.value = true
  }
  loading.value = false
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="w-full max-w-md">
      <UCard class="shadow-xl p-2">
        <div v-if="sent" class="text-center py-4">
          <div class="text-5xl mb-4">📧</div>
          <h2 class="text-2xl font-black mb-2">Check Your Email</h2>
          <p class="text-gray-500 mb-6">We sent a password reset link to <strong>{{ email }}</strong></p>
          <UButton to="/login" color="primary" block>Back to Login</UButton>
        </div>
        <div v-else>
          <div class="text-center mb-6">
            <h1 class="text-2xl font-black text-gray-900 dark:text-white">Forgot Password</h1>
            <p class="text-gray-500 text-sm mt-1">Enter your email to reset your password</p>
          </div>
          <form class="space-y-4" @submit.prevent="submit">
            <UFormField label="Email">
              <UInput v-model="email" type="email" placeholder="your@email.com" icon="i-lucide-mail" size="lg" class="w-full" required />
            </UFormField>
            <UButton type="submit" color="primary" size="lg" block :loading="loading">Send Reset Link</UButton>
            <div class="text-center">
              <NuxtLink to="/login" class="text-sm text-emerald-600 hover:underline">Back to Login</NuxtLink>
            </div>
          </form>
        </div>
      </UCard>
    </div>
  </div>
</template>
