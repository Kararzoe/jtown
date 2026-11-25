<script setup lang="ts">
definePageMeta({ layout: 'default' })
const supabase = useSupabaseClient()
const router = useRouter()
const toast = useToast()
const loading = ref(false)
const form = reactive({ email: '', password: '' })

const submit = async () => {
  loading.value = true
  try {
    const { error } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password })
    if (error) throw error
    if (form.email !== 'kararzoe@gmail.com') {
      await supabase.auth.signOut()
      throw new Error('Access denied. Admins only.')
    }
    toast.add({ title: 'Welcome, Admin 👋', color: 'success' })
    router.push('/admin')
  } catch (e: any) {
    toast.add({ title: e.message, color: 'error' })
  }
  loading.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gray-950 flex items-center justify-center px-4">
    <div class="w-full max-w-sm">
      <div class="text-center mb-8">
        <div class="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <UIcon name="i-lucide-shield" class="w-7 h-7 text-white" />
        </div>
        <h1 class="text-2xl font-black text-white">Admin Access</h1>
        <p class="text-gray-500 text-sm mt-1">JosMKT Control Panel</p>
      </div>

      <div class="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <form class="space-y-4" @submit.prevent="submit">
          <UFormField label="Email">
            <UInput v-model="form.email" type="email" placeholder="admin@email.com" icon="i-lucide-mail" size="lg" class="w-full" required />
          </UFormField>
          <UFormField label="Password">
            <UInput v-model="form.password" type="password" placeholder="••••••••" icon="i-lucide-lock" size="lg" class="w-full" required />
          </UFormField>
          <UButton type="submit" color="primary" size="lg" block :loading="loading">
            Login to Admin
          </UButton>
        </form>
        <div class="mt-4 text-center">
          <NuxtLink to="/login" class="text-gray-600 hover:text-gray-400 text-xs">Not admin? Go to regular login</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
