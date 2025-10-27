import { type NextRequest, NextResponse } from "next/server"
import { contentFormats, categories } from "@/lib/format-data"
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

  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const search = searchParams.get("search")
  const platform = searchParams.get("platform")
  const limit = searchParams.get("limit")
  const offset = searchParams.get("offset")

  let filteredFormats = [...contentFormats]

  // Filter by category
  if (category && category !== "all") {
    filteredFormats = filteredFormats.filter((format) => format.category === category)
  }

  // Filter by platform
  if (platform) {
    filteredFormats = filteredFormats.filter((format) => format.platform.toLowerCase().includes(platform.toLowerCase()))
  }

  // Search functionality
  if (search) {
    const searchTerm = search.toLowerCase()
    filteredFormats = filteredFormats.filter(
      (format) =>
        format.name.toLowerCase().includes(searchTerm) ||
        format.platform.toLowerCase().includes(searchTerm) ||
        format.description.toLowerCase().includes(searchTerm),
    )
  }

  // Pagination
  const limitNum = limit ? Number.parseInt(limit) : undefined
  const offsetNum = offset ? Number.parseInt(offset) : 0

  const total = filteredFormats.length

  if (limitNum) {
    filteredFormats = filteredFormats.slice(offsetNum, offsetNum + limitNum)
  }

  return NextResponse.json(
    {
      formats: filteredFormats,
      total,
      categories,
      pagination: {
        offset: offsetNum,
        limit: limitNum,
        hasMore: limitNum ? offsetNum + limitNum < total : false,
      },
    },
    {
      headers: {
        "X-RateLimit-Limit": rateLimitResult.limit.toString(),
        "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
        "X-RateLimit-Reset": new Date(rateLimitResult.reset).toISOString(),
      },
    },
  )
}
