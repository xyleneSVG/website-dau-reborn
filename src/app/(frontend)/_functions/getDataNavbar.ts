'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { CACHE_EXPIRED_2_MIN, client } from '@/app/lib/redis'

export async function getDataNavbar(pathWithQuery: string) {
  const payload = await getPayload({ config: await configPromise })

  const url = new URL(`${process.env.NEXT_PUBLIC_SERVER_URL}${pathWithQuery}`)
  const pathname = url.pathname
  const rawLocale = url.searchParams.get('locale') ?? ''
  const locale = (['en', 'id'].includes(rawLocale) ? rawLocale : 'id') as 'en' | 'id'
  const cacheKey = `navbarCache:${pathname}:${locale}`

  try {
    const resultRedistCache = await client.get(cacheKey)
    if (resultRedistCache) {
      const parsedCache = JSON.parse(resultRedistCache)
      // console.log(parsedCache)
      return parsedCache
    }
  } catch (err) {
    console.error('Redis error (navbar get):', err)
  }

  const resultFind = await payload.find({
    collection: 'navbar',
    where: { active: { equals: true } },
    sort: '-createdAt',
    limit: 1,
    locale,
  })
  const navbar = resultFind?.docs?.[0]
  if (navbar) {
    try {
      await client.set(cacheKey, JSON.stringify(navbar), { EX: CACHE_EXPIRED_2_MIN })
    } catch (err) {
      console.error('Redis error (navbar set):', err)
    }
  }
  return navbar ?? null
}
