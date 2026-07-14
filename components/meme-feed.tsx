"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Flame, RotateCcw, Sparkles } from "lucide-react"
import { hotMemes } from "@/lib/memes"
import { rankForYou, nicheLevelFor, type NicheMap } from "@/lib/niche"
import { type QuizResult } from "@/lib/quiz"
import { getShowNsfw, NSFW_CHANGE_EVENT } from "@/lib/preferences"
import { useUserData } from "@/lib/user-data"
import { AppHeader } from "@/components/app-header"
import { SearchBar } from "@/components/search-bar"
import { FilterPills, categoryTags, type FilterKey } from "@/components/filter-pills"
import { MemeCard } from "@/components/meme-card"
import { MemeQuiz } from "@/components/meme-quiz"
import { AdRow } from "@/components/ad-row"

const sectionLabels: Record<FilterKey, string> = {
  hot: "HOT",
  foryou: "FOR YOU",
  oldgold: "OLD & GOLD",
  classroom: "POPULAR IN THE CLASSROOM",
  brainrot: "BRAINROT",
  gaming: "GAMING",
  animals: "ANIMALS",
  people: "PEOPLE",
}

export function MemeFeed({ nicheScores }: { nicheScores: NicheMap }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<FilterKey>("hot")
  const [quizOpen, setQuizOpen] = useState(false)
  const { quizResult, saveQuizResult } = useUserData()
  const [showNsfw, setShowNsfw] = useState(false)

  // Read the NSFW preference on mount and keep it in sync if the user toggles
  // it (in this tab via our custom event, or in another tab via `storage`).
  useEffect(() => {
    setShowNsfw(getShowNsfw())
    const sync = () => setShowNsfw(getShowNsfw())
    window.addEventListener(NSFW_CHANGE_EVENT, sync)
    window.addEventListener("storage", sync)
    return () => {
      window.removeEventListener(NSFW_CHANGE_EVENT, sync)
      window.removeEventListener("storage", sync)
    }
  }, [])

  // Open the quiz when arriving via the header button (/?quiz=1), even on a
  // soft navigation from the same route. Clear the param so a refresh or back
  // navigation doesn't reopen it.
  useEffect(() => {
    if (searchParams.get("quiz") === "1") {
      setQuizOpen(true)
      router.replace("/feed", { scroll: false })
    }
  }, [searchParams, router])

  // Prefer the adaptive affinity saved with the result; fall back to the raw
  // score ratio for any older saved results.
  const affinity = quizResult
    ? quizResult.affinity ?? quizResult.correct / quizResult.total
    : null

  // Hide NSFW memes entirely unless the user has opted in on their account.
  const visibleMemes = useMemo(
    () => (showNsfw ? hotMemes : hotMemes.filter((m) => !m.nsfw)),
    [showNsfw],
  )

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return visibleMemes
    return visibleMemes.filter(
      (m) => m.term.toLowerCase().includes(q) || m.meaning.toLowerCase().includes(q),
    )
  }, [query, visibleMemes])

  const results = useMemo(() => {
    if (filter === "foryou" && affinity !== null) {
      return rankForYou(searchResults, nicheScores, affinity)
    }
    const tags = categoryTags[filter]
    if (tags) {
      return searchResults.filter((m) => m.tags.some((t) => tags.includes(t)))
    }
    return searchResults
  }, [filter, affinity, nicheScores, searchResults])

  function handleQuizComplete(result: QuizResult) {
    void saveQuizResult(result)
  }

  function handleQuizClose() {
    setQuizOpen(false)
    setFilter("foryou")
  }

  // Insert the ad row after the first four cards, matching the mockup layout.
  const firstBatch = results.slice(0, 4)
  const secondBatch = results.slice(4)

  const showForYouEmptyState = filter === "foryou" && affinity === null
  const level = affinity !== null ? nicheLevelFor(affinity) : null

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-background pb-10">
      <AppHeader />

      <h2 className="text-balance px-5 pb-5 pt-2 text-center text-3xl font-bold tracking-tight text-foreground">
        Find the Meme
      </h2>

      <SearchBar value={query} onChange={setQuery} />

      <FilterPills active={filter} onChange={setFilter} />

      <div className="flex items-center justify-between gap-2 px-5 pt-5">
        <div className="flex items-center gap-2">
          {filter === "hot" ? (
            <Flame className="h-6 w-6 text-flame" fill="currentColor" aria-hidden="true" />
          ) : null}
          <h3 className="inline-block border-b-2 border-flame pb-1 text-2xl font-extrabold tracking-tight text-foreground">
            {sectionLabels[filter]}
          </h3>
        </div>

        {filter === "foryou" && quizResult ? (
          <button
            type="button"
            onClick={() => setQuizOpen(true)}
            className="flex items-center gap-1.5 rounded-full bg-surface/70 px-3 py-1.5 text-xs font-bold text-foreground ring-1 ring-border transition-transform active:scale-95"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Retake
          </button>
        ) : null}
      </div>

      {/* Personalization banner once the quiz has been taken */}
      {filter === "foryou" && quizResult && level ? (
        <div className="mx-5 mt-3 flex items-center gap-3 rounded-2xl bg-surface px-4 py-3 shadow-[var(--shadow-card)] ring-1 ring-border">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-flame/15">
            <Sparkles className="h-5 w-5 text-flame" aria-hidden="true" />
          </div>
          <p className="text-sm leading-snug text-surface-foreground">
            <span className="font-bold">{level.label}</span>
            {` — tuned from your ${quizResult.correct}/${quizResult.total} quiz score.`}
          </p>
        </div>
      ) : null}

      {showForYouEmptyState ? (
        <ForYouPrompt onStart={() => setQuizOpen(true)} />
      ) : results.length === 0 ? (
        <p className="px-5 pt-10 text-center text-muted-foreground">
          {query.trim()
            ? `No memes found for "${query}". Try another term.`
            : "No memes in this category yet."}
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

      {quizOpen ? (
        <MemeQuiz onClose={handleQuizClose} onComplete={handleQuizComplete} />
      ) : null}
    </main>
  )
}

function ForYouPrompt({ onStart }: { onStart: () => void }) {
  return (
    <div className="mx-5 mt-6 flex flex-col items-center rounded-3xl bg-surface px-6 py-10 text-center shadow-[var(--shadow-card)] ring-1 ring-border">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-flame/15">
        <Sparkles className="h-8 w-8 text-flame" aria-hidden="true" />
      </div>
      <h3 className="text-balance pt-5 text-xl font-extrabold tracking-tight text-surface-foreground">
        Unlock your For You feed
      </h3>
      <p className="text-pretty pt-2 text-sm leading-relaxed text-muted-foreground">
        Take a quick adaptive meme quiz. It starts easy and gets nicher with
        every correct answer — the deeper you go, the more underground the memes
        we surface just for you.
      </p>
      <button
        type="button"
        onClick={onStart}
        className="mt-6 w-full rounded-full bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-sm transition-transform active:scale-[0.98]"
      >
        Start the quiz
      </button>
    </div>
  )
}
