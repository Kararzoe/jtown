<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const toast = useToast()
const tab = ref('overview')
const loading = ref(true)

const stats = ref({ users: 0, products: 0, orders: 0, revenue: 0 })
const users = ref<any[]>([])
const products = ref<any[]>([])
const orders = ref<any[]>([])

// Guard: only allow admin
const isAdmin = computed(() => user.value?.email === 'kararzoe@gmail.com' || user.value?.user_metadata?.role === 'admin')

onMounted(async () => {
  if (!isAdmin.value) return navigateTo('/dashboard')

  const [{ data: u }, { data: p }, { data: o }] = await Promise.all([
    supabase.from('profiles').select('*').order('created_at', { ascending: false }),
    supabase.from('products').select('*, seller:profiles(full_name)').order('created_at', { ascending: false }),
    supabase.from('orders').select('*, product:products(title, price), buyer:profiles(full_name)').order('created_at', { ascending: false })
  ])
  users.value = u || []
  products.value = p || []
  orders.value = o || []
  stats.value = {
    users: users.value.length,
    products: products.value.length,
    orders: orders.value.length,
    revenue: orders.value.filter(o => o.status === 'completed').reduce((s, o) => s + (o.product?.price || 0), 0)
  }
  loading.value = false
})

const deleteProduct = async (id: string) => {
  await supabase.from('products').delete().eq('id', id)
  products.value = products.value.filter(p => p.id !== id)
  stats.value.products--
  toast.add({ title: 'Product deleted', color: 'success' })
}

const updateOrderStatus = async (id: string, status: string) => {
  await supabase.from('orders').update({ status }).eq('id', id)
  const o = orders.value.find(o => o.id === id)
  if (o) o.status = status
  toast.add({ title: 'Order updated', color: 'success' })
}

// Service providers from Render backend
const serviceProviders = ref<any[]>([])
const loadingServices = ref(false)

const loadServiceProviders = async () => {
  loadingServices.value = true
  try {
    const data = await $fetch<any[]>('https://jos-backend.onrender.com/api/services/all', {
      headers: { Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}` }
    })
    serviceProviders.value = Array.isArray(data) ? data : []
  } catch {
    // fallback - try without auth since admin is checking
    serviceProviders.value = []
  }
  loadingServices.value = false
}

const updateServiceStatus = async (id: string, status: string) => {
  try {
    await $fetch(`https://jos-backend.onrender.com/api/services/${id}/status`, {
      method: 'PATCH',
      body: { status }
    })
    const s = serviceProviders.value.find(s => s._id === id)
    if (s) s.status = status
    toast.add({ title: `Provider ${status}`, color: 'success' })
  } catch {
    toast.add({ title: 'Failed to update', color: 'error' })
  }
}

const deleteServiceProvider = async (id: string) => {
  try {
    await $fetch(`https://jos-backend.onrender.com/api/services/${id}`, { method: 'DELETE' })
    serviceProviders.value = serviceProviders.value.filter(s => s._id !== id)
    toast.add({ title: 'Provider deleted', color: 'success' })
  } catch {
    toast.add({ title: 'Failed to delete', color: 'error' })
  }
}

watch(tab, (val) => { if (val === 'services') loadServiceProviders() })

const tabs = [
  { label: 'Overview', value: 'overview', icon: 'i-lucide-layout-dashboard' },
  { label: 'Users', value: 'users', icon: 'i-lucide-users' },
  { label: 'Products', value: 'products', icon: 'i-lucide-package' },
  { label: 'Orders', value: 'orders', icon: 'i-lucide-shopping-bag' },
  { label: 'Service Providers', value: 'services', icon: 'i-lucide-wrench' },
  { label: '+ Add Provider', value: 'addProvider', icon: 'i-lucide-plus-circle' },
]

const CLOUDINARY = 'https://api.cloudinary.com/v1_1/dfye3j2bs/image/upload'
const newProvider = reactive({ serviceName: '', category: '', description: '', phone: '', location: '', experience: '', priceRange: '', image: '', gallery: [] as string[] })
const uploading = ref(false)

