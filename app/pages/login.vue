<script setup lang="ts">
definePageMeta({ layout: 'default' })
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()
const toast = useToast()
const isLogin = ref(true)
const loading = ref(false)
const emailSent = ref(false)

const form = reactive({ email: '', password: '', name: '', phone: '' })

const submit = async () => {
  loading.value = true
  try {
    if (isLogin.value) {
      const { error } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password })
      if (error) throw error
      toast.add({ title: 'Welcome back! 👋', color: 'success' })
      router.push(form.email === 'kararzoe@gmail.com' ? '/admin' : '/dashboard')
    } else {
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { full_name: form.name, phone: form.phone } }
      })
      if (error) throw error
      emailSent.value = true
      toast.add({ title: 'Verification email sent! Check your inbox 📧', color: 'success' })
    }
  } catch (e: any) {
    toast.add({ title: e.message, color: 'error' })
  }
  loading.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-16">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <NuxtLink to="/" class="text-3xl font-black gradient-text">JosMKT</NuxtLink>
        <h1 class="text-2xl font-black mt-2 text-gray-900 dark:text-white">{{ isLogin ? 'Welcome Back' : 'Create Account' }}</h1>
        <p class="text-gray-500 text-sm mt-1">{{ isLogin ? 'Login to your account' : 'Join Jos Marketplace today' }}</p>
      </div>

        <!-- Email Sent Screen -->
        <UCard v-if="emailSent" class="shadow-xl text-center">
          <div class="py-6">
            <div class="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style="background: linear-gradient(135deg, rgba(34,197,94,0.15), rgba(20,184,166,0.15)); border: 1px solid rgba(34,197,94,0.25);">
              <UIcon name="i-lucide-mail-check" class="w-8 h-8 text-emerald-500" />
            </div>
            <h2 class="text-xl font-black text-gray-900 dark:text-white mb-2">Check your email</h2>
            <p class="text-gray-500 text-sm mb-1">We sent a verification link to</p>
            <p class="text-emerald-600 font-semibold text-sm mb-6">{{ form.email }}</p>
            <p class="text-gray-400 text-xs mb-6">Click the link in the email to verify your account, then come back to login.</p>
            <UButton color="primary" block @click="isLogin = true; emailSent = false">Go to Login</UButton>
          </div>
        </UCard>

        <UCard v-else class="shadow-xl">
          <form class="space-y-4" @submit.prevent="submit">
            <UFormField v-if="!isLogin" label="Full Name">
              <UInput v-model="form.name" placeholder="Your full name" icon="i-lucide-user" size="lg" class="w-full" required />
            </UFormField>
            <UFormField label="Email">
              <UInput v-model="form.email" type="email" placeholder="your@email.com" icon="i-lucide-mail" size="lg" class="w-full" required />
            </UFormField>
            <UFormField v-if="!isLogin" label="Phone">
              <UInput v-model="form.phone" placeholder="+234 900 000 0000" icon="i-lucide-phone" size="lg" class="w-full" />
            </UFormField>
            <UFormField label="Password">
              <UInput v-model="form.password" type="password" placeholder="••••••••" icon="i-lucide-lock" size="lg" class="w-full" required minlength="6" />
            </UFormField>

            <UButton type="submit" color="primary" size="lg" block :loading="loading" class="bg-gradient-to-r from-emerald-500 to-teal-500">
              {{ isLogin ? 'Login' : 'Create Account' }}
            </UButton>
          </form>

          <div class="mt-4 text-center space-y-2">
            <button class="text-emerald-600 hover:underline text-sm font-medium" @click="isLogin = !isLogin">
              {{ isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login' }}
            </button>
            <div v-if="isLogin">
              <NuxtLink to="/forgot-password" class="text-gray-400 hover:text-gray-600 text-xs block">Forgot password?</NuxtLink>
            </div>
          </div>
        </UCard>
    </div>
  </div>
</template>
