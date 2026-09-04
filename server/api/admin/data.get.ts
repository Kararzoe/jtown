import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const supabase = createClient(config.public.supabaseUrl, config.supabaseServiceRoleKey)

  const [{ data: users }, { data: products }, { data: orders }, { data: providers }] = await Promise.all([
    supabase.from('profiles').select('*').order('created_at', { ascending: false }),
    supabase.from('products').select('*, seller:profiles(full_name)').order('created_at', { ascending: false }),
    supabase.from('orders').select('*, product:products(title, price), buyer:profiles(full_name)').order('created_at', { ascending: false }),
    supabase.from('service_providers').select('*').order('created_at', { ascending: false }),
  ])

  return { users: users || [], products: products || [], orders: orders || [], providers: providers || [] }
})
