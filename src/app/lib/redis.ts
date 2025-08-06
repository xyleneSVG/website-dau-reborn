import { createClient } from 'redis'

export const client = createClient({
  socket: {
    host: 'localhost',
    port: 6379,
  },
})

client.on('error', (err) => console.error('❌ Redis Client Error:', err))

let isConnected = false

export async function connectRedis() {
  if (!isConnected) {
    await client.connect()
    isConnected = true
  }
}

export const CACHE_EXPIRED_1_MIN = 60
export const CACHE_EXPIRED_2_MIN = 60 * 2
export const CACHE_EXPIRED_5_MIN = 60 * 5
export const CACHE_EXPIRED_15_MIN = 60 * 15
export const CACHE_EXPIRED_30_MIN = 60 * 30
export const CACHE_EXPIRED_1_HOUR = 60 * 60
export const CACHE_EXPIRED_1_DAY = 60 * 60 * 24
