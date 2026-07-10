export function AdRow() {
  return (
    <div className="flex items-center gap-2 rounded-2xl bg-card p-2 text-card-foreground">
      <span className="flex items-center justify-center rounded-lg bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
        Ad
      </span>
      <span className="flex-1 text-center text-sm font-semibold tracking-wide">AD SPACE</span>
      <span className="flex items-center justify-center rounded-lg bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
        Ad
      </span>
    </div>
  )
}
