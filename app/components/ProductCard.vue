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
  <div
    class="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden cursor-pointer transition-all duration-350"
    style="border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 2px 12px rgba(0,0,0,0.06);"
    @mouseenter="($event.currentTarget as HTMLElement).style.transform = 'translateY(-8px)'; ($event.currentTarget as HTMLElement).style.boxShadow = '0 20px 48px rgba(0,0,0,0.14), 0 0 0 1px rgba(34,197,94,0.12)'"
    @mouseleave="($event.currentTarget as HTMLElement).style.transform = 'translateY(0)'; ($event.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'"
  >
    <!-- Image area -->
    <div class="relative" @click="navigateTo(`/product/${product.id}`)">
      <div class="aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <img
          v-if="product.images?.[0]"
          :src="product.images[0]"
          :alt="product.title"
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div v-else class="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">📦</div>
      </div>

      <!-- Top gradient overlay on hover -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <!-- Category badge -->
      <div class="absolute top-2.5 left-2.5">
        <span class="px-2.5 py-1 rounded-lg text-xs font-bold text-white" style="background: linear-gradient(135deg, #16a34a, #0d9488); box-shadow: 0 2px 8px rgba(22,163,74,0.4);">
          {{ product.category }}
        </span>
      </div>

      <!-- Favorite button -->
      <button
        class="absolute top-2.5 right-2.5 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 hover:scale-110"
        :style="isFav ? 'background: rgba(239,68,68,0.9); backdrop-filter: blur(8px);' : 'background: rgba(255,255,255,0.9); backdrop-filter: blur(8px); box-shadow: 0 2px 8px rgba(0,0,0,0.15);'"
        @click.stop="toggleFav"
      >
        <UIcon
          name="i-lucide-heart"
          class="w-4 h-4 transition-colors"
          :class="isFav ? 'text-white' : 'text-gray-500'"
        />
      </button>
    </div>

    <!-- Content -->
    <div class="p-3 md:p-4" @click="navigateTo(`/product/${product.id}`)">
      <h3 class="font-bold text-sm md:text-base text-gray-900 dark:text-white truncate mb-1 leading-tight">{{ product.title }}</h3>
      <p class="text-xs text-gray-400 mb-3 truncate">{{ product.seller?.shop_name || product.seller?.full_name }}</p>

      <div class="flex items-center justify-between gap-2">
        <div>
          <span class="text-lg md:text-xl font-black" style="background: linear-gradient(135deg, #16a34a, #0d9488); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
            ₦{{ product.price?.toLocaleString() }}
          </span>
        </div>
        <button
          class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 hover:scale-110"
          style="background: #25D366; box-shadow: 0 2px 8px rgba(37,211,102,0.4);"
          @click.stop="navigateTo(`https://wa.me/${product.seller?.phone}?text=Hi, I'm interested in ${product.title}`, { external: true, open: { target: '_blank' } })"
        >
          <UIcon name="i-lucide-message-circle" class="w-4 h-4 text-white" />
        </button>
      </div>
    </div>

    <!-- Bottom accent line -->
    <div class="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style="background: linear-gradient(90deg, #16a34a, #0d9488);" />
  </div>
</template>
