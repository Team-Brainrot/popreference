"use client"

import Link from "next/link"
import { Heart } from "lucide-react"
import type { Meme } from "@/lib/memes"
import { useUserData } from "@/lib/user-data"

export function MemeCard({ meme }: { meme: Meme }) {
  const { isLiked, toggleLike } = useUserData()
  const liked = isLiked(meme.id)

  return (
    <article className="group relative aspect-square w-full overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)] ring-1 ring-black/5 transition-transform duration-200 hover:-translate-y-0.5">
      <Link
        href={`/meme/${meme.id}`}
        aria-label={`Open the definition page for ${meme.term}`}
        className="absolute inset-0 block h-full w-full transition-transform active:scale-[0.99]"
      >
        <img
          src={meme.image || "/placeholder.svg"}
          alt={`Meme representing the slang term ${meme.term}`}
          className={`h-full w-full transition-transform duration-300 group-hover:scale-105 ${
            meme.fit === "contain" ? "object-contain" : "object-cover"
          }`}
          crossOrigin="anonymous"
        />

        {/* Bottom gradient so the title stays readable over any artwork */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
      </Link>

      {/* Title overlaid bottom-left */}
      <h4
        className="pointer-events-none absolute bottom-2 left-2.5 right-11 truncate text-sm font-bold leading-tight text-white drop-shadow"
        title={meme.term}
      >
        {meme.term}
      </h4>

      {/* Like heart overlaid bottom-right */}
      <button
        type="button"
        onClick={() => void toggleLike(meme.id)}
        aria-pressed={liked}
        aria-label={liked ? `Remove ${meme.term} from likes` : `Like ${meme.term}`}
        className="absolute bottom-1.5 right-1.5 flex h-8 w-8 items-center justify-center rounded-full transition-transform active:scale-90"
      >
        <Heart
          className={liked ? "fill-rose-500 text-rose-500" : "fill-black/20 text-white"}
          size={24}
          strokeWidth={2}
        />
      </button>
    </article>
  )
}
