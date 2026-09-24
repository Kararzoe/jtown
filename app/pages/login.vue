<script setup lang="ts">
definePageMeta({ layout: 'default' })
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()
const toast = useToast()
const isLogin = ref(true)
const loading = ref(false)

const form = reactive({ email: '', password: '', name: '', phone: '' })

const submit = async () => {
  loading.value = true
  try {
    if (isLogin.value) {
      const { error } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password })
      if (error) throw error
      toast.add({ title: 'Welcome back! 👋', color: 'success' })
      router.push('/dashboard')
    } else {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { full_name: form.name, phone: form.phone } }
      })
      if (error) throw error
      if (data.session) {
        toast.add({ title: 'Account created! Welcome to JosMKT 🎉', color: 'success' })
        router.push('/dashboard')
      } else {
        toast.add({ title: 'Check your email to confirm your account', color: 'info' })
      }
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

        <UCard class="shadow-xl">
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
