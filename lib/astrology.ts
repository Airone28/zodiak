const ASTROLOGY_API_BASE = 'https://json.astrologyapi.com/v1'

function getHeaders() {
  const userId = process.env.ASTROLOGY_API_USER_ID
  const password = process.env.ASTROLOGY_API_PASSWORD
  const credentials = Buffer.from(`${userId}:${password}`).toString('base64')
  
  return {
    'Authorization': `Basic ${credentials}`,
    'Content-Type': 'application/json',
  }
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
    headers: getHeaders(),
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error(`Errore API astrologica: ${response.status}`)
  }

  return response.json()
}

export async function getTransitiOggi(
  latitudine: number,
  longitudine: number,
  fuso_orario: number = 1
) {
  const oggi = new Date()
  
  const body = {
    day: oggi.getDate(),
    month: oggi.getMonth() + 1,
    year: oggi.getFullYear(),
    hour: oggi.getHours(),
    min: oggi.getMinutes(),
    lat: latitudine,
    lon: longitudine,
    tzone: fuso_orario,
  }

  const response = await fetch(`${ASTROLOGY_API_BASE}/current_planets`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error(`Errore API astrologica: ${response.status}`)
  }

  return response.json()
}