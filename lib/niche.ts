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
  { min: 0, label: "Average Internet User", blurb: "You've never really explored the world of memes, and that's ok. You are most suited to learn about mainstream memes first." },
  { min: 0.2, label: "Casual Scroller", blurb: "You have knowledge of some popular memes, but not much beyond that. You are most suited to learn more about the mainstream memes." },
  { min: 0.4, label: "Meme Curious", blurb: "You have solid knowledge of popular memes. You are most suited to learn more about a mix of mainstream and deeper cuts." },
  { min: 0.6, label: "Certified Poster", blurb: "You know your mainstream memes and have dipped your toe into nicher ones. You are most suited to learn more about the deep cuts." },
  { min: 0.8, label: "Meme Scholar", blurb: "You have a great deal of knowledge in meme culture. You are most suited to learn about very niche memes." },
  { min: 1, label: "Chronically Online", blurb: "Do you have a job? You are most suited to learn about the nichest of the niche memes." },
]

export function nicheLevelFor(affinity: number): { label: string; blurb: string } {
  let chosen = NICHE_LEVELS[0]
  for (const level of NICHE_LEVELS) {
    if (affinity >= level.min) chosen = level
  }
  return { label: chosen.label, blurb: chosen.blurb }
}
