'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import posthog from 'posthog-js'

export default function Login() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errore, setErrore] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrore('')

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) {
        posthog.capture('login_failed', { email })
        setErrore('Email o password non corretti.')
        setLoading(false)
        return
      }

      posthog.identify(data.user.id, { email: data.user.email })
      posthog.capture('user_logged_in', { email })

      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', data.user.id)
        .single()

      if (profile) {
        router.push('/home')
      } else {
        router.push('/onboarding')
      }
  }

  return (
    <div className="min-h-screen bg-[#0a0a12] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-white/30 mb-2">Zodiak</p>
          <h1 className="text-2xl font-medium text-white/90">Bentornata</h1>
          <p className="text-sm text-white/40 mt-2">Accedi al tuo profilo astrologico.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs uppercase tracking-widest text-white/30 block mb-2">Email</label>
            <input
              type="email"
              placeholder="la@tua.email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/90 text-sm placeholder:text-white/20 outline-none focus:border-white/30 transition"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-white/30 block mb-2">Password</label>
            <input
              type="password"
              placeholder="La tua password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/90 text-sm placeholder:text-white/20 outline-none focus:border-white/30 transition"
            />
          </div>

          {errore && <p className="text-red-400 text-sm">{errore}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white/10 border border-purple-400/40 rounded-xl py-4 text-purple-200 text-sm font-medium mt-4 hover:bg-white/15 transition disabled:opacity-50"
          >
            {loading ? 'Caricamento...' : 'Accedi →'}
          </button>
        </form>

        <p className="text-sm text-white/30 text-center mt-8">
          Non hai un account?{' '}
          <Link href="/registrati" className="text-purple-300 hover:text-purple-200">
            Registrati
          </Link>
        </p>
      </div>
    </div>
  )
}