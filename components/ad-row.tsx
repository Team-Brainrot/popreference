export function AdRow() {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-dashed border-border bg-surface/50 p-2 text-muted-foreground">
      <span className="flex items-center justify-center rounded-lg bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
        Ad
      </span>
      <span className="flex-1 text-center text-xs font-semibold uppercase tracking-widest">Ad Space</span>
      <span className="flex items-center justify-center rounded-lg bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
        Ad
      </span>
    </div>
  )
}
