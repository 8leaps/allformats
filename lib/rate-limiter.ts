// Simple in-memory rate limiter
interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()

export function rateLimit(
  identifier: string,
  limit = 100, // requests per window
  windowMs: number = 60 * 1000, // 1 minute window
): { success: boolean; limit: number; remaining: number; reset: number } {
  const now = Date.now()
  const entry = rateLimitMap.get(identifier)

  // Clean up expired entries periodically
  if (Math.random() < 0.01) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetTime) {
        rateLimitMap.delete(key)
      }
    }
  }

  if (!entry || now > entry.resetTime) {
    // First request or window expired
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    })
    return {
      success: true,
      limit,
      remaining: limit - 1,
      reset: now + windowMs,
    }
  }

  if (entry.count >= limit) {
    // Rate limit exceeded
    return {
      success: false,
      limit,
      remaining: 0,
      reset: entry.resetTime,
    }
  }

  // Increment count
  entry.count++
  rateLimitMap.set(identifier, entry)

  return {
    success: true,
    limit,
    remaining: limit - entry.count,
    reset: entry.resetTime,
  }
}

export function getClientIP(request: Request): string {
  // Try to get real IP from headers (Vercel provides these)
  const forwarded = request.headers.get("x-forwarded-for")
  const realIP = request.headers.get("x-real-ip")

  if (forwarded) {
    return forwarded.split(",")[0].trim()
  }

  if (realIP) {
    return realIP
  }

  // Fallback
  return "unknown"
}
