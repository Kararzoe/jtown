<script setup lang="ts">
const props = defineProps<{ product: any }>()
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const toast = useToast()
const isFav = ref(false)

const toggleFav = async () => {
  if (!user.value) return toast.add({ title: 'Please login first', color: 'error' })
  isFav.value = !isFav.value
  if (isFav.value) {
    await supabase.from('favorites').insert({ user_id: user.value.id, product_id: props.product.id })
  } else {
    await supabase.from('favorites').delete().eq('user_id', user.value.id).eq('product_id', props.product.id)
  }
}
</script>

<template>
  <div class="card-hover bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md group cursor-pointer">
    <div class="relative" @click="navigateTo(`/product/${product.id}`)">
      <div class="aspect-square bg-gray-100 dark:bg-gray-700 overflow-hidden">
        <img v-if="product.images?.[0]" :src="product.images[0]" :alt="product.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div v-else class="w-full h-full flex items-center justify-center text-5xl">📦</div>
      </div>
      <UBadge class="absolute top-2 left-2" color="primary" variant="solid">{{ product.category }}</UBadge>
      <UButton
        class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        :icon="isFav ? 'i-lucide-heart' : 'i-lucide-heart'"
        :color="isFav ? 'error' : 'neutral'"
        variant="solid"
        size="xs"
        @click.stop="toggleFav"
      />
    </div>

    <div class="p-3 md:p-4" @click="navigateTo(`/product/${product.id}`)">
      <h3 class="font-semibold text-sm md:text-base text-gray-900 dark:text-white truncate mb-1">{{ product.title }}</h3>
      <p class="text-xs text-gray-500 mb-2 truncate">{{ product.seller?.shop_name || product.seller?.full_name }}</p>
      <div class="flex items-center justify-between">
        <span class="text-lg md:text-xl font-black text-primary-600">₦{{ product.price?.toLocaleString() }}</span>
        <UButton
          icon="i-lucide-message-circle"
          color="success"
          size="xs"
          @click.stop="navigateTo(`https://wa.me/${product.seller?.phone}?text=Hi, I'm interested in ${product.title}`, { external: true, open: { target: '_blank' } })"
        />
      </div>
    </div>
  </div>
</template>
