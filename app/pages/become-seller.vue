<script setup lang="ts">
const toast = useToast()
const form = reactive({ shopName: '', name: '', phone: '', email: '', location: '', category: '' })

const submit = () => {
  const msg = `New Seller Application:\nShop: ${form.shopName}\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nLocation: ${form.location}\nCategory: ${form.category}`
  window.open(`https://wa.me/2349043832380?text=${encodeURIComponent(msg)}`, '_blank')
  toast.add({ title: 'Application sent!', color: 'success' })
}
</script>

<template>
  <div class="min-h-screen hero-gradient py-16 px-4">
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-12 animate-fade-up">
        <div class="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <UIcon name="i-lucide-store" class="w-10 h-10 text-white" />
        </div>
        <h1 class="text-4xl font-black text-gray-900 mb-4">Start Selling on Jos Marketplace</h1>
        <p class="text-gray-600 text-lg">Join thousands of sellers and reach customers across Jos</p>
      </div>

      <UCard class="shadow-xl animate-fade-up">
        <form class="space-y-5" @submit.prevent="submit">
          <div class="grid md:grid-cols-2 gap-4">
            <UFormField label="Shop Name *">
              <UInput v-model="form.shopName" placeholder="e.g. TechHub Store" size="lg" class="w-full" required />
            </UFormField>
            <UFormField label="Your Name *">
              <UInput v-model="form.name" placeholder="Full name" size="lg" class="w-full" required />
            </UFormField>
          </div>
          <div class="grid md:grid-cols-2 gap-4">
            <UFormField label="Phone *">
              <UInput v-model="form.phone" placeholder="+234 800 000 0000" size="lg" class="w-full" required />
            </UFormField>
            <UFormField label="Email *">
              <UInput v-model="form.email" type="email" placeholder="your@email.com" size="lg" class="w-full" required />
            </UFormField>
          </div>
          <div class="grid md:grid-cols-2 gap-4">
            <UFormField label="Location">
              <USelect v-model="form.location" :options="['Bukuru','Rayfield','Terminus','Lamingo','Angwan Rogo']" size="lg" class="w-full" />
            </UFormField>
            <UFormField label="Category">
              <USelect v-model="form.category" :options="['Electronics','Fashion','Food','Home','Sports','Other']" size="lg" class="w-full" />
            </UFormField>
          </div>
          <UButton type="submit" color="primary" size="xl" block icon="i-lucide-send">Submit Application</UButton>
          <p class="text-center text-sm text-gray-500">We'll review and contact you within 24 hours</p>
        </form>
      </UCard>

      <div class="mt-12 grid md:grid-cols-3 gap-6 text-center">
        <div v-for="item in [
          { icon: '📦', title: 'List Products', desc: 'Add unlimited products' },
          { icon: '💬', title: 'Connect with Buyers', desc: 'Direct communication' },
          { icon: '💰', title: 'Grow Your Business', desc: 'Reach thousands daily' }
        ]" :key="item.title" class="bg-white rounded-2xl p-6 shadow-md card-hover">
          <div class="text-4xl mb-3">{{ item.icon }}</div>
          <h3 class="font-bold mb-1">{{ item.title }}</h3>
          <p class="text-sm text-gray-600">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
