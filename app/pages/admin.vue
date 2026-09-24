<script setup lang="ts">
definePageMeta({ layout: 'default' })
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()
const tab = ref('overview')
const sidebarOpen = ref(false)
const loading = ref(true)
const isAdmin = ref(false)
const authChecked = ref(false)

const stats = ref({ users: 0, products: 0, orders: 0, providers: 0 })
const users = ref<any[]>([])
const products = ref<any[]>([])
const orders = ref<any[]>([])
const serviceProviders = ref<any[]>([])

const userSearch = ref('')
const productSearch = ref('')
const productFilter = ref('pending')
const serviceSearch = ref('')
const serviceFilter = ref('pending')
const loadingServices = ref(false)

onMounted(async () => {
  // Auth guard
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) { await navigateTo('/login'); return }
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', session.user.id).single()
  if (profile?.role !== 'admin') { authChecked.value = true; loading.value = false; return }
  isAdmin.value = true
  authChecked.value = true

  const d = await $fetch<any>('/api/admin/data').catch(() => null)
  if (!d) { toast.add({ title: 'Failed to load admin data', color: 'error' }); loading.value = false; return }
  users.value = d.users
  products.value = d.products
  orders.value = d.orders
  serviceProviders.value = d.providers
  stats.value = { users: d.users.length, products: d.products.length, orders: d.orders.length, providers: d.providers.length }
  loading.value = false
})

const filteredUsers = computed(() => {
  if (!userSearch.value) return users.value
  const q = userSearch.value.toLowerCase()
  return users.value.filter(u => u.full_name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q))
})

const filteredProducts = computed(() => {
  let list = productFilter.value === 'all' ? products.value : products.value.filter(p => p.status === productFilter.value)
  if (productSearch.value) { const q = productSearch.value.toLowerCase(); list = list.filter(p => p.title?.toLowerCase().includes(q)) }
  return list
})

const filteredProviders = computed(() => {
  let list = serviceFilter.value === 'all' ? serviceProviders.value : serviceProviders.value.filter(s => s.status === serviceFilter.value)
  if (serviceSearch.value) { const q = serviceSearch.value.toLowerCase(); list = list.filter(s => s.service_name?.toLowerCase().includes(q) || s.location?.toLowerCase().includes(q) || s.phone?.includes(q)) }
  return list
})

const pendingProducts = computed(() => products.value.filter(p => p.status === 'pending').length)
const pendingProviders = computed(() => serviceProviders.value.filter(s => s.status === 'pending').length)

const updateProductStatus = async (id: string, status: string) => {
  await $fetch('/api/admin/update', { method: 'POST', body: { table: 'products', id, data: { status } } })
  const p = products.value.find(p => p.id === id); if (p) p.status = status
  toast.add({ title: `Product ${status}`, color: 'success' })
}
const deleteProduct = async (id: string) => {
  await $fetch('/api/admin/delete', { method: 'POST', body: { table: 'products', id } })
  products.value = products.value.filter(p => p.id !== id)
  toast.add({ title: 'Product deleted', color: 'success' })
}
const updateOrderStatus = async (id: string, status: string) => {
  await $fetch('/api/admin/update', { method: 'POST', body: { table: 'orders', id, data: { status } } })
  const o = orders.value.find(o => o.id === id); if (o) o.status = status
  toast.add({ title: 'Order updated', color: 'success' })
}
const loadServiceProviders = async () => {
  loadingServices.value = true
  const data = await $fetch<any[]>('/api/admin/providers').catch(() => [])
  serviceProviders.value = data || []
  loadingServices.value = false
}
const updateServiceStatus = async (id: string, status: string) => {
  await $fetch('/api/admin/update', { method: 'POST', body: { table: 'service_providers', id, data: { status } } })
  const s = serviceProviders.value.find(s => s.id === id); if (s) s.status = status
  toast.add({ title: `Provider ${status}`, color: 'success' })
}
const deleteServiceProvider = async (id: string) => {
  await $fetch('/api/admin/delete', { method: 'POST', body: { table: 'service_providers', id } })
  serviceProviders.value = serviceProviders.value.filter(s => s.id !== id)
  toast.add({ title: 'Provider deleted', color: 'success' })
}
const updateUserRole = async (id: string, role: string) => {
  await $fetch('/api/admin/update', { method: 'POST', body: { table: 'profiles', id, data: { role } } })
  const u = users.value.find(u => u.id === id); if (u) u.role = role
  toast.add({ title: 'Role updated', color: 'success' })
}

