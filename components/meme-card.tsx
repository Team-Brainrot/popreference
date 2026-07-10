"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import type { Meme } from "@/lib/memes"

function formatCount(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`
}

export function MemeCard({ meme }: { meme: Meme }) {
  const [flipped, setFlipped] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  const count = meme.bookmarks + (bookmarked ? 1 : 0)

  return (
    <article className="flex flex-col gap-1.5">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-card">
        <button
          type="button"
          onClick={() => setFlipped((f) => !f)}
          aria-label={`${meme.term}. Tap to ${flipped ? "hide" : "see"} the meaning.`}
          className="absolute inset-0 h-full w-full text-left transition-transform active:scale-[0.99]"
        >
          <img
            src={meme.image || "/placeholder.svg"}
            alt={`Meme representing the slang term ${meme.term}`}
            className="h-full w-full object-cover"
            crossOrigin="anonymous"
          />
          {flipped ? (
            <div className="absolute inset-0 flex items-center justify-center bg-primary/85 p-3 backdrop-blur-sm">
              <p className="text-pretty text-center text-sm leading-relaxed text-primary-foreground">
                {meme.meaning}
              </p>
            </div>
          ) : null}
        </button>

        {/* Page-count style badge, top-left (Pixiv convention) */}
        <span className="pointer-events-none absolute left-1.5 top-1.5 rounded-md bg-black/55 px-1.5 py-0.5 text-[10px] font-semibold text-white">
          {meme.tags.length}P
        </span>

        {/* Bookmark heart, top-right */}
        <button
          type="button"
          onClick={() => setBookmarked((b) => !b)}
          aria-pressed={bookmarked}
          aria-label={bookmarked ? `Remove ${meme.term} from bookmarks` : `Bookmark ${meme.term}`}
          className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow-sm transition-transform active:scale-90"
        >
          <Heart
            className={bookmarked ? "fill-rose-500 text-rose-500" : "text-neutral-500"}
            size={16}
          />
        </button>
      </div>

      <h4 className="truncate text-sm font-bold leading-tight text-foreground" title={meme.term}>
        {meme.term}
      </h4>

      <div className="flex items-center gap-1.5">
        <span
          aria-hidden="true"
          className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-[9px] font-bold uppercase text-primary-foreground"
        >
          {meme.creator.charAt(0)}
        </span>
        <span className="truncate text-xs text-muted-foreground">{meme.creator}</span>
      </div>

      <div className="flex items-center gap-1 text-muted-foreground">
        <Heart size={12} className={bookmarked ? "fill-rose-500 text-rose-500" : ""} />
        <span className="text-xs font-semibold">{formatCount(count)}</span>
      </div>
    </article>
  )
}
