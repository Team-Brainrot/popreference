import Link from "next/link"
import { AuthShell } from "@/components/auth/auth-shell"

export default function AuthErrorPage() {
  return (
    <AuthShell
      title="Something went wrong"
      subtitle="We couldn't complete your sign-in. The link may have expired or already been used."
    >
      <Link
        href="/auth/login"
        className="block w-full rounded-xl bg-flame px-4 py-3 text-center text-sm font-bold text-flame-foreground transition-opacity hover:opacity-90 active:scale-[0.99]"
      >
        Try again
      </Link>
      <Link
        href="/"
        className="mt-3 block text-center text-sm font-semibold text-surface-foreground/70 underline underline-offset-4"
      >
        Back to browsing
      </Link>
    </AuthShell>
  )
}
