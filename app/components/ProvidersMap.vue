<script setup lang="ts">
import { Loader } from '@googlemaps/js-api-loader'

const props = defineProps<{ providers: any[], height?: string }>()
const config = useRuntimeConfig()
const mapEl = ref<HTMLElement | null>(null)
const selectedProvider = ref<any>(null)
let googleMap: any = null

onMounted(async () => {
  await nextTick()
  const withCoords = props.providers.filter(p => p.lat && p.lng)

  const loader = new Loader({
    apiKey: config.public.googleMapsKey,
    version: 'weekly',
    libraries: ['marker']
  })

  const { Map } = await loader.importLibrary('maps')
  const { AdvancedMarkerElement } = await loader.importLibrary('marker') as any

  // Center on Jos, Nigeria
  const josCenter = { lat: 9.8965, lng: 8.8583 }

  googleMap = new Map(mapEl.value!, {
    center: josCenter,
    zoom: 13,
    mapId: 'josmkt_providers_map',
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: false,
    fullscreenControl: true,
    mapTypeControl: false,
  })

  // Add a marker for each provider with coords
  withCoords.forEach(provider => {
    const pin = document.createElement('div')
    pin.style.cssText = 'cursor:pointer;'
    pin.innerHTML = `
      <div style="background:#10b981;color:white;padding:5px 10px;border-radius:20px;font-weight:700;font-size:11px;box-shadow:0 3px 10px rgba(16,185,129,0.5);white-space:nowrap;display:flex;align-items:center;gap:4px;border:2px solid white;">
        <span style="font-size:13px">📍</span> ${provider.service_name}
      </div>
    `

    const marker = new AdvancedMarkerElement({
      map: googleMap,
      position: { lat: Number(provider.lat), lng: Number(provider.lng) },
      content: pin,
      title: provider.service_name,
    })

    marker.addListener('click', () => {
      selectedProvider.value = provider
      googleMap.panTo({ lat: Number(provider.lat), lng: Number(provider.lng) })
      googleMap.setZoom(16)
    })
  })

  // If providers have coords, fit map to show all of them
  if (withCoords.length > 1) {
    const { LatLngBounds } = await loader.importLibrary('core') as any
    const bounds = new LatLngBounds()
    withCoords.forEach(p => bounds.extend({ lat: Number(p.lat), lng: Number(p.lng) }))
    googleMap.fitBounds(bounds, 80)
  }
})

// Re-render markers when providers change
watch(() => props.providers, async () => {
  if (googleMap) {
    googleMap.setCenter({ lat: 9.8965, lng: 8.8583 })
    googleMap.setZoom(13)
    selectedProvider.value = null
  }
})
</script>

<template>
  <div class="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
    <div ref="mapEl" :style="`height: ${height || '420px'}; width: 100%;`" />

    <!-- Provider popup card -->
    <Transition name="popup">
      <div v-if="selectedProvider" class="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 border border-gray-100 dark:border-gray-700 z-10">
        <button class="absolute top-3 right-3 w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center" @click="selectedProvider = null">
          <UIcon name="i-lucide-x" class="w-3.5 h-3.5 text-gray-500" />
        </button>
        <div class="flex items-center gap-3 mb-3">
          <div class="w-12 h-12 rounded-xl overflow-hidden bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
            <img v-if="selectedProvider.image" :src="selectedProvider.image" class="w-full h-full object-cover" />
            <span v-else class="text-emerald-600 font-bold text-lg">{{ selectedProvider.service_name?.charAt(0) }}</span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-bold text-gray-900 dark:text-white truncate">{{ selectedProvider.service_name }}</p>
            <p class="text-xs text-gray-500 capitalize">{{ selectedProvider.category?.replace(/-/g, ' ') }} · {{ selectedProvider.location }}</p>
          </div>
        </div>
        <p class="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{{ selectedProvider.description }}</p>
        <div class="flex gap-2">
          <a :href="`tel:${selectedProvider.phone}`" class="flex-1 flex items-center justify-center gap-1.5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold transition">
            <UIcon name="i-lucide-phone" class="w-3.5 h-3.5" /> Call
          </a>
          <a :href="`https://wa.me/${selectedProvider.phone?.replace(/[^0-9]/g, '')}?text=Hi, I found you on JosMKT. I need your ${selectedProvider.service_name} service`" target="_blank" class="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xs font-semibold transition">
            <UIcon name="i-lucide-message-circle" class="w-3.5 h-3.5" /> WhatsApp
          </a>
          <NuxtLink :to="`/provider/${selectedProvider.id}`" class="flex items-center justify-center px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl transition">
            <UIcon name="i-lucide-eye" class="w-3.5 h-3.5" />
          </NuxtLink>
        </div>
      </div>
    </Transition>

    <!-- No coords notice (non-blocking) -->
    <div v-if="providers.filter(p => p.lat && p.lng).length === 0" class="absolute top-3 left-1/2 -translate-x-1/2 z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-full shadow text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2 whitespace-nowrap">
      <span>📍</span> Providers will appear here once they add their location
    </div>
  </div>
</template>

<style scoped>
.popup-enter-active, .popup-leave-active { transition: all 0.25s ease; }
.popup-enter-from, .popup-leave-to { opacity: 0; transform: translateY(10px); }
</style>
