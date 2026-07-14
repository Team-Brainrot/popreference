import Link from "next/link"
import { Home, User, Brain } from "lucide-react"

export function AppHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="flex items-center justify-between px-5 pb-3 pt-4">
        <Link href="/feed" className="text-3xl font-bold tracking-tight text-foreground">
          Pop<span className="text-primary">Ref</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/feed"
            aria-label="Home"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-surface-foreground ring-1 ring-border transition-colors hover:bg-accent hover:text-accent-foreground active:scale-95"
          >
            <Home className="h-5 w-5" aria-hidden="true" />
          </Link>
          <Link
            href="/feed?quiz=1"
            aria-label="Take the meme quiz"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-surface-foreground ring-1 ring-border transition-colors hover:bg-accent hover:text-accent-foreground active:scale-95"
          >
            <Brain className="h-5 w-5" aria-hidden="true" />
          </Link>
          <Link
            href="/account"
            aria-label="Your account"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground ring-1 ring-border transition-colors hover:opacity-90 active:scale-95"
          >
            <User className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  )
}
