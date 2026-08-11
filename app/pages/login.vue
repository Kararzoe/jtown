<script setup lang="ts">
definePageMeta({ layout: 'default' })
const supabase = useSupabaseClient()
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
      toast.add({ title: 'Welcome back!', color: 'success' })
      router.push('/dashboard')
    } else {
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { full_name: form.name, phone: form.phone } }
      })
      if (error) throw error
      toast.add({ title: 'Account created! Check your email.', color: 'success' })
    }
  } catch (e: any) {
    toast.add({ title: e.message, color: 'error' })
  }
  loading.value = false
}
</script>

<template>
  <div class="min-h-screen hero-gradient flex items-center justify-center px-4 py-16">
    <div class="w-full max-w-md">
      <div class="text-center mb-8 animate-fade-up">
        <h1 class="text-3xl font-black gradient-text mb-2">{{ isLogin ? 'Welcome Back' : 'Create Account' }}</h1>
        <p class="text-gray-600">{{ isLogin ? 'Login to your account' : 'Join Jos Marketplace today' }}</p>
      </div>

      <UCard class="animate-fade-up shadow-xl">
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
            <UInput v-model="form.password" type="password" placeholder="••••••••" icon="i-lucide-lock" size="lg" class="w-full" required />
          </UFormField>

          <UButton type="submit" color="primary" size="lg" block :loading="loading">
            {{ isLogin ? 'Login' : 'Create Account' }}
          </UButton>
        </form>

        <div class="mt-4 text-center">
          <button class="text-primary-600 hover:underline text-sm" @click="isLogin = !isLogin">
            {{ isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login' }}
          </button>
        </div>
      </UCard>
    </div>
  </div>
</template>
