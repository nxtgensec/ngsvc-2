import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const DEFAULT_ALLOWED_ORIGINS = ['http://localhost:8080', 'http://localhost:8081']
const ALLOWED_ORIGINS = (Deno.env.get('ALLOWED_ORIGINS') ?? DEFAULT_ALLOWED_ORIGINS.join(','))
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)
const ALLOW_ALL_ORIGINS = ALLOWED_ORIGINS.includes('*')

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
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
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

  if (req.method !== 'GET') {
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
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase environment configuration')
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    const { data, error } = await supabase
      .from('team_registrations')
      .select('team_name')
      .order('created_at', { ascending: false })
    if (error) throw error

    return new Response(JSON.stringify({ teams: data?.map((row) => row.team_name) ?? [] }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('list-team-names failed', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
