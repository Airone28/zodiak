import { NextRequest, NextResponse } from 'next/server'
import { generaInsight } from '@/lib/insights'
import { createClient } from '@supabase/supabase-js'
import { getPostHogClient } from '@/lib/posthog-server'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization')
    
    if (!authHeader) {
      return NextResponse.json({ errore: 'Non autenticato' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      }
    )

    const { data: { user }, error: userError } = await supabase.auth.getUser(token)

    if (userError || !user) {
      return NextResponse.json({ errore: 'Token non valido: ' + userError?.message }, { status: 401 })
    }

    const { data: profilo, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError || !profilo) {
      return NextResponse.json({ errore: 'Profilo non trovato: ' + profileError?.message }, { status: 404 })
    }

    const oggi = new Date().toISOString().split('T')[0]

    const { data: insightEsistente } = await supabase
      .from('insights')
      .select('testo')
      .eq('user_id', user.id)
      .eq('data', oggi)
      .single()

    if (insightEsistente) {
      return NextResponse.json({ insight: insightEsistente.testo })
    }

    const testo = await generaInsight(profilo)

    await supabase.from('insights').insert({
      user_id: user.id,
      data: oggi,
      testo,
    })

    const posthog = getPostHogClient()
    posthog.capture({
      distinctId: user.id,
      event: 'insight_generated',
      properties: { luogo_nascita: profilo.luogo_nascita },
    })

    return NextResponse.json({ insight: testo })

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('ERRORE GENERA INSIGHT:', error)
    const posthog = getPostHogClient()
    posthog.capture({
      distinctId: 'server',
      event: 'insight_generation_failed',
      properties: { error: message },
    })
    return NextResponse.json({ errore: message }, { status: 500 })
  }
}