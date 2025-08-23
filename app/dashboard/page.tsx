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

type DashboardData = {
  profile: Profile
  membership: Membership
  upcomingEvents: any[]
  pastEvents: any[]
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

        // Fetch upcoming events (simplified for MVP)
        const { data: upcomingEvents, error: upcomingError } = await supabase
          .from("event_registrations")
          .select(`
            id,
            status,
            created_at,
            event_id
          `)
          .eq("user_id", user.id)
          .limit(5)

        // Fetch past events (simplified for MVP)
        const { data: pastEvents, error: pastError } = await supabase
          .from("event_registrations")
          .select(`
            id,
            status,
            created_at,
            event_id
          `)
          .eq("user_id", user.id)
          .limit(3)

        // Count total events attended
        const { count: totalEventsAttended, error: countError } = await supabase
          .from("event_registrations")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)

        const data: DashboardData = {
          profile: profile ?? null,
          membership: membership ?? null,
          upcomingEvents: upcomingEvents ?? [],
          pastEvents: pastEvents ?? [],
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