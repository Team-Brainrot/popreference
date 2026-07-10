import Link from "next/link"
import { ChevronLeft, Eye, Receipt, Check } from "lucide-react"
import { AppHeader } from "@/components/app-header"
import { hotMemes } from "@/lib/memes"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-fit rounded-xl bg-primary px-8 py-2 shadow-[var(--shadow-card)]">
      <h2 className="text-balance text-center text-3xl font-extrabold tracking-tight text-primary-foreground">
        {children}
      </h2>
    </div>
  )
}

// Recently viewed memes (mock viewing history)
const viewingHistory = hotMemes.slice(0, 5)

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

export function AccountView() {
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
          <h3 className="flex items-center gap-2 text-base font-bold">
            <Eye className="h-5 w-5" aria-hidden="true" />
            Viewing History
          </h3>
          <ul className="mt-3 flex flex-col gap-2">
            {viewingHistory.map((meme) => (
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
                </Link>
              </li>
            ))}
          </ul>
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
