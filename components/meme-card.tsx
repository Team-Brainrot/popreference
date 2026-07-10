"use client"

import { useState } from "react"
import type { Meme } from "@/lib/memes"

export function MemeCard({ meme }: { meme: Meme }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-label={`${meme.term}. Tap to ${flipped ? "hide" : "see"} the meaning.`}
      className="group relative flex aspect-square w-full flex-col overflow-hidden rounded-2xl bg-card text-left text-card-foreground shadow-sm transition-transform active:scale-[0.98]"
    >
      {meme.image && !flipped ? (
        <img
          src={meme.image || "/placeholder.svg"}
          alt={`Meme representing the slang term ${meme.term}`}
          className="absolute inset-0 h-full w-full object-cover"
          crossOrigin="anonymous"
        />
      ) : null}

      <div
        className={`relative flex h-full w-full flex-col p-3 ${
          meme.image && !flipped ? "justify-end" : "justify-between"
        }`}
      >
        {flipped ? (
          <p className="text-pretty text-sm leading-relaxed">{meme.meaning}</p>
        ) : (
          <span
            className={`text-pretty text-base font-bold leading-tight ${
              meme.image ? "rounded-lg bg-primary/70 px-2 py-1 backdrop-blur-sm" : ""
            }`}
          >
            {meme.term}
          </span>
        )}
      </div>
    </button>
  )
}
