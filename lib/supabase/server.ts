// lib/supabase/server.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Read-only client for Server Components (RSC).
 * Can read cookies but cannot set them.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies(); // Next 15: async
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value ?? undefined;
        },
        // no-ops in RSC
        set() {},
        remove() {},
      },
    }
  );
}

/**
 * Mutable client for Route Handlers / Server Actions.
 * Pass in the NextResponse you plan to return, so we can write cookies to it.
 */
export async function createSupabaseRouteClient(res: NextResponse) {
  const cookieStore = await cookies(); // reads from the incoming request
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value ?? undefined;
        },
        set(name: string, value: string, options: any) {
          res.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          res.cookies.set({ name, value: "", ...options, maxAge: 0 });
        },
      },
    }
  );
}
