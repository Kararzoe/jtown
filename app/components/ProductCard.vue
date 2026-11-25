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

const whatsappHref = computed(() =>
  `https://wa.me/${props.product.seller?.phone}?text=${encodeURIComponent(`Hi, I'm interested in ${props.product.title}`)}`
)
</script>

<template>
  <div class="group relative card-hover bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
    <NuxtLink :to="`/product/${product.id}`" class="block">
      <div class="aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <img
          v-if="product.images?.[0]"
          :src="product.images[0]"
          :alt="product.title"
          loading="lazy"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        >
        <div v-else class="w-full h-full flex items-center justify-center">
          <UIcon name="i-lucide-image" class="w-10 h-10 text-gray-300 dark:text-gray-600" />
        </div>
      </div>

      <span
        v-if="product.category"
        class="absolute top-3 left-3 px-2 py-0.5 rounded-md text-xs font-medium bg-white/90 dark:bg-gray-900/90 text-gray-700 dark:text-gray-200 backdrop-blur-sm capitalize"
      >
        {{ product.category }}
      </span>

      <div class="p-3 md:p-4">
        <h3 class="font-medium text-sm md:text-base text-gray-900 dark:text-white truncate">{{ product.title }}</h3>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">{{ product.seller?.shop_name || product.seller?.full_name }}</p>
        <p class="mt-3 text-base md:text-lg font-semibold text-gray-900 dark:text-white tabular-nums">
          ₦{{ product.price?.toLocaleString() }}
        </p>
      </div>
    </NuxtLink>

    <button
      type="button"
      :aria-label="isFav ? 'Remove from wishlist' : 'Add to wishlist'"
      :aria-pressed="isFav"
      class="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm transition-colors hover:bg-white dark:hover:bg-gray-900"
      @click="toggleFav"
    >
      <UIcon name="i-lucide-heart" class="w-4 h-4" :class="isFav ? 'text-red-500 fill-red-500' : 'text-gray-500'" />
    </button>

    <a
      v-if="product.seller?.phone"
      :href="whatsappHref"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message seller on WhatsApp"
      class="absolute bottom-3 right-3 md:bottom-4 md:right-4 w-9 h-9 rounded-full flex items-center justify-center bg-[#25D366] hover:bg-[#1ebe5b] text-white transition-colors"
    >
      <UIcon name="i-simple-icons-whatsapp" class="w-4 h-4" />
    </a>
  </div>
</template>
