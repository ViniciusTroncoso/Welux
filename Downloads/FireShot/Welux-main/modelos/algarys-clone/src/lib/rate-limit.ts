interface RateLimitEntry {
  count: number
  reset: number
}

const store = new Map<string, RateLimitEntry>()

// Limpa entradas expiradas a cada 10 minutos para evitar memory leak
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of store.entries()) {
    if (now > entry.reset) store.delete(key)
  }
}, 10 * 60 * 1000).unref?.()

export function checkRateLimit(
  ip: string,
  opts: { max: number; windowMs: number } = { max: 15, windowMs: 60_000 }
): { allowed: boolean; remaining: number; retryAfter: number } {
  const now = Date.now()
  const entry = store.get(ip)

  if (!entry || now > entry.reset) {
    store.set(ip, { count: 1, reset: now + opts.windowMs })
    return { allowed: true, remaining: opts.max - 1, retryAfter: 0 }
  }

  if (entry.count >= opts.max) {
    return {
      allowed: false,
      remaining: 0,
      retryAfter: Math.ceil((entry.reset - now) / 1000),
    }
  }

  entry.count++
  return { allowed: true, remaining: opts.max - entry.count, retryAfter: 0 }
}
