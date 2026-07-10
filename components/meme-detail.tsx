import Link from "next/link"
import { ChevronLeft, ExternalLink } from "lucide-react"
import { AppHeader } from "@/components/app-header"
import { MemeCard } from "@/components/meme-card"
import type { Meme } from "@/lib/memes"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-fit rounded-xl bg-primary px-8 py-2 shadow-[var(--shadow-card)]">
      <h2 className="text-balance text-center text-3xl font-extrabold tracking-tight text-primary-foreground">
        {children}
      </h2>
    </div>
  )
}

export function MemeDetail({ meme, similar }: { meme: Meme; similar: Meme[] }) {
  const knowYourMemeUrl = `https://knowyourmeme.com/search?q=${encodeURIComponent(meme.term)}`

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
          Back to Home Page
        </Link>
      </div>

      {/* Meme name */}
      <div className="px-5 pt-5">
        <SectionTitle>{meme.term}</SectionTitle>
      </div>

      {/* Description + image */}
      <section className="grid grid-cols-2 gap-4 px-5 pt-6">
        <div className="flex flex-col rounded-2xl bg-card p-4 text-card-foreground shadow-[var(--shadow-card)]">
          <h3 className="text-sm font-bold">Concise Description</h3>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-card-foreground/90">{meme.meaning}</p>
        </div>

        <figure className="flex flex-col overflow-hidden rounded-2xl bg-surface shadow-[var(--shadow-card)] ring-1 ring-border">
          <div className="flex flex-1 items-center justify-center p-2">
            <img
              src={meme.image || "/placeholder.svg"}
              alt={`Meme representing the slang term ${meme.term}`}
              className="h-full w-full rounded-lg object-cover"
              crossOrigin="anonymous"
            />
          </div>
        </figure>
      </section>

      {/* Further info */}
      <div className="px-5 pt-8">
        <SectionTitle>Further Info</SectionTitle>
      </div>

      <section className="px-5 pt-5">
        <div className="relative overflow-hidden rounded-3xl shadow-[var(--shadow-card)]">
          <img
            src={meme.image || "/placeholder.svg"}
            alt={`A visual variant of the ${meme.term} meme`}
            className="h-56 w-full object-cover"
            crossOrigin="anonymous"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-5">
            <p className="text-2xl font-extrabold leading-tight text-white drop-shadow">{meme.term}</p>
            <p className="text-sm font-medium text-white/80">Popular variant</p>
          </div>
        </div>

        <a
          href={knowYourMemeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto mt-4 flex w-fit items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-card)] transition-colors hover:opacity-90 active:scale-95"
        >
          Learn more about {meme.term} at Know Your Meme
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </section>

      {/* Similar memes */}
      <div className="px-5 pt-8">
        <SectionTitle>Similar Memes</SectionTitle>
      </div>

      <section className="grid grid-cols-3 gap-3 px-5 pt-5">
        {similar.map((m) => (
          <MemeCard key={m.id} meme={m} />
        ))}
      </section>
    </main>
  )
}
