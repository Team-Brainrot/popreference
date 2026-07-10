"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import type { Meme } from "@/lib/memes"

export function MemeCard({ meme }: { meme: Meme }) {
  const [flipped, setFlipped] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  return (
    <article className="relative aspect-square w-full overflow-hidden rounded-lg bg-card shadow-sm">
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

        {/* Bottom gradient so the title stays readable over any artwork */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

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

      {/* Title overlaid bottom-left */}
      <h4
        className="pointer-events-none absolute bottom-2 left-2.5 right-11 truncate text-sm font-bold leading-tight text-white drop-shadow"
        title={meme.term}
      >
        {meme.term}
      </h4>

      {/* Bookmark heart overlaid bottom-right */}
      <button
        type="button"
        onClick={() => setBookmarked((b) => !b)}
        aria-pressed={bookmarked}
        aria-label={bookmarked ? `Remove ${meme.term} from bookmarks` : `Bookmark ${meme.term}`}
        className="absolute bottom-1.5 right-1.5 flex h-8 w-8 items-center justify-center rounded-full transition-transform active:scale-90"
      >
        <Heart
          className={bookmarked ? "fill-rose-500 text-rose-500" : "fill-black/20 text-white"}
          size={24}
          strokeWidth={2}
        />
      </button>
    </article>
  )
}
