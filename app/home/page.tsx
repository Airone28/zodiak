'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [insight, setInsight] = useState('')
  const [nome, setNome] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const caricaInsight = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        window.location.href = '/login'
        return
      }

      const { data: profilo } = await supabase
        .from('profiles')
        .select('nome')
        .eq('id', session.user.id)
        .single()

      if (profilo) setNome(profilo.nome)

      const response = await fetch('/api/genera-insight', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      })

      const data = await response.json()
      if (data.insight) setInsight(data.insight)
      setLoading(false)
    }

    caricaInsight()
  }, [])

  const oggi = new Date().toLocaleDateString('it-IT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  })

  return (
    <div className="min-h-screen bg-[#0a0a12] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-white/30 mb-1">Zodiak</p>
          <p className="text-xs text-white/30 capitalize">{oggi}</p>
          {nome && (
            <h1 className="text-2xl font-medium text-white/90 mt-3">
              Ciao, {nome} ✨
            </h1>
          )}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="text-xs uppercase tracking-widest text-white/30 mb-4">
            Il tuo insight di oggi
          </p>
          {loading ? (
            <div className="space-y-2">
              <div className="h-3 bg-white/10 rounded animate-pulse w-full"></div>
              <div className="h-3 bg-white/10 rounded animate-pulse w-4/5"></div>
              <div className="h-3 bg-white/10 rounded animate-pulse w-full"></div>
              <div className="h-3 bg-white/10 rounded animate-pulse w-3/5"></div>
            </div>
          ) : (
            <p className="text-sm text-white/80 leading-relaxed">
              {insight}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}