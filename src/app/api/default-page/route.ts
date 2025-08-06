import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

export async function GET() {
  const payload = await getPayload({ config: await configPromise })

  const result = await payload.find({
    collection: 'pages',
    where: {
      pageDefault: {
        equals: true,
      },
    },
    sort: '-createdAt',
    limit: 1,
  })

  const page = result.docs?.[0]

  return NextResponse.json({ pageKey: page?.pageKey || null })
}
