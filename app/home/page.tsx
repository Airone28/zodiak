'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

function Stelle() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 80 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() > 0.8 ? '2px' : '1px',
            height: Math.random() > 0.8 ? '2px' : '1px',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.6 + 0.1,
            animation: `pulse ${2 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  )
}

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
    <div className="min-h-screen bg-[#07070f] flex items-center justify-center px-6 relative">
      <Stelle />

      <div className="w-full max-w-sm relative z-10">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-1">
            Zodiak
          </p>
          <p className="text-sm text-white/40 capitalize mb-4">
            {oggi}
          </p>
          {nome && (
           <h1 className="text-4xl font-light text-white"
           style={{ fontFamily: 'var(--font-cormorant)', letterSpacing: '0.02em' }}>
         Ciao, {nome}
       </h1>
          )}
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
          <div className="border border-white/10 rounded-2xl p-6 bg-white/[0.04]">
            <p className="text-xs uppercase tracking-[0.15em] text-white/40 mb-5">
              Il tuo insight di oggi
            </p>
            {loading ? (
              <div className="space-y-3">
                <div className="h-2 bg-white/8 rounded-full animate-pulse w-full"></div>
                <div className="h-2 bg-white/8 rounded-full animate-pulse w-5/6"></div>
                <div className="h-2 bg-white/8 rounded-full animate-pulse w-full"></div>
                <div className="h-2 bg-white/8 rounded-full animate-pulse w-4/6"></div>
              </div>
            ) : (
              <p className="text-white/90 leading-[1.5]"
              style={{ fontFamily: 'var(--font-cormorant)', fontSize: '0.95rem' }}>
             {insight}
           </p>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-6">
          <div className="text-center">
            <p className="text-xs text-white/35 uppercase tracking-widest mb-1">Segno</p>
            <p className="text-white/70"
               style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem' }}>
              Sagittario
            </p>
          </div>
          <div className="w-px bg-white/10"></div>
          <div className="text-center">
            <p className="text-xs text-white/35 uppercase tracking-widest mb-1">Luna</p>
            <p className="text-white/70"
               style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem' }}>
              Vergine
            </p>
          </div>
          <div className="w-px bg-white/10"></div>
          <div className="text-center">
            <p className="text-xs text-white/35 uppercase tracking-widest mb-1">Ascendente</p>
            <p className="text-white/70"
               style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem' }}>
              —
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}