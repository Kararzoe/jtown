<template>
  <section class="py-20 px-4 bg-gray-50 dark:bg-gray-800">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-14">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4">
          Success Stories
        </div>
        <h2 class="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">What Business Owners Say</h2>
        <p class="text-gray-500 dark:text-gray-400">Real results from real businesses in Jos</p>
      </div>

      <div v-if="testimonials.length === 0" class="text-center py-12">
        <UIcon name="i-lucide-quote" class="w-14 h-14 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">No reviews yet</h3>
        <p class="text-gray-500 dark:text-gray-400">Be the first to share your experience with JosMKT</p>
        <UButton to="/become-seller" color="primary" class="mt-4">Get Started</UButton>
      </div>

      <div v-else class="grid md:grid-cols-3 gap-6">
        <div
          v-for="(t, i) in testimonials"
          :key="i"
          class="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <UIcon name="i-lucide-quote" class="w-8 h-8 text-emerald-400 mb-4" />
          <p class="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{{ t.text }}</p>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center font-bold text-emerald-600">
              {{ t.name.charAt(0) }}
            </div>
            <div>
              <p class="font-bold text-gray-900 dark:text-white text-sm">{{ t.name }}</p>
              <p class="text-xs text-gray-500">{{ t.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const testimonials = [
  { name: 'Amina Bello', role: 'Fashion Designer, Jos', text: 'Since joining JosMKT, my customer base has grown by 300%. I now get calls from all over Plateau State!' },
  { name: 'Emmanuel Dung', role: 'Plumber, Bukuru', text: 'I used to struggle finding customers. Now my phone rings every day thanks to JosMKT. Best decision I ever made.' },
  { name: 'Fatima Yakubu', role: 'Caterer, Terminus', text: 'JosMKT helped me turn my passion for cooking into a real business. I get bookings for events every week now.' },
]
</script>
