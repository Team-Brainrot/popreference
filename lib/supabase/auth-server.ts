import "server-only"
import { createServerClient as createSSRClient } from "@supabase/ssr"
import { cookies } from "next/headers"

/**
 * Cookie-aware server client bound to the current request's user session.
 * Use this for any authenticated read/write so RLS policies see `auth.uid()`.
 * Always create a new client per request (never store it globally).
 *
 * This lives in its own `server-only` module (separate from `server.ts`) so
 * that the anon read-only client in `server.ts` can still be imported by code
 * that ends up in the client bundle without pulling in `next/headers`.
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
