const ASTROLOGY_API_BASE = 'https://json.astrologyapi.com/v1'
const ASTROLOGY_API_TOKEN = process.env.ASTROLOGY_API_TOKEN!

const headers = {
  'Authorization': `Bearer ${ASTROLOGY_API_TOKEN}`,
  'Content-Type': 'application/json',
}

export async function getTemanatale(
  giorno: number,
  mese: number,
  anno: number,
  ora: number,
  minuti: number,
  latitudine: number,
  longitudine: number,
  fuso_orario: number = 1
) {
  const body = {
    day: giorno,
    month: mese,
    year: anno,
    hour: ora,
    min: minuti,
    lat: latitudine,
    lon: longitudine,
    tzone: fuso_orario,
  }

  const response = await fetch(`${ASTROLOGY_API_BASE}/planets`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error(`Errore API astrologica: ${response.status}`)
  }

  return response.json()
}

export async function getTransitiOggi(
  giorno: number,
  mese: number,
  anno: number,
  ora: number,
  minuti: number,
  latitudine: number,
  longitudine: number,
  fuso_orario: number = 1
) {
  const body = {
    day: giorno,
    month: mese,
    year: anno,
    hour: ora,
    min: minuti,
    lat: latitudine,
    lon: longitudine,
    tzone: fuso_orario,
  }

  const response = await fetch(`${ASTROLOGY_API_BASE}/current_planets`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error(`Errore API astrologica: ${response.status}`)
  }

  return response.json()
}