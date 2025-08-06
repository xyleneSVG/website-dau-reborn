import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST(req: Request) {
  const payload = await getPayload({ config: await configPromise })
  const body = await req.json()

  try {
    const result = await payload.create({
      collection: 'reciveMessage',
      data: {
        recivedData: body,
      },
      depth: 1,
    })

    return NextResponse.json(result)
  } catch (err) {
    console.error('Payload create error:', err)
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 })
  }
}
