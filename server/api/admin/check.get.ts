import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const supabase = createClient(config.public.supabaseUrl, config.supabaseServiceRoleKey)

  const auth = getHeader(event, 'authorization')
  if (!auth) return { isAdmin: false, debug: 'no auth header' }

  const token = auth.replace('Bearer ', '')
  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error || !user) return { isAdmin: false, debug: `getUser failed: ${error?.message}` }

  const { data: profile, error: profileError } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  return { isAdmin: profile?.role === 'admin', debug: `role=${profile?.role}, profileError=${profileError?.message}, userId=${user.id}` }
})
