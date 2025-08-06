import { createClient } from 'redis'

export const client = createClient({
  username: 'default',
  password: 'WxSQbrii5Yh9A3hHBA2DF8ajEvk3k0HY',
  socket: {
    host: 'redis-19377.c295.ap-southeast-1-1.ec2.redns.redis-cloud.com',
    port: 19377,
  },
})

client.on('error', (err) => console.log('Redis Client Error', err))

await client.connect()

export const CACHE_EXPIRED_1_MIN = 60
export const CACHE_EXPIRED_2_MIN = 60 * 2
export const CACHE_EXPIRED_5_MIN = 60 * 5
export const CACHE_EXPIRED_15_MIN = 60 * 15 
export const CACHE_EXPIRED_30_MIN = 60 * 30
export const CACHE_EXPIRED_1_HOUR = 60 * 60
export const CACHE_EXPIRED_1_DAY = 60 * 60 * 24
