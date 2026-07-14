import type { Meme } from "@/lib/memes"
import { createServerClient } from "@/lib/supabase/server"

/** Map of meme id -> niche score (1 = mainstream/normie, 10 = deep-cut niche). */
export type NicheMap = Record<string, number>

const DEFAULT_NICHE = 5

/** Fetch every meme's niche score from Supabase. Falls back to an empty map on error. */
export async function getNicheScores(): Promise<NicheMap> {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from("meme_niche_labels")
      .select("meme_id, niche_score")

    if (error || !data) return {}

    const map: NicheMap = {}
    for (const row of data) {
      map[row.meme_id as string] = row.niche_score as number
    }
    return map
  } catch {
    return {}
  }
}

export function nicheOf(niche: NicheMap, id: string): number {
  return niche[id] ?? DEFAULT_NICHE
}

/**
 * Rank memes for the FOR YOU feed based on quiz affinity (0..1).
 * High affinity (more correct answers) surfaces the most niche memes first;
 * low affinity surfaces mainstream memes first.
 */
export function rankForYou(memes: Meme[], niche: NicheMap, affinity: number): Meme[] {
  return memes
    .map((meme, index) => {
      const n = nicheOf(niche, meme.id)
      // Blend: affinity pulls toward high niche, (1 - affinity) toward mainstream.
      const preference = affinity * n + (1 - affinity) * (11 - n)
      return { meme, preference, n, index }
    })
    .sort((a, b) => b.preference - a.preference || b.n - a.n || a.index - b.index)
    .map((entry) => entry.meme)
}

const NICHE_LEVELS = [
  { min: 0, label: "Normie", blurb: "Mainstream classics, front and center." },
  { min: 0.2, label: "Casual Scroller", blurb: "The hits everyone knows." },
  { min: 0.4, label: "Meme Curious", blurb: "A mix of popular and deeper cuts." },
  { min: 0.6, label: "Certified Poster", blurb: "Leaning into the deep cuts." },
  { min: 0.8, label: "Meme Connoisseur", blurb: "Niche brainrot, mostly." },
  { min: 1, label: "Chronically Online", blurb: "The nichest of the niche." },
]

export function nicheLevelFor(affinity: number): { label: string; blurb: string } {
  let chosen = NICHE_LEVELS[0]
  for (const level of NICHE_LEVELS) {
    if (affinity >= level.min) chosen = level
  }
  return { label: chosen.label, blurb: chosen.blurb }
}
