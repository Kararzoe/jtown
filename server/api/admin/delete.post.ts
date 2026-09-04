import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const supabase = createClient(config.public.supabaseUrl, config.supabaseServiceRoleKey)
  const { table, id } = await readBody(event)

  const { error } = await supabase.from(table).delete().eq('id', id)
  if (error) throw createError({ statusCode: 500, message: error.message })
  return { ok: true }
})
