import { NextResponse } from 'next/server'

export async function GET() {
  const userId = process.env.ASTROLOGY_API_USER_ID
  const password = process.env.ASTROLOGY_API_PASSWORD
  
  const credentials = Buffer.from(`${userId}:${password}`).toString('base64')

  const body = {
    day: 28,
    month: 12,
    year: 1991,
    hour: 21,
    min: 0,
    lat: 44.4056,
    lon: 8.9463,
    tzone: 1,
  }

  try {
    const response = await fetch('https://json.astrologyapi.com/v1/planets', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ errore: String(error) }, { status: 500 })
  }
}