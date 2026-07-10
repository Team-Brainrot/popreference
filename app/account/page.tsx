import type { Metadata } from "next"
import { AccountView } from "@/components/account-view"

export const metadata: Metadata = {
  title: "My Account — PopRef",
  description: "View your meme viewing history, transaction history, and PopRef subscription options.",
}

export default function AccountPage() {
  return <AccountView />
}
