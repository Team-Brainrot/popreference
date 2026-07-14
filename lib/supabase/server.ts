import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import { createServerClient as createSSRClient } from "@supabase/ssr"
import { cookies } from "next/headers"

/**
 * Lightweight server-side Supabase client for public, read-only data
 * (the meme niche labels are exposed via an RLS "public read" policy, so the
 * anon key is sufficient and no auth cookies are required).
 */
export function createServerClient() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error("Missing Supabase environment variables")
  }

  return createSupabaseClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

/**
 * Cookie-aware server client bound to the current request's user session.
 * Use this for any authenticated read/write so RLS policies see `auth.uid()`.
 * Always create a new client per request (never store it globally).
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createSSRClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            )
          } catch {
            // Called from a Server Component; safe to ignore because the
            // proxy middleware refreshes the session.
          }
        },
      },
    },
  )
}
