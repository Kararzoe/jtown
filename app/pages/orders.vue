<script setup lang="ts">
definePageMeta({ layout: 'default' })
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const orders = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  const { data } = await supabase.from('orders').select('*, product:products(*), seller:profiles(*)').eq('buyer_id', user.value?.id).order('created_at', { ascending: false })
  orders.value = data || []
  loading.value = false
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-black mb-8 text-gray-900 dark:text-white">Order History</h1>
      <div v-if="loading" class="space-y-4">
        <div v-for="i in 3" :key="i" class="skeleton h-28 rounded-2xl" />
      </div>
      <div v-else-if="orders.length === 0" class="text-center py-20">
        <div class="text-6xl mb-4">📦</div>
        <h3 class="text-xl font-bold mb-2">No orders yet</h3>
        <UButton to="/products" color="primary">Start Shopping</UButton>
      </div>
      <div v-else class="space-y-4">
        <div v-for="order in orders" :key="order.id" class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md flex items-start gap-4">
          <div class="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
            <img v-if="order.product?.images?.[0]" :src="order.product.images[0]" :alt="order.product.title" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full flex items-center justify-center text-3xl">📦</div>
          </div>
          <div class="flex-1">
            <h3 class="font-bold text-lg mb-1">{{ order.product?.title }}</h3>
            <p class="text-gray-600 text-sm mb-2">Seller: {{ order.seller?.shop_name || order.seller?.full_name }}</p>
            <div class="flex items-center gap-3">
              <span class="text-xl font-black text-primary-600">₦{{ order.product?.price?.toLocaleString() }}</span>
              <UBadge :color="order.status === 'completed' ? 'success' : order.status === 'cancelled' ? 'error' : 'warning'">{{ order.status }}</UBadge>
            </div>
            <p class="text-xs text-gray-400 mt-1">{{ new Date(order.created_at).toLocaleDateString() }}</p>
          </div>
          <UButton icon="i-lucide-message-circle" color="success" size="sm" @click="() => navigateTo(`https://wa.me/${order.seller?.phone}`, { external: true, open: { target: '_blank' } })" />
        </div>
      </div>
    </div>
  </div>
</template>