const uploadImage = async (file: File): Promise<string> => {
  const fd = new FormData()
  fd.append('file', file)
  fd.append('upload_preset', 'jos_marketplace')
  const res = await fetch(CLOUDINARY, { method: 'POST', body: fd })
  const data = await res.json()
  return data.secure_url || ''
}

const handleLogoUpload = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  uploading.value = true
  newProvider.image = await uploadImage(file)
  uploading.value = false
}

const handleGalleryUpload = async (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (!files) return
  uploading.value = true
  for (const file of Array.from(files)) {
    const url = await uploadImage(file)
    if (url) newProvider.gallery.push(url)
  }
  uploading.value = false
}

const submitProvider = async () => {
  try {
    const data = await $fetch<any>('https://jos-backend.onrender.com/api/services/apply-public', {
      method: 'POST',
      body: newProvider
    })
    if (data._id || data.success) {
      toast.add({ title: 'Provider added!', color: 'success' })
      Object.assign(newProvider, { serviceName: '', category: '', description: '', phone: '', location: '', experience: '', priceRange: '', image: '', gallery: [] })
      tab.value = 'services'
      loadServiceProviders()
    } else {
      toast.add({ title: data.message || 'Failed', color: 'error' })
    }
  } catch {
    toast.add({ title: 'Network error', color: 'error' })
  }
}

const serviceCategories = ['plumbing','electrical','ac','furniture','catering','painting','mechanic','barbing','carpentry','fashion-design','shoemaking','photography','tech','logistics','laundry','education','perfumery','makeup','event-planning','rentals','mason','phone-accessories','legal','housing-agent','e-wallet']

