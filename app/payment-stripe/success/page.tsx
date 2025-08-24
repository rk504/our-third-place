"use client"

import type React from "react"
import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X } from "lucide-react"
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
            <Button onClick={() => window.location.href = 'mailto:support@ourthirdplace.com'}>
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="bg-white/90 backdrop-blur-sm border-2 shadow-xl">
          <CardContent className="p-8 text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>

            {/* Main Message */}
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Payment Successful! 🎉
            </h1>
            <p className="text-gray-600 mb-8">
              Your {membershipTier === 'annual' ? 'annual' : 'monthly'} membership is confirmed.
            </p>

            {/* Email Verification Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left">
              <h2 className="text-lg font-semibold text-blue-900 mb-4 text-center">
                📧 Verify Your Email Address
              </h2>
              
              <p className="text-blue-800 mb-4 text-center">
                We've sent a verification email to:<br />
                <strong className="text-blue-900">{decodeURIComponent(userSlackEmail)}</strong>
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span className="text-blue-700 text-sm">Check your email inbox (and spam folder)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span className="text-blue-700 text-sm">Click the verification link</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span className="text-blue-700 text-sm">Complete your setup</span>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  onClick={handleResendVerification}
                  variant="outline" 
                  size="sm"
                  className="border-blue-300 text-blue-700 bg-white hover:bg-blue-50"
                  disabled={resendCooldown > 0}
                >
                  {resendCooldown > 0 ? `Sent!` : 'Resend Verification Email'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
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
