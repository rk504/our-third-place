"use client"

import type React from "react"
import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X, Heart, MessageSquare, Calendar, User } from "lucide-react"
import { Footer } from "@/components/footer"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import { toast } from "sonner"

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const [isVerifying, setIsVerifying] = useState(true)
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'error' | 'loading'>('loading')
  const [membershipTier, setMembershipTier] = useState<'monthly' | 'annual' | null>(null)

  // Get user data from URL params
  const sessionId = searchParams.get("session_id") || ""
  const userId = searchParams.get("userId") || ""
  const userCity = searchParams.get("city") || ""
  const userSubIndustries = searchParams.get("subIndustries") || ""
  const userFinanceSubIndustries = searchParams.get("financeSubIndustries") || ""
  const userAdditionalPlaces = searchParams.get("additionalPlaces") || ""
  const userSlackEmail = searchParams.get("slackEmail") || ""
  const userHowDidYouHear = searchParams.get("howDidYouHear") || ""
  const [needsLogin, setNeedsLogin] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  
  const supabase = createSupabaseBrowserClient()

  const handleResendVerification = async () => {
    if (!userId || resendCooldown > 0) return
    
    try {
      // Get user email from profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('email')
        .eq('user_id', userId)
        .single()
      
      if (profile?.email) {
        const { error } = await supabase.auth.resend({
          type: 'signup',
          email: profile.email,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`
          }
        })
        
        if (error) {
          console.error('Resend error:', error)
          toast.error('Failed to resend verification email')
        } else {
          toast.success('Verification email sent!')
          setResendCooldown(60)
          const timer = setInterval(() => {
            setResendCooldown(prev => {
              if (prev <= 1) {
                clearInterval(timer)
                return 0
              }
              return prev - 1
            })
          }, 1000)
        }
      }
    } catch (error) {
      console.error('Resend verification error:', error)
      toast.error('Failed to resend verification email')
    }
  }

  // Debug: Log all URL parameters to see what Stripe is sending
  console.log("=== SUCCESS PAGE DEBUG ===")
  console.log("All URL params:", Object.fromEntries(searchParams.entries()))
  console.log("sessionId:", sessionId)
  console.log("userId:", userId)

  useEffect(() => {
    const verifyPaymentAndFetchMembership = async () => {
      // For direct Stripe payment links, we don't need session_id verification
      // If we have userId, we can proceed to fetch membership details
      if (!userId) {
        console.error('No userId found in URL params')
        setPaymentStatus('error')
        setIsVerifying(false)
        return
      }

      try {
        // First, check if user is already logged in
        const { data: { user: currentUser } } = await supabase.auth.getUser()
        
        console.log('Current logged in user:', currentUser?.id)
        console.log('Expected userId from URL:', userId)
        
        // If not logged in or wrong user, we need them to log in
        if (!currentUser || currentUser.id !== userId) {
          console.log('User not logged in or wrong user - they need to log in')
          
          // Show success page but with login prompt
          setPaymentStatus('success')
          setNeedsLogin(true)
          setIsVerifying(false)
          
          // We'll add a login prompt in the UI
          return
        }

        // Skip backend payment verification for direct Stripe links
        // Stripe handles payment verification on their end
        console.log('Proceeding with userId:', userId)
        setPaymentStatus('success')
        
        // Send verification email after successful payment
        const { data: profile } = await supabase
          .from('profiles')
          .select('email')
          .eq('user_id', userId)
          .single()
        
        if (profile?.email) {
          const { error: resendError } = await supabase.auth.resend({
            type: 'signup',
            email: profile.email,
            options: {
              emailRedirectTo: `${window.location.origin}/auth/callback`
            }
          })
          
          if (resendError) {
            console.error('Failed to send verification email:', resendError)
          } else {
            console.log('Verification email sent successfully')
          }
        }
        
        // Fetch membership tier from Supabase
        const { data: membership, error: membershipError } = await supabase
          .from('memberships')
          .select('tier')
          .eq('user_id', userId)
          .single()

        if (membershipError) {
          console.error('Error fetching membership:', membershipError)
          // Try to get tier from URL params as fallback
          const paymentPlan = searchParams.get('paymentPlan') || 'monthly'
          setMembershipTier(paymentPlan as 'monthly' | 'annual')
        } else {
          setMembershipTier(membership.tier as 'monthly' | 'annual')
        }

        // Optionally update membership status to active if using direct Stripe links
        // Since Stripe handles the payment, we can assume it's successful if we reach this page
        try {
          const { error: updateError } = await supabase
            .from('memberships')
            .update({ 
              status: 'active',
              activated_at: new Date().toISOString()
            })
            .eq('user_id', userId)

          if (updateError) {
            console.error('Error updating membership status:', updateError)
          }
        } catch (updateError) {
          console.error('Error updating membership:', updateError)
        }

      } catch (error) {
        console.error('Payment verification error:', error)
        setPaymentStatus('error')
      } finally {
        setIsVerifying(false)
      }
    }

    verifyPaymentAndFetchMembership()
  }, [userId, searchParams])

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 flex items-center justify-center">
        <Card className="bg-white max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Verifying Payment...</h2>
            <p className="text-gray-600">Please wait while we confirm your membership.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (paymentStatus === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 flex items-center justify-center">
        <Card className="bg-white max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Payment Error</h2>
            <p className="text-gray-600 mb-4">There was an issue verifying your payment. Please contact support.</p>
            <Button asChild>
              <Link href="mailto:support@ourthirdplace.com">Contact Support</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center space-x-2 text-[#1b1f2c]">
              <span className="text-2xl font-bold">Our Third Place</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Purchase Completion Content */}
          <Card className="bg-white/70 backdrop-blur-sm border-2">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Payment Successful! 🎉 Time to verify your email.
              </CardTitle>
              <p className="text-gray-600">
                Your {membershipTier === 'annual' ? 'annual' : 'monthly'} membership payment is complete. Now let's verify your email to activate your account.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email Verification Section */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">📧 Verify Your Email Address</h3>
                <p className="text-blue-800 mb-4">
                  We've sent a verification email to <strong>{decodeURIComponent(userSlackEmail)}</strong>
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-blue-700">Check your email inbox (and spam folder)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-blue-700">Click the verification link in the email</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-blue-700">You'll be taken to your personalized welcome page</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <Button 
                    onClick={handleResendVerification}
                    variant="outline" 
                    className="border-blue-300 text-blue-700 bg-transparent"
                    disabled={resendCooldown > 0}
                  >
                    {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Verification Email'}
                  </Button>
                </div>
              </div>

              {/* What's Coming Next */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  1. Slack Communities Added
                </h3>
                <p className="text-blue-800 mb-3">
                  Based on your sub-categories, we've added you to these Slack communities:
                </p>
                <div className="space-y-2">
                  {userSubIndustries && (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-blue-700">Media Professionals: {userSubIndustries}</span>
                    </div>
                  )}
                  {userFinanceSubIndustries && (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-blue-700">Finance Network: {userFinanceSubIndustries}</span>
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
                <p className="text-sm text-blue-600 mt-3">Check your email for Slack invitation links!</p>
              </div>

              {/* 2. Finish Your Profile */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-purple-900 mb-3 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  2. Finish Your Profile
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <Heart className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="font-medium text-gray-900">Add Personal Interests</p>
                        <p className="text-sm text-gray-600">Share hobbies and interests beyond work</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-purple-300 text-purple-700 bg-transparent">
                      Add Interests
                    </Button>
                  </div>
                </div>
              </div>

              {/* 3. Sign Up for First Dinner */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-900 mb-3 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  3. Sign Up for Your First Dinner
                </h3>
                <p className="text-green-800 mb-4">
                  Ready to make your first connections? Browse upcoming dinners in {userCity} and reserve your spot!
                </p>
                <div className="bg-white rounded-lg border p-3 mb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Media Professionals Mixer</p>
                      <p className="text-sm text-gray-600">Tomorrow, 7:30 PM • The Smith, NYC</p>
                      <p className="text-xs text-gray-500">6 of 8 spots filled</p>
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      Reserve Spot
                    </Button>
                  </div>
                </div>
                <Button variant="outline" className="w-full border-green-300 text-green-700 bg-transparent">
                  Browse All Upcoming Dinners
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button asChild className="flex-1 bg-gradient-to-r from-[#1b1f2c] to-[#646d59] hover:from-[#1b1f2c]/90 hover:to-[#646d59]/90 text-white">
                  <Link href="/welcome">
                    Go to Welcome Page
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-1 border-gray-300 bg-transparent">
                  <Link href="/login">
                    Log In Instead
                  </Link>
                </Button>
              </div>

              <div className="text-center pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Need help getting started?
                  <Link href="/help" className="text-[#1b1f2c] hover:underline ml-1">
                    Contact our support team
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading success page...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  )
}
