export default defineNuxtRouteMiddleware(async () => {
  const supabase = useSupabaseClient()

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return navigateTo('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single()

  if (profile?.role !== 'admin') return navigateTo('/dashboard')
})
