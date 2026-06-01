'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import posthog from 'posthog-js'

export default function Onboarding() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errore, setErrore] = useState('')
  const [form, setForm] = useState({
    nome: '',
    data_nascita: '',
    ora_nascita: '',
    luogo_nascita: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrore('')
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setErrore('Devi essere registrato per continuare.')
      setLoading(false)
      return
    }
    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      nome: form.nome,
      data_nascita: form.data_nascita,
      ora_nascita: form.ora_nascita,
      luogo_nascita: form.luogo_nascita,
    })
    if (error) {
      setErrore('Errore nel salvataggio. Riprova.')
      setLoading(false)
      return
    }

    posthog.identify(user.id, {
      nome: form.nome,
      data_nascita: form.data_nascita,
      luogo_nascita: form.luogo_nascita,
    })
    posthog.capture('onboarding_completed', {
      luogo_nascita: form.luogo_nascita,
      ora_nascita_provided: !!form.ora_nascita,
    })
    router.push('/home')
  }

  return (
    <div className="min-h-screen bg-[#0a0a12] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-white/30 mb-2">Zodiak</p>
          <h1 className="text-2xl font-medium text-white/90">Benvenuta</h1>
          <p className="text-sm text-white/40 mt-2">Inserisci i tuoi dati di nascita per generare il tuo tema natale.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs uppercase tracking-widest text-white/30 block mb-2">Nome</label>
            <input name="nome" type="text" placeholder="Il tuo nome" value={form.nome} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/90 text-sm placeholder:text-white/20 outline-none focus:border-white/30 transition" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-white/30 block mb-2">Data di nascita</label>
            <input name="data_nascita" type="date" value={form.data_nascita} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/90 text-sm outline-none focus:border-white/30 transition" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-white/30 block mb-2">Ora di nascita</label>
            <input name="ora_nascita" type="time" value={form.ora_nascita} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/90 text-sm outline-none focus:border-white/30 transition" />
            <p className="text-xs text-white/20 mt-1">Approssimativa va bene</p>
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-white/30 block mb-2">Luogo di nascita</label>
            <input name="luogo_nascita" type="text" placeholder="Milano, Italia" value={form.luogo_nascita} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/90 text-sm placeholder:text-white/20 outline-none focus:border-white/30 transition" />
          </div>
          {errore && <p className="text-red-400 text-sm">{errore}</p>}
          <button type="submit" disabled={loading} className="w-full bg-white/10 border border-purple-400/40 rounded-xl py-4 text-purple-200 text-sm font-medium mt-4 hover:bg-white/15 transition disabled:opacity-50">
            {loading ? 'Caricamento...' : 'Calcola il mio tema natale →'}
          </button>
        </form>
      </div>
    </div>
  )
}