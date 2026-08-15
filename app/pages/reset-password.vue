<script setup lang="ts">
definePageMeta({ layout: 'default' })
const supabase = useSupabaseClient()
const router = useRouter()
const route = useRoute()
const toast = useToast()
const password = ref('')
const confirm = ref('')
const loading = ref(false)
const ready = ref(false)
const expired = ref(false)

onMounted(async () => {
  // PKCE: exchange code for session
  const code = route.query.code as string
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) { expired.value = true } else { ready.value = true }
    return
  }

  // Implicit flow: token in hash
  const hash = window.location.hash.substring(1)
  const params = new URLSearchParams(hash)
  const accessToken = params.get('access_token')
  const refreshToken = params.get('refresh_token')
  const type = params.get('type')
  if (accessToken && type === 'recovery') {
    const { error } = await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken || '' })
    if (error) { expired.value = true } else {
      ready.value = true
      window.history.replaceState(null, '', window.location.pathname)
    }
    return
  }

  // Fallback: already has active session (e.g. redirected from /confirm)
  const { data: { session } } = await supabase.auth.getSession()
  if (session) {
    ready.value = true
  } else {
    expired.value = true
  }
})

const submit = async () => {
  if (password.value !== confirm.value) {
    toast.add({ title: 'Passwords do not match', color: 'error' })
    return
  }
  loading.value = true
  const { error } = await supabase.auth.updateUser({ password: password.value })
  if (error) {
    toast.add({ title: error.message, color: 'error' })
  } else {
    toast.add({ title: 'Password updated! Please log in.', color: 'success' })
    await supabase.auth.signOut()
    router.push('/login')
  }
  loading.value = false
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="w-full max-w-md">

      <!-- Expired link -->
      <UCard v-if="expired" class="shadow-xl p-2 text-center">
        <div class="text-5xl mb-4">⏰</div>
        <h2 class="text-2xl font-black mb-2 text-red-500">Link Expired</h2>
        <p class="text-gray-500 mb-6">This reset link has expired. Please request a new one.</p>
        <UButton to="/forgot-password" color="primary" block>Request New Link</UButton>
      </UCard>

      <!-- Waiting for token -->
      <UCard v-else-if="!ready" class="shadow-xl p-2 text-center">
        <div class="text-5xl mb-4">🔐</div>
        <h2 class="text-2xl font-black mb-2">Verifying link...</h2>
        <p class="text-gray-500 mb-4">Please wait while we verify your reset link</p>
        <div class="flex justify-center">
          <div class="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </UCard>

      <!-- Reset form -->
      <UCard v-else class="shadow-xl p-2">
        <div class="text-center mb-6">
          <div class="text-4xl mb-3">🔑</div>
          <h1 class="text-2xl font-black text-gray-900 dark:text-white">Set New Password</h1>
          <p class="text-gray-500 text-sm mt-1">Choose a strong password for your account</p>
        </div>
        <form class="space-y-4" @submit.prevent="submit">
          <UFormField label="New Password">
            <UInput v-model="password" type="password" placeholder="Min 6 characters" icon="i-lucide-lock" size="lg" class="w-full" required minlength="6" />
          </UFormField>
          <UFormField label="Confirm Password">
            <UInput v-model="confirm" type="password" placeholder="Repeat password" icon="i-lucide-lock" size="lg" class="w-full" required />
          </UFormField>
          <UButton type="submit" color="primary" size="lg" block :loading="loading">Update Password</UButton>
        </form>
      </UCard>

    </div>
  </div>
</template>
