import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const serviceKey = config.supabaseServiceRoleKey || process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  const supabase = createClient('https://mtqggkguwshvpdbiwbup.supabase.co', serviceKey)

  const auth = getHeader(event, 'authorization')
  if (!auth) return { isAdmin: false }

  const token = auth.replace('Bearer ', '')
  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error || !user) return { isAdmin: false }

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  return { isAdmin: profile?.role === 'admin' }
})
