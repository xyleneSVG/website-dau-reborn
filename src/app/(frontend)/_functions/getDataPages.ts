'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { CACHE_EXPIRED_2_MIN, client, connectRedis } from "@/app/lib/redis"

export async function getDataPages(pathWithQuery: string) {
  const payload = await getPayload({ config: await configPromise })

  const url = new URL(`${process.env.NEXT_PUBLIC_SERVER_URL}${pathWithQuery}`)
  const pathname = url.pathname
  const rawLocale = url.searchParams.get('locale') ?? ''
  const locale = (['en', 'id'].includes(rawLocale) ? rawLocale : 'id') as 'en' | 'id'

  const cacheKey = `pageCache:${pathname}:${locale}`
  console.log(cacheKey)

  try {
    await connectRedis()

    const resultRedistCache = await client.get(cacheKey)

    if (resultRedistCache) {
      console.log("cache page ditemukan")
      // console.log(JSON.stringify(resultRedistCache))
      return JSON.parse(resultRedistCache)
    }

    const resultFind = await payload.find({
      collection: 'pages',
      where: { pageKey: { equals: pathname } },
      sort: 'createdAt',
      limit: 1,
      locale,
    })

    await client.set(cacheKey, JSON.stringify(resultFind.docs), {
      EX: CACHE_EXPIRED_2_MIN,
    })

    return resultFind.docs
  } catch (err) {
    console.error('❌ Redis Error:', err)
    const resultFind = await payload.find({
      collection: 'pages',
      where: { pageKey: { equals: pathname } },
      sort: 'createdAt',
      limit: 1,
      locale,
    })

    return resultFind.docs
  }
}
