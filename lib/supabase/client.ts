import { createBrowserClient } from "@supabase/ssr"

/**
 * Browser-side Supabase client (singleton). Reads/writes the user session from
 * cookies so it stays in sync with the server.
 */
let browserClient: ReturnType<typeof createBrowserClient> | undefined

export function createClient() {
  if (browserClient) return browserClient
  browserClient = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
  return browserClient
}
