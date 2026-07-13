"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Eye, Heart, Receipt, Check, ShieldAlert } from "lucide-react"
import { AppHeader } from "@/components/app-header"
import { getMemeById, type Meme } from "@/lib/memes"
import { getViewingHistory } from "@/lib/viewing-history"
import { getLikedMemes } from "@/lib/liked-memes"
import { getShowNsfw, setShowNsfw } from "@/lib/preferences"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-fit rounded-xl bg-primary px-8 py-2 shadow-[var(--shadow-card)]">
      <h2 className="text-balance text-center text-3xl font-extrabold tracking-tight text-primary-foreground">
        {children}
      </h2>
    </div>
  )
}

function formatViewedAt(timestamp: number): string {
  const diffMs = Date.now() - timestamp
  const minutes = Math.floor(diffMs / 60000)
  if (minutes < 1) return "Just now"
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return new Date(timestamp).toLocaleDateString()
}

// Mock transaction history
const transactions = [
  { id: "t1", label: "Go AD FREE", date: "Jul 2, 2026", amount: "$1.99" },
  { id: "t2", label: "Premium — Monthly", date: "Jun 1, 2026", amount: "$0.99" },
  { id: "t3", label: "Custom Colors", date: "May 18, 2026", amount: "$0.50" },
]

const plans = [
  {
    id: "premium",
    name: "Premium",
    price: "$0.99",
    cadence: "per month",
    perks: ["Unlimited saves", "Early access to trends", "Priority feed"],
  },
  {
    id: "adfree",
    name: "Go AD Free",
    price: "$1.99",
    cadence: "one time",
    perks: ["Then all ads are gone forever", "Cleaner feed", "Faster browsing"],
    featured: true,
  },
  {
    id: "colors",
    name: "Custom Colors",
    price: "$0.50",
    cadence: "one time",
    perks: ["Customize your page!", "Personal themes", "Show off your style"],
  },
]

type HistoryItem = { meme: Meme; viewedAt: number }
type LikeItem = { meme: Meme; likedAt: number }

