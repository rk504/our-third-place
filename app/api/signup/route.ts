import { createSupabaseServerClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient()
    
    const requestBody = await request.json()
    console.log("=== API SIGNUP RECEIVED ===")
    console.log("Request body:", requestBody)
    
    const {
      name,
      company,
      linkedin,
      instagram,
      birthday,
      location,
      paymentPlan,
      slackEmail,
      subIndustries,
      financeSubIndustries,
      additionalPlaces,
      howDidYouHear
    } = requestBody

    // Validate required fields
    if (!name || !company || !linkedin || !birthday || !location || !paymentPlan || !slackEmail) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // For public signup, we'll store the data temporarily and redirect to a signup page
    // The user will create their account there, then we'll link it to this data
    
    // Store signup data in a temporary table or session
    // For now, we'll redirect to a signup page with the data as URL params
    
    // Create URL params to pass user data to signup page
    const params = new URLSearchParams({
      name: encodeURIComponent(name),
      company: encodeURIComponent(company),
      linkedin: encodeURIComponent(linkedin),
      instagram: encodeURIComponent(instagram || ''),
      birthday: encodeURIComponent(birthday),
      location: encodeURIComponent(location),
      paymentPlan: encodeURIComponent(paymentPlan),
      slackEmail: encodeURIComponent(slackEmail),
      subIndustries: encodeURIComponent(subIndustries.join(', ')),
      financeSubIndustries: encodeURIComponent(financeSubIndustries.join(', ')),
      additionalPlaces: encodeURIComponent(additionalPlaces.join(', ')),
      howDidYouHear: encodeURIComponent(howDidYouHear || '')
    })

    const redirectUrl = `/auth/signup?${params.toString()}`
    console.log("API returning redirect URL:", redirectUrl)
    
    return NextResponse.json({ 
      success: true, 
      redirectUrl: redirectUrl,
      message: "Redirecting to account creation" 
    })

  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
