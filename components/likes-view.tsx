"use client"

import { useMemo } from "react"
import Link from "next/link"
import { ChevronLeft, Heart } from "lucide-react"
import { AppHeader } from "@/components/app-header"
import { getMemeById, type Meme } from "@/lib/memes"
import { useUserData } from "@/lib/user-data"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-fit rounded-xl bg-primary px-8 py-2 shadow-[var(--shadow-card)]">
      <h2 className="text-balance text-center text-3xl font-extrabold tracking-tight text-primary-foreground">
        {children}
      </h2>
    </div>
  )
}

function formatLikedAt(timestamp: number): string {
  const diffMs = Date.now() - timestamp
  const minutes = Math.floor(diffMs / 60000)
  if (minutes < 1) return "Just now"
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return new Date(timestamp).toLocaleDateString()
}

type LikeItem = { meme: Meme; likedAt: number }

export function LikesView() {
  const { likes: likeRecords, dataReady } = useUserData()

  const likes = useMemo<LikeItem[] | null>(() => {
    if (!dataReady) return null
    return likeRecords
      .map((record) => {
        const meme = getMemeById(record.id)
        return meme ? { meme, likedAt: record.likedAt } : null
      })
      .filter((item): item is LikeItem => item !== null)
      .slice(0, 50)
  }, [likeRecords, dataReady])

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-background pb-12">
      <AppHeader />

      {/* Back link */}
      <div className="px-5 pt-4">
        <Link
          href="/account"
          className="inline-flex items-center gap-1 rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-accent-foreground ring-1 ring-border transition-colors hover:bg-muted active:scale-95"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Back to account
        </Link>
      </div>

      {/* Title */}
      <div className="px-5 pt-5">
        <SectionTitle>Likes</SectionTitle>
      </div>

      {/* Full likes list */}
      <section className="px-5 pt-8">
        <div className="rounded-2xl bg-card p-4 text-card-foreground shadow-[var(--shadow-card)]">
          <h3 className="flex items-center gap-2 text-base font-bold">
            <Heart className="h-5 w-5" aria-hidden="true" />
            Your liked memes
          </h3>
          {likes === null ? (
            <p className="mt-3 text-sm text-card-foreground/70">Loading your likes…</p>
          ) : likes.length === 0 ? (
            <p className="mt-3 text-sm text-card-foreground/70">
              No liked memes yet. Tap “Like this meme” on any meme to save it here.
            </p>
          ) : (
            <ul className="mt-3 flex flex-col gap-2">
              {likes.map(({ meme, likedAt }) => (
                <li key={meme.id}>
                  <Link
                    href={`/meme/${meme.id}`}
                    className="flex items-center gap-3 rounded-xl bg-black/15 p-2 transition-colors hover:bg-black/25 active:scale-[0.99]"
                  >
                    <img
                      src={meme.image || "/placeholder.svg"}
                      alt=""
                      className="h-10 w-10 flex-shrink-0 rounded-lg object-cover"
                      crossOrigin="anonymous"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold">{meme.term}</span>
                      <span className="block truncate text-xs text-card-foreground/70">{meme.meaning}</span>
                    </span>
                    <span className="flex-shrink-0 text-xs text-card-foreground/60">{formatLikedAt(likedAt)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  )
}
