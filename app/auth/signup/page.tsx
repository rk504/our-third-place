"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import { toast } from "sonner"

export default function AuthSignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Get form data from URL params and decode them
  const formData = {
    name: decodeURIComponent(searchParams.get('name') || ''),
    company: decodeURIComponent(searchParams.get('company') || ''),
    linkedin: decodeURIComponent(searchParams.get('linkedin') || ''),
    instagram: decodeURIComponent(searchParams.get('instagram') || ''),
    birthday: decodeURIComponent(searchParams.get('birthday') || ''),
    location: decodeURIComponent(searchParams.get('location') || ''),
    paymentPlan: decodeURIComponent(searchParams.get('paymentPlan') || ''),
    slackEmail: decodeURIComponent(searchParams.get('slackEmail') || ''),
    subIndustries: decodeURIComponent(searchParams.get('subIndustries') || ''), // TODO: add this functionality back in (removed for dev testing)
    financeSubIndustries: decodeURIComponent(searchParams.get('financeSubIndustries') || ''),
    additionalPlaces: decodeURIComponent(searchParams.get('additionalPlaces') || '') 
  }

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const supabase = createSupabaseBrowserClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      setIsLoading(false)
      return
    }

    try {
      // Debug: log what we're sending
      console.log("Attempting to create account with:", {
        email: formData.slackEmail,
        passwordLength: password.length,
        name: formData.name,
        company: formData.company
      })

      // Test the Supabase client connection first
      console.log("Supabase client config:", {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      })

      // Create the user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.slackEmail,
        password: password,
        options: {
          data: {
            full_name: formData.name,
            company: formData.company
          }
        }
      })

      console.log("Supabase response:", { authData, authError })

      if (authError) {
        console.error("Supabase auth error details:", {
          message: authError.message,
          status: authError.status,
          name: authError.name,
          details: authError
        })
        throw new Error(authError.message || "Failed to create account")
      }

      if (authData.user) {
        // Create profile
        const { error: profileError } = await supabase
          .from("profiles")
          .upsert({ // for testing purposes, once done, remove upsert and use insert
            user_id: authData.user.id,
            email: formData.slackEmail,
            full_name: formData.name,
            company: formData.company,
            linkedin_url: formData.linkedin,
            membership_tier: formData.paymentPlan,
            instagram_handle: formData.instagram,
            birthday: formData.birthday,
            city: formData.location,
            role: "member"
          })

        if (profileError) throw profileError

        // Create membership
        const { error: membershipError } = await supabase
          .from("memberships")
          .upsert({ // for testing purposes, once done, remove upsert and use insert
            user_id: authData.user.id,
            tier: formData.paymentPlan,
            status: "pending",
            primary_location: formData.location,
          })

        if (membershipError) throw membershipError

        toast.success("Account created successfully! Please check your email to verify your account.")
        
        // Redirect to payment page
        const params = new URLSearchParams({
          userId: authData.user.id,
          city: formData.location,
          subIndustries: formData.subIndustries,
          financeSubIndustries: formData.financeSubIndustries,
          additionalPlaces: formData.additionalPlaces,
          slackEmail: formData.slackEmail,
        })
        
        router.push(`/payment?${params.toString()}`)
      }

    } catch (error) {
      console.error("Signup error:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to create account"
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/signup" className="flex items-center space-x-2 text-[#1b1f2c]">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-2xl font-bold">Our Third Place</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Card className="bg-white/70 backdrop-blur-sm border-2">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900">Create Your Account</CardTitle>
              <p className="text-gray-600 mt-2">Complete your membership by creating your account</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.slackEmail}
                    disabled
                    className="bg-gray-100"
                  />
                  <p className="text-sm text-gray-500 mt-1">This email will be used for your account</p>
                </div>

                <div>
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#1b1f2c] to-[#646d59] hover:from-[#1b1f2c]/90 hover:to-[#646d59]/90 text-white py-3"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account & Continue to Payment"}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link href="/login" className="text-[#1b1f2c] hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
