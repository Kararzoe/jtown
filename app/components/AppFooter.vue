<template>
  <footer class="bg-gray-950 text-gray-400 py-16 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <!-- Brand -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <span class="text-2xl font-black text-white">JosMKT</span>
          </div>
          <p class="text-sm mb-5 leading-relaxed">Showcase your business to thousands of buyers in Jos — get discovered, get promoted, get results</p>
          <div class="flex space-x-3">
            <a href="https://facebook.com/josmarketplace" target="_blank" class="p-2.5 bg-gray-800/80 rounded-xl hover:bg-emerald-600 transition-all">
              <UIcon name="i-lucide-facebook" class="w-4 h-4" />
            </a>
            <a href="https://twitter.com/josMKTPlace" target="_blank" class="p-2.5 bg-gray-800/80 rounded-xl hover:bg-emerald-600 transition-all">
              <UIcon name="i-lucide-twitter" class="w-4 h-4" />
            </a>
            <a href="https://instagram.com/josmarketplace_" target="_blank" class="p-2.5 bg-gray-800/80 rounded-xl hover:bg-emerald-600 transition-all">
              <UIcon name="i-lucide-instagram" class="w-4 h-4" />
            </a>
            <a href="https://whatsapp.com/channel/0029Vb8A5EOHAdNUqjm3mC33" target="_blank" class="p-2.5 bg-gray-800/80 rounded-xl hover:bg-green-600 transition-all">
              <UIcon name="i-lucide-message-circle" class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Categories -->
        <div>
          <h4 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Categories</h4>
          <ul class="space-y-2.5 text-sm">
            <li><NuxtLink to="/products?category=electronics" class="hover:text-emerald-400 transition">Electronics</NuxtLink></li>
            <li><NuxtLink to="/products?category=fashion" class="hover:text-emerald-400 transition">Fashion</NuxtLink></li>
            <li><NuxtLink to="/products?category=food" class="hover:text-emerald-400 transition">Food & Catering</NuxtLink></li>
            <li><NuxtLink to="/products?category=tech" class="hover:text-emerald-400 transition">Tech & Repairs</NuxtLink></li>
            <li><NuxtLink to="/products?category=plumbing" class="hover:text-emerald-400 transition">Plumbing</NuxtLink></li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h4 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
          <ul class="space-y-2.5 text-sm">
            <li><NuxtLink to="/about" class="hover:text-emerald-400 transition">About Us</NuxtLink></li>
            <li><NuxtLink to="/contact" class="hover:text-emerald-400 transition">Contact Us</NuxtLink></li>
            <li><NuxtLink to="/privacy" class="hover:text-emerald-400 transition">Privacy Policy</NuxtLink></li>
            <li><NuxtLink to="/terms" class="hover:text-emerald-400 transition">Terms of Service</NuxtLink></li>
            <li><NuxtLink to="/trending" class="hover:text-emerald-400 transition">Trending</NuxtLink></li>
            <li><NuxtLink to="/become-seller" class="hover:text-emerald-400 transition">Become a Seller</NuxtLink></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact Us</h4>
          <ul class="space-y-3 text-sm">
            <li class="flex items-center gap-2">
              <UIcon name="i-lucide-mail" class="w-4 h-4 text-emerald-500" />
              <a href="mailto:support@josmkt.com.ng" class="hover:text-emerald-400 transition">support@josmkt.com.ng</a>
            </li>
            <li class="flex items-center gap-2">
              <UIcon name="i-lucide-phone" class="w-4 h-4 text-emerald-500" />
              <span>+234 904 383 2380</span>
            </li>
            <li class="flex items-center gap-2">
              <UIcon name="i-lucide-map-pin" class="w-4 h-4 text-emerald-500" />
              <span>Jos, Plateau State, Nigeria</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        <p>&copy; 2024 JosMKT. All rights reserved.</p>
        <p class="text-gray-600">Powered by <span class="text-emerald-500 font-medium">Plero Digitals</span></p>
      </div>
    </div>
  </footer>
</template>
