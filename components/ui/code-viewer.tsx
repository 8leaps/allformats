"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface CodeViewerProps {
  code: string
  language?: string
  className?: string
  showCopyButton?: boolean
  maxHeight?: string
  enableHorizontalScroll?: boolean
}

export function CodeViewer({ 
  code, 
  language = "text", 
  className,
  showCopyButton = true,
  maxHeight = "400px",
  enableHorizontalScroll = false
}: CodeViewerProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      toast({
        title: "Copied to clipboard",
        description: "Code copied successfully.",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard.",
        variant: "destructive",
      })
    }
  }

  const formatCode = (code: string, lang: string) => {
    if (lang === "json") {
      try {
        return JSON.stringify(JSON.parse(code), null, 2)
      } catch {
        return code
      }
    }
    return code
  }

  const formattedCode = formatCode(code, language)

  return (
    <div className={cn("relative w-full max-w-full min-w-0", className)}>
      {showCopyButton && (
        <div className="absolute top-2 right-2 z-10">
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="h-8 px-2 bg-background/80 backdrop-blur-sm"
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      )}
      
      <div 
        className="rounded-lg border border-slate-700 w-full max-w-full min-w-0"
        style={{ 
          maxHeight,
          overflow: 'auto'
        }}
      >
        <div 
          className="w-full max-w-full min-w-0"
          style={{
            minWidth: '0'
          }}
        >
          <pre 
            className="w-full max-w-full overflow-hidden text-xs sm:text-sm"
            style={{
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              wordBreak: 'break-all',
              margin: 0,
              padding: '1rem',
              backgroundColor: '#1e1e1e',
              color: '#d4d4d4',
              borderRadius: '0.5rem',
              width: '100%',
              maxWidth: '100%',
              minWidth: '0'
            }}
          >
            {formattedCode}
          </pre>
        </div>
      </div>
    </div>
  )
}