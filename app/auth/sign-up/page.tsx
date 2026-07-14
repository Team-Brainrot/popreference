"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { AuthShell } from "@/components/auth/auth-shell"
import { GoogleButton } from "@/components/auth/google-button"

const inputClass =
  "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-[#1b1b22] outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-flame/50"

export default function SignUpPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (password !== repeatPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
            `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
      router.push("/auth/sign-up-success")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not create account")
      setLoading(false)
    }
  }

  return (
    <AuthShell title="Create your account" subtitle="Save your likes, purchases, and For You feed across devices.">
      <GoogleButton label="Sign up with Google" />

      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium text-surface-foreground/50">or</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={handleSignUp} className="flex flex-col gap-4">
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
            autoComplete="new-password"
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="repeat-password" className="text-sm font-semibold">
            Repeat password
          </label>
          <input
            id="repeat-password"
            type="password"
            required
            autoComplete="new-password"
            placeholder="Re-enter your password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            className={inputClass}
          />
        </div>
        {error ? <p className="text-sm font-medium text-flame">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="mt-1 w-full rounded-xl bg-flame px-4 py-3 text-sm font-bold text-flame-foreground transition-opacity hover:opacity-90 active:scale-[0.99] disabled:opacity-60"
        >
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-surface-foreground/70">
        Already have an account?{" "}
        <Link href="/auth/login" className="font-semibold text-flame underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </AuthShell>
  )
}
