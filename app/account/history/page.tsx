import type { Metadata } from "next"
import { HistoryView } from "@/components/history-view"

export const metadata: Metadata = {
  title: "Viewing History — PopRef",
  description: "The last 50 memes you viewed on PopRef.",
}

export default function HistoryPage() {
  return <HistoryView />
}
