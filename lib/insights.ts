import Anthropic from '@anthropic-ai/sdk'
import { getTemanatale, getTransitiOggi } from './astrology'

export async function generaInsight(profilo: {
  nome: string
  data_nascita: string
  ora_nascita: string
  latitudine: number
  longitudine: number
}) {
  console.log('API KEY presente:', !!process.env.ANTHROPIC_API_KEY)

  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY!,
  })

  const dataNascita = new Date(profilo.data_nascita)
  const [ore, minuti] = profilo.ora_nascita.split(':').map(Number)

  const [temanatale, transiti] = await Promise.all([
    getTemanatale(
      dataNascita.getDate(),
      dataNascita.getMonth() + 1,
      dataNascita.getFullYear(),
      ore,
      minuti,
      profilo.latitudine,
      profilo.longitudine
    ),
    getTransitiOggi(profilo.latitudine, profilo.longitudine),
  ])

  const pianeti = temanatale
    .slice(0, 7)
    .map((p: any) => `${p.name} in ${p.sign} (Casa ${p.house})`)
    .join(', ')

  const transitiOggi = transiti
    .slice(0, 5)
    .map((p: any) => `${p.name} in ${p.sign}`)
    .join(', ')

  const prompt = `Sei un astrologo psicologico italiano, preciso e profondo. Il tuo stile è simile a Co-Star: diretto, introspettivo, mai banale.

L'utente si chiama ${profilo.nome}.

Il suo tema natale:
${pianeti}

Posizioni planetarie di oggi:
${transitiOggi}

Scrivi un insight giornaliero personalizzato di 3-4 frasi per ${profilo.nome}. 
- Collega le posizioni di oggi al suo tema natale
- Usa un tono psicologico e riflessivo, non superficiale
- Parla direttamente a ${profilo.nome} usando "tu"
- Niente emoji, niente titoli, solo testo
- Scrivi in italiano`

  const message = await anthropic.messages.create({
    model: 'claude-haiku-4-5',
    max_tokens: 300,
    messages: [{ role: 'user', content: prompt }],
  })

  return (message.content[0] as any).text
}