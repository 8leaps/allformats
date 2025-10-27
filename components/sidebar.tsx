"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { categories } from "@/lib/format-data"
import { ApiReadmeModal } from "@/components/api-readme-modal"
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"

interface SidebarProps {
  activeCategory: string
  onCategoryChange: (categoryId: string) => void
}

export function Sidebar({ activeCategory, onCategoryChange }: SidebarProps) {
  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border p-4 h-screen overflow-y-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Image 
            src="/logo.png" 
            alt="Logo" 
            width={32} 
            height={32}
            className="object-contain"
          />
          <h1 className="text-xl font-bold text-sidebar-foreground">All Formats</h1>
        </div>
        <p className="text-sm text-muted-foreground mt-1">Digital content format specifications</p>
      </div>

      <nav className="space-y-1">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors text-left group",
              activeCategory === category.id
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            )}
          >
            <span>{category.name}</span>
            <Badge
              variant={activeCategory === category.id ? "secondary" : "outline"}
              className={cn(
                "text-xs transition-colors",
                activeCategory === category.id
                  ? ""
                  : "group-hover:bg-sidebar-accent-foreground group-hover:text-sidebar-accent group-hover:border-sidebar-accent-foreground",
              )}
            >
              {category.count}
            </Badge>
          </button>
        ))}
      </nav>

      <div className="mt-8 p-3 bg-muted/50 rounded-md hidden lg:block">
        <h3 className="font-semibold text-sm mb-2">API Preview</h3>
        <p className="text-xs text-muted-foreground mb-2">This data structure could be served from:</p>
        <code className="text-xs bg-background p-2 rounded block">GET /api/formats?category=social-media</code>

        <div className="mt-3">
          <ApiReadmeModal>
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              <BookOpen className="w-4 h-4 mr-2" />
              Quick start
            </Button>
          </ApiReadmeModal>
        </div>
      </div>
    </div>
  )
}
