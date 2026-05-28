'use client'

import { useState } from 'react'

export default function Test() {
  const [risultato, setRisultato] = useState('')
  const [loading, setLoading] = useState(false)

  const testAPI = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/test-astrology')
      const data = await response.json()
      setRisultato(JSON.stringify(data, null, 2))
    } catch (error) {
      setRisultato('Errore: ' + error)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0a0a12] p-8">
      <h1 className="text-white text-xl mb-4">Test API Astrologica</h1>
      <button
        onClick={testAPI}
        disabled={loading}
        className="bg-purple-600 text-white px-6 py-3 rounded-xl mb-6"
      >
        {loading ? 'Caricamento...' : 'Testa API'}
      </button>
      {risultato && (
        <pre className="text-green-400 text-xs overflow-auto bg-white/5 p-4 rounded-xl">
          {risultato}
        </pre>
      )}
    </div>
  )
}