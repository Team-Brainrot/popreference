"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { AppHeader } from "@/components/app-header"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-fit rounded-xl bg-primary px-8 py-2 shadow-[var(--shadow-card)]">
      <h2 className="text-balance text-center text-3xl font-extrabold tracking-tight text-primary-foreground">
        {children}
      </h2>
    </div>
  )
}

export function LoginView() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!email.trim() || !password.trim()) {
      setError("Please enter both your email and password.")
      return
    }
    setError(null)
    // No auth backend is connected yet — wire this up to a real provider later.
    console.log("[v0] Login submitted for:", email)
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-background pb-12">
      <AppHeader />

      {/* Back link */}
      <div className="px-5 pt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1 rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-accent-foreground ring-1 ring-border transition-colors hover:bg-muted active:scale-95"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Back to home page
        </Link>
      </div>

      {/* Title */}
      <div className="px-5 pt-5">
        <SectionTitle>Log In</SectionTitle>
      </div>

      <p className="px-5 pt-4 text-center text-sm text-muted-foreground text-pretty">
        Welcome back! Log in to keep decoding the latest slang.
      </p>

      {/* Login form */}
      <section className="px-5 pt-6">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-2xl bg-surface p-5 text-surface-foreground shadow-[var(--shadow-card)] ring-1 ring-border"
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-semibold">
              Email
            </label>
            <div className="flex items-center gap-2 rounded-xl bg-background px-3 ring-1 ring-border focus-within:ring-2 focus-within:ring-ring">
              <Mail className="h-4 w-4 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full bg-transparent py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-semibold">
              Password
            </label>
            <div className="flex items-center gap-2 rounded-xl bg-background px-3 ring-1 ring-border focus-within:ring-2 focus-within:ring-ring">
              <Lock className="h-4 w-4 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                className="w-full bg-transparent py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="flex-shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground active:scale-95"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-surface-foreground">
              <input type="checkbox" className="h-4 w-4 rounded border-border accent-primary" />
              Remember me
            </label>
            <Link href="/login" className="text-sm font-semibold text-flame hover:underline">
              Forgot password?
            </Link>
          </div>

          {error ? (
            <p role="alert" className="text-sm font-medium text-flame">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            className="mt-1 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 active:scale-[0.98]"
          >
            Log In
          </button>
        </form>

        <p className="pt-5 text-center text-sm text-muted-foreground">
          {"Don't have an account? "}
          <Link href="/login" className="font-semibold text-flame hover:underline">
            Sign up
          </Link>
        </p>
      </section>
    </main>
  )
}
