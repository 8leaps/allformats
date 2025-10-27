import { type NextRequest, NextResponse } from "next/server"
import { contentFormats } from "@/lib/format-data"
import { rateLimit, getClientIP } from "@/lib/rate-limiter"

export async function GET(request: NextRequest) {
  const clientIP = getClientIP(request)
  const rateLimitResult = rateLimit(clientIP, 100, 60 * 1000) // 100 requests per minute

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Please try again later." },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": rateLimitResult.limit.toString(),
          "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
          "X-RateLimit-Reset": new Date(rateLimitResult.reset).toISOString(),
        },
      },
    )
  }

  // Get unique platforms
  const platforms = [...new Set(contentFormats.map((format) => format.platform))].sort().map((platform) => ({
    name: platform,
    count: contentFormats.filter((f) => f.platform === platform).length,
  }))

  return NextResponse.json(
    { platforms },
    {
      headers: {
        "X-RateLimit-Limit": rateLimitResult.limit.toString(),
        "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
        "X-RateLimit-Reset": new Date(rateLimitResult.reset).toISOString(),
      },
    },
  )
}
