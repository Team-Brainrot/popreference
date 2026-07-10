"use client"

import { Search } from "lucide-react"

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="px-5">
      <div className="flex items-center gap-3 rounded-full bg-surface px-6 py-4 shadow-sm">
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search: Ex. Rizz"
          aria-label="Search slang and memes"
          className="min-w-0 flex-1 bg-transparent text-base text-surface-foreground outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:appearance-none"
        />
        <Search className="h-5 w-5 shrink-0 text-surface-foreground" aria-hidden="true" />
      </div>
    </div>
  )
}
