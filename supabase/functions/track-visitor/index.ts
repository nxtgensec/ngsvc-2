import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const DEFAULT_ALLOWED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:8081',
]
const ALLOWED_ORIGINS = (Deno.env.get('ALLOWED_ORIGINS') ?? DEFAULT_ALLOWED_ORIGINS.join(','))
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)
const VISITOR_HASH_SALT = Deno.env.get('VISITOR_HASH_SALT')
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_REQUESTS = 30
const requestLog = new Map<string, number[]>()

function getCorsHeaders(origin: string | null) {
  const isAllowed = origin !== null && ALLOWED_ORIGINS.includes(origin)
  return {
    ...(isAllowed ? { 'Access-Control-Allow-Origin': origin } : {}),
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    Vary: 'Origin',
  }
}

function isValidIp(ip: string) {
  const ipv4 = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/
  const ipv6 = /^[0-9a-fA-F:]+$/
  return ipv4.test(ip) || ipv6.test(ip)
}

async function sha256(value: string) {
  const encoded = new TextEncoder().encode(value)
  const hash = await crypto.subtle.digest('SHA-256', encoded)
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

function isRateLimited(key: string) {
  const now = Date.now()
  const previous = requestLog.get(key) ?? []
  const inWindow = previous.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS)
  if (inWindow.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(key, inWindow)
    return true
  }
  inWindow.push(now)
  requestLog.set(key, inWindow)
  return false
}

Deno.serve(async (req) => {
  const origin = req.headers.get('origin')
  const originAllowed = origin !== null && ALLOWED_ORIGINS.includes(origin)
  const corsHeaders = getCorsHeaders(origin)

  if (req.method === 'OPTIONS') {
    if (!originAllowed) {
      return new Response('forbidden', { status: 403, headers: corsHeaders })
    }
    return new Response('ok', { status: 204, headers: corsHeaders })
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

  if (!VISITOR_HASH_SALT) {
    console.error('VISITOR_HASH_SALT is not configured.')
    return new Response(JSON.stringify({ error: 'Service unavailable' }), {
      status: 503,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  try {
    const forwardedFor = req.headers.get('x-forwarded-for')
    const clientIp = forwardedFor?.split(',')[0]?.trim()
    if (!clientIp || !isValidIp(clientIp)) {
      return new Response(JSON.stringify({ error: 'Invalid client address' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const ipHash = await sha256(`${VISITOR_HASH_SALT}:${clientIp}`)
    if (isRateLimited(ipHash)) {
      return new Response(JSON.stringify({ error: 'Too many requests' }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase environment configuration')
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const { error: upsertError } = await supabase
      .from('visitors')
      .upsert(
        { ip_hash: ipHash },
        { onConflict: 'ip_hash', ignoreDuplicates: true },
      )
    if (upsertError) {
      throw upsertError
    }

    const { count, error: countError } = await supabase
      .from('visitors')
      .select('*', { count: 'exact', head: true })
    if (countError) {
      throw countError
    }

    const baseCount = 4
    const totalCount = baseCount + (count || 0)
    return new Response(JSON.stringify({ count: totalCount }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('track-visitor failed', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
