import Link from "next/link"
import {
  ArrowRight,
  Sparkles,
  BookOpenText,
  CalendarClock,
  Search,
  MessageSquareText,
  Check,
} from "lucide-react"
import { getMemeById, type Meme } from "@/lib/memes"

const previewIds = ["skibidi", "rizz", "gyatt", "sigma"]
const showcaseIds = ["sigma", "delulu", "mewing", "aura", "ohio", "67"]

function pickMemes(ids: string[]): Meme[] {
  return ids.map((id) => getMemeById(id)).filter((m): m is Meme => Boolean(m))
}

function MemeThumb({ meme }: { meme: Meme }) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-card ring-1 ring-black/5">
      <img
        src={meme.image || "/placeholder.svg"}
        alt={`Meme representing ${meme.term}`}
        className={`h-full w-full ${meme.fit === "contain" ? "object-contain" : "object-cover"}`}
        crossOrigin="anonymous"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
      <span className="pointer-events-none absolute bottom-1.5 left-2 right-2 truncate text-xs font-bold text-white drop-shadow">
        {meme.term}
      </span>
    </div>
  )
}

/* ---------------------------------- Nav ---------------------------------- */

function LandingNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="text-2xl font-bold tracking-tight text-foreground">
          Pop<span className="text-flame">Ref</span>
        </Link>
        <nav className="flex items-center gap-2">
          <Link
            href="/feed"
            className="inline-flex items-center gap-1.5 rounded-full bg-flame px-4 py-2 text-sm font-bold text-flame-foreground transition-opacity hover:opacity-90 active:scale-95"
          >
            Open app
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </header>
  )
}

/* --------------------------------- Hero ---------------------------------- */

