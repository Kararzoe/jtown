import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceKey) return { isAdmin: false }

  const auth = getHeader(event, 'authorization')
  if (!auth) return { isAdmin: false }

  const supabase = createClient('https://mtqggkguwshvpdbiwbup.supabase.co', serviceKey)
  const token = auth.replace('Bearer ', '')
  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error || !user) return { isAdmin: false }

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  return { isAdmin: profile?.role === 'admin' }
})
