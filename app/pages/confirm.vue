<script setup lang="ts">
definePageMeta({ layout: 'default' })
const supabase = useSupabaseClient()
const route = useRoute()
const router = useRouter()
const toast = useToast()
const status = ref<'loading' | 'success' | 'error'>('loading')

onMounted(async () => {
  const code = route.query.code as string
  const type = route.query.type as string

  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    if (error || !data.session) { status.value = 'error'; return }
    status.value = 'success'
    toast.add({ title: 'Email verified! Welcome to JosMKT 🎉', color: 'success' })
    setTimeout(() => router.push('/dashboard'), 2000)
    return
  }

  // Session already set by @nuxtjs/supabase callback handler
  const { data: { session } } = await supabase.auth.getSession()
  if (session) {
    status.value = 'success'
    toast.add({ title: 'Email verified! Welcome to JosMKT 🎉', color: 'success' })
    setTimeout(() => router.push('/dashboard'), 2000)
    return
  }

  setTimeout(() => { if (status.value === 'loading') status.value = 'error' }, 4000)
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <UCard class="max-w-md w-full text-center p-8 shadow-xl">

      <div v-if="status === 'loading'">
        <div class="text-5xl mb-4">⏳</div>
        <h2 class="text-2xl font-black mb-2">Verifying your email...</h2>
        <p class="text-gray-500">Please wait a moment</p>
        <div class="mt-4 flex justify-center">
          <div class="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>

      <div v-else-if="status === 'success'">
        <div class="text-5xl mb-4">✅</div>
        <h2 class="text-2xl font-black mb-2 text-emerald-600">Email Verified!</h2>
        <p class="text-gray-500 mb-6">Your account is confirmed. Redirecting to dashboard...</p>
        <UButton to="/dashboard" color="primary" block>Go to Dashboard</UButton>
      </div>

      <div v-else>
        <div class="text-5xl mb-4">❌</div>
        <h2 class="text-2xl font-black mb-2 text-red-500">Verification Failed</h2>
        <p class="text-gray-500 mb-6">The link may have expired. Please try signing up again.</p>
        <UButton to="/login" color="primary" block>Back to Login</UButton>
      </div>

    </UCard>
  </div>
</template>
