<script setup lang="ts">
const supabase = useSupabaseClient()
const toast = useToast()
const submitted = ref(false)
const loading = ref(false)
const uploading = ref(false)

const CLOUDINARY = 'https://api.cloudinary.com/v1_1/dfye3j2bs/image/upload'

const form = reactive({
  service_name: '',
  category: '',
  description: '',
  phone: '',
  location: '',
  experience: '',
  price_range: '',
  image: '',
  gallery: [] as string[],
})

const categories = [
  'plumbing', 'electrical', 'ac', 'furniture', 'catering', 'painting',
  'mechanic', 'barbing', 'carpentry', 'fashion-design', 'shoemaking',
  'photography', 'tech', 'logistics', 'laundry', 'education',
  'perfumery', 'makeup', 'event-planning', 'rentals', 'mason',
  'phone-accessories', 'legal', 'housing-agent', 'e-wallet'
]

const locations = ['Bukuru', 'Rayfield', 'Terminus', 'Sukuwa', 'Lamingo', 'Hwolshe', 'Tudun Wada', 'Nassarawa', 'Old Airport', 'Polo', 'British', 'Other']

const uploadImage = async (file: File): Promise<string> => {
  const fd = new FormData()
  fd.append('file', file)
  fd.append('upload_preset', 'jos_marketplace')
  fd.append('cloud_name', 'dfye3j2bs')
  const res = await fetch(CLOUDINARY, { method: 'POST', body: fd })
  const data = await res.json()
  return data.secure_url || ''
}

const onLogoChange = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  uploading.value = true
  form.image = await uploadImage(file)
  uploading.value = false
}

const onGalleryChange = async (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (!files) return
  uploading.value = true
  for (let i = 0; i < files.length; i++) {
    const url = await uploadImage(files[i])
    if (url) form.gallery.push(url)
  }
  uploading.value = false
}

const submit = async () => {
  loading.value = true
  const { error } = await supabase.from('service_providers').insert([{ ...form, status: 'pending' }])
  if (error) {
    toast.add({ title: 'Failed to submit. Please try again.', color: 'error' })
  } else {
    submitted.value = true
  }
  loading.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 to-white dark:from-gray-900 dark:to-gray-800 py-10 px-4">
    <div class="max-w-2xl mx-auto">

      <!-- Success -->
      <div v-if="submitted" class="flex items-center justify-center min-h-[60vh]">
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full text-center shadow-xl">
          <UIcon name="i-lucide-check-circle" class="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <h2 class="text-2xl font-bold mb-2">Application Submitted!</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Your business registration is under review. We'll contact you once approved and your profile will be live on JosMKT.
          </p>
          <UButton to="/" color="primary" size="lg">Back to Home</UButton>
        </div>
      </div>

      <!-- Form -->
      <div v-else>
        <div class="text-center mb-8">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4">
            <UIcon name="i-lucide-store" class="w-4 h-4" />
            Register Your Business
          </div>
          <h1 class="text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white">Get Started on JosMKT</h1>
          <p class="text-gray-500 dark:text-gray-400 max-w-md mx-auto">List your service or business and get discovered by thousands of customers in Jos</p>
        </div>

        <form class="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg space-y-5" @submit.prevent="submit">

          <UFormField label="Business / Service Name *">
            <UInput v-model="form.service_name" placeholder="e.g. Bright Plumbing Services" required class="w-full" />
          </UFormField>

          <UFormField label="Category *">
            <USelect
              v-model="form.category"
              :items="categories.map(c => ({ label: c.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), value: c }))"
              placeholder="Select your category"
              required
              class="w-full"
            />
          </UFormField>

          <UFormField label="Describe your business *">
            <UTextarea v-model="form.description" placeholder="Tell customers what you do, what makes you special..." :rows="4" required class="w-full" />
          </UFormField>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormField label="Phone / WhatsApp *">
              <UInput v-model="form.phone" type="tel" placeholder="e.g. 08012345678" required class="w-full" />
            </UFormField>
            <UFormField label="Location *">
              <USelect
                v-model="form.location"
                :items="locations"
                placeholder="Select location"
                required
                class="w-full"
              />
            </UFormField>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormField label="Experience">
              <UInput v-model="form.experience" placeholder="e.g. 3 years" class="w-full" />
            </UFormField>
            <UFormField label="Price Range">
              <UInput v-model="form.price_range" placeholder="e.g. ₦5,000 - ₦50,000" class="w-full" />
            </UFormField>
          </div>

          <!-- Logo Upload -->
          <UFormField label="Business Logo / Photo">
            <input type="file" accept="image/*" class="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 text-sm" @change="onLogoChange" />
            <p v-if="uploading" class="text-sm text-emerald-500 mt-1">Uploading...</p>
            <img v-if="form.image" :src="form.image" alt="Preview" class="mt-2 w-24 h-24 object-cover rounded-xl" />
          </UFormField>

          <!-- Gallery Upload -->
          <UFormField label="Work Samples / Gallery (optional)">
            <input type="file" accept="image/*" multiple class="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 text-sm" @change="onGalleryChange" />
            <div v-if="form.gallery.length" class="flex gap-2 mt-2 flex-wrap">
              <img v-for="(url, i) in form.gallery" :key="i" :src="url" class="w-20 h-20 object-cover rounded-lg" />
            </div>
          </UFormField>

          <UButton type="submit" size="xl" block :loading="loading || uploading" class="bg-gradient-to-r from-emerald-500 to-teal-500 font-bold text-lg">
            <UIcon name="i-lucide-send" class="w-5 h-5 mr-2" />
            {{ loading ? 'Submitting...' : 'Submit Application' }}
          </UButton>

          <p class="text-center text-xs text-gray-400">Your application will be reviewed within 24 hours. Once approved, your business will be visible to thousands.</p>
        </form>
      </div>
    </div>
  </div>
</template>
