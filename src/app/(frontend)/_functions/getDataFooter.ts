'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { CACHE_EXPIRED_2_MIN, client, connectRedis } from '@/app/lib/redis'

export async function getDataFooter(pathWithQuery: string) {
  const payload = await getPayload({ config: await configPromise })

  const url = new URL(`${process.env.NEXT_PUBLIC_SERVER_URL}${pathWithQuery}`)
  const rawLocale = url.searchParams.get('locale') ?? ''
  const locale = (['en', 'id'].includes(rawLocale) ? rawLocale : 'id') as 'en' | 'id'
  const cacheKey = `footerCache:${locale}`

  try {
    await connectRedis()
    
    const resultRedistCache = await client.get(cacheKey)
    if (resultRedistCache) {
      console.log("cache footer ditemukan")
      const parsedCache = JSON.parse(resultRedistCache)
      return parsedCache
    }
  } catch (err) {
    console.error('Redis error (footer get):', err)
  }

  const resultFind = await payload.find({
    collection: 'footer',
    where: { active: { equals: true } },
    sort: '-createdAt',
    limit: 1,
    locale,
  })

  const footer = resultFind?.docs?.[0]
  if (footer) {
    try {
      await client.set(cacheKey, JSON.stringify(footer), { EX: CACHE_EXPIRED_2_MIN })
    } catch (err) {
      console.error('Redis error (footer set):', err)
    }
  }

  return footer ?? null
}
