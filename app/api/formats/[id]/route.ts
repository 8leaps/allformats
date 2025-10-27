import { type NextRequest, NextResponse } from "next/server"
import { contentFormats } from "@/lib/format-data"
import { rateLimit, getClientIP } from "@/lib/rate-limiter"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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

  const format = contentFormats.find((f) => f.id === params.id)

  if (!format) {
    return NextResponse.json({ error: "Format not found" }, { status: 404 })
  }

  return NextResponse.json(
    { format },
    {
      headers: {
        "X-RateLimit-Limit": rateLimitResult.limit.toString(),
        "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
        "X-RateLimit-Reset": new Date(rateLimitResult.reset).toISOString(),
      },
    },
  )
}
