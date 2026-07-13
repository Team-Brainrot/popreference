"use client"

import { Star, GraduationCap, Brain, Gamepad2, PawPrint, type LucideIcon } from "lucide-react"

export type FilterKey =
  | "hot"
  | "foryou"
  | "oldgold"
  | "classroom"
  | "brainrot"
  | "gaming"
  | "animals"

// Tag-based categories. A meme matches when it carries any of the listed tags.
export const categoryTags: Partial<Record<FilterKey, string[]>> = {
  classroom: ["genz", "slang", "trend"],
  brainrot: ["brainrot"],
  gaming: ["gaming"],
  animals: ["animals"],
}

const filters: { key: FilterKey; label: string; icon: LucideIcon }[] = [
  { key: "hot", label: "Hot!", icon: Star },
  { key: "foryou", label: "For you!", icon: Star },
  { key: "oldgold", label: "Old&Gold", icon: Star },
  { key: "classroom", label: "Classroom", icon: GraduationCap },
  { key: "brainrot", label: "Brainrot", icon: Brain },
  { key: "gaming", label: "Gaming", icon: Gamepad2 },
  { key: "animals", label: "Animals", icon: PawPrint },
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
        const Icon = filter.icon
        return (
          <button
            key={filter.key}
            type="button"
            onClick={() => onChange(filter.key)}
            aria-pressed={isActive}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all active:scale-95 ${
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-surface/60 text-accent-foreground ring-1 ring-border hover:bg-surface"
            }`}
          >
            <Icon
              className="h-4 w-4"
              fill={isActive && filter.icon === Star ? "currentColor" : "none"}
              aria-hidden="true"
            />
            {filter.label}
          </button>
        )
      })}
    </div>
  )
}
