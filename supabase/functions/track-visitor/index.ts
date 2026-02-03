import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Get client IP from headers
    const forwardedFor = req.headers.get('x-forwarded-for')
    const realIp = req.headers.get('x-real-ip')
    const cfConnectingIp = req.headers.get('cf-connecting-ip')
    
    const clientIp = cfConnectingIp || forwardedFor?.split(',')[0]?.trim() || realIp || 'unknown'
    
    console.log('Tracking visitor with IP:', clientIp)

    // Try to insert visitor (will fail silently if IP already exists due to UNIQUE constraint)
    const { error: insertError } = await supabase
      .from('visitors')
      .upsert(
        { ip_address: clientIp },
        { onConflict: 'ip_address', ignoreDuplicates: true }
      )

    if (insertError) {
      console.error('Insert error:', insertError)
    }

    // Get total count
    const { count, error: countError } = await supabase
      .from('visitors')
      .select('*', { count: 'exact', head: true })

    if (countError) {
      console.error('Count error:', countError)
      throw countError
    }

    // Start from 4 as base count
    const baseCount = 4
    const totalCount = baseCount + (count || 0)

    console.log('Total visitors:', totalCount)

    return new Response(
      JSON.stringify({ count: totalCount, isNew: !insertError }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Error:', errorMessage)
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
