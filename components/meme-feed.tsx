"use client"

import { useMemo, useState } from "react"
import { Flame } from "lucide-react"
import { hotMemes } from "@/lib/memes"
import { AppHeader } from "@/components/app-header"
import { SearchBar } from "@/components/search-bar"
import { FilterPills, type FilterKey } from "@/components/filter-pills"
import { MemeCard } from "@/components/meme-card"
import { AdRow } from "@/components/ad-row"

const sectionLabels: Record<FilterKey, string> = {
  hot: "HOT",
  foryou: "FOR YOU",
  oldgold: "OLD & GOLD",
}

export function MemeFeed() {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<FilterKey>("hot")

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return hotMemes
    return hotMemes.filter(
      (m) => m.term.toLowerCase().includes(q) || m.meaning.toLowerCase().includes(q),
    )
  }, [query])

  // Insert the ad row after the first four cards, matching the mockup layout.
  const firstBatch = results.slice(0, 4)
  const secondBatch = results.slice(4)

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-background pb-10">
      <AppHeader />

      <h2 className="text-balance px-5 pb-5 pt-2 text-center text-3xl font-bold tracking-tight text-foreground">
        Find the Meme
      </h2>

      <SearchBar value={query} onChange={setQuery} />

      <FilterPills active={filter} onChange={setFilter} />

      <div className="flex items-center gap-2 px-5 pt-5">
        {filter === "hot" ? (
          <Flame className="h-6 w-6 text-flame" fill="currentColor" aria-hidden="true" />
        ) : null}
        <h3 className="inline-block border-b-2 border-flame pb-1 text-2xl font-extrabold tracking-tight text-foreground">
          {sectionLabels[filter]}
        </h3>
      </div>

      {results.length === 0 ? (
        <p className="px-5 pt-10 text-center text-muted-foreground">
          {`No memes found for "${query}". Try another term.`}
        </p>
      ) : (
        <div className="flex flex-col gap-3 px-5 pt-4">
          <div className="grid grid-cols-2 gap-3">
            {firstBatch.map((meme) => (
              <MemeCard key={meme.id} meme={meme} />
            ))}
          </div>

          <AdRow />

          <div className="grid grid-cols-2 gap-3">
            {secondBatch.map((meme) => (
              <MemeCard key={meme.id} meme={meme} />
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
