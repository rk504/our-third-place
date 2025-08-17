"use client"

import type React from "react"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Check, X, Camera, Heart, MessageSquare, Calendar, User } from "lucide-react"
import { Footer } from "@/components/footer"

// Predefined discount codes
const discountCodes = {
  WELCOME10: { type: "percentage", value: 10, description: "10% off first membership" },
  SAVE20: { type: "fixed", value: 20, description: "$20 off" },
  EARLYBIRD: { type: "percentage", value: 15, description: "15% early bird discount" },
  FRIEND25: { type: "fixed", value: 25, description: "$25 friend referral discount" },
}

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
    billingAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  })

  const [discountCode, setDiscountCode] = useState("")
  const [appliedDiscount, setAppliedDiscount] = useState<any>(null)
  const [discountError, setDiscountError] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showCompletionPopup, setShowCompletionPopup] = useState(false)

  // Get user data from URL params
  const userCity = searchParams.get("city") || ""
  const userSubIndustries = searchParams.get("subIndustries") || ""
  const userFinanceSubIndustries = searchParams.get("financeSubIndustries") || ""
  const userAdditionalPlaces = searchParams.get("additionalPlaces") || ""

  // Calculate pricing (this should match the signup page logic)
  const baseMonthly = 15
  const baseAnnual = 144
  const additionalMonthly = 5
  const additionalAnnual = 50

  const additionalPlaces = userAdditionalPlaces ? userAdditionalPlaces.split(", ").filter((place) => place) : []
  const additionalCount = additionalPlaces.length

  const monthlyTotal = baseMonthly + additionalCount * additionalMonthly
  const annualTotal = baseAnnual + additionalCount * additionalAnnual

  const handleInputChange = (field: string, value: string) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }))
  }

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing - this is where we would call the payment API
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In a real app, you would process the payment here
    console.log("Payment processed:", {
      ...paymentData,
      userInfo: {
        city: userCity,
        subIndustries: userSubIndustries,
        financeSubIndustries: userFinanceSubIndustries,
        additionalPlaces: userAdditionalPlaces,
      },
      appliedDiscount,
    })

    setIsProcessing(false)
    setShowCompletionPopup(true)
  }

  const isFormValid =
    paymentData.cardNumber &&
    paymentData.expiryDate &&
    paymentData.cvv &&
    paymentData.nameOnCard &&
    paymentData.billingAddress &&
    paymentData.city &&
    paymentData.state &&
    paymentData.zipCode

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
                <CardTitle className="text-2xl font-bold text-gray-900">Payment Information</CardTitle>
                <p className="text-gray-600">Complete your membership purchase</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Card Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Card Information</h3>

                    <div>
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input
                        id="cardNumber"
                        value={paymentData.cardNumber}
                        onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date *</Label>
                        <Input
                          id="expiryDate"
                          value={paymentData.expiryDate}
                          onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input
                          id="cvv"
                          value={paymentData.cvv}
                          onChange={(e) => handleInputChange("cvv", e.target.value)}
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="nameOnCard">Name on Card *</Label>
                      <Input
                        id="nameOnCard"
                        value={paymentData.nameOnCard}
                        onChange={(e) => handleInputChange("nameOnCard", e.target.value)}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

                  {/* Billing Address */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Billing Address</h3>

                    <div>
                      <Label htmlFor="billingAddress">Address *</Label>
                      <Input
                        id="billingAddress"
                        value={paymentData.billingAddress}
                        onChange={(e) => handleInputChange("billingAddress", e.target.value)}
                        placeholder="123 Main Street"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={paymentData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          placeholder="New York"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          value={paymentData.state}
                          onChange={(e) => handleInputChange("state", e.target.value)}
                          placeholder="NY"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="zipCode">ZIP Code *</Label>
                        <Input
                          id="zipCode"
                          value={paymentData.zipCode}
                          onChange={(e) => handleInputChange("zipCode", e.target.value)}
                          placeholder="10001"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="country">Country *</Label>
                        <Select
                          value={paymentData.country}
                          onValueChange={(value) => handleInputChange("country", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="United States">United States</SelectItem>
                            <SelectItem value="Canada">Canada</SelectItem>
                            <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                            <SelectItem value="Australia">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Discount Code */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Discount Code</h3>

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

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#1b1f2c] to-[#646d59] hover:from-[#1b1f2c]/90 hover:to-[#646d59]/90 text-white py-3 text-lg disabled:opacity-50"
                    disabled={!isFormValid || isProcessing}
                  >
                    {isProcessing
                      ? "Processing..."
                      : `Complete Purchase - $${appliedDiscount ? calculateDiscountedPrice(monthlyTotal).toFixed(2) : monthlyTotal.toFixed(2)}/month`}
                  </Button>
                </form>
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
                  <div className="flex justify-between">
                    <span>Primary Location</span>
                    <span>${baseMonthly}/month</span>
                  </div>

                  {additionalCount > 0 && (
                    <div className="flex justify-between">
                      <span>Additional Places ({additionalCount})</span>
                      <span>${additionalCount * additionalMonthly}/month</span>
                    </div>
                  )}

                  <div className="border-t border-gray-300 pt-3">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${monthlyTotal}/month</span>
                    </div>
                  </div>

                  {appliedDiscount && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({appliedDiscount.code})</span>
                      <span>-${calculateDiscount(monthlyTotal).toFixed(2)}</span>
                    </div>
                  )}

                  <div className="border-t border-gray-300 pt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>
                        ${appliedDiscount ? calculateDiscountedPrice(monthlyTotal).toFixed(2) : monthlyTotal}/month
                      </span>
                    </div>
                  </div>

                  {appliedDiscount && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-green-800 text-sm font-medium">
                        You're saving ${calculateDiscount(monthlyTotal).toFixed(2)}/month with code{" "}
                        {appliedDiscount.code}!
                      </p>
                    </div>
                  )}
                </div>

                {/* Security Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                  <p className="text-blue-800 text-sm">
                    🔒 Your payment information is secure and encrypted. We use industry-standard security measures to
                    protect your data.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {/* Purchase Completion Popup */}
      {showCompletionPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Welcome to Our Third Place!</CardTitle>
              <p className="text-gray-600">Your membership is now active. Let's get you set up!</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 1. Slack Communities */}
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
                      <Camera className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="font-medium text-gray-900">Add Headshot</p>
                        <p className="text-sm text-gray-600">Help members recognize you at events</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-purple-300 text-purple-700 bg-transparent">
                      Upload Photo
                    </Button>
                  </div>
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
                <Button
                  className="flex-1 bg-gradient-to-r from-[#1b1f2c] to-[#646d59] hover:from-[#1b1f2c]/90 hover:to-[#646d59]/90 text-white"
                  onClick={() => (window.location.href = "/dashboard")}
                >
                  Go to Dashboard
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-gray-300 bg-transparent"
                  onClick={() => setShowCompletionPopup(false)}
                >
                  I'll Do This Later
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
      )}
      <Footer />
    </div>
  )
}
