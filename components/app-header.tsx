import { Flame } from "lucide-react"

export function AppHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="flex items-center justify-between px-5 pb-3 pt-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Pop<span className="text-primary">Ref</span>
        </h1>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 shadow-sm ring-1 ring-border transition-transform active:scale-95"
          aria-label="Your streak: 2 days"
        >
          <Flame className="h-4 w-4 text-flame" fill="currentColor" aria-hidden="true" />
          <span className="text-sm font-semibold text-surface-foreground">Flo</span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-flame text-xs font-bold text-flame-foreground">
            2
          </span>
        </button>
      </div>
    </header>
  )
}
