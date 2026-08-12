<script setup lang="ts">
definePageMeta({ layout: 'default' })
const supabase = useSupabaseClient()
const router = useRouter()
const toast = useToast()
const password = ref('')
const confirm = ref('')
const loading = ref(false)

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
    toast.add({ title: 'Password updated successfully!', color: 'success' })
    router.push('/dashboard')
  }
  loading.value = false
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="w-full max-w-md">
      <UCard class="shadow-xl p-2">
        <div class="text-center mb-6">
          <h1 class="text-2xl font-black text-gray-900 dark:text-white">Reset Password</h1>
          <p class="text-gray-500 text-sm mt-1">Enter your new password</p>
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