const statCards = computed(() => [
  { label: 'Total Users', value: stats.value.users, icon: 'i-lucide-users', color: 'bg-blue-500' },
  { label: 'Total Products', value: stats.value.products, icon: 'i-lucide-package', color: 'bg-purple-500' },
  { label: 'Total Orders', value: stats.value.orders, icon: 'i-lucide-shopping-bag', color: 'bg-orange-500' },
  { label: 'Revenue', value: `₦${stats.value.revenue.toLocaleString()}`, icon: 'i-lucide-trending-up', color: 'bg-green-500' },
])
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-3">
          <UButton to="/dashboard" icon="i-lucide-arrow-left" variant="ghost" color="neutral" />
          <div>
            <h1 class="text-3xl font-black text-gray-900 dark:text-white">Admin Dashboard</h1>
            <p class="text-sm text-gray-500">Jos Marketplace Control Panel</p>
          </div>
        </div>
        <UBadge color="error" size="lg" icon="i-lucide-shield">Admin</UBadge>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div v-for="s in statCards" :key="s.label" class="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 shadow-md card-hover">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-3" :class="s.color">
            <UIcon :name="s.icon" class="w-5 h-5 text-white" />
          </div>
          <p class="text-2xl font-black">{{ s.value }}</p>
          <p class="text-xs text-gray-500">{{ s.label }}</p>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex gap-2 mb-6 flex-wrap">
        <UButton v-for="t in tabs" :key="t.value" :icon="t.icon" :variant="tab === t.value ? 'solid' : 'outline'" :color="tab === t.value ? 'primary' : 'neutral'" size="sm" @click="tab = t.value">
          {{ t.label }}
        </UButton>
      </div>

      <div v-if="loading" class="space-y-3">
        <div v-for="i in 5" :key="i" class="skeleton h-16 rounded-xl" />
      </div>

      <!-- Overview -->
      <div v-else-if="tab === 'overview'" class="grid md:grid-cols-2 gap-6">
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
          <h3 class="font-black text-lg mb-4">Recent Users</h3>
          <div class="space-y-3">
            <div v-for="u in users.slice(0, 5)" :key="u.id" class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center overflow-hidden">
                <img v-if="u.avatar_url" :src="u.avatar_url" class="w-full h-full object-cover" />
                <UIcon v-else name="i-lucide-user" class="w-4 h-4 text-primary-600" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-semibold text-sm truncate">{{ u.full_name || 'No name' }}</p>
                <p class="text-xs text-gray-400 truncate">{{ u.id }}</p>
              </div>
              <p class="text-xs text-gray-400">{{ new Date(u.created_at).toLocaleDateString() }}</p>
            </div>
          </div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
          <h3 class="font-black text-lg mb-4">Recent Products</h3>
          <div class="space-y-3">
            <div v-for="p in products.slice(0, 5)" :key="p.id" class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden flex-shrink-0">
                <img v-if="p.images?.[0]" :src="p.images[0]" class="w-full h-full object-cover" />
                <div v-else class="w-full h-full flex items-center justify-center text-lg">📦</div>
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-semibold text-sm truncate">{{ p.title }}</p>
                <p class="text-xs text-primary-600 font-bold">₦{{ p.price?.toLocaleString() }}</p>
              </div>
              <UButton icon="i-lucide-trash" variant="ghost" color="error" size="xs" @click="deleteProduct(p.id)" />
            </div>
          </div>
        </div>
      </div>

      <!-- Users Tab -->
      <div v-else-if="tab === 'users'" class="space-y-3">
        <div v-for="u in users" :key="u.id" class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm flex items-center gap-4">
          <div class="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center overflow-hidden flex-shrink-0">
            <img v-if="u.avatar_url" :src="u.avatar_url" class="w-full h-full object-cover" />
            <UIcon v-else name="i-lucide-user" class="w-5 h-5 text-primary-600" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-bold truncate">{{ u.full_name || 'No name' }}</p>
            <p class="text-sm text-gray-500 truncate">{{ u.phone || 'No phone' }}</p>
          </div>
          <p class="text-xs text-gray-400 hidden md:block">{{ new Date(u.created_at).toLocaleDateString() }}</p>
          <NuxtLink :to="`/seller/${u.id}`">
            <UButton icon="i-lucide-eye" variant="ghost" size="xs" />
          </NuxtLink>
        </div>
      </div>

      <!-- Products Tab -->
      <div v-else-if="tab === 'products'" class="space-y-3">
        <div v-for="p in products" :key="p.id" class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm flex items-center gap-4">
          <div class="w-14 h-14 rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden flex-shrink-0">
            <img v-if="p.images?.[0]" :src="p.images[0]" :alt="p.title" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full flex items-center justify-center text-2xl">📦</div>
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-bold truncate">{{ p.title }}</p>
            <p class="text-sm text-primary-600 font-semibold">₦{{ p.price?.toLocaleString() }}</p>
            <p class="text-xs text-gray-400">by {{ p.seller?.full_name || 'Unknown' }}</p>
          </div>
          <div class="flex gap-2">
            <NuxtLink :to="`/product/${p.id}`">
              <UButton icon="i-lucide-eye" variant="ghost" size="xs" />
            </NuxtLink>
            <UButton icon="i-lucide-trash" variant="ghost" color="error" size="xs" @click="deleteProduct(p.id)" />
          </div>
        </div>
      </div>

      <!-- Service Providers Tab -->
      <div v-else-if="tab === 'services'">
        <div class="flex justify-between items-center mb-4">
          <p class="text-sm text-gray-500">All service provider applications from the backend</p>
          <UButton icon="i-lucide-refresh-cw" size="xs" variant="outline" @click="loadServiceProviders">Refresh</UButton>
        </div>
        <div v-if="loadingServices" class="space-y-3">
          <div v-for="i in 4" :key="i" class="skeleton h-20 rounded-xl" />
        </div>
        <div v-else-if="serviceProviders.length === 0" class="text-center py-12 text-gray-500">
          <p>No service providers found</p>
          <p class="text-xs mt-1">Make sure the Render backend is running</p>
        </div>
        <div v-else class="space-y-3">
          <div v-for="s in serviceProviders" :key="s._id" class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm flex items-center gap-4">
            <div class="w-12 h-12 rounded-full overflow-hidden bg-emerald-100 flex-shrink-0 flex items-center justify-center">
              <img v-if="s.image" :src="s.image" class="w-full h-full object-cover" />
              <span v-else class="text-emerald-600 font-bold">{{ s.serviceName?.charAt(0) }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-bold truncate">{{ s.serviceName }}</p>
              <p class="text-sm text-gray-500">{{ s.category }} · {{ s.location }}</p>
              <p class="text-xs text-gray-400">{{ s.phone }}</p>
            </div>
            <UBadge :color="s.status === 'approved' ? 'success' : s.status === 'rejected' ? 'error' : 'warning'" size="sm">{{ s.status }}</UBadge>
            <div class="flex gap-1">
              <UButton v-if="s.status !== 'approved'" size="xs" color="success" @click="updateServiceStatus(s._id, 'approved')">Approve</UButton>
              <UButton v-if="s.status !== 'rejected'" size="xs" color="warning" variant="outline" @click="updateServiceStatus(s._id, 'rejected')">Reject</UButton>
              <UButton size="xs" color="error" variant="ghost" icon="i-lucide-trash" @click="deleteServiceProvider(s._id)" />
            </div>
          </div>
        </div>
      </div>

      <!-- Orders Tab -->
      <div v-else-if="tab === 'orders'" class="space-y-3">
        <div v-for="o in orders" :key="o.id" class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm flex items-center gap-4">
          <div class="text-3xl">📦</div>
          <div class="flex-1 min-w-0">
            <p class="font-bold truncate">{{ o.product?.title }}</p>
            <p class="text-sm text-gray-500">{{ o.buyer?.full_name || 'Unknown buyer' }}</p>
            <p class="text-xs text-gray-400">{{ new Date(o.created_at).toLocaleDateString() }}</p>
          </div>
          <p class="font-black text-primary-600 hidden md:block">₦{{ o.product?.price?.toLocaleString() }}</p>
          <USelect
            :model-value="o.status"
            :items="['pending', 'processing', 'completed', 'cancelled']"
            size="xs"
            class="w-32"
            @update:model-value="updateOrderStatus(o.id, $event)"
          />
        </div>
      </div>
      <!-- Add Provider Tab -->
      <div v-else-if="tab === 'addProvider'" class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md max-w-2xl">
        <h3 class="font-black text-xl mb-6">Add Service Provider</h3>
        <form class="space-y-4" @submit.prevent="submitProvider">
          <UInput v-model="newProvider.serviceName" required placeholder="Business / Service name" size="lg" />
          <UTextarea v-model="newProvider.description" required placeholder="Description" :rows="3" />
          <div class="grid grid-cols-2 gap-4">
            <UInput v-model="newProvider.phone" required placeholder="Phone number" />
            <UInput v-model="newProvider.location" placeholder="Location (e.g. Terminus, Jos)" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <UInput v-model="newProvider.experience" placeholder="Experience (e.g. 5 years)" />
            <UInput v-model="newProvider.priceRange" placeholder="Price range (e.g. ₦5k - ₦50k)" />
          </div>
          <USelect
            v-model="newProvider.category"
            :items="serviceCategories.map(c => ({ label: c.replace(/-/g,'  ').replace(/\b\w/g, l => l.toUpperCase()), value: c }))"
            placeholder="Select category"
          />
          <div>
            <p class="text-sm font-semibold mb-2">Business Logo / Photo</p>
            <input type="file" accept="image/*" class="w-full text-sm" @change="handleLogoUpload" />
            <p v-if="uploading" class="text-xs text-emerald-500 mt-1">Uploading...</p>
            <img v-if="newProvider.image" :src="newProvider.image" class="mt-2 w-24 h-24 object-cover rounded-xl" />
          </div>
          <div>
            <p class="text-sm font-semibold mb-2">Gallery / Work Samples</p>
            <input type="file" accept="image/*" multiple class="w-full text-sm" @change="handleGalleryUpload" />
            <div v-if="newProvider.gallery.length" class="flex gap-2 mt-2 flex-wrap">
              <img v-for="(url, i) in newProvider.gallery" :key="i" :src="url" class="w-16 h-16 object-cover rounded-lg" />
            </div>
          </div>
          <UButton type="submit" color="primary" size="lg" block :loading="uploading">Add Provider</UButton>
        </form>
      </div>
    </div>
  </div>
</template>
