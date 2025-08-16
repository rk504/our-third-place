import { createSupabaseServerClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient()
    
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
      additionalPlaces
    } = await request.json()

    // Validate required fields
    if (!name || !company || !linkedin || !birthday || !location || !paymentPlan || !slackEmail) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: slackEmail,
      email_confirm: true,
      user_metadata: { 
        full_name: name,
        company: company
      }
    })

    if (authError) {
      console.error("Auth creation error:", authError)
      return NextResponse.json({ error: "Failed to create user account" }, { status: 500 })
    }

    // Create profile
    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: authData.user.id,
        email: slackEmail,
        full_name: name,
        company: company,
        linkedin_url: linkedin,
        instagram_handle: instagram,
        birthday: birthday,
        city: location,
        role: "member",
        sub_industries: subIndustries,
        finance_sub_industries: financeSubIndustries,
        additional_places: additionalPlaces
      })

    if (profileError) {
      console.error("Profile creation error:", profileError)
      // Clean up auth user if profile creation fails
      await supabase.auth.admin.deleteUser(authData.user.id)
      return NextResponse.json({ error: "Failed to create profile" }, { status: 500 })
    }

    // Create membership
    const { error: membershipError } = await supabase
      .from("memberships")
      .insert({
        user_id: authData.user.id,
        tier: paymentPlan,
        status: "pending", // Will be updated to "active" after payment
        primary_location: location,
        additional_places: additionalPlaces,
        payment_plan: paymentPlan
      })

    if (membershipError) {
      console.error("Membership creation error:", membershipError)
      // Clean up if membership creation fails
      await supabase.auth.admin.deleteUser(authData.user.id)
      await supabase.from("profiles").delete().eq("id", authData.user.id)
      return NextResponse.json({ error: "Failed to create membership" }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      userId: authData.user.id,
      message: "User account created successfully" 
    })

  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
