"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import DashboardClient from "@/app/dashboard/DashboardClient"


type Profile = {
  user_id: string
  full_name: string | null
  bio: string | null
  linkedin_url: string | null
  company?: string | null
  role?: string | null
  membership_tier?: string | null
  instagram_handle?: string | null
  birthday?: string | null
  created_at?: string | null
  additional_places?: string[] | null
  sub_industries?: string[] | null
  finance_sub_industries?: string[] | null
  email?: string | null
} | null

type Membership = {
  user_id: string
  tier: string
  status: string
  primary_location: string
  additional_places: string[]
  current_period_end: string
} | null

type Event = {
  id: string
  title: string
  event_date: string
  location: string
  city: string
  industry: string
  sub_industry: string
  type: string
  status: string
  image_url: string | null
  created_at: string
}

type EventRegistration = {
  id: number
  status: string
  created_at: string
  event_id: string
  events?: Event
}

type DashboardData = {
  profile: Profile
  membership: Membership
  upcomingEvents: EventRegistration[]
  pastEvents: EventRegistration[]
  totalEventsAttended: number
}

function DashboardPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [error, setError] = useState<string | null>(null)

  
  const supabase = createSupabaseBrowserClient()

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Check if user is authenticated
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        
        if (authError || !user) {
          console.log("No authenticated user, redirecting to login")
          router.replace("/login?next=/dashboard")
          return
        }

        console.log("=== DASHBOARD DEBUG ===")
        console.log("User ID:", user.id)
        console.log("User Email:", user.email)
        console.log("User Created At:", user.created_at)

        // Fetch profile data
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

        // Fetch membership data
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

        // Get current date/time for comparison - use exact moment
        const now = new Date()
        console.log("Exact current moment:", now)
        
        // First, fetch user's confirmed event registrations
        const { data: registrations, error: registrationsError } = await supabase
          .from("event_registrations")
          .select("id, status, created_at, event_id")
          .eq("user_id", user.id)
          .eq("status", "confirmed")

        console.log("User registrations:", registrations)
        console.log("Registrations error:", registrationsError)

        if (registrationsError || !registrations) {
          console.error("Failed to fetch registrations:", registrationsError)
          setDashboardData({
            profile: null,
            membership: null,
            upcomingEvents: [],
            pastEvents: [],
            totalEventsAttended: 0
          })
          setIsLoading(false)
          return
        }

        // Then fetch the corresponding events
        const eventIds = registrations.map(reg => reg.event_id)
        let allRegistrations: EventRegistration[] = []

        if (eventIds.length > 0) {
          const { data: events, error: eventsError } = await supabase
            .from("events")
            .select("*")
            .in("id", eventIds)

          console.log("Events data:", events)
          console.log("Events error:", eventsError)

          if (events && !eventsError) {
            // Combine registrations with their corresponding events
            allRegistrations = registrations.map(registration => {
              const event = events.find(e => e.id === registration.event_id)
              return {
                ...registration,
                events: event
              }
            }).filter(reg => reg.events !== undefined)
          }
        }

        console.log("Combined registrations with events:", allRegistrations)
        console.log("Current time for comparison:", now)

        // Separate into upcoming and past events based on event_date
        const upcomingEvents = allRegistrations?.filter(registration => {
          if (!registration.events) return false
          const eventDate = new Date(registration.events.event_date)
          const eventTime = eventDate.getTime()
          const nowTime = now.getTime()
          const isUpcoming = eventTime >= nowTime
          console.log(`🔍 Event "${registration.events.title}":`)
          console.log(`  - Event date string: ${registration.events.event_date}`)
          console.log(`  - Event Date object: ${eventDate}`)
          console.log(`  - Event timestamp: ${eventTime}`)
          console.log(`  - Now timestamp: ${nowTime}`)
          console.log(`  - Is upcoming: ${isUpcoming}`)
          console.log(`  - Difference (ms): ${eventTime - nowTime}`)
          return isUpcoming
        }) || []
        const pastEvents = allRegistrations?.filter(registration => {
          if (!registration.events) return false
          const eventDate = new Date(registration.events.event_date)
          return eventDate < now
        }) || []

        console.log("Upcoming events:", upcomingEvents)
        console.log("Past events:", pastEvents)

        // Sort and limit
        upcomingEvents.sort((a, b) => {
          if (!a.events || !b.events) return 0
          return new Date(a.events.event_date).getTime() - new Date(b.events.event_date).getTime()
        })
        pastEvents.sort((a, b) => {
          if (!a.events || !b.events) return 0
          return new Date(b.events.event_date).getTime() - new Date(a.events.event_date).getTime()
        })

        // Count total events attended (only past events with confirmed status)
        const { count: totalEventsAttended, error: countError } = await supabase
          .from("event_registrations")
          .select(`
            *,
            events!inner (event_date)
          `, { count: "exact", head: true })
          .eq("user_id", user.id)
          .eq("status", "confirmed")
          .lt("events.event_date", now.toISOString())
        
        console.log("Total events attended count:", totalEventsAttended)
        console.log("Count query used cutoff time:", now.toISOString())

        const data: DashboardData = {
          profile: profile ?? null,
          membership: membership ?? null,
          upcomingEvents: upcomingEvents.slice(0, 5), // Limit to 5 most recent upcoming
          pastEvents: pastEvents.slice(0, 3), // Limit to 3 most recent past
          totalEventsAttended: totalEventsAttended ?? 0
        }

        setDashboardData(data)
        
      } catch (err) {
        console.error("Dashboard fetch error:", err)
        setError("Failed to load dashboard data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [supabase, router, searchParams])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Loading your dashboard...</h2>
        </div>
      </div>
    )
  }

  if (error || !dashboardData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-4">{error || "Failed to load dashboard data"}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return <DashboardClient data={dashboardData} />
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Loading dashboard...</h2>
        </div>
      </div>
    }>
      <DashboardPageContent />
    </Suspense>
  )
}