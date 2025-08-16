import { createSupabaseServerClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient()
    
    const { userId, paymentIntentId, amount, currency } = await request.json()

    if (!userId || !paymentIntentId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Update membership status to active
    const { error: membershipError } = await supabase
      .from("memberships")
      .update({ 
        status: "active",
        payment_intent_id: paymentIntentId,
        payment_amount: amount,
        payment_currency: currency,
        activated_at: new Date().toISOString()
      })
      .eq("user_id", userId)

    if (membershipError) {
      console.error("Membership update error:", membershipError)
      return NextResponse.json({ error: "Failed to update membership" }, { status: 500 })
    }

    // Update profile to mark as paid member
    const { error: profileError } = await supabase
      .from("profiles")
      .update({ 
        membership_status: "active",
        membership_activated_at: new Date().toISOString()
      })
      .eq("id", userId)

    if (profileError) {
      console.error("Profile update error:", profileError)
      return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: "Membership activated successfully" 
    })

  } catch (error) {
    console.error("Payment success error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
