import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import DashboardClient from "@/app/dashboard/DashboardClient"

export default async function Page() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  console.log("=== DASHBOARD DEBUG ===")
  console.log("User ID:", user.id)
  console.log("User Email:", user.email)
  console.log("User Created At:", user.created_at)

  // Ensure a profile row exists (safe upsert) - using correct schema
  const { error: upsertError } = await supabase
    .from("profiles")
    .upsert({ 
      user_id: user.id, // This is the primary key in your schema
      email: user.email 
    })

  if (upsertError) {
    console.error("Profile upsert error:", upsertError)
  }

  // Fetch comprehensive profile data using your actual schema
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select(`
      user_id,
      full_name,
      bio,
      linkedin_url,
      company,
      role,
      membership_tier,
      created_at,
      additional_places,
      sub_industries,
      finance_sub_industries,
      birthday,
      instagram_handle,
      email
    `)
    .eq("user_id", user.id)
    .single()

  console.log("Profile data:", profile)
  console.log("Profile error:", profileError)
  
  if (profile) {
    console.log("✅ Found profile for user:", profile.user_id)
    console.log("Profile name:", profile.full_name)
    console.log("Profile email:", profile.email)
  } else {
    console.log("❌ No profile found for user:", user.id)
  }

  // Fetch membership information using your actual schema
  const { data: membership, error: membershipError } = await supabase
    .from("memberships")
    .select(`
      user_id,
      tier,
      status,
      primary_location,
      additional_places,
      current_period_end
    `)
    .eq("user_id", user.id)
    .single()

  console.log("Membership data:", membership)
  console.log("Membership error:", membershipError)

  // Fetch user's upcoming event registrations with event details
  const { data: upcomingEvents, error: upcomingError } = await supabase
    .from("event_registrations")
    .select(`
      id,
      status,
      created_at,
      event_id,
      events!inner (
        id,
        title,
        description,
        starts_at,
        ends_at,
        capacity,
        status
      )
    `)
    .eq("user_id", user.id)
    .gte("events.starts_at", new Date().toISOString())
    .order("events.starts_at", { ascending: true })
    .limit(5)

  console.log("Upcoming events data:", upcomingEvents)
  console.log("Upcoming events error:", upcomingError)

  // Fetch user's past event registrations for activity
  const { data: pastEvents, error: pastError } = await supabase
    .from("event_registrations")
    .select(`
      id,
      status,
      created_at,
      event_id,
      events!inner (
        id,
        title,
        description,
        starts_at,
        ends_at,
        capacity,
        status
      )
    `)
    .eq("user_id", user.id)
    .lt("events.starts_at", new Date().toISOString())
    .order("events.starts_at", { ascending: false })
    .limit(3)

  console.log("Past events data:", pastEvents)
  console.log("Past events error:", pastError)

  // Count total events attended (simplified)
  const { count: totalEventsAttended, error: countError } = await supabase
    .from("event_registrations")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)

  console.log("Total events count:", totalEventsAttended)
  console.log("Count error:", countError)

  const dashboardData = {
    profile: profile ?? null,
    membership: membership ?? null,
    upcomingEvents: upcomingEvents ?? [],
    pastEvents: pastEvents ?? [],
    totalEventsAttended: totalEventsAttended ?? 0
  }

  return <DashboardClient data={dashboardData} />
}