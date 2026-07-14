import Link from "next/link"
import { AuthShell } from "@/components/auth/auth-shell"

export default function SignUpSuccessPage() {
  return (
    <AuthShell
      title="Check your inbox"
      subtitle="We sent you a confirmation link. Confirm your email, then sign in to start syncing your feed."
    >
      <Link
        href="/auth/login"
        className="block w-full rounded-xl bg-flame px-4 py-3 text-center text-sm font-bold text-flame-foreground transition-opacity hover:opacity-90 active:scale-[0.99]"
      >
        Go to sign in
      </Link>
      <Link
        href="/feed"
        className="mt-3 block text-center text-sm font-semibold text-surface-foreground/70 underline underline-offset-4"
      >
        Back to browsing
      </Link>
    </AuthShell>
  )
}
