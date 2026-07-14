import { Suspense } from "react"
import { MemeFeed } from "@/components/meme-feed"
import { getNicheScores } from "@/lib/niche"

export default async function FeedPage() {
  const nicheScores = await getNicheScores()
  return (
    <Suspense fallback={null}>
      <MemeFeed nicheScores={nicheScores} />
    </Suspense>
  )
}
