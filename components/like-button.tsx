"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"
import { isLiked, toggleLike } from "@/lib/liked-memes"

export function LikeButton({ id }: { id: string }) {
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    setLiked(isLiked(id))
  }, [id])

  function handleClick() {
    setLiked(toggleLike(id))
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={liked}
      aria-label={liked ? "Remove from your likes" : "Add to your likes"}
      className={`mx-auto mt-4 flex w-fit items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold shadow-[var(--shadow-card)] transition-colors active:scale-95 ${
        liked
          ? "bg-flame text-flame-foreground hover:opacity-90"
          : "bg-surface text-surface-foreground ring-1 ring-border hover:bg-muted"
      }`}
    >
      <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} aria-hidden="true" />
      {liked ? "Liked" : "Like this meme"}
    </button>
  )
}
