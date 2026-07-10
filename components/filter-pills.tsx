"use client"

import { Star } from "lucide-react"

export type FilterKey = "hot" | "foryou" | "oldgold"

const filters: { key: FilterKey; label: string }[] = [
  { key: "hot", label: "Hot!" },
  { key: "foryou", label: "For you!" },
  { key: "oldgold", label: "Old&Gold" },
]

type FilterPillsProps = {
  active: FilterKey
  onChange: (key: FilterKey) => void
}

export function FilterPills({ active, onChange }: FilterPillsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 px-5 pt-6">
      {filters.map((filter) => {
        const isActive = filter.key === active
        return (
          <button
            key={filter.key}
            type="button"
            onClick={() => onChange(filter.key)}
            aria-pressed={isActive}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "bg-transparent text-accent-foreground"
            }`}
          >
            <Star
              className="h-4 w-4"
              fill={isActive ? "currentColor" : "none"}
              aria-hidden="true"
            />
            {filter.label}
          </button>
        )
      })}
    </div>
  )
}
