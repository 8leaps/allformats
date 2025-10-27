"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CodeViewer } from "@/components/ui/code-viewer"
import { Copy, BookOpen, Code, Zap, Shield } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface ApiReadmeModalProps {
  children: React.ReactNode
}

export function ApiReadmeModal({ children }: ApiReadmeModalProps) {
  const [open, setOpen] = useState(false)
  const baseUrl = typeof window !== "undefined" ? window.location.origin : ""


  const codeExamples = {
    javascript: `// Basic usage
const response = await fetch('${baseUrl}/api/formats')
const formats = await response.json()

// Filter by platform
const instagramFormats = await fetch('${baseUrl}/api/formats?platform=Instagram')
const data = await instagramFormats.json()

// Search formats
const searchResults = await fetch('${baseUrl}/api/formats?search=story')
const results = await searchResults.json()

// Get specific format
const format = await fetch('${baseUrl}/api/formats/instagram-post')
const formatData = await format.json()`,

    python: `import requests

# Basic usage
response = requests.get('${baseUrl}/api/formats')
formats = response.json()

# Filter by platform
instagram_formats = requests.get('${baseUrl}/api/formats?platform=Instagram')
data = instagram_formats.json()

# Search formats
search_results = requests.get('${baseUrl}/api/formats?search=story')
results = search_results.json()

# Get specific format
format_response = requests.get('${baseUrl}/api/formats/instagram-post')
format_data = format_response.json()`,

    curl: `# Basic usage
curl "${baseUrl}/api/formats"

# Filter by platform
curl "${baseUrl}/api/formats?platform=Instagram"

# Search formats
curl "${baseUrl}/api/formats?search=story"

# Get specific format
curl "${baseUrl}/api/formats/instagram-post"

# Get categories
curl "${baseUrl}/api/categories"

# Get platforms
curl "${baseUrl}/api/platforms"

# This is a very long line that should definitely trigger horizontal scrolling and test if the functionality is working properly
curl -X GET "${baseUrl}/api/formats?platform=Instagram&category=social-media&search=story&limit=50&offset=0" -H "Accept: application/json" -H "User-Agent: MyApp/1.0"`,

    php: `<?php
// Basic usage
$response = file_get_contents('${baseUrl}/api/formats');
$formats = json_decode($response, true);

// Filter by platform
$instagram_formats = file_get_contents('${baseUrl}/api/formats?platform=Instagram');
$data = json_decode($instagram_formats, true);

// Search formats
$search_results = file_get_contents('${baseUrl}/api/formats?search=story');
$results = json_decode($search_results, true);

// Get specific format
$format = file_get_contents('${baseUrl}/api/formats/instagram-post');
$format_data = json_decode($format, true);
?>`,
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[95vh] flex flex-col overflow-hidden">
        <DialogHeader className="flex-shrink-0 min-w-0">
          <DialogTitle className="flex items-center gap-2 min-w-0">
            <BookOpen className="w-5 h-5 flex-shrink-0" />
            <span className="min-w-0 break-words">All Formats API Guide</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full flex-1 flex flex-col min-w-0">
          <TabsList className="grid w-full grid-cols-4 flex-shrink-0">
            <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
            <TabsTrigger value="endpoints" className="text-xs sm:text-sm">Endpoints</TabsTrigger>
            <TabsTrigger value="examples" className="text-xs sm:text-sm">Examples</TabsTrigger>
            <TabsTrigger value="integration" className="text-xs sm:text-sm">Integration</TabsTrigger>
          </TabsList>

          <div className="space-y-4 overflow-y-auto flex-1 min-h-0">
            <TabsContent value="overview" className="space-y-3">
            <Card>
              <CardHeader className="px-4 py-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Zap className="w-4 h-4" />
                  Quick Start
                </CardTitle>
                <CardDescription className="text-xs">Get started with the All Formats API in seconds</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 px-4 py-3 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-xl font-bold text-primary">100+</div>
                    <div className="text-xs text-muted-foreground">Digital Formats</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-xl font-bold text-primary">15+</div>
                    <div className="text-xs text-muted-foreground">Platforms</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-xl font-bold text-primary">Free</div>
                    <div className="text-xs text-muted-foreground">No API Key</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">What you can do:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• Get format specifications for any platform</li>
                    <li>• Filter by category, platform, or search terms</li>
                    <li>• Access dimensions, aspect ratios, and file requirements</li>
                    <li>• Build content creation tools and workflows</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="px-4 py-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Shield className="w-4 h-4" />
                  Rate Limits & Usage
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 py-3 pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Badge variant="outline" className="mb-1 text-xs">
                      Rate Limit
                    </Badge>
                    <p className="text-xs">100 requests per minute per IP</p>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-1 text-xs">
                      Authentication
                    </Badge>
                    <p className="text-xs">No API key required</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Rate limit headers included: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="endpoints" className="space-y-3">
            <div className="space-y-3">
              {[
                {
                  method: "GET",
                  path: "/api/formats",
                  description: "Get all formats with optional filtering",
                  params: ["category", "platform", "search", "limit", "offset"],
                },
                {
                  method: "GET",
                  path: "/api/formats/[id]",
                  description: "Get specific format by ID",
                  params: ["id (path parameter)"],
                },
                {
                  method: "GET",
                  path: "/api/categories",
                  description: "Get all available categories",
                  params: [],
                },
                {
                  method: "GET",
                  path: "/api/platforms",
                  description: "Get all available platforms",
                  params: [],
                },
              ].map((endpoint, index) => (
                <Card key={index}>
                  <CardHeader className="px-4 py-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Badge variant="outline" className="text-xs">{endpoint.method}</Badge>
                      <code className="text-xs">{endpoint.path}</code>
                    </CardTitle>
                    <CardDescription className="text-xs">{endpoint.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="px-4 py-3 pt-0">
                    {endpoint.params.length > 0 && (
                      <div>
                        <h5 className="font-medium mb-1.5 text-sm">Parameters:</h5>
                        <div className="flex flex-wrap gap-1.5">
                          {endpoint.params.map((param) => (
                            <Badge key={param} variant="secondary" className="text-xs px-1.5 py-0">
                              {param}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="examples" className="space-y-3">
            <Tabs defaultValue="javascript" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-3">
                <TabsTrigger value="javascript" className="text-xs sm:text-sm">JS</TabsTrigger>
                <TabsTrigger value="python" className="text-xs sm:text-sm">Python</TabsTrigger>
                <TabsTrigger value="curl" className="text-xs sm:text-sm">cURL</TabsTrigger>
                <TabsTrigger value="php" className="text-xs sm:text-sm">PHP</TabsTrigger>
              </TabsList>

              {Object.entries(codeExamples).map(([lang, code]) => (
                <TabsContent key={lang} value={lang} className="space-y-3">
                  <Card>
                    <CardHeader className="px-4 py-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="capitalize text-base">{lang} Examples</CardTitle>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 px-2 text-xs"
                          onClick={async () => {
                            try {
                              await navigator.clipboard.writeText(code)
                              toast({
                                title: "Copied to clipboard",
                                description: "Code copied successfully.",
                              })
                            } catch (err) {
                              toast({
                                title: "Copy failed",
                                description: "Unable to copy to clipboard.",
                                variant: "destructive",
                              })
                            }
                          }}
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="px-4 py-3 pt-0">
                      <CodeViewer
                        code={code}
                        language={lang}
                        maxHeight="250px"
                        showCopyButton={false}
                        enableHorizontalScroll={false}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>

          <TabsContent value="integration" className="space-y-3">
            <Card>
              <CardHeader className="px-4 py-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Code className="w-4 h-4" />
                  Integration Guide
                </CardTitle>
                <CardDescription className="text-xs">Best practices for integrating the All Formats API</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 px-4 py-3 pt-0">
                <div>
                  <h4 className="font-semibold mb-1.5 text-sm">Common Use Cases</h4>
                  <ul className="text-xs text-muted-foreground space-y-0.5 ml-4">
                    <li>• Content creation tools and design software</li>
                    <li>• Social media management platforms</li>
                    <li>• Marketing automation workflows</li>
                    <li>• Educational resources and documentation</li>
                    <li>• Format validation and compliance checking</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-1.5 text-sm">Error Handling</h4>
                  <div className="text-xs space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Badge variant="destructive" className="text-xs">429</Badge>
                      <span>Rate limit exceeded - check X-RateLimit-Reset header</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="destructive" className="text-xs">404</Badge>
                      <span>Format not found - verify the format ID</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">200</Badge>
                      <span>Success - data returned in response body</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-1.5 text-sm">Response Format</h4>
                  <pre className="text-xs bg-muted p-2 rounded">
                    {`{
  "data": [...],
  "meta": {
    "total": 150,
    "limit": 20,
    "offset": 0,
    "hasMore": true
  }
}`}
                  </pre>
                </div>

                <div>
                  <h4 className="font-semibold mb-1.5 text-sm">Performance Tips</h4>
                  <ul className="text-xs text-muted-foreground space-y-0.5 ml-4">
                    <li>• Use pagination with limit/offset for large datasets</li>
                    <li>• Cache responses when possible to reduce API calls</li>
                    <li>• Filter by category or platform to reduce response size</li>
                    <li>• Monitor rate limit headers to avoid 429 errors</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
