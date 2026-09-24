<script setup lang="ts">
const { t } = useLanguage()
</script>

<template>
  <footer class="relative overflow-hidden" style="background: linear-gradient(135deg, #030a03 0%, #0a1a0a 50%, #050a14 100%);">
    <!-- Top border glow -->
    <div class="absolute top-0 left-0 right-0 h-px" style="background: linear-gradient(90deg, transparent, rgba(34,197,94,0.4), rgba(20,184,166,0.4), transparent);" />

    <!-- Background decoration -->
    <div class="absolute top-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
    <div class="absolute bottom-0 right-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
    <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px); background-size: 28px 28px;" />

    <div class="max-w-7xl mx-auto px-4 py-16 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">

        <!-- Brand -->
        <div class="md:col-span-1">
          <div class="mb-5">
            <img src="/josmkt-logo-2.png" alt="JosMKT" class="h-10 w-auto mb-4" />
            <p class="text-gray-400 text-sm leading-relaxed">{{ t('footerDesc') }}</p>
          </div>

          <!-- Social Icons -->
          <div class="flex space-x-2.5">
            <a
              href="https://facebook.com/josmarketplace"
              target="_blank"
              class="group w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
              style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);"
              @mouseenter="($event.currentTarget as HTMLElement).style.background = 'rgba(34,197,94,0.2)'; ($event.currentTarget as HTMLElement).style.borderColor = 'rgba(34,197,94,0.4)'"
              @mouseleave="($event.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; ($event.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'"
            >
              <UIcon name="i-lucide-facebook" class="w-4 h-4 text-gray-400 group-hover:text-emerald-400 transition-colors" />
            </a>
            <a
              href="https://twitter.com/josMKTPlace"
              target="_blank"
              class="group w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
              style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);"
              @mouseenter="($event.currentTarget as HTMLElement).style.background = 'rgba(34,197,94,0.2)'; ($event.currentTarget as HTMLElement).style.borderColor = 'rgba(34,197,94,0.4)'"
              @mouseleave="($event.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; ($event.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'"
            >
              <UIcon name="i-lucide-twitter" class="w-4 h-4 text-gray-400 group-hover:text-emerald-400 transition-colors" />
            </a>
            <a
              href="https://instagram.com/josmarketplace_"
              target="_blank"
              class="group w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
              style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);"
              @mouseenter="($event.currentTarget as HTMLElement).style.background = 'rgba(34,197,94,0.2)'; ($event.currentTarget as HTMLElement).style.borderColor = 'rgba(34,197,94,0.4)'"
              @mouseleave="($event.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; ($event.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'"
            >
              <UIcon name="i-lucide-instagram" class="w-4 h-4 text-gray-400 group-hover:text-emerald-400 transition-colors" />
            </a>
            <a
              href="https://whatsapp.com/channel/0029Vb8A5EOHAdNUqjm3mC33"
              target="_blank"
              class="group w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
              style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);"
              @mouseenter="($event.currentTarget as HTMLElement).style.background = 'rgba(37,211,102,0.2)'; ($event.currentTarget as HTMLElement).style.borderColor = 'rgba(37,211,102,0.4)'"
              @mouseleave="($event.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; ($event.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'"
            >
              <UIcon name="i-lucide-message-circle" class="w-4 h-4 text-gray-400 group-hover:text-green-400 transition-colors" />
            </a>
          </div>
        </div>

        <!-- Categories -->
        <div>
          <h4 class="text-white font-bold mb-5 text-xs uppercase tracking-widest flex items-center gap-2">
            <div class="w-1 h-4 rounded-full" style="background: linear-gradient(180deg, #16a34a, #0d9488);" />
            {{ t('categories') }}
          </h4>
          <ul class="space-y-2.5 text-sm">
            <li v-for="item in [['electronics', t('electronics')], ['fashion', t('fashion')], ['food', t('foodCatering')], ['tech', t('techRepairs')], ['plumbing', t('plumbing')]]" :key="item[0]">
              <NuxtLink :to="`/products?category=${item[0]}`" class="text-gray-500 hover:text-emerald-400 transition-colors duration-200 flex items-center gap-2 group">
                <span class="w-0 group-hover:w-2.5 h-px bg-emerald-400 transition-all duration-300 rounded-full" />
                {{ item[1] }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h4 class="text-white font-bold mb-5 text-xs uppercase tracking-widest flex items-center gap-2">
            <div class="w-1 h-4 rounded-full" style="background: linear-gradient(180deg, #16a34a, #0d9488);" />
            {{ t('company') }}
          </h4>
          <ul class="space-y-2.5 text-sm">
            <li v-for="[to, label] in [['/about', t('aboutUs')], ['/contact', t('contact')], ['/privacy', t('privacy')], ['/terms', t('terms')], ['/trending', t('trending')], ['/become-seller', t('becomeSeller')]]" :key="to">
              <NuxtLink :to="to" class="text-gray-500 hover:text-emerald-400 transition-colors duration-200 flex items-center gap-2 group">
                <span class="w-0 group-hover:w-2.5 h-px bg-emerald-400 transition-all duration-300 rounded-full" />
                {{ label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-white font-bold mb-5 text-xs uppercase tracking-widest flex items-center gap-2">
            <div class="w-1 h-4 rounded-full" style="background: linear-gradient(180deg, #16a34a, #0d9488);" />
            {{ t('contactUs') }}
          </h4>
          <ul class="space-y-4 text-sm">
            <li>
              <a href="mailto:support@josmkt.com.ng" class="flex items-start gap-3 group">
                <div class="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style="background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.15);">
                  <UIcon name="i-lucide-mail" class="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <span class="text-gray-500 group-hover:text-emerald-400 transition-colors break-all">support@josmkt.com.ng</span>
              </a>
            </li>
            <li>
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style="background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.15);">
                  <UIcon name="i-lucide-phone" class="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <span class="text-gray-500">+234 904 383 2380</span>
              </div>
            </li>
            <li>
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style="background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.15);">
                  <UIcon name="i-lucide-map-pin" class="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <span class="text-gray-500">Jos, Plateau State, Nigeria</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs" style="border-color: rgba(255,255,255,0.06);">
        <p class="text-gray-600">© 2024 JosMKT. {{ t('allRightsReserved') }}</p>
        <p class="text-gray-700">{{ t('poweredBy') }} <span class="text-emerald-500 font-semibold">Plero Digitals</span></p>
      </div>
    </div>
  </footer>
</template>
