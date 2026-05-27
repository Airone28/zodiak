'use client'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a12] flex items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        <p className="text-xs uppercase tracking-widest text-white/30 mb-2">Zodiak</p>
        <h1 className="text-2xl font-medium text-white/90 mb-4">Bentornata ✨</h1>
        <p className="text-sm text-white/40">Il tuo insight di oggi sarà presto disponibile.</p>
      </div>
    </div>
  )
}