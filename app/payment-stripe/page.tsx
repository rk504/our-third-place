"use client"

import type React from "react"
import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Check, X } from "lucide-react"
import { Footer } from "@/components/footer"

// Predefined discount codes - may have to use stripe for best functionality - half off first month promo for example. To set up.
const discountCodes = {
  WELCOME10: { type: "percentage", value: 10, description: "10% off first membership" },
  SAVE20: { type: "fixed", value: 20, description: "$20 off" },
  EARLYBIRD: { type: "percentage", value: 15, description: "15% early bird discount" },
  FRIEND25: { type: "percentage", value: 25, description: "25% off first month friend referral discount" },
  WELCOME50: { type: "percentage", value: 50, description: "50% off first membership" },
  KAYNAYPULLS: { type: "percentage", value: 100, description: "You know KayNay, sick!" },
}

function PaymentPageContent() {
  const searchParams = useSearchParams()
  
  // Debug: Log all URL parameters
  console.log("=== PAYMENT PAGE LOADED ===")
  console.log("All URL params:", Object.fromEntries(searchParams.entries()))
  
  const [discountCode, setDiscountCode] = useState("")
  const [appliedDiscount, setAppliedDiscount] = useState<any>(null)
  const [discountError, setDiscountError] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  // Get user data from URL params
  const userId = searchParams.get("userId") || ""
  const userCity = searchParams.get("city") || ""
  const userSubIndustries = searchParams.get("subIndustries") || ""
  const userFinanceSubIndustries = searchParams.get("financeSubIndustries") || ""
  const userAdditionalPlaces = searchParams.get("additionalPlaces") || ""
  const userSlackEmail = searchParams.get("slackEmail") || ""
  const userHowDidYouHear = searchParams.get("howDidYouHear") || ""
  const membershipTier = searchParams.get("paymentPlan") || "monthly" // Get membership tier from URL

  // Calculate pricing based on membership tier - as this happens after discount codes, not working yet.
  const baseMonthly = 15
  const baseAnnual = 144
  const additionalMonthly = 5
  const additionalAnnual = 50

  const additionalPlaces = userAdditionalPlaces ? userAdditionalPlaces.split(", ").filter((place) => place) : []
  const additionalCount = additionalPlaces.length

  const monthlyTotal = baseMonthly + additionalCount * additionalMonthly
  const annualTotal = baseAnnual + additionalCount * additionalAnnual
  const currentTotal = membershipTier === "annual" ? annualTotal : monthlyTotal
  const displayPrice = membershipTier === "annual" ? `$${annualTotal}/yr` : `$${monthlyTotal}/month`

  const handleApplyDiscount = () => {
    const code = discountCode.toUpperCase()
    if (discountCodes[code as keyof typeof discountCodes]) {
      setAppliedDiscount({ code, ...discountCodes[code as keyof typeof discountCodes] })
      setDiscountError("")
    } else {
      setDiscountError("Invalid discount code")
      setAppliedDiscount(null)
    }
  }

  const handleRemoveDiscount = () => {
    setAppliedDiscount(null)
    setDiscountCode("")
    setDiscountError("")
  }

  const calculateDiscountedPrice = (originalPrice: number) => {
    if (!appliedDiscount) return originalPrice

    if (appliedDiscount.type === "percentage") {
      return originalPrice - (originalPrice * appliedDiscount.value) / 100
    } else {
      return Math.max(0, originalPrice - appliedDiscount.value)
    }
  }

  const calculateDiscount = (originalPrice: number) => {
    if (!appliedDiscount) return 0

    if (appliedDiscount.type === "percentage") {
      return (originalPrice * appliedDiscount.value) / 100
    } else {
      return Math.min(originalPrice, appliedDiscount.value)
    }
  }

  const handleStripeCheckout = async () => {
    if (!userId) {
      alert("User ID is missing. Please go back and sign up again.")
      return
    }

    setIsProcessing(true)

    try {
      // Use Stripe Checkout Sessions for full control over redirect URLs
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          city: userCity,
          subIndustries: userSubIndustries,
          financeSubIndustries: userFinanceSubIndustries,
          additionalPlaces: userAdditionalPlaces,
          slackEmail: userSlackEmail,
          howDidYouHear: userHowDidYouHear,
          discountCode: appliedDiscount?.code || null,
          membershipTier, // Pass the membership tier
        }),
      })

      const { url, error } = await response.json()

      if (error) {
        console.error('Checkout error:', error)
        alert('Failed to create checkout session. Please try again.')
        return
      }

      // Redirect to Stripe Checkout
      window.location.href = url
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to redirect to Stripe. Please try again.')
    } finally {
      setIsProcessing(false)
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
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Payment Form */}
            <Card className="bg-white/70 backdrop-blur-sm border-2">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Complete Your Purchase</CardTitle>
                <p className="text-gray-600">Secure payment powered by Stripe</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Discount Code */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Discount Code (Optional)</h3>

                  {!appliedDiscount ? (
                    <div className="flex gap-2">
                      <Input
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        placeholder="Enter discount code"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        onClick={handleApplyDiscount}
                        disabled={!discountCode.trim()}
                        className="bg-[#1b1f2c] hover:bg-[#1b1f2c]/90"
                      >
                        Apply
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-green-800 font-medium">{appliedDiscount.code}</span>
                        <span className="text-green-600 text-sm">- {appliedDiscount.description}</span>
                      </div>
                      <Button
                        type="button"
                        onClick={handleRemoveDiscount}
                        variant="ghost"
                        size="sm"
                        className="text-green-600 hover:text-green-800"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}

                  {discountError && <p className="text-red-600 text-sm">{discountError}</p>}
                </div>

                {/* Stripe Checkout Button */}
                <div className="space-y-4">
                  <Button
                    onClick={handleStripeCheckout}
                    className="w-full bg-gradient-to-r from-[#1b1f2c] to-[#646d59] hover:from-[#1b1f2c]/90 hover:to-[#646d59]/90 text-white py-4 text-lg disabled:opacity-50"
                    disabled={isProcessing || !userId}
                  >
                    {isProcessing
                      ? "Redirecting to Stripe..."
                      : `Continue to Payment - ${appliedDiscount ? `$${calculateDiscountedPrice(currentTotal).toFixed(2)}${membershipTier === "annual" ? "/yr" : "/month"}` : displayPrice}`}
                  </Button>
                  
                  {!userId && (
                    <p className="text-red-600 text-sm text-center">
                      Missing user information. Please go back and complete signup.
                    </p>
                  )}
                </div>

                {/* Security Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 text-sm">
                    🔒 Your payment is secured by Stripe, the same payment processor used by millions of businesses worldwide.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="bg-white/70 backdrop-blur-sm border-2 h-fit">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* User Info */}
                <div className="bg-[#dddbd4] p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Membership Details</h3>
                  <div className="text-sm space-y-1">
                    <p>
                      <span className="font-medium">Primary Location:</span> {userCity}
                    </p>
                    {userSubIndustries && (
                      <p>
                        <span className="font-medium">Sub-Industries:</span> {userSubIndustries}
                      </p>
                    )}
                    {userFinanceSubIndustries && (
                      <p>
                        <span className="font-medium">Finance Sub-Industries:</span> {userFinanceSubIndustries}
                      </p>
                    )}
                    {additionalPlaces.length > 0 && (
                      <p>
                        <span className="font-medium">Additional Places:</span> {additionalPlaces.join(", ")}
                      </p>
                    )}
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-3">
                  {/* Commented out for now
                  <div className="flex justify-between">
                    <span>Primary Location</span>
                    <span>{membershipTier === "annual" ? `$${baseAnnual}/yr` : `$${baseMonthly}/month`}</span>
                  </div>

                  {additionalCount > 0 && (
                    <div className="flex justify-between">
                      <span>Additional Places ({additionalCount})</span>
                      <span>{membershipTier === "annual" ? `$${additionalCount * additionalAnnual}/yr` : `$${additionalCount * additionalMonthly}/month`}</span>
                    </div>
                  )}
                  */}

                  <div className="border-t border-gray-300 pt-3">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{membershipTier === "annual" ? `$${annualTotal}/yr` : `$${monthlyTotal}/month`}</span>
                    </div>
                  </div>

                  {appliedDiscount && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({appliedDiscount.code})</span>
                      <span>-${calculateDiscount(currentTotal).toFixed(2)}</span>
                    </div>
                  )}

                  <div className="border-t border-gray-300 pt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>
                        {appliedDiscount 
                          ? `$${calculateDiscountedPrice(currentTotal).toFixed(2)}${membershipTier === "annual" ? "/yr" : "/month"}`
                          : displayPrice
                        }
                      </span>
                    </div>
                  </div>

                  {appliedDiscount && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-green-800 text-sm font-medium">
                        You're saving ${calculateDiscount(currentTotal).toFixed(2)}{membershipTier === "annual" ? "/yr" : "/month"} with code{" "}
                        {appliedDiscount.code}!
                      </p>
                    </div>
                  )}
                </div>

              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading payment page...</div>}>
      <PaymentPageContent />
    </Suspense>
  )
}
