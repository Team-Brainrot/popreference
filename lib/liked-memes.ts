"use client"

const STORAGE_KEY = "popref:liked-memes"
const MAX_ENTRIES = 50

export type LikeRecord = {
  id: string
  likedAt: number
}

export function getLikedMemes(): LikeRecord[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (entry): entry is LikeRecord =>
        entry && typeof entry.id === "string" && typeof entry.likedAt === "number",
    )
  } catch {
    return []
  }
}

export function isLiked(id: string): boolean {
  return getLikedMemes().some((entry) => entry.id === id)
}

export function likeMeme(id: string): void {
  if (typeof window === "undefined") return
  try {
    const likes = getLikedMemes().filter((entry) => entry.id !== id)
    const next: LikeRecord[] = [{ id, likedAt: Date.now() }, ...likes].slice(0, MAX_ENTRIES)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Ignore storage errors (e.g. private mode / quota).
  }
}

export function unlikeMeme(id: string): void {
  if (typeof window === "undefined") return
  try {
    const next = getLikedMemes().filter((entry) => entry.id !== id)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Ignore storage errors (e.g. private mode / quota).
  }
}

export function toggleLike(id: string): boolean {
  const liked = isLiked(id)
  if (liked) {
    unlikeMeme(id)
    return false
  }
  likeMeme(id)
  return true
}