// Messages
const conversations = ref<any[]>([])
const selectedUser = ref<any>(null)
const threadMessages = ref<any[]>([])
const adminReply = ref('')
const loadingConvos = ref(false)
const threadEnd = ref<HTMLElement | null>(null)

const loadConversations = async () => {
  loadingConvos.value = true
  const { data } = await supabase.from('support_messages').select('user_id, user_name, user_email, created_at, content, read, is_admin').order('created_at', { ascending: false })
  const map = new Map<string, any>()
  for (const msg of (data || [])) {
    if (!map.has(msg.user_id)) map.set(msg.user_id, { ...msg, unread: 0 })
    if (!msg.read && !msg.is_admin) map.get(msg.user_id).unread++
  }
  conversations.value = Array.from(map.values())
  loadingConvos.value = false
}
const openThread = async (convo: any) => {
  selectedUser.value = convo
  const { data } = await supabase.from('support_messages').select('*').eq('user_id', convo.user_id).order('created_at', { ascending: true })
  threadMessages.value = data || []
  nextTick(() => threadEnd.value?.scrollIntoView({ behavior: 'smooth' }))
  await supabase.from('support_messages').update({ read: true }).eq('user_id', convo.user_id).eq('is_admin', false)
  convo.unread = 0
}
const sendAdminReply = async () => {
  if (!adminReply.value.trim() || !selectedUser.value) return
  const content = adminReply.value.trim(); adminReply.value = ''
  await supabase.from('support_messages').insert({ user_id: selectedUser.value.user_id, user_email: selectedUser.value.user_email, user_name: selectedUser.value.user_name, content, is_admin: true, read: false })
  await openThread(selectedUser.value)
}

// Add Provider
const CLOUDINARY = 'https://api.cloudinary.com/v1_1/dfye3j2bs/image/upload'
const newProvider = reactive({ service_name: '', category: '', description: '', phone: '', location: '', experience: '', price_range: '', image: '', lat: null as number | null, lng: null as number | null })
const uploading = ref(false)
const gettingLocation = ref(false)
const locationPinned = ref(false)

const uploadImage = async (file: File): Promise<string> => {
  const fd = new FormData(); fd.append('file', file); fd.append('upload_preset', 'jos_marketplace')
  const res = await fetch(CLOUDINARY, { method: 'POST', body: fd })
  return (await res.json()).secure_url || ''
}
const pinLocation = () => {
  if (!navigator.geolocation) return
  gettingLocation.value = true
  navigator.geolocation.getCurrentPosition(
    (pos) => { newProvider.lat = pos.coords.latitude; newProvider.lng = pos.coords.longitude; locationPinned.value = true; gettingLocation.value = false; toast.add({ title: 'Location pinned!', color: 'success' }) },
    () => { gettingLocation.value = false; toast.add({ title: 'Could not get location', color: 'error' }) },
    { enableHighAccuracy: true }
  )
}
const submitProvider = async () => {
  if (!newProvider.service_name || !newProvider.category || !newProvider.description || !newProvider.phone || !newProvider.location) {
    toast.add({ title: 'Fill all required fields', color: 'error' }); return
  }
  const { data, error } = await supabase.from('service_providers').insert([{ ...newProvider, status: 'approved' }]).select().single()
  if (!error && data) {
    toast.add({ title: 'Provider added!', color: 'success' })
    serviceProviders.value.unshift(data)
    Object.assign(newProvider, { service_name: '', category: '', description: '', phone: '', location: '', experience: '', price_range: '', image: '', lat: null, lng: null })
    locationPinned.value = false; tab.value = 'services'
  } else { toast.add({ title: error?.message || 'Failed', color: 'error' }) }
}

watch(tab, (val) => {
  if (val === 'services') loadServiceProviders()
  if (val === 'messages') loadConversations()
})

