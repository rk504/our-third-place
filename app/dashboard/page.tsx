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
        // Check authentication
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        
        if (authError || !user) {
          router.replace("/login?next=/dashboard")
          return
        }

        // Fetch all data in parallel
        const [profileResult, membershipResult, registrationsResult] = await Promise.all([
          supabase
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
            .single(),
          
          supabase
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
            .single(),
          
          supabase
            .from("event_registrations")
            .select("id, status, created_at, event_id")
            .eq("user_id", user.id)
            .eq("status", "registered")
        ])

        const profile = profileResult.data
        const membership = membershipResult.data
        const registrations = registrationsResult.data || []

        // Fetch events for registrations
        let events: Event[] = []
        if (registrations.length > 0) {
          const eventIds = registrations.map(reg => reg.event_id)
          const { data: eventsData } = await supabase
            .from("events")
            .select("*")
            .in("id", eventIds)
          events = eventsData || []
        }

        // Combine registrations with events
        const now = new Date()
        const allRegistrations: EventRegistration[] = registrations.map(registration => {
          const event = events.find(e => e.id === registration.event_id)
          return {
            ...registration,
            events: event
          }
        }).filter(reg => reg.events !== undefined)

        // Separate upcoming and past events
        const upcomingEvents = allRegistrations.filter(registration => {
          if (!registration.events) return false
          return new Date(registration.events.event_date) >= now
        }).sort((a, b) => {
          if (!a.events || !b.events) return 0
          return new Date(a.events.event_date).getTime() - new Date(b.events.event_date).getTime()
        }).slice(0, 5)

        const pastEvents = allRegistrations.filter(registration => {
          if (!registration.events) return false
          return new Date(registration.events.event_date) < now
        }).sort((a, b) => {
          if (!a.events || !b.events) return 0
          return new Date(b.events.event_date).getTime() - new Date(a.events.event_date).getTime()
        }).slice(0, 3)

        const data: DashboardData = {
          profile: profile ?? null,
          membership: membership ?? null,
          upcomingEvents,
          pastEvents,
          totalEventsAttended: pastEvents.length
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

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT' || !session?.user) {
          router.replace("/login?next=/dashboard")
          return
        }

        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          setError(null)
          setIsLoading(true)
          await fetchDashboardData()
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, router])

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