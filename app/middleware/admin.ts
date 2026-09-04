export default defineNuxtRouteMiddleware(async () => {
  const user = useSupabaseUser()
  const supabase = useSupabaseClient()

  if (!user.value) return navigateTo('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.value.id)
    .single()

  if (profile?.role !== 'admin') return navigateTo('/dashboard')
})
