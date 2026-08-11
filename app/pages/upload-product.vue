<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const toast = useToast()
const router = useRouter()
const loading = ref(false)
const previews = ref<string[]>([])
const files = ref<File[]>([])

const form = reactive({
  title: '', description: '', price: '', category: 'Electronics',
  condition: 'new', location: 'Bukuru', stock: '1', tags: ''
})

const categories = ['Electronics', 'Fashion', 'Food', 'Home', 'Sports', 'Automotive', 'Books', 'Services']
const locations = ['Bukuru', 'Rayfield', 'Terminus', 'Lamingo', 'Angwan Rogo', 'Tudun Wada', 'Zaria Road']

const handleImages = (e: Event) => {
  const input = e.target as HTMLInputElement
  const selected = Array.from(input.files || [])
  if (files.value.length + selected.length > 8) return toast.add({ title: 'Max 8 images', color: 'error' })
  files.value = [...files.value, ...selected]
  selected.forEach(f => {
    const reader = new FileReader()
    reader.onloadend = () => previews.value.push(reader.result as string)
    reader.readAsDataURL(f)
  })
}

const removeImage = (i: number) => {
  files.value.splice(i, 1)
  previews.value.splice(i, 1)
}

const submit = async () => {
  if (!form.title || !form.price) return toast.add({ title: 'Fill all required fields', color: 'error' })
  loading.value = true
  try {
    const imageUrls: string[] = []
    for (const file of files.value) {
      const ext = file.name.split('.').pop()
      const path = `products/${user.value?.id}/${Date.now()}.${ext}`
      const { error } = await supabase.storage.from('images').upload(path, file)
      if (!error) {
        const { data } = supabase.storage.from('images').getPublicUrl(path)
        imageUrls.push(data.publicUrl)
      }
    }
    const { error } = await supabase.from('products').insert({
      title: form.title, description: form.description, price: Number(form.price),
      category: form.category, condition: form.condition, location: form.location,
      stock: Number(form.stock), images: imageUrls, seller_id: user.value?.id, status: 'active',
      tags: form.tags ? form.tags.split(',').map(t => t.trim()) : []
    })
    if (error) throw error
    toast.add({ title: 'Product uploaded!', color: 'success' })
    router.push('/dashboard')
  } catch (e: any) {
    toast.add({ title: e.message, color: 'error' })
  }
  loading.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-black mb-8 text-gray-900 dark:text-white">Upload Product</h1>

      <UCard class="shadow-lg">
        <form class="space-y-6" @submit.prevent="submit">
          <!-- Images -->
          <div>
            <label class="block font-semibold mb-3">Product Images (Max 8)</label>
            <div class="grid grid-cols-4 gap-3 mb-3">
              <div v-for="(preview, i) in previews" :key="i" class="relative aspect-square">
                <img :src="preview" class="w-full h-full object-cover rounded-xl" />
                <UButton icon="i-lucide-x" color="error" size="xs" class="absolute -top-2 -right-2 rounded-full" @click="removeImage(i)" />
              </div>
              <label v-if="files.length < 8" class="aspect-square border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-primary-500 transition-colors">
                <input type="file" multiple accept="image/*" class="hidden" @change="handleImages" />
                <UIcon name="i-lucide-upload" class="w-8 h-8 text-gray-400" />
              </label>
            </div>
          </div>

          <UFormField label="Title *">
            <UInput v-model="form.title" placeholder="Product title" size="lg" class="w-full" required />
          </UFormField>

          <UFormField label="Description *">
            <UTextarea v-model="form.description" placeholder="Describe your product..." :rows="4" class="w-full" required />
          </UFormField>

          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Price (₦) *">
              <UInput v-model="form.price" type="number" placeholder="0" size="lg" class="w-full" required />
            </UFormField>
            <UFormField label="Stock">
              <UInput v-model="form.stock" type="number" placeholder="1" size="lg" class="w-full" />
            </UFormField>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Category">
              <USelect v-model="form.category" :options="categories" size="lg" class="w-full" />
            </UFormField>
            <UFormField label="Condition">
              <USelect v-model="form.condition" :options="['new','used','refurbished']" size="lg" class="w-full" />
            </UFormField>
          </div>

          <UFormField label="Location">
            <USelect v-model="form.location" :options="locations" size="lg" class="w-full" />
          </UFormField>

          <UFormField label="Tags (comma separated)">
            <UInput v-model="form.tags" placeholder="e.g. wireless, bluetooth" size="lg" class="w-full" />
          </UFormField>

          <UButton type="submit" color="primary" size="xl" block :loading="loading">
            Upload Product
          </UButton>
        </form>
      </UCard>
    </div>
  </div>
</template>
