"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { CodeViewer } from "@/components/ui/code-viewer"
import type { ContentFormat } from "@/lib/format-data"

interface FormatDetailModalProps {
  format: ContentFormat | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FormatDetailModal({ format, open, onOpenChange }: FormatDetailModalProps) {
  if (!format) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[95vh] flex flex-col overflow-hidden">
        <DialogHeader className="flex-shrink-0 min-w-0">
          <DialogTitle className="flex flex-wrap items-center gap-2 min-w-0">
            <span className="min-w-0 break-words">{format.name}</span>
            <Badge variant="secondary" className="flex-shrink-0">{format.platform}</Badge>
          </DialogTitle>
          <DialogDescription className="break-words">{format.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 overflow-y-auto flex-1 min-h-0 min-w-0">
          {/* Visual Preview */}
          <div className="flex justify-center p-6 bg-muted/20 rounded-lg overflow-hidden">
            <div className="relative max-w-full">
              <div
                className="border-2 border-primary bg-background shadow-sm flex items-center justify-center text-sm font-mono text-muted-foreground"
                style={{
                  width: Math.min(300, (format.width / format.height) * 200),
                  height: Math.min(200, (format.height / format.width) * 300),
                  aspectRatio: `${format.width}/${format.height}`,
                  maxWidth: '100%'
                }}
              >
                {format.width} × {format.height}
              </div>

              {/* Safe Zone Overlay */}
              {format.safeZone && (
                <div
                  className="absolute border border-dashed border-accent bg-accent/10"
                  style={{
                    top: `${(format.safeZone.top / format.height) * 100}%`,
                    bottom: `${(format.safeZone.bottom / format.height) * 100}%`,
                    left: `${(format.safeZone.left / format.width) * 100}%`,
                    right: `${(format.safeZone.right / format.width) * 100}%`,
                  }}
                />
              )}
            </div>
          </div>

          {/* Specifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold mb-1">Dimensions</h4>
                <p className="font-mono text-sm">
                  {format.width} × {format.height} px
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-1">Aspect Ratio</h4>
                <Badge variant="outline">{format.aspectRatio}</Badge>
              </div>

              <div>
                <h4 className="font-semibold mb-1">File Types</h4>
                <div className="flex flex-wrap gap-1">
                  {format.fileTypes.map((type) => (
                    <Badge key={type} variant="secondary" className="text-xs">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {format.maxFileSize && (
                <div>
                  <h4 className="font-semibold mb-1">Max File Size</h4>
                  <p className="text-sm">{format.maxFileSize}</p>
                </div>
              )}

              {format.safeZone && (
                <div>
                  <h4 className="font-semibold mb-1">Safe Zone</h4>
                  <p className="text-sm font-mono">{format.safeZone.top}px from edges</p>
                </div>
              )}

              {format.notes && (
                <div>
                  <h4 className="font-semibold mb-1">Notes</h4>
                  <p className="text-sm text-muted-foreground">{format.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* JSON Preview */}
          <div className="flex-shrink-0">
            <div className="mb-2">
              <h4 className="font-semibold">JSON Specification</h4>
            </div>
            <CodeViewer
              code={JSON.stringify(
                {
                  name: format.name,
                  platform: format.platform,
                  dimensions: { width: format.width, height: format.height },
                  aspectRatio: format.aspectRatio,
                  fileTypes: format.fileTypes,
                  maxFileSize: format.maxFileSize,
                  safeZone: format.safeZone,
                },
                null,
                2,
              )}
              language="json"
              maxHeight="600px"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
