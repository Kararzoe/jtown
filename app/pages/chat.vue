<script setup lang="ts">
definePageMeta({ layout: 'default' })
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const activeTab = ref<'support' | 'chats'>('support')

// ── Buyer-Seller chats (existing) ──────────────────────────────
const chats = ref<any[]>([])
const selectedChat = ref<any>(null)
const chatMessages = ref<any[]>([])
const newChatMessage = ref('')
const chatEnd = ref<HTMLElement | null>(null)
const loadingChats = ref(true)

onMounted(async () => {
  const { data } = await supabase
    .from('chats')
    .select('*, buyer:profiles!chats_buyer_id_fkey(*), seller:profiles!chats_seller_id_fkey(*), product:products(*)')
    .or(`buyer_id.eq.${user.value?.id},seller_id.eq.${user.value?.id}`)
    .order('created_at', { ascending: false })
  chats.value = data || []
  loadingChats.value = false
  loadSupport()
})

const selectChat = async (chat: any) => {
  selectedChat.value = chat
  const { data } = await supabase
    .from('messages')
    .select('*, sender:profiles(*)')
    .eq('chat_id', chat.id)
    .order('created_at', { ascending: true })
  chatMessages.value = data || []
  scrollTo(chatEnd)
  supabase.channel(`chat:${chat.id}`)
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `chat_id=eq.${chat.id}` }, (payload) => {
      chatMessages.value.push(payload.new)
      scrollTo(chatEnd)
    }).subscribe()
}

const sendChatMessage = async () => {
  if (!newChatMessage.value.trim() || !selectedChat.value) return
  const content = newChatMessage.value.trim()
  newChatMessage.value = ''
  await supabase.from('messages').insert({ chat_id: selectedChat.value.id, sender_id: user.value?.id, content })
  await supabase.from('chats').update({ updated_at: new Date().toISOString() }).eq('id', selectedChat.value.id)
}

const otherParticipant = (chat: any) => chat.buyer_id === user.value?.id ? chat.seller : chat.buyer

// ── Admin Support Chat ─────────────────────────────────────────
const supportMessages = ref<any[]>([])
const newSupport = ref('')
const supportEnd = ref<HTMLElement | null>(null)
const loadingSupport = ref(true)
const unread = ref(0)

const loadSupport = async () => {
  loadingSupport.value = true
  const { data } = await supabase
    .from('support_messages')
    .select('*')
    .eq('user_id', user.value?.id)
    .order('created_at', { ascending: true })
  supportMessages.value = data || []
  loadingSupport.value = false
  scrollTo(supportEnd)

  // mark admin messages as read
  await supabase.from('support_messages')
    .update({ read: true })
    .eq('user_id', user.value?.id)
    .eq('is_admin', true)
    .eq('read', false)

  // realtime
  supabase.channel(`support:${user.value?.id}`)
    .on('postgres_changes', {
      event: 'INSERT', schema: 'public', table: 'support_messages',
      filter: `user_id=eq.${user.value?.id}`
    }, (payload) => {
      supportMessages.value.push(payload.new)
      scrollTo(supportEnd)
    }).subscribe()
}

const sendSupport = async () => {
  if (!newSupport.value.trim()) return
  const content = newSupport.value.trim()
  newSupport.value = ''
  await supabase.from('support_messages').insert({
    user_id: user.value?.id,
    user_email: user.value?.email,
    user_name: user.value?.user_metadata?.full_name || user.value?.email,
    content,
    is_admin: false,
    read: false
  })
}

