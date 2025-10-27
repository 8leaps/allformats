"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Search, BookOpen } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sidebar } from "@/components/sidebar"
import { FormatCard } from "@/components/format-card"
import { FormatDetailModal } from "@/components/format-detail-modal"
import { ApiReadmeModal } from "@/components/api-readme-modal"
import { contentFormats, type ContentFormat, categories } from "@/lib/format-data"
import { cn } from "@/lib/utils"

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFormat, setSelectedFormat] = useState<ContentFormat | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const filteredFormats = useMemo(() => {
    let filtered = contentFormats

    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter((format) => format.category === activeCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (format) =>
          format.name.toLowerCase().includes(query) ||
          format.platform.toLowerCase().includes(query) ||
          format.description.toLowerCase().includes(query),
      )
    }

    return filtered
  }, [activeCategory, searchQuery])

  const handleFormatClick = (format: ContentFormat) => {
    setSelectedFormat(format)
    setModalOpen(true)
  }

  const getCurrentCategoryName = () => {
    const category = categories.find(cat => cat.id === activeCategory)
    return category?.name || "All Formats"
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      </div>

      <main className="flex-1 overflow-hidden">
        <div className="px-4 py-4 lg:px-6 lg:py-6 h-full flex flex-col">
          {/* Mobile Header */}
          <div className="mb-4 lg:mb-6">
            <div className="flex items-center gap-2 mb-4 lg:hidden">
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={24} 
                height={24}
                className="object-contain"
              />
              <h1 className="text-lg font-bold">All Formats</h1>
              <div className="ml-auto">
                <ApiReadmeModal>
                  <Button variant="outline" size="sm" aria-label="Open API documentation">
                    <BookOpen className="h-4 w-4" />
                  </Button>
                </ApiReadmeModal>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={`Search ${filteredFormats.length} formats...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Dropdown - Mobile Only */}
            <div className="lg:hidden">
              <select
                value={activeCategory}
                onChange={(e) => {
                  console.log('Category changed:', e.target.value);
                  setActiveCategory(e.target.value);
                }}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto">
            {filteredFormats.length === 0 ? (
              <div className="flex items-center justify-center h-64 text-center">
                <div>
                  <p className="text-muted-foreground mb-2">No formats found</p>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search or selecting a different category
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4">
                {filteredFormats.map((format) => (
                  <FormatCard key={format.id} format={format} onClick={() => handleFormatClick(format)} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <FormatDetailModal format={selectedFormat} open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  )
}
