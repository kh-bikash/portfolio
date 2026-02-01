"use client"

import { cn } from "@/lib/utils"

const categories = [
  { id: "games", label: "games" },
  { id: "multiplayer", label: "multiplayer" },
  { id: "xr", label: "XR / VR / AI" },
  { id: "installations", label: "installations" },
  { id: "websites", label: "websites" },
]

interface CategoryFilterProps {
  activeCategory: string | null
  onCategoryChange: (category: string | null) => void
}

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-col items-start gap-1">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(activeCategory === category.id ? null : category.id)}
          className={cn(
            "group flex items-center gap-2 text-base md:text-lg transition-all duration-200 cursor-none",
            activeCategory === category.id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
          )}
        >
          <span className="text-muted-foreground">-{">"}</span>
          <span>{category.label}</span>
        </button>
      ))}

      <p className="text-sm text-muted-foreground mt-6">What are you looking for?</p>
    </div>
  )
}
