"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ContentFormat } from "@/lib/format-data"
import { Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

interface FormatCardProps {
  format: ContentFormat
  onClick: () => void
}

export function FormatCard({ format, onClick }: FormatCardProps) {
  const copyToClipboard = async (e: React.MouseEvent) => {
    e.stopPropagation()
    const formatData = {
      name: format.name,
      platform: format.platform,
      dimensions: `${format.width}x${format.height}`,
      aspectRatio: format.aspectRatio,
      fileTypes: format.fileTypes,
      maxFileSize: format.maxFileSize,
      safeZone: format.safeZone,
    }

    try {
      await navigator.clipboard.writeText(JSON.stringify(formatData, null, 2))
      toast({
        title: "Copied to clipboard",
        description: `${format.name} specifications copied successfully.`,
      })
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard.",
        variant: "destructive",
      })
    }
  }

  const openInNewTab = (e: React.MouseEvent) => {
    e.stopPropagation()

    // Open API endpoint for this specific format
    const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
    const apiUrl = `${baseUrl}/api/formats/${format.id}`

    window.open(apiUrl, "_blank")

    toast({
      title: "Opening API endpoint",
      description: `Opening ${format.name} API data in a new tab.`,
    })
  }

  return (
    <Card
      className="group cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary/20 bg-card"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
              {format.name}
            </h3>
            <p className="text-sm text-muted-foreground">{format.platform}</p>
          </div>
          <div className="flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 cursor-pointer" onClick={copyToClipboard}>
              <Copy className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={openInNewTab}>
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Dimensions</span>
            <span className="font-mono text-foreground">
              {format.width} × {format.height}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Aspect Ratio</span>
            <Badge variant="secondary" className="text-xs">
              {format.aspectRatio}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-1 mt-2">
            {format.fileTypes.map((type) => (
              <Badge key={type} variant="outline" className="text-xs">
                {type}
              </Badge>
            ))}
          </div>
        </div>

        {/* Visual representation */}
        <div className="mt-3 flex justify-center">
          <div
            className="border-2 border-dashed border-muted-foreground/30 bg-muted/20 flex items-center justify-center text-xs text-muted-foreground"
            style={{
              width: Math.min(80, (format.width / format.height) * 60),
              height: Math.min(60, (format.height / format.width) * 80),
              aspectRatio: `${format.width}/${format.height}`,
            }}
          >
            {format.aspectRatio}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
