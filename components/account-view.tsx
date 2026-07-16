"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  Receipt,
  Check,
  ShieldAlert,
  LogIn,
  LogOut,
  UserRound,
} from "lucide-react"
import { AppHeader } from "@/components/app-header"
import { getMemeById, type Meme } from "@/lib/memes"
import { getViewingHistory } from "@/lib/viewing-history"
import { getShowNsfw, setShowNsfw } from "@/lib/preferences"
import { useUserData } from "@/lib/user-data"

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

const plans = [
  {
    id: "adfree",
    name: "Unlimited & Ad Free",
    price: "$1.99",
    priceCents: 199,
    cadence: "per month",
    perks: ["Unlimited saves", "No ads, ever", "Cleaner, faster feed"],
    featured: true,
  },
  {
    id: "scholar",
    name: "Scholar",
    price: "$4.99",
    priceCents: 499,
    cadence: "per month",
    perks: ["Learn how to use any meme you're viewing in a single sentence"],
  },
  {
    id: "colors",
    name: "Custom Colors",
    price: "$0.50",
    priceCents: 50,
    cadence: "one time",
    perks: ["Customize your page!", "Personal themes", "Show off your style"],
  },
]

function formatMoney(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

type HistoryItem = { meme: Meme; viewedAt: number }
type LikeItem = { meme: Meme; likedAt: number }

export function AccountView() {
  const router = useRouter()
  const {
    user,
    authReady,
    dataReady,
    likes: likeRecords,
    purchases,
    addPurchase,
    signOut,
  } = useUserData()
  const [history, setHistory] = useState<HistoryItem[] | null>(null)
  const [nsfwEnabled, setNsfwEnabled] = useState(false)
  const [buyingId, setBuyingId] = useState<string | null>(null)

  function handleToggleNsfw() {
    const next = !nsfwEnabled
    setNsfwEnabled(next)
    setShowNsfw(next)
  }

  async function handleChoosePlan(plan: (typeof plans)[number]) {
    if (!user) {
      router.push("/auth/login")
      return
    }
    setBuyingId(plan.id)
    try {
      await addPurchase({ productId: plan.id, label: plan.name, amountCents: plan.priceCents })
    } finally {
      setBuyingId(null)
    }
  }

  const likes = useMemo<LikeItem[] | null>(() => {
    if (!dataReady) return null
    return likeRecords
      .map((record) => {
        const meme = getMemeById(record.id)
        return meme ? { meme, likedAt: record.likedAt } : null
      })
      .filter((item): item is LikeItem => item !== null)
  }, [likeRecords, dataReady])

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
  }, [])

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-background pb-12">
      <AppHeader />

      {/* Back link */}
      <div className="px-5 pt-4">
        <Link
          href="/feed"
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

      {/* Auth / profile card */}
      <section className="px-5 pt-8">
        <div className="rounded-2xl bg-surface p-4 text-surface-foreground shadow-[var(--shadow-card)] ring-1 ring-border">
          {!authReady ? (
            <p className="text-sm text-muted-foreground">Checking your session…</p>
          ) : user ? (
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary text-primary-foreground">
                {user.user_metadata?.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={(user.user_metadata.avatar_url as string) || "/placeholder.svg"}
                    alt=""
                    className="h-full w-full object-cover"
                    crossOrigin="anonymous"
                  />
                ) : (
                  <UserRound className="h-6 w-6" aria-hidden="true" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">
                  {(user.user_metadata?.full_name as string) ?? "Signed in"}
                </p>
                <p className="truncate text-xs text-muted-foreground">{user.email}</p>
              </div>
              <button
                type="button"
                onClick={() => void signOut()}
                className="flex flex-shrink-0 items-center gap-1.5 rounded-lg bg-muted px-3 py-2 text-xs font-bold text-foreground ring-1 ring-border transition-colors hover:opacity-90 active:scale-95"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-muted text-foreground">
                <UserRound className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">You&apos;re browsing as a guest</p>
                <p className="text-xs text-muted-foreground">
                  Sign in to sync your likes, purchases, and For You feed across devices.
                </p>
              </div>
              <Link
                href="/auth/login"
                className="flex flex-shrink-0 items-center gap-1.5 rounded-lg bg-flame px-3 py-2 text-xs font-bold text-flame-foreground transition-opacity hover:opacity-90 active:scale-95"
              >
                <LogIn className="h-4 w-4" aria-hidden="true" />
                Sign in
              </Link>
            </div>
          )}
        </div>
      </section>

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
          {!user ? (
            <p className="mt-3 text-sm text-card-foreground/70">
              Sign in to view your purchases and keep your receipts across devices.
            </p>
          ) : purchases.length === 0 ? (
            <p className="mt-3 text-sm text-card-foreground/70">
              No purchases yet. Choose a plan below to upgrade your experience.
            </p>
          ) : (
            <ul className="mt-3 flex flex-col gap-2">
              {purchases.map((tx) => (
                <li
                  key={tx.id}
                  className="flex items-center justify-between gap-3 rounded-xl bg-black/15 px-3 py-2.5"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold">{tx.label}</span>
                    <span className="block text-xs text-card-foreground/70">{formatDate(tx.createdAt)}</span>
                  </span>
                  <span className="flex-shrink-0 text-sm font-bold">{formatMoney(tx.amountCents)}</span>
                </li>
              ))}
            </ul>
          )}
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
              onClick={() => void handleChoosePlan(plan)}
              disabled={buyingId === plan.id}
              className={`mt-4 rounded-lg px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-90 active:scale-95 disabled:opacity-60 ${
                plan.featured
                  ? "bg-flame text-flame-foreground"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              {buyingId === plan.id ? "Processing…" : user ? "Choose plan" : "Sign in to buy"}
            </button>
          </div>
        ))}
      </section>
    </main>
  )
}
