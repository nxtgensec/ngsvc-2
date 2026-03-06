import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const DEFAULT_ALLOWED_ORIGINS = ['http://localhost:8080', 'http://localhost:8081']
const ALLOWED_ORIGINS = (Deno.env.get('ALLOWED_ORIGINS') ?? DEFAULT_ALLOWED_ORIGINS.join(','))
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)
const ALLOW_ALL_ORIGINS = ALLOWED_ORIGINS.includes('*')

const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL') ?? 'vibecoding@gmail.com'
const ADMIN_PASSWORD = Deno.env.get('ADMIN_PASSWORD') ?? 'vc@vc@'

type AdminPayload = {
  email: string
  password: string
  action: 'list' | 'delete' | 'update'
  id?: string
  updates?: {
    team_name?: string
    member1_name?: string
    member1_email?: string
    member1_contact?: string
    member1_college?: string
    member1_year?: string
    member1_department?: string
    member1_linkedin?: string
    member1_github?: string
    member1_post_link?: string
    member2_name?: string
    member2_email?: string
    member2_contact?: string
    member2_college?: string
    member2_year?: string
    member2_department?: string
    member2_linkedin?: string
    member2_github?: string
    member2_post_link?: string
  }
}

function isAllowedOrigin(origin: string | null) {
  if (!origin) return false
  if (ALLOW_ALL_ORIGINS || ALLOWED_ORIGINS.includes(origin)) return true

  try {
    const parsed = new URL(origin)
    if (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1') return true
    if ((parsed.hostname.startsWith('192.168.') || parsed.hostname.startsWith('10.')) && (parsed.port === '8080' || parsed.port === '8081')) {
      return true
    }
  } catch {
    return false
  }

  return false
}

function getCorsHeaders(origin: string | null) {
  const isAllowed = isAllowedOrigin(origin)
  return {
    ...(ALLOW_ALL_ORIGINS ? { 'Access-Control-Allow-Origin': '*' } : {}),
    ...(!ALLOW_ALL_ORIGINS && isAllowed && origin ? { 'Access-Control-Allow-Origin': origin } : {}),
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    Vary: 'Origin',
  }
}

Deno.serve(async (req) => {
  const origin = req.headers.get('origin')
  const corsHeaders = getCorsHeaders(origin)
  const originAllowed = isAllowedOrigin(origin)

  if (req.method === 'OPTIONS') {
    return new Response('ok', { status: originAllowed ? 204 : 403, headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  if (!originAllowed) {
    return new Response(JSON.stringify({ error: 'Forbidden origin' }), {
      status: 403,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  try {
    const payload = (await req.json()) as AdminPayload
    if (payload.email !== ADMIN_EMAIL || payload.password !== ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase environment configuration')
    }
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    if (payload.action === 'delete') {
      if (!payload.id) {
        return new Response(JSON.stringify({ error: 'Missing registration id' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      const { error: deleteError } = await supabase
        .from('team_registrations')
        .delete()
        .eq('id', payload.id)
      if (deleteError) throw deleteError
    }

    if (payload.action === 'update') {
      if (!payload.id) {
        return new Response(JSON.stringify({ error: 'Missing registration id' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      const updates = payload.updates ?? {}
      const normalize = (value: string | undefined) => (typeof value === 'string' ? value.trim() : '')
      const updatePayload = {
        team_name: normalize(updates.team_name),
        member1_name: normalize(updates.member1_name),
        member1_email: normalize(updates.member1_email),
        member1_contact: normalize(updates.member1_contact),
        member1_college: normalize(updates.member1_college),
        member1_year: normalize(updates.member1_year),
        member1_department: normalize(updates.member1_department),
        member1_linkedin: normalize(updates.member1_linkedin),
        member1_github: normalize(updates.member1_github),
        member1_post_link: normalize(updates.member1_post_link),
        member2_name: normalize(updates.member2_name),
        member2_email: normalize(updates.member2_email),
        member2_contact: normalize(updates.member2_contact),
        member2_college: normalize(updates.member2_college),
        member2_year: normalize(updates.member2_year),
        member2_department: normalize(updates.member2_department),
        member2_linkedin: normalize(updates.member2_linkedin),
        member2_github: normalize(updates.member2_github),
        member2_post_link: normalize(updates.member2_post_link),
      }

      const { error: updateError } = await supabase
        .from('team_registrations')
        .update(updatePayload)
        .eq('id', payload.id)
      if (updateError) throw updateError
    }

    const { data, error } = await supabase
      .from('team_registrations')
      .select(
        'id,team_name,member1_name,member1_email,member1_contact,member1_college,member1_year,member1_department,member1_linkedin,member1_github,member1_post_link,member2_name,member2_email,member2_contact,member2_college,member2_year,member2_department,member2_linkedin,member2_github,member2_post_link,created_at',
      )
      .order('created_at', { ascending: false })
    if (error) throw error

    return new Response(JSON.stringify({ records: data ?? [] }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('admin-registrations failed', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
