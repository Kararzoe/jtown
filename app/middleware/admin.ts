export default defineNuxtRouteMiddleware(async () => {
  const user = useSupabaseUser()
  const supabase = useSupabaseClient()

  // In SPA mode, session may not be restored yet — wait for it
  if (!user.value) {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return navigateTo('/login')
  }

  const uid = user.value?.id || (await supabase.auth.getSession()).data.session?.user.id
  if (!uid) return navigateTo('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', uid)
    .single()

  if (profile?.role !== 'admin') return navigateTo('/dashboard')
})
