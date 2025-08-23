"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft } from "lucide-react"
import { Footer } from "@/components/footer"
import { toast } from "sonner"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"

const subIndustries = ["PR", "Marketing", "AdTech", "Communications", "Media Buying", "Media Agencies"]

const financeSubIndustries = [
  "Investment Banking",
  "Private Equity",
  "Venture Capital",
  "Hedge Funds",
  "Asset Management",
  "Corporate Finance",
  "Financial Planning",
  "Insurance",
  "Real Estate Finance",
  "Fintech",
  "Banking",
  "Credit & Lending",
]

const locations = [
  "AMSTERDAM",
  "ATLANTA",
  "ATLANTA, GEORGIA",
  "AUSTIN",
  "BOCA RATON / BROWARD COUNTY",
  "BOSTON",
  "CHARLESTON",
  "CHARLOTTE",
  "CHICAGO",
  "DALLAS",
  "DENVER",
  "DETROIT",
  "DMV AREA",
  "ESSEX COUNTY, NJ",
  "FAIRFIELD",
  "FLORIDA",
  "GREEN BAY",
  "HOUSTON",
  "JACKSONVILLE",
  "LONDON",
  "LONG ISLAND",
  "LOS ANGELES",
  "MIAMI",
  "MIDDLESEX COUNTY",
  "NASHVILLE",
  "NEW YORK",
  "NEW YORK CITY",
  "ORLANDO",
  "PHILADELPHIA",
  "RED BANK, NJ",
  "SALT LAKE CITY / PARK CITY",
  "SAN DIEGO",
  "SAN FRANCISCO",
  "TAMPA | ST.PETERSBURG",
  "TORONTO",
  "WESTCHESTER COUNTY",
]

// Additional places now only contains Finance Industry
const additionalPlaceOptions = ["FINANCE INDUSTRY"]

