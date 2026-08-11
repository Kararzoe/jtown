<template>
  <footer class="bg-gray-900 text-gray-300 py-12 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        <div class="col-span-2 md:col-span-1">
          <h3 class="text-2xl font-black text-white mb-2 gradient-text">Jos Marketplace</h3>
          <p class="text-sm mb-4 text-gray-400">Your trusted platform for buying and selling in Jos, Nigeria.</p>
          <div class="flex gap-3">
            <UButton v-for="icon in ['i-simple-icons-facebook','i-simple-icons-twitter','i-simple-icons-instagram']" :key="icon" :icon="icon" variant="ghost" color="neutral" size="sm" />
          </div>
        </div>

        <div>
          <h4 class="text-white font-semibold mb-4">Quick Links</h4>
          <ul class="space-y-2 text-sm">
            <li><NuxtLink to="/" class="hover:text-primary-400 transition-colors">Home</NuxtLink></li>
            <li><NuxtLink to="/products" class="hover:text-primary-400 transition-colors">Products</NuxtLink></li>
            <li><NuxtLink to="/become-seller" class="hover:text-primary-400 transition-colors">Become a Seller</NuxtLink></li>
            <li><NuxtLink to="/trending" class="hover:text-primary-400 transition-colors">Trending</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h4 class="text-white font-semibold mb-4">Support</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="hover:text-primary-400 transition-colors">Help Center</a></li>
            <li><a href="#" class="hover:text-primary-400 transition-colors">Safety Tips</a></li>
            <li><a href="#" class="hover:text-primary-400 transition-colors">Terms of Service</a></li>
            <li><a href="#" class="hover:text-primary-400 transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 class="text-white font-semibold mb-4">Contact</h4>
          <ul class="space-y-3 text-sm">
            <li class="flex items-center gap-2"><UIcon name="i-lucide-mail" class="w-4 h-4" /> support@josmkt.com.ng</li>
            <li class="flex items-center gap-2"><UIcon name="i-lucide-phone" class="w-4 h-4" /> +234 904 383 2380</li>
            <li class="flex items-center gap-2"><UIcon name="i-lucide-map-pin" class="w-4 h-4" /> Jos, Plateau State, Nigeria</li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-800 pt-8 text-center text-sm">
        <p class="text-gray-500">&copy; 2024 Jos Marketplace. All rights reserved.</p>
        <p class="mt-1 text-gray-600">Powered by Plero Digitals</p>
      </div>
    </div>
  </footer>
</template>
