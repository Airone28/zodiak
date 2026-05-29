'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Test() {
  const [risultatoAPI, setRisultatoAPI] = useState('')
  const [risultatoInsight, setRisultatoInsight] = useState('')
  const [loadingAPI, setLoadingAPI] = useState(false)
  const [loadingInsight, setLoadingInsight] = useState(false)

  const testAPI = async () => {
    setLoadingAPI(true)
    try {
      const response = await fetch('/api/test-astrology')
      const data = await response.json()
      setRisultatoAPI(JSON.stringify(data, null, 2))
    } catch (error) {
      setRisultatoAPI('Errore: ' + error)
    }
    setLoadingAPI(false)
  }

  const testInsight = async () => {
    setLoadingInsight(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        setRisultatoInsight('Errore: devi essere loggato. Vai su /login prima.')
        setLoadingInsight(false)
        return
      }

      const response = await fetch('/api/genera-insight', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      })
      const data = await response.json()
      setRisultatoInsight(data.insight || JSON.stringify(data))
    } catch (error) {
      setRisultatoInsight('Errore: ' + error)
    }
    setLoadingInsight(false)
  }

  return (
    <div className="min-h-screen bg-[#0a0a12] p-8 space-y-8">
      <div>
        <h1 className="text-white text-xl mb-4">Test API Astrologica</h1>
        <button
          onClick={testAPI}
          disabled={loadingAPI}
          className="bg-purple-600 text-white px-6 py-3 rounded-xl mb-4"
        >
          {loadingAPI ? 'Caricamento...' : 'Testa Pianeti'}
        </button>
        {risultatoAPI && (
          <pre className="text-green-400 text-xs overflow-auto bg-white/5 p-4 rounded-xl">
            {risultatoAPI}
          </pre>
        )}
      </div>

      <div>
        <h1 className="text-white text-xl mb-4">Test Insight AI</h1>
        <button
          onClick={testInsight}
          disabled={loadingInsight}
          className="bg-purple-600 text-white px-6 py-3 rounded-xl mb-4"
        >
          {loadingInsight ? 'Generando insight...' : 'Genera Insight'}
        </button>
        {risultatoInsight && (
          <div className="text-white/80 text-sm bg-white/5 p-6 rounded-xl leading-relaxed">
            {risultatoInsight}
          </div>
        )}
      </div>
    </div>
  )
}