export default function SignUpPage() {
  const [selectedSubIndustries, setSelectedSubIndustries] = useState<string[]>([])
  const [selectedFinanceSubIndustries, setSelectedFinanceSubIndustries] = useState<string[]>([])
  const [additionalPlaces, setAdditionalPlaces] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    linkedin: "",
    instagram: "",
    birthday: "",
    location: "",
    paymentPlan: "",
    slackEmail: "",
    howDidYouHear: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubIndustryChange = (industry: string, checked: boolean) => {
    if (checked) {
      setSelectedSubIndustries([...selectedSubIndustries, industry])
    } else {
      setSelectedSubIndustries(selectedSubIndustries.filter((item) => item !== industry))
    }
  }

  const handleFinanceSubIndustryChange = (industry: string, checked: boolean) => {
    if (checked) {
      setSelectedFinanceSubIndustries([...selectedFinanceSubIndustries, industry])
    } else {
      setSelectedFinanceSubIndustries(selectedFinanceSubIndustries.filter((item) => item !== industry))
    }
  }

  const handleAdditionalPlaceChange = (location: string, checked: boolean) => {
    if (checked) {
      setAdditionalPlaces([...additionalPlaces, location])
    } else {
      setAdditionalPlaces(additionalPlaces.filter((item) => item !== location))
      // If Finance Industry is unchecked, clear finance sub-industries
      if (location === "FINANCE INDUSTRY") {
        setSelectedFinanceSubIndustries([])
      }
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const calculateTotalPrice = () => {
    const baseMonthly = 15
    const baseAnnual = 144
    const additionalMonthly = 5
    const additionalAnnual = 50

    const additionalCount = additionalPlaces.length

    if (formData.paymentPlan === "monthly") {
      return {
        monthly: baseMonthly + additionalCount * additionalMonthly,
        period: "month",
      }
    } else if (formData.paymentPlan === "annual") {
      return {
        annual: baseAnnual + additionalCount * additionalAnnual,
        monthly: Math.round((baseAnnual + additionalCount * additionalAnnual) / 12),
        period: "year",
      }
    }
    return null
  }

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("🚀 FORM SUBMIT TRIGGERED!")
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    console.log("=== SIGNUP FORM SUBMISSION ===")
    console.log("Form data:", formData)
    console.log("Sub industries:", selectedSubIndustries)
    console.log("Finance sub industries:", selectedFinanceSubIndustries)
    console.log("Additional places:", additionalPlaces)
    
    // Validate password fields
    if (formData.password !== formData.confirmPassword) {
      setSubmitError("Passwords do not match")
      setIsSubmitting(false)
      return
    }

    if (formData.password.length < 6) {
      setSubmitError("Password must be at least 6 characters")
      setIsSubmitting(false)
      return
    }

    // Check if button should be disabled
    const isButtonDisabled = !formData.name || !formData.company || !formData.linkedin || !formData.birthday || !formData.location || !formData.paymentPlan || !formData.slackEmail || !formData.password || !formData.confirmPassword
    console.log("Button should be disabled:", isButtonDisabled)
    console.log("Missing fields:", {
      name: !formData.name,
      company: !formData.company,
      linkedin: !formData.linkedin,
      birthday: !formData.birthday,
      location: !formData.location,
      paymentPlan: !formData.paymentPlan,
      slackEmail: !formData.slackEmail,
      password: !formData.password,
      confirmPassword: !formData.confirmPassword
    })

    try {
      // Create account directly with Supabase
      const supabase = createSupabaseBrowserClient()
      
      console.log("Creating account with Supabase...")
      
      // Create the user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.slackEmail,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            full_name: formData.name,
            company: formData.company
          }
        }
      })

      console.log("Supabase auth response:", { authData, authError })
      console.log("User session after signup:", authData.session)
      console.log("User confirmation status:", authData.user?.email_confirmed_at)

      if (authError) {
        console.error("Supabase auth error:", authError)
        throw new Error(authError.message || "Failed to create account")
      }

      if (authData.user) {
        // Convert arrays for database storage
        const subIndustriesArray = selectedSubIndustries
        const financeSubIndustriesArray = selectedFinanceSubIndustries
        const additionalPlacesArray = additionalPlaces

        console.log("Creating profile and membership...")

        // Create profile
        const { error: profileError } = await supabase
          .from("profiles")
          .insert({
            user_id: authData.user.id,
            email: formData.slackEmail,
            full_name: formData.name,
            company: formData.company,
            city: formData.location,
            linkedin_url: formData.linkedin,
            membership_tier: formData.paymentPlan,
            instagram_handle: formData.instagram,
            birthday: formData.birthday,
            role: "member",
            sub_industries: subIndustriesArray,
            finance_sub_industries: financeSubIndustriesArray,
            additional_places: additionalPlacesArray,
            howdidyouhear: formData.howDidYouHear
          })

        if (profileError) {
          console.error("Profile creation error:", profileError)
          throw new Error("Failed to create profile")
        }

        // Create membership
        const { error: membershipError } = await supabase
          .from("memberships")
          .insert({
            user_id: authData.user.id,
            tier: formData.paymentPlan,
            status: "pending",
            primary_location: formData.location,
            additional_places: additionalPlacesArray
          })

        if (membershipError) {
          console.error("Membership creation error:", membershipError)
          throw new Error("Failed to create membership")
        }

        // Show success message and redirect to payment
        toast.success("Account created successfully! Redirecting to payment...")
        
        console.log("Account creation successful, redirecting to payment...")
        
        // Redirect directly to payment page
        const params = new URLSearchParams({
          userId: authData.user.id,
          city: formData.location,
          subIndustries: selectedSubIndustries.join(", "),
          financeSubIndustries: selectedFinanceSubIndustries.join(", "),
          additionalPlaces: additionalPlaces.join(", "),
          slackEmail: formData.slackEmail,
          howDidYouHear: formData.howDidYouHear,
          paymentPlan: formData.paymentPlan,
        })
        
        const paymentUrl = `/payment-stripe?${params.toString()}`
        console.log("Redirecting to payment:", paymentUrl)
        
        // Use window.location.href for redirect to ensure it works
        window.location.href = paymentUrl
      } else {
        throw new Error("Account creation failed - no user returned")
      }

    } catch (error) {
      console.error('❌ SIGNUP ERROR CAUGHT:', error)
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        type: typeof error,
        error: error
      })
      const errorMessage = error instanceof Error ? error.message : 'Signup failed. Please try again.'
      setSubmitError(errorMessage)
      toast.error(errorMessage)
    } finally {
      console.log("🏁 FORM SUBMISSION FINISHED")
      setIsSubmitting(false)
    }
  }

  const totalPrice = calculateTotalPrice()
  const isFinanceIndustrySelected = additionalPlaces.includes("FINANCE INDUSTRY")

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/industry/media" className="flex items-center space-x-2 text-[#1b1f2c]">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-2xl font-bold">Our Third Place</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/70 backdrop-blur-sm border-2">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900">Join Our Community</CardTitle>
              <p className="text-gray-600 mt-2">Apply for membership to our exclusive community</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>

                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="company">Company *</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      placeholder="Enter your company name"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="linkedin">LinkedIn Profile *</Label>
                    <Input
                      id="linkedin"
                      type="url"
                      value={formData.linkedin}
                      onChange={(e) => handleInputChange("linkedin", e.target.value)}
                      placeholder="https://linkedin.com/in/yourprofile"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="instagram">Instagram Handle (Optional)</Label>
                    <Input
                      id="instagram"
                      value={formData.instagram}
                      onChange={(e) => handleInputChange("instagram", e.target.value)}
                      placeholder="@yourusername"
                    />
                  </div>

                  <div>
                    <Label htmlFor="birthday">Birthday *</Label>
                    <Input
                      id="birthday"
                      type="date"
                      value={formData.birthday}
                      onChange={(e) => handleInputChange("birthday", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="slackEmail">What email would you like to use? *</Label>
                    <Input
                      id="slackEmail"
                      type="email"
                      value={formData.slackEmail}
                      onChange={(e) => handleInputChange("slackEmail", e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
{/*                     <p className="text-sm text-gray-500 mt-1">
                      This email will be used to invite you to our exclusive Slack workspace
                    </p>
 */}                  </div>

                                    <div>
                    <Label htmlFor="howDidYouHear">How did you hear about us? (Optional)</Label>
                    <Input
                      id="howDidYouHear"
                      value={formData.howDidYouHear}
                      onChange={(e) => handleInputChange("howDidYouHear", e.target.value)}
                      placeholder="e.g., LinkedIn, friend referral, Google search, etc."
                    />
{/*                     <p className="text-sm text-gray-500 mt-1">
                      Help us understand how you discovered Our Third Place
                    </p>
*/}                  </div>

                  <div>
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      placeholder="Create a password (min 6 characters)"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                </div>

                {/* Sub-Industries */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Select Your Sub-Industries (Optional)</h3> 
                  <div className="grid grid-cols-2 gap-3">
                    {subIndustries.map((industry) => (
                      <div key={industry} className="flex items-center space-x-2">
                        <Checkbox
                          id={industry}
                          checked={selectedSubIndustries.includes(industry)}
                          onCheckedChange={(checked) => handleSubIndustryChange(industry, checked as boolean)}
                        />
                        <Label htmlFor={industry} className="text-sm font-medium">
                          {industry}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Select Your Primary Location *</h3>
                  <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your chapter location" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Select Your Membership */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Select Your Membership *</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card
                      className={`cursor-pointer border-2 transition-all ${
                        formData.paymentPlan === "monthly"
                          ? "border-[#1b1f2c] bg-[#dddbd4]"
                          : "border-gray-200 hover:border-[#646d59]"
                      }`}
                      onClick={() => handleInputChange("paymentPlan", "monthly")}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-[#1b1f2c] mb-1">$15</div>
                        <div className="text-sm text-gray-600 mb-2">per month</div>
                        <h4 className="font-semibold text-gray-900">Monthly</h4>
                        <p className="text-xs text-gray-500 mt-1">Billed monthly</p>
                      </CardContent>
                    </Card>

                    <Card
                      className={`cursor-pointer border-2 transition-all relative ${
                        formData.paymentPlan === "annual"
                          ? "border-[#1b1f2c] bg-[#dddbd4]"
                          : "border-gray-200 hover:border-[#646d59]"
                      }`}
                      onClick={() => handleInputChange("paymentPlan", "annual")}
                    >
                      <div className="absolute -top-2 -right-2 bg-[#1b1f2c] text-white text-xs px-2 py-1 rounded-full">
                        Save $36
                      </div>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-[#1b1f2c] mb-1">$144</div>
                        <div className="text-sm text-gray-600 mb-2">per year</div>
                        <h4 className="font-semibold text-gray-900">Annual</h4>
                        <p className="text-xs text-gray-500 mt-1">Billed annually</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Additional Places - Now only Finance Industry */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Interested in multiple places?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Adding an additional place is an extra $5/month or $50 a year
                  </p>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 gap-2">
                      {additionalPlaceOptions.map((location) => (
                        <div key={`additional-${location}`} className="flex items-center space-x-2">
                          <Checkbox
                            id={`additional-${location}`}
                            checked={additionalPlaces.includes(location)}
                            onCheckedChange={(checked) => handleAdditionalPlaceChange(location, checked as boolean)}
                          />
                          <Label htmlFor={`additional-${location}`} className="text-sm font-medium">
                            {location}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {additionalPlaces.length > 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium text-blue-800 mb-2">Additional Places Selected:</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        {additionalPlaces.map((place) => (
                          <li key={place}>• {place}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Finance Sub-Industries - Only show if Finance Industry is selected */}
                {isFinanceIndustrySelected && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Select Your Finance Sub-Industries</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Since you selected Finance Industry, please choose your specific areas of expertise:
                    </p>
                    <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-4">
                      {financeSubIndustries.map((industry) => (
                        <div key={industry} className="flex items-center space-x-2">
                          <Checkbox
                            id={`finance-${industry}`}
                            checked={selectedFinanceSubIndustries.includes(industry)}
                            onCheckedChange={(checked) => handleFinanceSubIndustryChange(industry, checked as boolean)}
                          />
                          <Label htmlFor={`finance-${industry}`} className="text-sm font-medium">
                            {industry}
                          </Label>
                        </div>
                      ))}
                    </div>

                    {selectedFinanceSubIndustries.length > 0 && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-medium text-green-800 mb-2">Finance Sub-Industries Selected:</h4>
                        <ul className="text-sm text-green-700 space-y-1">
                          {selectedFinanceSubIndustries.map((industry) => (
                            <li key={industry}>• {industry}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Debug: Show form validation status */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">🔍 Debug: Form Status</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>Name: {formData.name ? '✅' : '❌'} "{formData.name}"</p>
                    <p>Company: {formData.company ? '✅' : '❌'} "{formData.company}"</p>
                    <p>LinkedIn: {formData.linkedin ? '✅' : '❌'} "{formData.linkedin}"</p>
                    <p>Birthday: {formData.birthday ? '✅' : '❌'} "{formData.birthday}"</p>
                    <p>Location: {formData.location ? '✅' : '❌'} "{formData.location}"</p>
                    <p>Payment Plan: {formData.paymentPlan ? '✅' : '❌'} "{formData.paymentPlan}"</p>
                    <p>Email: {formData.slackEmail ? '✅' : '❌'} "{formData.slackEmail}"</p>
                    <p>Password: {formData.password ? '✅' : '❌'} "{formData.password ? '***' : ''}"</p>
                    <p>Confirm Password: {formData.confirmPassword ? '✅' : '❌'} "{formData.confirmPassword ? '***' : ''}"</p>
                    <p>How did you hear: {formData.howDidYouHear ? '✅' : '➖'} "{formData.howDidYouHear}"</p>
                    <p>Sub Industries: {selectedSubIndustries.length > 0 ? '✅' : '➖'} [{selectedSubIndustries.join(', ')}]</p>
                    <p><strong>Button Disabled: {(isSubmitting || !formData.name || !formData.company || !formData.linkedin || !formData.birthday || !formData.location || !formData.paymentPlan || !formData.slackEmail || !formData.password || !formData.confirmPassword) ? '🔴 YES' : '🟢 NO'}</strong></p>
                  </div>
                </div>

                {/* Price Summary */}
                {totalPrice && (
                  <div className="bg-[#dddbd4] p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Price Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Primary Location ({formData.location})</span>
                        <span className="font-medium">
                          {formData.paymentPlan === "monthly" ? "$15/month" : "$144/year"}
                        </span>
                      </div>
                      {additionalPlaces.length > 0 && (
                        <div className="flex justify-between">
                          <span>Additional Places ({additionalPlaces.length})</span>
                          <span className="font-medium">
                            {formData.paymentPlan === "monthly"
                              ? `$${additionalPlaces.length * 5}/month`
                              : `$${additionalPlaces.length * 50}/year`}
                          </span>
                        </div>
                      )}
                      <div className="border-t border-gray-400 pt-2 flex justify-between font-bold">
                        <span>Total</span>
                        <span>
                          {formData.paymentPlan === "monthly"
                            ? `$${totalPrice.monthly}/month`
                            : `$${totalPrice.annual}/year ($${totalPrice.monthly}/month)`}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Show validation messages */}
                  {(!formData.name ||
                    !formData.company ||
                    !formData.linkedin ||
                    !formData.birthday ||
                    !formData.location ||
                    !formData.paymentPlan ||
                    !formData.slackEmail ||
                    !formData.password ||
                    !formData.confirmPassword) && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-medium text-yellow-800 mb-2">Please complete the following:</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        {!formData.name && <li>• Full Name</li>}
                        {!formData.company && <li>• Company</li>}
                        {!formData.linkedin && <li>• LinkedIn Profile</li>}
                        {!formData.birthday && <li>• Birthday</li>}
                        {!formData.location && <li>• Primary Location</li>}
                        {!formData.paymentPlan && <li>• Membership Plan</li>}
                        {!formData.slackEmail && <li>• Email</li>}
                        {!formData.password && <li>• Password</li>}
                        {!formData.confirmPassword && <li>• Confirm Password</li>}
                      </ul>
                    </div>
                  )}

                  {/* Show error messages */}
                  {submitError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-medium text-red-800 mb-2">Signup Error</h4>
                      <p className="text-sm text-red-700">{submitError}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    onClick={() => console.log("🔘 BUTTON CLICKED!")}
                    className="w-full bg-gradient-to-r from-[#1b1f2c] to-[#646d59] hover:from-[#1b1f2c]/90 hover:to-[#646d59]/90 text-white py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={
                      isSubmitting ||
                      !formData.name ||
                      !formData.company ||
                      !formData.linkedin ||
                      !formData.birthday ||
                      !formData.location ||
                      !formData.paymentPlan ||
                      !formData.slackEmail ||
                      !formData.password ||
                      !formData.confirmPassword
                    }
                  >
                    {isSubmitting 
                      ? "Creating Account..." 
                      : !formData.name ||
                        !formData.company ||
                        !formData.linkedin ||
                        !formData.birthday ||
                        !formData.location ||
                        !formData.paymentPlan ||
                        !formData.slackEmail ||
                        !formData.password ||
                        !formData.confirmPassword
                        ? "Complete Required Fields"
                        : `Create Account & Continue to Payment${totalPrice ? ` - ${formData.paymentPlan === "monthly" ? `$${totalPrice.monthly}/month` : `$${totalPrice.annual}/year`}` : ""}`}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}
