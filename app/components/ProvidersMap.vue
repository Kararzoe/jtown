<script setup lang="ts">
import 'leaflet/dist/leaflet.css'

const props = defineProps<{ providers: any[], height?: string }>()
const mapEl = ref<HTMLElement | null>(null)
const selectedProvider = ref<any>(null)
let leafletMap: any = null

const initMap = async () => {
  await nextTick()
  const L = (await import('leaflet')).default

  // Fix default marker icon paths broken by bundlers
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  })

  leafletMap = L.map(mapEl.value!, { zoomControl: true }).setView([9.8965, 8.8583], 13)

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '© <a href="https://carto.com/">CARTO</a>',
    maxZoom: 19,
  }).addTo(leafletMap)

  const withCoords = props.providers.filter(p => p.lat && p.lng)

  const customIcon = (name: string) => L.divIcon({
    html: `<div style="background:#10b981;color:white;padding:5px 10px;border-radius:20px;font-weight:700;font-size:11px;box-shadow:0 3px 10px rgba(16,185,129,0.5);white-space:nowrap;display:flex;align-items:center;gap:4px;border:2px solid white;cursor:pointer"><span style="font-size:13px">📍</span> ${name}</div>`,
    className: '',
    iconAnchor: [0, 0],
  })

  withCoords.forEach(provider => {
    const marker = L.marker([Number(provider.lat), Number(provider.lng)], { icon: customIcon(provider.service_name) })
      .addTo(leafletMap)
    marker.on('click', () => {
      selectedProvider.value = provider
      leafletMap.panTo([Number(provider.lat), Number(provider.lng)])
      leafletMap.setZoom(16)
    })
  })

  if (withCoords.length > 1) {
    const bounds = L.latLngBounds(withCoords.map((p: any) => [Number(p.lat), Number(p.lng)]))
    leafletMap.fitBounds(bounds, { padding: [40, 40] })
  }
}

onMounted(initMap)

watch(() => props.providers, () => {
  if (leafletMap) {
    leafletMap.setView([9.8965, 8.8583], 13)
    selectedProvider.value = null
  }
})
</script>

<template>
  <div class="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
    <div ref="mapEl" :style="`height: ${height || '420px'}; width: 100%;`" />

    <Transition name="popup">
      <div v-if="selectedProvider" class="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 border border-gray-100 dark:border-gray-700 z-[1000]">
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

    <div v-if="providers.filter(p => p.lat && p.lng).length === 0" class="absolute top-3 left-1/2 -translate-x-1/2 z-[1000] bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-full shadow text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2 whitespace-nowrap">
      <span>📍</span> Providers will appear here once they add their location
    </div>
  </div>
</template>

<style scoped>
.popup-enter-active, .popup-leave-active { transition: all 0.25s ease; }
.popup-enter-from, .popup-leave-to { opacity: 0; transform: translateY(10px); }
</style>
