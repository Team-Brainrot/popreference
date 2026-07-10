import type { Metadata } from "next"
import { LikesView } from "@/components/likes-view"

export const metadata: Metadata = {
  title: "Likes — PopRef",
  description: "The memes you liked on PopRef.",
}

export default function LikesPage() {
  return <LikesView />
}
