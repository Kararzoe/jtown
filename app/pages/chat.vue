<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const chats = ref<any[]>([])
const selectedChat = ref<any>(null)
const messages = ref<any[]>([])
const newMessage = ref('')
const messagesEnd = ref<HTMLElement | null>(null)
const loading = ref(true)

onMounted(async () => {
  const { data } = await supabase
    .from('chats')
    .select('*, participants:profiles(*), product:products(*), messages(*)')
    .contains('participant_ids', [user.value?.id])
    .order('updated_at', { ascending: false })
  chats.value = data || []
  loading.value = false
})

const selectChat = async (chat: any) => {
  selectedChat.value = chat
  const { data } = await supabase
    .from('messages')
    .select('*, sender:profiles(*)')
    .eq('chat_id', chat.id)
    .order('created_at', { ascending: true })
  messages.value = data || []
  scrollToBottom()

  supabase.channel(`chat:${chat.id}`)
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `chat_id=eq.${chat.id}` }, (payload) => {
      messages.value.push(payload.new)
      scrollToBottom()
    })
    .subscribe()
}

const sendMessage = async () => {
  if (!newMessage.value.trim() || !selectedChat.value) return
  const content = newMessage.value.trim()
  newMessage.value = ''
  await supabase.from('messages').insert({
    chat_id: selectedChat.value.id,
    sender_id: user.value?.id,
    content
  })
  await supabase.from('chats').update({ updated_at: new Date().toISOString() }).eq('id', selectedChat.value.id)
}

const scrollToBottom = () => {
  nextTick(() => messagesEnd.value?.scrollIntoView({ behavior: 'smooth' }))
}

const otherParticipant = (chat: any) => {
  return chat.participants?.find((p: any) => p.id !== user.value?.id)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden" style="height: 70vh">
        <div class="flex h-full">
          <!-- Chat List -->
          <div class="w-full md:w-1/3 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
            <div class="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 class="text-xl font-bold text-gray-900 dark:text-white">Messages</h2>
            </div>
            <div v-if="loading" class="p-4 space-y-3">
              <div v-for="i in 4" :key="i" class="skeleton h-16 rounded-xl" />
            </div>
            <div v-else-if="chats.length === 0" class="p-8 text-center text-gray-500">
              <div class="text-4xl mb-2">💬</div>
              <p>No chats yet</p>
            </div>
            <div v-else>
              <button
                v-for="chat in chats"
                :key="chat.id"
                class="w-full p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition text-left"
                :class="selectedChat?.id === chat.id ? 'bg-emerald-50 dark:bg-emerald-900/20' : ''"
                @click="selectChat(chat)"
              >
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                    {{ otherParticipant(chat)?.full_name?.charAt(0) || '👤' }}
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="font-semibold text-gray-900 dark:text-white truncate">{{ otherParticipant(chat)?.full_name || 'User' }}</p>
                    <p class="text-sm text-gray-500 truncate">{{ chat.product?.title }}</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <!-- Message Area -->
          <div class="hidden md:flex flex-1 flex-col">
            <div v-if="!selectedChat" class="flex-1 flex items-center justify-center text-gray-400">
              <div class="text-center">
                <div class="text-5xl mb-3">💬</div>
                <p>Select a chat to start messaging</p>
              </div>
            </div>

            <template v-else>
              <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 class="font-bold text-gray-900 dark:text-white">{{ otherParticipant(selectedChat)?.full_name }}</h3>
                <p class="text-sm text-gray-500">{{ selectedChat.product?.title }}</p>
              </div>

              <div class="flex-1 overflow-y-auto p-4 space-y-3">
                <div
                  v-for="(msg, i) in messages"
                  :key="i"
                  class="flex"
                  :class="msg.sender_id === user?.id ? 'justify-end' : 'justify-start'"
                >
                  <div
                    class="max-w-xs px-4 py-2 rounded-2xl text-sm"
                    :class="msg.sender_id === user?.id ? 'bg-emerald-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'"
                  >
                    {{ msg.content }}
                  </div>
                </div>
                <div ref="messagesEnd" />
              </div>

              <div class="p-4 border-t border-gray-200 dark:border-gray-700">
                <div class="flex gap-2">
                  <UInput
                    v-model="newMessage"
                    placeholder="Type a message..."
                    class="flex-1"
                    @keyup.enter="sendMessage"
                  />
                  <UButton color="primary" icon="i-lucide-send" @click="sendMessage" />
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
