import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const ALLOW_ALL_ORIGINS = true

function isAllowedOrigin(origin: string | null) {
  if (ALLOW_ALL_ORIGINS) return true
  return Boolean(origin)
}

function getCorsHeaders(origin: string | null) {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Cache-Control': 'no-store',
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
