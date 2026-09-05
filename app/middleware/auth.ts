export default defineNuxtRouteMiddleware(async () => {
  const user = useSupabaseUser()
  const supabase = useSupabaseClient()

  // In SPA mode, session may not be restored yet — wait for it
  if (!user.value) {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return navigateTo('/login')
  }
})
