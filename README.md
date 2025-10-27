# All Formats

> A comprehensive digital content format specifications library for social media, video platforms, e-commerce, and more.

[![Website](https://img.shields.io/badge/Website-allformats.xyz-blue?style=for-the-badge)](https://allformats.xyz)
[![API](https://img.shields.io/badge/API-Free-black?style=for-the-badge)](https://allformats.xyz)

## 🚀 Quick Start

### 1. Use the Hosted App & API

Visit [allformats.xyz](https://allformats.xyz) to browse 100+ digital format specifications across social media, video platforms, e-commerce, advertising, print, and more.

**Free API Access** - No API key required

```bash
# Get all formats
curl https://allformats.xyz/api/formats

# Search for Instagram formats
curl https://allformats.xyz/api/formats?platform=Instagram

# Get specific format details
curl https://allformats.xyz/api/formats/instagram-post
```

Rate Limit: 100 requests per minute per IP

### 2. Self-Host the Application

Clone and run locally or deploy your own instance:

```bash
# Clone the repository
git clone https://github.com/yourusername/allformats.git
cd allformats

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Deploy to Production:**

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

Or deploy to Vercel, Netlify, or any Next.js hosting platform:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/allformats)

### 3. Contribute to the Project

This is a public repository - contributions are welcome! Help us expand the format library or improve the application.

**How to Contribute:**

1. Fork the repository
2. Create a feature branch
3. Add new formats or improve existing ones in `lib/format-data.ts`
4. Submit a pull request

**Adding a New Format:**

```typescript
{
  id: "platform-format-name",
  name: "Format Name",
  platform: "Platform Name",
  category: "social-media", // or messaging, video, ecommerce, etc.
  width: 1080,
  height: 1080,
  aspectRatio: "1:1",
  description: "Description of this format",
  fileTypes: ["JPG", "PNG"],
  maxFileSize: "30MB",
  safeZone: { top: 50, bottom: 50, left: 50, right: 50 } // optional
}
```

## 📊 What's Included

- **100+ Format Specifications** across 10+ categories
- **Social Media**: Instagram, Facebook, Twitter/X, LinkedIn, TikTok, Pinterest, Snapchat, Threads, Bluesky, and more
- **Messaging Apps**: WhatsApp, Discord, Telegram, Signal, Slack, WeChat, LINE
- **Video Platforms**: YouTube, YouTube Shorts, Vimeo
- **E-commerce**: Amazon, Shopify, Etsy, eBay
- **Advertising**: Google Ads, Facebook Ads, LinkedIn Ads, TikTok Ads
- **Print & Documents**: A4, US Letter, business cards, flyers, posters
- **Developer Tools**: GitHub, GitLab, Stack Overflow, app stores
- **Community**: Reddit, Medium, Substack, Behance, Dribbble, Notion
- **And many more...**

## 🔌 API Reference

### Endpoints

#### Get All Formats

```bash
GET /api/formats
```

**Query Parameters:**
- `category` - Filter by category (e.g., `social-media`, `messaging`)
- `platform` - Filter by platform (e.g., `Instagram`, `Facebook`)
- `search` - Search across name, platform, and description
- `limit` - Limit results (pagination)
- `offset` - Skip results (pagination)

**Example:**
```bash
curl "https://allformats.xyz/api/formats?category=social-media&platform=Instagram&limit=10"
```

#### Get Specific Format

```bash
GET /api/formats/:id
```

**Example:**
```bash
curl https://allformats.xyz/api/formats/instagram-post
```

#### Get Categories

```bash
GET /api/categories
```

#### Get Platforms

```bash
GET /api/platforms
```

### Response Format

```json
{
  "formats": [...],
  "total": 100,
  "categories": [...],
  "pagination": {
    "offset": 0,
    "limit": 10,
    "hasMore": true
  }
}
```

### Rate Limit Headers

- `X-RateLimit-Limit` - Request limit per time window
- `X-RateLimit-Remaining` - Remaining requests
- `X-RateLimit-Reset` - When the rate limit resets

## 🛠 Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **UI**: React with Tailwind CSS
- **Components**: Radix UI
- **Deployment**: Vercel
- **Package Manager**: pnpm

## 📝 Categories

- Social Media
- Messaging Apps
- Video Platforms
- E-commerce
- Advertising
- Print & Documents
- Community Platforms
- Developer Tools

## 🤝 Contributing

Contributions are welcome! This is a public repository meant to help creators everywhere.

See the [Contributing Guidelines](CONTRIBUTING.md) for details on:
- How to add new format specifications
- Code style and conventions
- Pull request process
- Reporting issues

## 📄 License

This project is open source and available for everyone to use and contribute to.

## 🔗 Links

- **Website**: [allformats.xyz](https://allformats.xyz)
- **API Base URL**: [https://allformats.xyz/api](https://allformats.xyz/api)
- **Documentation**: View API docs via the Book Open icon in the app

---

Made with ❤️ for content creators everywhere