const scrollTo = (el: Ref<HTMLElement | null>) => {
  nextTick(() => el.value?.scrollIntoView({ behavior: 'smooth' }))
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-4">
    <div class="max-w-5xl mx-auto">

      <!-- Tab Toggle -->
      <div class="flex gap-2 mb-4">
        <button
          :class="['flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition border', activeTab === 'support' ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-emerald-300']"
          @click="activeTab = 'support'"
        >
          <UIcon name="i-lucide-headset" class="w-4 h-4" /> Support Chat
        </button>
        <button
          :class="['flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition border', activeTab === 'chats' ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-emerald-300']"
          @click="activeTab = 'chats'"
        >
          <UIcon name="i-lucide-message-square" class="w-4 h-4" /> My Chats
        </button>
      </div>

      <!-- Support Chat -->
      <div v-if="activeTab === 'support'" class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col" style="height: 72vh">
        <!-- Header -->
        <div class="flex items-center gap-3 px-5 py-4 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-emerald-500 to-teal-500">
          <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <UIcon name="i-lucide-shield" class="w-5 h-5 text-white" />
          </div>
          <div>
            <p class="font-bold text-white">JosMKT Support</p>
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
              <p class="text-xs text-emerald-100">Admin · Usually replies within a few hours</p>
            </div>
          </div>
        </div>

        <!-- Messages -->
        <div class="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          <div v-if="loadingSupport" class="flex items-center justify-center h-full">
            <UIcon name="i-lucide-loader" class="w-6 h-6 animate-spin text-emerald-500" />
          </div>

          <div v-else-if="supportMessages.length === 0" class="flex flex-col items-center justify-center h-full text-center">
            <div class="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center mb-3">
              <UIcon name="i-lucide-message-circle" class="w-8 h-8 text-emerald-400" />
            </div>
            <p class="font-semibold text-gray-700 dark:text-gray-300">Start a conversation</p>
            <p class="text-sm text-gray-400 mt-1 max-w-xs">Ask about your account, report an issue, or get help with anything on JosMKT</p>
          </div>

          <template v-else>
            <!-- Welcome message -->
            <div class="flex justify-start">
              <div class="max-w-xs bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-tl-sm px-4 py-3">
                <p class="text-sm text-gray-800 dark:text-gray-200">👋 Hi! Welcome to JosMKT Support. How can we help you today?</p>
              </div>
            </div>

            <div
              v-for="msg in supportMessages"
              :key="msg.id"
              class="flex"
              :class="msg.is_admin ? 'justify-start' : 'justify-end'"
            >
              <div class="flex items-end gap-2 max-w-sm">
                <div v-if="msg.is_admin" class="w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mb-1">
                  <UIcon name="i-lucide-shield" class="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <div
                    class="px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                    :class="msg.is_admin ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-sm' : 'bg-emerald-500 text-white rounded-tr-sm'"
                  >
                    {{ msg.content }}
                  </div>
                  <p class="text-xs text-gray-400 mt-1" :class="msg.is_admin ? 'text-left' : 'text-right'">
                    {{ new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
                  </p>
                </div>
              </div>
            </div>
          </template>
          <div ref="supportEnd" />
        </div>

        <!-- Input -->
        <div class="px-4 py-3 border-t border-gray-100 dark:border-gray-700">
          <div class="flex gap-2">
            <input
              v-model="newSupport"
              type="text"
              placeholder="Type your message..."
              class="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:border-emerald-400 transition"
              @keyup.enter="sendSupport"
            />
            <button
              class="w-10 h-10 bg-emerald-500 hover:bg-emerald-600 rounded-xl flex items-center justify-center transition flex-shrink-0 disabled:opacity-50"
              :disabled="!newSupport.trim()"
              @click="sendSupport"
            >
              <UIcon name="i-lucide-send" class="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      <!-- Buyer-Seller Chats -->
      <div v-else class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden" style="height: 72vh">
        <div class="flex h-full">
          <!-- Chat List -->
          <div class="w-full md:w-2/5 border-r border-gray-100 dark:border-gray-700 overflow-y-auto">
            <div class="p-4 border-b border-gray-100 dark:border-gray-700">
              <h2 class="font-bold text-gray-900 dark:text-white">Conversations</h2>
            </div>
            <div v-if="loadingChats" class="p-4 space-y-3">
              <div v-for="i in 4" :key="i" class="skeleton h-16 rounded-xl" />
            </div>
            <div v-else-if="chats.length === 0" class="p-8 text-center text-gray-400">
              <div class="text-4xl mb-2">💬</div>
              <p class="text-sm">No conversations yet</p>
            </div>
            <button
              v-for="chat in chats"
              :key="chat.id"
              class="w-full p-4 border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition text-left"
              :class="selectedChat?.id === chat.id ? 'bg-emerald-50 dark:bg-emerald-900/20 border-l-2 border-l-emerald-500' : ''"
              @click="selectChat(chat)"
            >
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center font-bold text-emerald-600 flex-shrink-0">
                  {{ otherParticipant(chat)?.full_name?.charAt(0) || '?' }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-sm text-gray-900 dark:text-white truncate">{{ otherParticipant(chat)?.full_name || 'User' }}</p>
                  <p class="text-xs text-gray-400 truncate">{{ chat.product?.title }}</p>
                </div>
              </div>
            </button>
          </div>

          <!-- Message Area -->
          <div class="hidden md:flex flex-1 flex-col">
            <div v-if="!selectedChat" class="flex-1 flex items-center justify-center">
              <div class="text-center text-gray-400">
                <div class="text-5xl mb-3">💬</div>
                <p class="text-sm">Select a conversation</p>
              </div>
            </div>
            <template v-else>
              <div class="p-4 border-b border-gray-100 dark:border-gray-700">
                <p class="font-bold text-gray-900 dark:text-white">{{ otherParticipant(selectedChat)?.full_name }}</p>
                <p class="text-xs text-gray-400">{{ selectedChat.product?.title }}</p>
              </div>
              <div class="flex-1 overflow-y-auto p-4 space-y-3">
                <div v-for="(msg, i) in chatMessages" :key="i" class="flex" :class="msg.sender_id === user?.id ? 'justify-end' : 'justify-start'">
                  <div class="max-w-xs px-4 py-2.5 rounded-2xl text-sm" :class="msg.sender_id === user?.id ? 'bg-emerald-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'">
                    {{ msg.content }}
                  </div>
                </div>
                <div ref="chatEnd" />
              </div>
              <div class="p-4 border-t border-gray-100 dark:border-gray-700">
                <div class="flex gap-2">
                  <input v-model="newChatMessage" type="text" placeholder="Type a message..." class="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:border-emerald-400 transition" @keyup.enter="sendChatMessage" />
                  <button class="w-10 h-10 bg-emerald-500 hover:bg-emerald-600 rounded-xl flex items-center justify-center transition" @click="sendChatMessage">
                    <UIcon name="i-lucide-send" class="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
