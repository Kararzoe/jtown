<script setup lang="ts">
definePageMeta({ layout: 'default' })
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const toast = useToast()
const loading = ref(false)
const uploading = ref(false)
const avatarFile = ref<File | null>(null)
const avatarPreview = ref('')

const form = reactive({
  full_name: '',
  phone: '',
  address: '',
  bio: '',
  avatar_url: '',
  whatsapp: '',
})

onMounted(async () => {
  const { data } = await supabase.from('profiles').select('*').eq('id', user.value?.id).single()
  if (data) Object.assign(form, data)
  avatarPreview.value = form.avatar_url
})

const onFileChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  avatarFile.value = file
  avatarPreview.value = URL.createObjectURL(file)
}

const save = async () => {
  loading.value = true
  try {
    if (avatarFile.value) {
      uploading.value = true
      const ext = avatarFile.value.name.split('.').pop()
      const path = `avatars/${user.value?.id}.${ext}`
      const { error: upErr } = await supabase.storage.from('products').upload(path, avatarFile.value, { upsert: true })
      if (upErr) throw upErr
      const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(path)
      form.avatar_url = publicUrl
      uploading.value = false
    }
    const { error } = await supabase.from('profiles').upsert({ id: user.value?.id, ...form, updated_at: new Date().toISOString() })
    if (error) throw error
    toast.add({ title: 'Profile updated!', color: 'success' })
  } catch (e: any) {
    toast.add({ title: e.message, color: 'error' })
  }
  loading.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
    <div class="max-w-2xl mx-auto">
      <div class="flex items-center gap-3 mb-8">
        <UButton to="/dashboard" icon="i-lucide-arrow-left" variant="ghost" color="neutral" />
        <h1 class="text-3xl font-black text-gray-900 dark:text-white">Edit Profile</h1>
      </div>

      <UCard class="shadow-xl">
        <!-- Avatar -->
        <div class="flex flex-col items-center mb-8">
          <div class="relative">
            <div class="w-24 h-24 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 ring-4 ring-primary-500/30">
              <img v-if="avatarPreview" :src="avatarPreview" alt="Avatar" class="w-full h-full object-cover" />
              <div v-else class="w-full h-full flex items-center justify-center text-4xl">👤</div>
            </div>
            <label class="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-700 transition-colors">
              <UIcon name="i-lucide-camera" class="w-4 h-4 text-white" />
              <input type="file" accept="image/*" class="hidden" @change="onFileChange" />
            </label>
          </div>
          <p class="mt-3 text-lg font-black">{{ form.full_name || user?.email }}</p>
          <p class="text-sm text-gray-500">{{ user?.email }}</p>
        </div>

        <form class="space-y-4" @submit.prevent="save">
          <div class="grid md:grid-cols-2 gap-4">
            <UFormField label="Full Name">
              <UInput v-model="form.full_name" placeholder="Your full name" icon="i-lucide-user" class="w-full" />
            </UFormField>
            <UFormField label="Phone">
              <UInput v-model="form.phone" placeholder="+234 900 000 0000" icon="i-lucide-phone" class="w-full" />
            </UFormField>
          </div>
          <UFormField label="WhatsApp Number">
            <UInput v-model="form.whatsapp" placeholder="+234 900 000 0000" icon="i-lucide-message-circle" class="w-full" />
          </UFormField>
          <UFormField label="Address">
            <UInput v-model="form.address" placeholder="Your address in Jos" icon="i-lucide-map-pin" class="w-full" />
          </UFormField>
          <UFormField label="Bio">
            <UTextarea v-model="form.bio" placeholder="Tell buyers about yourself..." :rows="3" class="w-full" />
          </UFormField>

          <div class="pt-2">
            <UButton type="submit" color="primary" size="lg" block :loading="loading || uploading">
              {{ uploading ? 'Uploading...' : 'Save Changes' }}
            </UButton>
          </div>
        </form>

        <!-- Account Info -->
        <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 class="font-bold mb-3 text-gray-700 dark:text-gray-300">Account</h3>
          <div class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <div class="flex justify-between">
              <span>Email</span>
              <span class="font-medium">{{ user?.email }}</span>
            </div>
            <div class="flex justify-between">
              <span>Member since</span>
              <span class="font-medium">{{ user?.created_at ? new Date(user.created_at).toLocaleDateString() : '-' }}</span>
            </div>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