const serviceCategories = ['plumbing','electrical','ac','furniture','painting','mechanic','barbing','carpentry','fashion-design','shoemaking','photography','tech','logistics','laundry','education','perfumery','makeup','event-planning','rentals','mason','phone-accessories','legal','housing-agent','e-wallet']
const locations = ['Bukuru','Rayfield','Terminus','Sukuwa','Lamingo','Hwolshe','Tudun Wada','Nassarawa','Old Airport','Polo','British','Other']

const navItems = [
  { label: 'Overview', value: 'overview', icon: 'i-lucide-layout-dashboard' },
  { label: 'Users', value: 'users', icon: 'i-lucide-users' },
  { label: 'Products', value: 'products', icon: 'i-lucide-package' },
  { label: 'Orders', value: 'orders', icon: 'i-lucide-shopping-bag' },
  { label: 'Services', value: 'services', icon: 'i-lucide-wrench' },
  { label: 'Messages', value: 'messages', icon: 'i-lucide-message-square' },
  { label: 'Add Provider', value: 'addProvider', icon: 'i-lucide-plus-circle' },
]

const statCards = computed(() => [
  { label: 'Total Users', value: stats.value.users, icon: 'i-lucide-users', color: 'bg-blue-500' },
  { label: 'Products', value: stats.value.products, icon: 'i-lucide-package', color: 'bg-violet-500' },
  { label: 'Orders', value: stats.value.orders, icon: 'i-lucide-shopping-bag', color: 'bg-amber-500' },
  { label: 'Providers', value: stats.value.providers, icon: 'i-lucide-wrench', color: 'bg-emerald-500' },
])
</script>

