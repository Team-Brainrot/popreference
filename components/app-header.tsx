export function AppHeader() {
  return (
    <header className="sticky top-0 z-20 bg-background/90 backdrop-blur-md">
      <div className="flex items-center justify-between px-5 pb-3 pt-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">PopRef</h1>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-accent-foreground"
          aria-label="Your streak: 2 days"
        >
          <span className="text-sm font-semibold">Flo</span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            2
          </span>
        </button>
      </div>
    </header>
  )
}
