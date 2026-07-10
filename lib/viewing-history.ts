"use client"

const STORAGE_KEY = "popref:viewing-history"
const MAX_ENTRIES = 50

export type ViewRecord = {
  id: string
  viewedAt: number
}

export function getViewingHistory(): ViewRecord[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (entry): entry is ViewRecord =>
        entry && typeof entry.id === "string" && typeof entry.viewedAt === "number",
    )
  } catch {
    return []
  }
}

export function recordView(id: string): void {
  if (typeof window === "undefined") return
  try {
    const history = getViewingHistory().filter((entry) => entry.id !== id)
    const next: ViewRecord[] = [{ id, viewedAt: Date.now() }, ...history].slice(0, MAX_ENTRIES)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Ignore storage errors (e.g. private mode / quota).
  }
}
