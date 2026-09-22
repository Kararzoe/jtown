export default defineNuxtRouteMiddleware(async () => {
  const supabase = useSupabaseClient()

  let session = null
  for (let i = 0; i < 5; i++) {
    const { data } = await supabase.auth.getSession()
    if (data.session) { session = data.session; break }
    await new Promise(r => setTimeout(r, 400))
  }

  if (!session) return navigateTo('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single()

  if (profile?.role !== 'admin') return navigateTo('/dashboard')
})
