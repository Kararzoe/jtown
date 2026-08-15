<script setup lang="ts">
definePageMeta({ layout: 'default' })
const supabase = useSupabaseClient()
const router = useRouter()
const toast = useToast()
const status = ref<'loading' | 'success' | 'error'>('loading')

onMounted(async () => {
  // If this is a password recovery, forward to reset-password with the code
  const route = useRoute()
  const code = route.query.code as string
  const type = route.query.type as string

  if (type === 'recovery' || (code && !type)) {
    // Try to detect recovery by exchanging code and checking session
    if (code) {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      if (!error && data.session) {
        // Check if this was a recovery session
        await supabase.auth.signOut()
        router.replace(`/reset-password?code=${code}`)
        return
      }
    }
    router.replace('/reset-password')
    return
  }

  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session) {
      subscription.unsubscribe()
      status.value = 'success'
      toast.add({ title: 'Email verified! Welcome to JosMKT 🎉', color: 'success' })
      setTimeout(() => router.push('/dashboard'), 2000)
    }
  })

  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) {
      status.value = 'success'
      toast.add({ title: 'Email verified! Welcome to JosMKT 🎉', color: 'success' })
      setTimeout(() => router.push('/dashboard'), 2000)
    } else {
      setTimeout(() => {
        if (status.value === 'loading') status.value = 'error'
      }, 5000)
    }
  })
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
