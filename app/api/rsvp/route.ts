import { createSupabaseServerClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient()
    
    // Get authenticated user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { eventId } = await request.json()
    
    // Upsert profile if missing
    const { error: profileError } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        email: user.email,
      })

    if (profileError) throw profileError

    // Check if already registered
    const { data: existing } = await supabase
      .from("event_registrations")
      .select("id")
      .eq("event_id", eventId)
      .eq("user_id", user.id)
      .single()

    if (existing) {
      return NextResponse.json({ error: "Already registered" }, { status: 400 })
    }

    // Create registration
    const { error: rsvpError } = await supabase
      .from("event_registrations")
      .insert({
        event_id: eventId,
        user_id: user.id,
        status: "confirmed",
      })

    if (rsvpError) throw rsvpError

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("RSVP error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}