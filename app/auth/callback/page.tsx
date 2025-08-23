"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const next = searchParams.get("next") || "/welcome"
  const supabase = createSupabaseBrowserClient()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          console.error("Session error:", sessionError)
          setError("Authentication failed. Please try again.")
          setIsLoading(false)
          return
        }

        if (session) {
          console.log("Session found, email verified - redirecting to welcome")
          toast.success("Email verified successfully! Welcome to Our Third Place!")
          router.replace("/welcome")
        } else {
          console.log("No session found")
          setError("Email verification link is invalid or expired.")
          setIsLoading(false)
        }
      } catch (err) {
        console.error("Auth callback error:", err)
        setError("Something went wrong. Please try again.")
        setIsLoading(false)
      }
    }

    handleAuthCallback()
  }, [supabase, next, router])

  const handleResendEmail = async () => {
    try {
      // This would need the email - for now just redirect to login
      router.replace("/login?message=Please sign in to resend verification email")
    } catch (err) {
      console.error("Resend error:", err)
      toast.error("Failed to resend email")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Verifying your email...</h2>
            <p className="text-gray-600">Please wait while we confirm your account.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-600">Verification Failed</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">{error}</p>
            <div className="space-y-2">
              <Button onClick={handleResendEmail} className="w-full">
                Go to Sign In
              </Button>
              <Button variant="outline" onClick={() => router.replace("/signup")} className="w-full">
                Create New Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}
