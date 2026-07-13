import { MemeFeed } from "@/components/meme-feed"
import { getNicheScores } from "@/lib/niche"

export default async function HomePage() {
  const nicheScores = await getNicheScores()
  return <MemeFeed nicheScores={nicheScores} />
}