<template>
  <div class="min-h-screen bg-gray-950 flex items-center justify-center" v-if="!authChecked">
    <div class="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
  </div>

  <div v-else-if="authChecked && !isAdmin" class="min-h-screen bg-gray-950 flex items-center justify-center">
    <div class="text-center">
      <div class="text-6xl mb-4">🚫</div>
      <h1 class="text-2xl font-bold text-white mb-2">Access Denied</h1>
      <p class="text-gray-400 mb-6">You don't have permission to view this page.</p>
      <UButton to="/" color="primary">Back to Home</UButton>
    </div>
  </div>

  <div v-else class="min-h-screen bg-gray-950 flex">

    <!-- Sidebar -->
    <aside :class="['fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-800 flex flex-col transition-transform duration-300', sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0']">
      <div class="p-5 border-b border-gray-800 flex items-center gap-3">
        <div class="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center">
          <UIcon name="i-lucide-shield" class="w-5 h-5 text-white" />
        </div>
        <div>
          <p class="font-black text-white text-sm">JosMKT Admin</p>
          <p class="text-xs text-gray-500">Control Panel</p>
        </div>
      </div>
      <nav class="flex-1 p-3 space-y-1 overflow-y-auto">
        <button v-for="item in navItems" :key="item.value"
          :class="['w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all', tab === item.value ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-gray-400 hover:bg-gray-800 hover:text-white']"
          @click="tab = item.value; sidebarOpen = false">
          <UIcon :name="item.icon" class="w-4 h-4 flex-shrink-0" />
          {{ item.label }}
          <span v-if="item.value === 'products' && pendingProducts > 0" class="ml-auto px-2 py-0.5 bg-amber-500 rounded-full text-white text-xs font-bold">{{ pendingProducts }}</span>
          <span v-if="item.value === 'services' && pendingProviders > 0" class="ml-auto px-2 py-0.5 bg-purple-500 rounded-full text-white text-xs font-bold">{{ pendingProviders }}</span>
        </button>
      </nav>
      <div class="p-3 border-t border-gray-800">
        <NuxtLink to="/" class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition">
          <UIcon name="i-lucide-arrow-left" class="w-4 h-4" /> Back to Site
        </NuxtLink>
      </div>
    </aside>

    <div v-if="sidebarOpen" class="fixed inset-0 bg-black/60 z-40 md:hidden" @click="sidebarOpen = false" />

    <!-- Main -->
    <div class="flex-1 md:ml-64 flex flex-col min-h-screen">

      <!-- Topbar -->
      <header class="sticky top-0 z-30 bg-gray-900/90 backdrop-blur border-b border-gray-800 px-5 py-3 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <button class="md:hidden text-gray-400 hover:text-white" @click="sidebarOpen = true">
            <UIcon name="i-lucide-menu" class="w-5 h-5" />
          </button>
          <h1 class="text-white font-bold capitalize">{{ navItems.find(n => n.value === tab)?.label }}</h1>
        </div>
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <div class="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            <span class="text-emerald-400 text-xs font-medium">Live</span>
          </div>
          <UBadge color="error" icon="i-lucide-shield" size="sm">Admin</UBadge>
        </div>
      </header>

      <main class="flex-1 p-5">

        <!-- Loading -->
        <div v-if="loading" class="space-y-4">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="i in 4" :key="i" class="h-24 rounded-2xl bg-gray-800 animate-pulse" />
          </div>
          <div class="h-64 rounded-2xl bg-gray-800 animate-pulse" />
        </div>

        <template v-else>
          <!-- Stat Cards -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div v-for="s in statCards" :key="s.label" class="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex items-center gap-4">
              <div :class="['w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0', s.color]">
                <UIcon :name="s.icon" class="w-5 h-5 text-white" />
              </div>
              <div>
                <p class="text-2xl font-black text-white">{{ s.value }}</p>
                <p class="text-xs text-gray-500">{{ s.label }}</p>
              </div>
            </div>
          </div>

          <!-- OVERVIEW -->
          <div v-if="tab === 'overview'" class="grid md:grid-cols-2 gap-5">
            <div class="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <h3 class="font-bold text-white mb-4 flex items-center gap-2"><UIcon name="i-lucide-clock" class="w-4 h-4 text-amber-400" /> Pending Actions</h3>
              <div class="space-y-3">
                <button class="w-full flex items-center justify-between p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl hover:bg-amber-500/20 transition" @click="tab = 'products'; productFilter = 'pending'">
                  <div class="flex items-center gap-3">
                    <div class="w-9 h-9 bg-amber-500/20 rounded-xl flex items-center justify-center"><UIcon name="i-lucide-package" class="w-4 h-4 text-amber-400" /></div>
                    <span class="text-sm font-semibold text-amber-300">Pending Products</span>
                  </div>
                  <span class="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full">{{ pendingProducts }}</span>
                </button>
                <button class="w-full flex items-center justify-between p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl hover:bg-purple-500/20 transition" @click="tab = 'services'; serviceFilter = 'pending'">
                  <div class="flex items-center gap-3">
                    <div class="w-9 h-9 bg-purple-500/20 rounded-xl flex items-center justify-center"><UIcon name="i-lucide-wrench" class="w-4 h-4 text-purple-400" /></div>
                    <span class="text-sm font-semibold text-purple-300">Pending Providers</span>
                  </div>
                  <span class="px-3 py-1 bg-purple-500 text-white text-xs font-bold rounded-full">{{ pendingProviders }}</span>
                </button>
                <button class="w-full flex items-center justify-between p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl hover:bg-blue-500/20 transition" @click="tab = 'orders'">
                  <div class="flex items-center gap-3">
                    <div class="w-9 h-9 bg-blue-500/20 rounded-xl flex items-center justify-center"><UIcon name="i-lucide-shopping-bag" class="w-4 h-4 text-blue-400" /></div>
                    <span class="text-sm font-semibold text-blue-300">Total Orders</span>
                  </div>
                  <span class="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">{{ orders.length }}</span>
                </button>
              </div>
            </div>
            <div class="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <h3 class="font-bold text-white mb-4 flex items-center gap-2"><UIcon name="i-lucide-users" class="w-4 h-4 text-emerald-400" /> Recent Users</h3>
              <div class="space-y-2">
                <div v-for="u in users.slice(0,6)" :key="u.id" class="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-800 transition">
                  <div class="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {{ (u.full_name || u.email || '?').charAt(0).toUpperCase() }}
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-semibold text-white truncate">{{ u.full_name || 'No name' }}</p>
                    <p class="text-xs text-gray-500 truncate">{{ u.email }}</p>
                  </div>
                  <UBadge :color="u.role === 'admin' ? 'error' : u.role === 'seller' ? 'success' : 'neutral'" size="xs">{{ u.role || 'buyer' }}</UBadge>
                </div>
              </div>
            </div>
          </div>

          <!-- USERS -->
          <div v-else-if="tab === 'users'" class="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <div class="p-4 border-b border-gray-800 flex items-center gap-3">
              <UInput v-model="userSearch" placeholder="Search users..." icon="i-lucide-search" class="flex-1" />
              <span class="text-sm text-gray-500">{{ filteredUsers.length }} users</span>
            </div>
            <div class="divide-y divide-gray-800">
              <div v-for="u in filteredUsers" :key="u.id" class="flex items-center gap-4 p-4 hover:bg-gray-800/40 transition">
                <div class="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {{ (u.full_name || u.email || '?').charAt(0).toUpperCase() }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-white truncate">{{ u.full_name || 'No name' }}</p>
                  <p class="text-sm text-gray-500 truncate">{{ u.email }}</p>
                </div>
                <p class="text-xs text-gray-600 hidden md:block">{{ new Date(u.created_at).toLocaleDateString() }}</p>
                <USelect :model-value="u.role || 'buyer'" :items="['buyer','seller','admin']" size="xs" class="w-28" @update:model-value="updateUserRole(u.id, $event)" />
              </div>
            </div>
          </div>

          <!-- PRODUCTS -->
          <div v-else-if="tab === 'products'">
            <div class="flex flex-wrap gap-2 mb-4 items-center">
              <UInput v-model="productSearch" placeholder="Search products..." icon="i-lucide-search" class="flex-1 min-w-48" />
              <div class="flex gap-2">
                <button v-for="f in ['pending','active','rejected','all']" :key="f"
                  :class="['px-3 py-1.5 rounded-xl text-xs font-semibold border transition', productFilter === f ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-gray-900 border-gray-700 text-gray-400 hover:text-white']"
                  @click="productFilter = f as any">
                  {{ f.charAt(0).toUpperCase() + f.slice(1) }}
                  <span class="ml-1 opacity-60">{{ f === 'all' ? products.length : products.filter(p => p.status === f).length }}</span>
                </button>
              </div>
            </div>
            <div class="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
              <div v-if="filteredProducts.length === 0" class="p-12 text-center text-gray-600">
                <UIcon name="i-lucide-package" class="w-10 h-10 mx-auto mb-2 opacity-30" /><p>No {{ productFilter }} products</p>
              </div>
              <div v-else class="divide-y divide-gray-800">
                <div v-for="p in filteredProducts" :key="p.id" class="flex items-center gap-4 p-4 hover:bg-gray-800/40 transition">
                  <div class="w-14 h-14 rounded-xl bg-gray-800 overflow-hidden flex-shrink-0 border border-gray-700">
                    <img v-if="p.images?.[0]" :src="p.images[0]" class="w-full h-full object-cover" />
                    <div v-else class="w-full h-full flex items-center justify-center text-2xl">📦</div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="font-semibold text-white truncate">{{ p.title }}</p>
                    <p class="text-sm text-emerald-400 font-semibold">₦{{ p.price?.toLocaleString() }}</p>
                    <p class="text-xs text-gray-500">{{ p.seller?.full_name || 'Unknown' }} · {{ p.category }}</p>
                  </div>
                  <span :class="['px-2.5 py-1 rounded-full text-xs font-semibold', p.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : p.status === 'rejected' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400']">{{ p.status }}</span>
                  <div class="flex gap-1.5">
                    <button v-if="p.status !== 'active'" class="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg text-xs font-semibold transition" @click="updateProductStatus(p.id, 'active')">Approve</button>
                    <button v-if="p.status !== 'rejected'" class="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-xs font-semibold transition" @click="updateProductStatus(p.id, 'rejected')">Reject</button>
                    <button class="w-8 h-8 bg-gray-800 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-lg flex items-center justify-center transition" @click="deleteProduct(p.id)"><UIcon name="i-lucide-trash" class="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ORDERS -->
          <div v-else-if="tab === 'orders'" class="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <div class="p-4 border-b border-gray-800">
              <h3 class="font-bold text-white">All Orders <span class="text-gray-500 font-normal text-sm">({{ orders.length }})</span></h3>
            </div>
            <div v-if="orders.length === 0" class="p-12 text-center text-gray-600">
              <UIcon name="i-lucide-shopping-bag" class="w-10 h-10 mx-auto mb-2 opacity-30" /><p>No orders yet</p>
            </div>
            <div v-else class="divide-y divide-gray-800">
              <div v-for="o in orders" :key="o.id" class="flex items-center gap-4 p-4 hover:bg-gray-800/40 transition">
                <div class="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <UIcon name="i-lucide-shopping-bag" class="w-5 h-5 text-amber-400" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-white truncate">{{ o.product?.title || 'Unknown product' }}</p>
                  <p class="text-sm text-gray-500">{{ o.buyer?.full_name || 'Unknown' }} · {{ new Date(o.created_at).toLocaleDateString() }}</p>
                </div>
                <p class="font-bold text-emerald-400 hidden md:block">₦{{ o.product?.price?.toLocaleString() }}</p>
                <USelect :model-value="o.status" :items="['pending','processing','completed','cancelled']" size="xs" class="w-36" @update:model-value="updateOrderStatus(o.id, $event)" />
              </div>
            </div>
          </div>

          <!-- SERVICES -->
          <div v-else-if="tab === 'services'">
            <div class="flex flex-wrap gap-2 mb-4 items-center">
              <UInput v-model="serviceSearch" placeholder="Search by name, location, phone..." icon="i-lucide-search" class="flex-1 min-w-48" />
              <div class="flex gap-2 flex-wrap">
                <button v-for="f in ['pending','approved','rejected','all']" :key="f"
                  :class="['px-3 py-1.5 rounded-xl text-xs font-semibold border transition', serviceFilter === f ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-gray-900 border-gray-700 text-gray-400 hover:text-white']"
                  @click="serviceFilter = f as any">
                  {{ f.charAt(0).toUpperCase() + f.slice(1) }}
                  <span class="ml-1 opacity-60">{{ f === 'all' ? serviceProviders.length : serviceProviders.filter(s => s.status === f).length }}</span>
                </button>
              </div>
              <button class="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-xs transition" @click="loadServiceProviders">
                <UIcon name="i-lucide-refresh-cw" class="w-3.5 h-3.5" /> Refresh
              </button>
            </div>
            <div v-if="loadingServices" class="space-y-3">
              <div v-for="i in 4" :key="i" class="h-24 rounded-2xl bg-gray-900 animate-pulse" />
            </div>
            <div v-else-if="filteredProviders.length === 0" class="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center text-gray-600">
              <UIcon name="i-lucide-wrench" class="w-10 h-10 mx-auto mb-2 opacity-30" /><p>No {{ serviceFilter === 'all' ? '' : serviceFilter }} providers</p>
            </div>
            <div v-else class="space-y-3">
              <div v-for="s in filteredProviders" :key="s.id" class="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition">
                <div class="p-4 flex items-center gap-4">
                  <div class="w-12 h-12 rounded-xl overflow-hidden bg-gray-800 flex-shrink-0 flex items-center justify-center border border-gray-700">
                    <img v-if="s.image" :src="s.image" class="w-full h-full object-cover" />
                    <span v-else class="text-emerald-400 font-bold text-lg">{{ s.service_name?.charAt(0) }}</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="font-bold text-white truncate">{{ s.service_name }}</p>
                    <p class="text-sm text-gray-400 capitalize">{{ s.category?.replace(/-/g,' ') }} · {{ s.location }}</p>
                    <p class="text-xs text-gray-500 font-mono">📞 {{ s.phone }}</p>
                  </div>
                  <span :class="['px-2.5 py-1 rounded-full text-xs font-semibold', s.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400' : s.status === 'rejected' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400']">{{ s.status }}</span>
                  <div class="flex gap-1.5">
                    <button v-if="s.status !== 'approved'" class="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg text-xs font-semibold transition" @click="updateServiceStatus(s.id, 'approved')">Approve</button>
                    <button v-if="s.status !== 'rejected'" class="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-xs font-semibold transition" @click="updateServiceStatus(s.id, 'rejected')">Reject</button>
                    <NuxtLink :to="`/provider/${s.id}`" target="_blank" class="w-8 h-8 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-lg flex items-center justify-center transition"><UIcon name="i-lucide-eye" class="w-3.5 h-3.5" /></NuxtLink>
                    <button class="w-8 h-8 bg-gray-800 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-lg flex items-center justify-center transition" @click="deleteServiceProvider(s.id)"><UIcon name="i-lucide-trash" class="w-3.5 h-3.5" /></button>
                  </div>
                </div>
                <div v-if="s.id_image || s.selfie_image" class="px-4 pb-4 pt-3 border-t border-gray-800 flex gap-4">
                  <div v-if="s.id_image">
                    <p class="text-xs text-gray-600 mb-1.5">Government ID</p>
                    <a :href="s.id_image" target="_blank"><img :src="s.id_image" class="w-24 h-16 object-cover rounded-lg border border-gray-700 hover:opacity-80 transition" /></a>
                  </div>
                  <div v-if="s.selfie_image">
                    <p class="text-xs text-gray-600 mb-1.5">Selfie with ID</p>
                    <a :href="s.selfie_image" target="_blank"><img :src="s.selfie_image" class="w-24 h-16 object-cover rounded-lg border border-gray-700 hover:opacity-80 transition" /></a>
                  </div>
                </div>
                <div v-else class="px-4 py-2.5 border-t border-gray-800 flex items-center gap-1.5 text-xs text-red-500/50">
                  <UIcon name="i-lucide-alert-triangle" class="w-3.5 h-3.5" /> No verification documents
                </div>
              </div>
            </div>
          </div>

          <!-- MESSAGES -->
          <div v-else-if="tab === 'messages'" class="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden" style="height:75vh">
            <div class="flex h-full">
              <div class="w-full md:w-72 border-r border-gray-800 flex flex-col flex-shrink-0">
                <div class="p-4 border-b border-gray-800 flex items-center justify-between">
                  <h3 class="font-bold text-white text-sm">Inbox</h3>
                  <button class="w-7 h-7 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center" @click="loadConversations"><UIcon name="i-lucide-refresh-cw" class="w-3.5 h-3.5 text-gray-400" /></button>
                </div>
                <div class="flex-1 overflow-y-auto">
                  <div v-if="loadingConvos" class="p-4 space-y-3"><div v-for="i in 4" :key="i" class="h-14 rounded-xl bg-gray-800 animate-pulse" /></div>
                  <div v-else-if="conversations.length === 0" class="p-8 text-center text-gray-600"><UIcon name="i-lucide-inbox" class="w-8 h-8 mx-auto mb-2 opacity-40" /><p class="text-sm">No messages</p></div>
                  <button v-for="convo in conversations" :key="convo.user_id"
                    :class="['w-full p-4 border-b border-gray-800/50 hover:bg-gray-800/50 transition text-left', selectedUser?.user_id === convo.user_id ? 'bg-emerald-500/10 border-l-2 border-l-emerald-500' : '']"
                    @click="openThread(convo)">
                    <div class="flex items-center gap-3">
                      <div class="w-9 h-9 bg-emerald-500 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0 relative">
                        {{ convo.user_name?.charAt(0)?.toUpperCase() || '?' }}
                        <span v-if="convo.unread > 0" class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">{{ convo.unread }}</span>
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="font-semibold text-white text-sm truncate">{{ convo.user_name || convo.user_email }}</p>
                        <p class="text-xs text-gray-500 truncate">{{ convo.content }}</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
              <div class="hidden md:flex flex-1 flex-col">
                <div v-if="!selectedUser" class="flex-1 flex items-center justify-center text-gray-600">
                  <div class="text-center"><UIcon name="i-lucide-message-square" class="w-12 h-12 mx-auto mb-3 opacity-20" /><p class="text-sm">Select a conversation</p></div>
                </div>
                <template v-else>
                  <div class="p-4 border-b border-gray-800 flex items-center gap-3">
                    <div class="w-9 h-9 bg-emerald-500 rounded-full flex items-center justify-center font-bold text-white text-sm">{{ selectedUser.user_name?.charAt(0)?.toUpperCase() || '?' }}</div>
                    <div><p class="font-bold text-white text-sm">{{ selectedUser.user_name }}</p><p class="text-xs text-gray-500">{{ selectedUser.user_email }}</p></div>
                  </div>
                  <div class="flex-1 overflow-y-auto p-4 space-y-3">
                    <div v-for="msg in threadMessages" :key="msg.id" class="flex" :class="msg.is_admin ? 'justify-end' : 'justify-start'">
                      <div :class="['px-4 py-2.5 rounded-2xl text-sm max-w-xs', msg.is_admin ? 'bg-emerald-500 text-white rounded-tr-sm' : 'bg-gray-800 text-gray-200 rounded-tl-sm']">{{ msg.content }}</div>
                    </div>
                    <div ref="threadEnd" />
                  </div>
                  <div class="p-4 border-t border-gray-800 flex gap-2">
                    <input v-model="adminReply" type="text" placeholder="Reply..." class="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition" @keyup.enter="sendAdminReply" />
                    <button class="w-10 h-10 bg-emerald-500 hover:bg-emerald-600 rounded-xl flex items-center justify-center transition" @click="sendAdminReply"><UIcon name="i-lucide-send" class="w-4 h-4 text-white" /></button>
                  </div>
                </template>
              </div>
            </div>
          </div>

          <!-- ADD PROVIDER -->
          <div v-else-if="tab === 'addProvider'" class="max-w-2xl">
            <div class="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h3 class="font-bold text-white text-lg mb-5 flex items-center gap-2"><UIcon name="i-lucide-plus-circle" class="w-5 h-5 text-emerald-400" /> Add Service Provider</h3>
              <form class="space-y-4" @submit.prevent="submitProvider">
                <UInput v-model="newProvider.service_name" required placeholder="Business / Service name *" size="lg" />
                <UTextarea v-model="newProvider.description" required placeholder="Description *" :rows="3" />
                <div class="grid grid-cols-2 gap-4">
                  <UInput v-model="newProvider.phone" required placeholder="Phone number *" />
                  <USelect v-model="newProvider.location" :items="locations" placeholder="Location *" />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <UInput v-model="newProvider.experience" placeholder="Experience (e.g. 5 years)" />
                  <UInput v-model="newProvider.price_range" placeholder="Price range" />
                </div>
                <USelect v-model="newProvider.category" :items="serviceCategories.map(c => ({ label: c.replace(/-/g,' ').replace(/\b\w/g, (l: string) => l.toUpperCase()), value: c }))" placeholder="Category *" />
                <div class="rounded-xl border p-4 transition" :class="locationPinned ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-gray-700'">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm font-semibold text-white">📍 Pin Location</p>
                      <p class="text-xs text-gray-500 mt-0.5">{{ locationPinned ? `${newProvider.lat?.toFixed(4)}, ${newProvider.lng?.toFixed(4)}` : 'Shows on map for customers' }}</p>
                    </div>
                    <UButton type="button" :loading="gettingLocation" :color="locationPinned ? 'success' : 'primary'" size="sm" @click="pinLocation">{{ locationPinned ? '✓ Pinned' : 'Use GPS' }}</UButton>
                  </div>
                </div>
                <div>
                  <p class="text-sm font-semibold text-gray-300 mb-2">Business Logo</p>
                  <input type="file" accept="image/*" class="w-full text-sm text-gray-400" @change="async (e) => { const f = (e.target as HTMLInputElement).files?.[0]; if(f) { uploading.value = true; newProvider.image = await uploadImage(f); uploading.value = false } }" />
                  <img v-if="newProvider.image" :src="newProvider.image" class="mt-2 w-20 h-20 object-cover rounded-xl border border-gray-700" />
                </div>
                <UButton type="submit" color="primary" size="lg" block :loading="uploading">Add Provider</UButton>
              </form>
            </div>
          </div>

        </template>
      </main>
    </div>
  </div>
</template>
