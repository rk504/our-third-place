"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Heart, MessageSquare, Calendar, User, ArrowRight } from "lucide-react"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import { toast } from "sonner"

type Profile = {
  user_id: string
  full_name: string | null
  company: string | null
  email: string | null
  sub_industries: string[] | null
  finance_sub_industries: string[] | null
  city: string | null
}

type Membership = {
  user_id: string
  tier: string
  status: string
  primary_location: string
}

export default function WelcomePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [membership, setMembership] = useState<Membership | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  const supabase = createSupabaseBrowserClient()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if user is authenticated
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        
        if (authError || !user) {
          console.log("No authenticated user, redirecting to login")
          router.replace("/login?next=/welcome")
          return
        }

        console.log("=== WELCOME PAGE DEBUG ===")
        console.log("User ID:", user.id)
        console.log("User Email:", user.email)

        // Fetch profile data
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select(`
            user_id,
            full_name,
            company,
            email,
            sub_industries,
            finance_sub_industries,
            city
          `)
          .eq("user_id", user.id)
          .single()

        if (profileError) {
          console.error("Profile fetch error:", profileError)
        } else {
          setProfile(profileData)
        }

        // Fetch membership data
        const { data: membershipData, error: membershipError } = await supabase
          .from("memberships")
          .select(`
            user_id,
            tier,
            status,
            primary_location
          `)
          .eq("user_id", user.id)
          .single()

        if (membershipError) {
          console.error("Membership fetch error:", membershipError)
        } else {
          setMembership(membershipData)
        }

        console.log("Profile data:", profileData)
        console.log("Membership data:", membershipData)
        
      } catch (err) {
        console.error("Welcome page fetch error:", err)
        setError("Failed to load your profile data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [supabase, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Loading your profile...</h2>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 flex items-center justify-center">
        <Card className="bg-white/70 backdrop-blur-sm border-2 max-w-md w-full text-center">
          <CardContent className="p-8">
            <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Profile</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const displayName = profile?.full_name || profile?.company || "Member"
  const userCity = membership?.primary_location || profile?.city || "Your City"

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 flex items-center justify-center p-4">
      <Card className="bg-white/90 backdrop-blur-sm border-2 max-w-3xl w-full">
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Our Third Place, {displayName}! 🎉
          </CardTitle>
          <p className="text-gray-600 text-lg">
            Your {membership?.tier || 'monthly'} membership is active. Let's get you connected!
          </p>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Profile Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Your Profile Summary
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-700"><strong>Name:</strong> {profile?.full_name || "Not provided"}</p>
                <p className="text-gray-700"><strong>Company:</strong> {profile?.company || "Not provided"}</p>
                <p className="text-gray-700"><strong>Email:</strong> {profile?.email || "Not provided"}</p>
              </div>
              <div>
                <p className="text-gray-700"><strong>Location:</strong> {userCity}</p>
                <p className="text-gray-700"><strong>Membership:</strong> {membership?.tier || "Basic"}</p>
                <p className="text-gray-700"><strong>Status:</strong> 
                  <Badge className="ml-2 bg-green-100 text-green-800">
                    {membership?.status || "Active"}
                  </Badge>
                </p>
              </div>
            </div>
          </div>

          {/* What's Next - Slack Communities */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              1. You're Being Added to Slack Communities
            </h3>
            <p className="text-blue-800 mb-4">
              Based on your interests, we're adding you to these exclusive Slack communities:
            </p>
            <div className="space-y-2">
              {profile?.sub_industries && profile.sub_industries.length > 0 && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-blue-700">Media Professionals: {profile.sub_industries.join(', ')}</span>
                </div>
              )}
              {profile?.finance_sub_industries && profile.finance_sub_industries.length > 0 && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-blue-700">Finance Network: {profile.finance_sub_industries.join(', ')}</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-blue-700">{userCity} Chapter</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-blue-700">New Members Welcome</span>
              </div>
            </div>
            <p className="text-sm text-blue-600 mt-4 bg-blue-100 p-3 rounded">
              📧 Check your email for Slack invitation links within the next 24 hours!
            </p>
          </div>

          {/* Complete Your Profile */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
              <Heart className="w-5 h-5 mr-2" />
              2. Complete Your Profile
            </h3>
            <div className="space-y-3">
              <p className="text-purple-800">Make the most of your membership by completing your profile:</p>
              <div className="grid gap-3">
                <div className="flex items-center justify-between p-3 bg-white/70 rounded-lg border">
                  <div>
                    <p className="font-medium text-gray-900">Add Personal Interests</p>
                    <p className="text-sm text-gray-600">Share hobbies beyond work</p>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <Link href="/profile">Add Now</Link>
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/70 rounded-lg border">
                  <div>
                    <p className="font-medium text-gray-900">Upload Profile Photo</p>
                    <p className="text-sm text-gray-600">Help others recognize you</p>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <Link href="/profile">Upload</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Browse Events */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              3. Browse Upcoming Events in {userCity}
            </h3>
            <p className="text-green-800 mb-4">
              Ready to make your first connections? Explore dinners and networking events near you!
            </p>
            <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
              <Link href="/events">
                Browse Events <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
            <Button asChild className="flex-1 bg-gradient-to-r from-[#1b1f2c] to-[#646d59] hover:from-[#1b1f2c]/90 hover:to-[#646d59]/90 text-white text-lg py-6">
              <Link href="/dashboard">
                Enter Your Member Portal <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1 border-gray-300 bg-transparent py-6">
              <Link href="/profile">
                Complete Profile First
              </Link>
            </Button>
          </div>

          <div className="text-center pt-4">
            <p className="text-sm text-gray-600">
              Questions? <Link href="/help" className="text-[#1b1f2c] hover:underline">Contact our support team</Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