export function AccountView() {
  const [history, setHistory] = useState<HistoryItem[] | null>(null)
  const [likes, setLikes] = useState<LikeItem[] | null>(null)
  const [nsfwEnabled, setNsfwEnabled] = useState(false)

  function handleToggleNsfw() {
    const next = !nsfwEnabled
    setNsfwEnabled(next)
    setShowNsfw(next)
  }

  useEffect(() => {
    setNsfwEnabled(getShowNsfw())
  }, [])

  useEffect(() => {
    const items = getViewingHistory()
      .map((record) => {
        const meme = getMemeById(record.id)
        return meme ? { meme, viewedAt: record.viewedAt } : null
      })
      .filter((item): item is HistoryItem => item !== null)
    setHistory(items)

    const likedItems = getLikedMemes()
      .map((record) => {
        const meme = getMemeById(record.id)
        return meme ? { meme, likedAt: record.likedAt } : null
      })
      .filter((item): item is LikeItem => item !== null)
    setLikes(likedItems)
  }, [])

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-background pb-12">
      <AppHeader />

      {/* Back link */}
      <div className="px-5 pt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1 rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-accent-foreground ring-1 ring-border transition-colors hover:bg-muted active:scale-95"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Back to home page
        </Link>
      </div>

      {/* Title */}
      <div className="px-5 pt-5">
        <SectionTitle>My Account</SectionTitle>
      </div>

      {/* Viewing history */}
      <section className="px-5 pt-8">
        <div className="rounded-2xl bg-card p-4 text-card-foreground shadow-[var(--shadow-card)]">
          <Link
            href="/account/history"
            className="-m-2 flex items-center justify-between gap-2 rounded-xl p-2 transition-colors hover:bg-black/10 active:scale-[0.99]"
          >
            <h3 className="flex items-center gap-2 text-base font-bold">
              <Eye className="h-5 w-5" aria-hidden="true" />
              Viewing History
            </h3>
            <span className="flex items-center gap-0.5 text-xs font-semibold text-card-foreground/70">
              View all
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
          {history === null ? (
            <p className="mt-3 text-sm text-card-foreground/70">Loading your history…</p>
          ) : history.length === 0 ? (
            <p className="mt-3 text-sm text-card-foreground/70">
              No memes viewed yet. Open a meme to start building your history.
            </p>
          ) : (
            <ul className="mt-3 flex flex-col gap-2">
              {history.slice(0, 5).map(({ meme, viewedAt }) => (
                <li key={meme.id}>
                  <Link
                    href={`/meme/${meme.id}`}
                    className="flex items-center gap-3 rounded-xl bg-black/15 p-2 transition-colors hover:bg-black/25 active:scale-[0.99]"
                  >
                    <img
                      src={meme.image || "/placeholder.svg"}
                      alt=""
                      className="h-10 w-10 flex-shrink-0 rounded-lg object-cover"
                      crossOrigin="anonymous"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold">{meme.term}</span>
                      <span className="block truncate text-xs text-card-foreground/70">{meme.meaning}</span>
                    </span>
                    <span className="flex-shrink-0 text-xs text-card-foreground/60">{formatViewedAt(viewedAt)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Likes */}
      <section className="px-5 pt-6">
        <div className="rounded-2xl bg-card p-4 text-card-foreground shadow-[var(--shadow-card)]">
          <Link
            href="/account/likes"
            className="-m-2 flex items-center justify-between gap-2 rounded-xl p-2 transition-colors hover:bg-black/10 active:scale-[0.99]"
          >
            <h3 className="flex items-center gap-2 text-base font-bold">
              <Heart className="h-5 w-5" aria-hidden="true" />
              Likes
            </h3>
            <span className="flex items-center gap-0.5 text-xs font-semibold text-card-foreground/70">
              View all
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
          {likes === null ? (
            <p className="mt-3 text-sm text-card-foreground/70">Loading your likes…</p>
          ) : likes.length === 0 ? (
            <p className="mt-3 text-sm text-card-foreground/70">
              No liked memes yet. Tap “Like this meme” on any meme to save it here.
            </p>
          ) : (
            <ul className="mt-3 flex flex-col gap-2">
              {likes.slice(0, 5).map(({ meme, likedAt }) => (
                <li key={meme.id}>
                  <Link
                    href={`/meme/${meme.id}`}
                    className="flex items-center gap-3 rounded-xl bg-black/15 p-2 transition-colors hover:bg-black/25 active:scale-[0.99]"
                  >
                    <img
                      src={meme.image || "/placeholder.svg"}
                      alt=""
                      className="h-10 w-10 flex-shrink-0 rounded-lg object-cover"
                      crossOrigin="anonymous"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold">{meme.term}</span>
                      <span className="block truncate text-xs text-card-foreground/70">{meme.meaning}</span>
                    </span>
                    <span className="flex-shrink-0 text-xs text-card-foreground/60">{formatViewedAt(likedAt)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Content settings */}
      <section className="px-5 pt-6">
        <div className="rounded-2xl bg-card p-4 text-card-foreground shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <h3 className="flex items-center gap-2 text-base font-bold">
                <ShieldAlert className="h-5 w-5" aria-hidden="true" />
                Mature Content
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-card-foreground/70">
                NSFW memes are hidden by default. Turn this on to show adult and
                mature terms in your home feed and search.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={nsfwEnabled}
              aria-label="Show NSFW memes"
              onClick={handleToggleNsfw}
              className={`relative inline-flex h-7 w-12 flex-shrink-0 items-center rounded-full transition-colors ${
                nsfwEnabled ? "bg-flame" : "bg-black/25"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                  nsfwEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          {nsfwEnabled ? (
            <p className="mt-3 rounded-lg bg-flame/15 px-3 py-2 text-xs font-semibold text-card-foreground">
              NSFW memes are now visible on your home page.
            </p>
          ) : null}
        </div>
      </section>

      {/* Transaction history */}
      <section className="px-5 pt-6">
        <div className="rounded-2xl bg-card p-4 text-card-foreground shadow-[var(--shadow-card)]">
          <h3 className="flex items-center gap-2 text-base font-bold">
            <Receipt className="h-5 w-5" aria-hidden="true" />
            Transaction History
          </h3>
          <ul className="mt-3 flex flex-col gap-2">
            {transactions.map((tx) => (
              <li
                key={tx.id}
                className="flex items-center justify-between gap-3 rounded-xl bg-black/15 px-3 py-2.5"
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold">{tx.label}</span>
                  <span className="block text-xs text-card-foreground/70">{tx.date}</span>
                </span>
                <span className="flex-shrink-0 text-sm font-bold">{tx.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Subscription banner */}
      <div className="px-5 pt-8">
        <SectionTitle>Wanna go Ad free?</SectionTitle>
      </div>

      {/* Subscription options */}
      <section className="grid grid-cols-1 gap-3 px-5 pt-5 sm:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`flex flex-col rounded-2xl p-4 shadow-[var(--shadow-card)] ring-1 ${
              plan.featured
                ? "bg-primary text-primary-foreground ring-primary"
                : "bg-surface text-surface-foreground ring-border"
            }`}
          >
            <h3 className="text-lg font-extrabold">{plan.name}</h3>
            <p className="mt-1 flex items-baseline gap-1">
              <span className="text-2xl font-bold">{plan.price}</span>
              <span className={`text-xs ${plan.featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                {plan.cadence}
              </span>
            </p>
            <ul className="mt-3 flex flex-1 flex-col gap-1.5">
              {plan.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2 text-xs">
                  <Check
                    className={`mt-0.5 h-3.5 w-3.5 flex-shrink-0 ${plan.featured ? "text-primary-foreground" : "text-flame"}`}
                    aria-hidden="true"
                  />
                  {perk}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className={`mt-4 rounded-lg px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-90 active:scale-95 ${
                plan.featured
                  ? "bg-flame text-flame-foreground"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              Choose plan
            </button>
          </div>
        ))}
      </section>
    </main>
  )
}
