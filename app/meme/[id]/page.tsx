import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getMemeById, getSimilarMemes, hotMemes } from "@/lib/memes"
import { MemeDetail } from "@/components/meme-detail"

export function generateStaticParams() {
  return hotMemes.map((m) => ({ id: m.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const meme = getMemeById(id)
  if (!meme) return { title: "Meme not found — PopRef" }
  return {
    title: `${meme.term} — PopRef`,
    description: meme.meaning,
  }
}

export default async function MemePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const meme = getMemeById(id)
  if (!meme) notFound()

  const similar = getSimilarMemes(meme, 6)

  return <MemeDetail meme={meme} similar={similar} />
}
