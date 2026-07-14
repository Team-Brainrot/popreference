import Link from "next/link"

/**
 * Shared full-screen wrapper for the auth pages, styled to match the app's
 * hand-crafted card aesthetic (surface card on the muted app background).
 */
export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <main className="flex min-h-svh w-full flex-col items-center justify-center bg-muted px-5 py-10">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="mb-8 block text-center text-3xl font-bold tracking-tight text-foreground"
        >
          Pop<span className="text-flame">Ref</span>
        </Link>
        <div className="rounded-2xl bg-surface p-6 text-surface-foreground shadow-[var(--shadow-card)]">
          <h1 className="text-balance text-2xl font-bold">{title}</h1>
          <p className="mt-1 text-pretty text-sm leading-relaxed text-surface-foreground/70">
            {subtitle}
          </p>
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </main>
  )
}
