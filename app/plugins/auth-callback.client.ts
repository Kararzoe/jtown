// Runs before any page mounts — captures ?code= from URL and exchanges it
// Stores result in useState so reset-password.vue can read it instantly
export default defineNuxtPlugin(async () => {
  const supabase = useSupabaseClient()
  const authReady = useState<'idle' | 'ok' | 'error'>('auth-callback', () => 'idle')

  const params = new URLSearchParams(window.location.search)
  const code = params.get('code')

  if (!code) return

  // Only process on reset-password or confirm routes
  const path = window.location.pathname
  if (!path.includes('reset-password') && !path.includes('confirm')) return

  const { error } = await supabase.auth.exchangeCodeForSession(code)
  authReady.value = error ? 'error' : 'ok'

  // Clean the code from URL so it can't be reused
  window.history.replaceState(null, '', window.location.pathname)
})