function Hero() {
  const preview = pickMemes(previewIds)
  return (
    <section className="mx-auto w-full max-w-6xl px-5 pb-8 pt-12 md:pt-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="flex flex-col items-start">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground ring-1 ring-border">
            <Sparkles className="h-3.5 w-3.5 text-flame" aria-hidden="true" />
            Sourced from Know Your Meme
          </span>
          <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-6xl">
            Know what your kids are <span className="text-flame">actually</span> saying.
          </h1>
          <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            PopRef is the daily cheat sheet that decodes trending teen slang and internet memes in
            plain English &mdash; so you can keep up without the awkward &quot;what does that
            mean?&quot;
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/feed"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-flame px-6 py-3.5 text-base font-bold text-flame-foreground shadow-[var(--shadow-card)] transition-opacity hover:opacity-90 active:scale-95"
            >
              Start decoding
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-muted-foreground">
            {["Free to browse", "Updated daily", "500+ terms decoded"].map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 text-flame" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* App preview panel */}
        <div className="relative mx-auto w-full max-w-sm">
          <div className="rounded-3xl bg-surface p-4 shadow-[var(--shadow-card)] ring-1 ring-border">
            <div className="mb-3 flex items-center justify-between px-1">
              <span className="text-lg font-bold tracking-tight text-surface-foreground">
                Pop<span className="text-flame">Ref</span>
              </span>
              <span className="rounded-full bg-flame px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-flame-foreground">
                Hot
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {preview.map((meme) => (
                <MemeThumb key={meme.id} meme={meme} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------- Stats --------------------------------- */

const stats = [
  { value: "500+", label: "Slang terms & memes" },
  { value: "Daily", label: "Fresh trends added" },
  { value: "100%", label: "Plain-English meanings" },
]

function Stats() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-8">
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-surface px-4 py-5 text-center shadow-[var(--shadow-card)] ring-1 ring-border"
          >
            <p className="text-2xl font-extrabold text-flame md:text-3xl">{stat.value}</p>
            <p className="mt-1 text-xs font-medium text-muted-foreground md:text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------- Features -------------------------------- */

const features = [
  {
    icon: BookOpenText,
    title: "Plain-English meanings",
    body: "Every term is explained without the jargon, so it actually makes sense the first time you read it.",
  },
  {
    icon: CalendarClock,
    title: "Updated every day",
    body: "Slang moves fast. We track what's trending so you're never a month behind the group chat.",
  },
  {
    icon: Search,
    title: "Search any term",
    body: "Heard something new? Look it up instantly and get the meaning, origin, and how it's used.",
  },
]

function Features() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-12 md:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
          Built for keeping up, not catching up
        </h2>
        <p className="mt-3 text-pretty text-muted-foreground">
          No more secretly Googling every word your teenager says at dinner.
        </p>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl bg-surface p-6 text-surface-foreground shadow-[var(--shadow-card)] ring-1 ring-border"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-flame text-flame-foreground">
              <feature.icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-lg font-bold">{feature.title}</h3>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-surface-foreground/70">
              {feature.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ----------------------------- How it works ------------------------------ */

const steps = [
  {
    icon: Search,
    title: "Browse what's trending",
    body: "Open the feed and see the memes and slang blowing up right now, ranked by what's hot.",
  },
  {
    icon: BookOpenText,
    title: "Read the meaning",
    body: "Tap any term for a clear definition, origin story, and examples of how it's used.",
  },
  {
    icon: MessageSquareText,
    title: "Sound fluent",
    body: "Drop it into conversation and watch your kids do a double-take. In a good way.",
  },
]

function HowItWorks() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-extrabold tracking-tight md:text-4xl">
            Fluent in three taps
          </h2>
          <p className="mt-3 text-pretty text-primary-foreground/70">
            From clueless to caught-up in about a minute a day.
          </p>
        </div>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="relative rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-flame text-sm font-extrabold text-flame-foreground">
                  {index + 1}
                </span>
                <step.icon className="h-6 w-6 text-primary-foreground/80" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-primary-foreground/70">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* --------------------------------- Quote --------------------------------- */

function Quote() {
  return (
    <section className="mx-auto w-full max-w-4xl px-5 py-12 md:py-16">
      <figure className="rounded-3xl bg-surface px-6 py-12 text-center shadow-[var(--shadow-card)] ring-1 ring-border md:px-12">
        <span className="mx-auto block font-serif text-6xl leading-none text-flame" aria-hidden="true">
          &ldquo;
        </span>
        <blockquote className="mx-auto mt-2 max-w-2xl text-balance text-xl font-semibold leading-relaxed text-surface-foreground md:text-2xl">
          {
            "Kids are in such a different world, that I don't feel like I don't belong or I'm outside of it. It doesn't \u201Cspeak their language.\u201D"
          }
        </blockquote>
        <figcaption className="mt-6 text-sm font-medium text-muted-foreground">
          &mdash; A parent
        </figcaption>
      </figure>
    </section>
  )
}

/* ------------------------------- Showcase -------------------------------- */

function Showcase() {
  const memes = pickMemes(showcaseIds)
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-12 md:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            Trending right now
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            A taste of what you&apos;ll decode inside PopRef.
          </p>
        </div>
        <Link
          href="/feed"
          className="inline-flex items-center gap-1.5 rounded-full bg-surface px-4 py-2 text-sm font-bold text-surface-foreground ring-1 ring-border transition-colors hover:bg-accent hover:text-accent-foreground active:scale-95"
        >
          Browse all terms
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
        {memes.map((meme) => (
          <Link
            key={meme.id}
            href={`/meme/${meme.id}`}
            className="group flex flex-col overflow-hidden rounded-2xl bg-surface shadow-[var(--shadow-card)] ring-1 ring-border transition-transform hover:-translate-y-0.5"
          >
            <MemeThumb meme={meme} />
            <div className="flex flex-1 flex-col p-4">
              <h3 className="font-bold text-surface-foreground">{meme.term}</h3>
              <p className="mt-1 line-clamp-3 text-pretty text-sm leading-relaxed text-surface-foreground/70">
                {meme.meaning}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------- Final CTA ------------------------------- */

function FinalCta() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 pb-16">
      <div className="rounded-3xl bg-flame px-6 py-14 text-center text-flame-foreground shadow-[var(--shadow-card)] md:py-20">
        <h2 className="mx-auto max-w-2xl text-balance text-3xl font-extrabold tracking-tight md:text-4xl">
          Stop nodding along. Start understanding.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-pretty text-flame-foreground/90">
          Join the parents and teachers who finally get the joke. It&apos;s free to start.
        </p>
        <Link
          href="/feed"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-surface px-7 py-3.5 text-base font-bold text-surface-foreground shadow-[var(--shadow-card)] transition-transform hover:-translate-y-0.5 active:scale-95"
        >
          Open PopRef
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}

/* -------------------------------- Footer --------------------------------- */

function LandingFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row">
        <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
          Pop<span className="text-flame">Ref</span>
        </Link>
        <p className="text-center text-xs text-muted-foreground">
          Definitions and images via Know Your Meme. For educational, keep-up-with-the-kids purposes.
        </p>
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} PopRef</p>
      </div>
    </footer>
  )
}

/* --------------------------------- Page ---------------------------------- */

export function LandingPage() {
  return (
    <main className="min-h-dvh w-full bg-background">
      <LandingNav />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Quote />
      <Showcase />
      <FinalCta />
      <LandingFooter />
    </main>
  )
}
