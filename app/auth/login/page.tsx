"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { AuthShell } from "@/components/auth/auth-shell"
import { GoogleButton } from "@/components/auth/google-button"

const inputClass =
  "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-[#1b1b22] outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-flame/50"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      router.push("/")
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not sign in")
      setLoading(false)
    }
  }

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to sync your likes, purchases, and For You feed.">
      <GoogleButton label="Sign in with Google" />

      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium text-surface-foreground/50">or</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-semibold">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-semibold">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />
        </div>
        {error ? <p className="text-sm font-medium text-flame">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="mt-1 w-full rounded-xl bg-flame px-4 py-3 text-sm font-bold text-flame-foreground transition-opacity hover:opacity-90 active:scale-[0.99] disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-surface-foreground/70">
        New here?{" "}
        <Link href="/auth/sign-up" className="font-semibold text-flame underline underline-offset-4">
          Create an account
        </Link>
      </p>
    </AuthShell>
  )
}
