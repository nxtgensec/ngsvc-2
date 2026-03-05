import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const DEFAULT_ALLOWED_ORIGINS = ['http://localhost:8080', 'http://localhost:8081']
const ALLOWED_ORIGINS = (Deno.env.get('ALLOWED_ORIGINS') ?? DEFAULT_ALLOWED_ORIGINS.join(','))
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)
const ALLOW_ALL_ORIGINS = ALLOWED_ORIGINS.includes('*')

type RegistrationPayload = {
  teamName: string
  member1Name: string
  member1Email: string
  member1Contact: string
  member1Linkedin: string
  member1Github: string
  member1PostLink: string
  member2Name: string
  member2Email: string
  member2Contact: string
  member2Linkedin: string
  member2Github: string
  member2PostLink: string
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
    const payload = (await req.json()) as RegistrationPayload
    const teamName = payload.teamName?.trim()
    if (
      !teamName ||
      !payload.member1Name?.trim() ||
      !payload.member1Email?.trim() ||
      !payload.member1Contact?.trim() ||
      !payload.member1Linkedin?.trim() ||
      !payload.member1Github?.trim() ||
      !payload.member1PostLink?.trim() ||
      !payload.member2Name?.trim() ||
      !payload.member2Email?.trim() ||
      !payload.member2Contact?.trim() ||
      !payload.member2Linkedin?.trim() ||
      !payload.member2Github?.trim() ||
      !payload.member2PostLink?.trim()
    ) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase environment configuration')
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const { data: existingTeam, error: existingError } = await supabase
      .from('team_registrations')
      .select('id')
      .ilike('team_name', teamName)
      .maybeSingle()
    if (existingError) throw existingError
    if (existingTeam) {
      return new Response(JSON.stringify({ error: 'Team name already registered' }), {
        status: 409,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { error: insertError } = await supabase.from('team_registrations').insert({
      team_name: teamName,
      member1_name: payload.member1Name.trim(),
      member1_email: payload.member1Email.trim(),
      member1_contact: payload.member1Contact.trim(),
      member1_linkedin: payload.member1Linkedin.trim(),
      member1_github: payload.member1Github.trim(),
      member1_post_link: payload.member1PostLink.trim(),
      member2_name: payload.member2Name.trim(),
      member2_email: payload.member2Email.trim(),
      member2_contact: payload.member2Contact.trim(),
      member2_linkedin: payload.member2Linkedin.trim(),
      member2_github: payload.member2Github.trim(),
      member2_post_link: payload.member2PostLink.trim(),
      contact_number: null,
      organization: null,
      skills: null,
    })
    if (insertError) {
      if (insertError.code === '23505') {
        return new Response(JSON.stringify({ error: 'Team name already registered' }), {
          status: 409,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      throw insertError
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('submit-team-registration failed', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
