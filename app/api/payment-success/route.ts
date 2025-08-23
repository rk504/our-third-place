import { createSupabaseServerClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
})

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient()
    
    const { userId, sessionId, paymentIntentId, amount, currency } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    let stripeSessionData = null
    
    // If sessionId is provided, verify the Stripe session
    if (sessionId) {
      try {
        const session = await stripe.checkout.sessions.retrieve(sessionId)
        
        if (session.payment_status !== 'paid') {
          return NextResponse.json({ error: "Payment not completed" }, { status: 400 })
        }
        
        stripeSessionData = session
      } catch (stripeError) {
        console.error("Stripe session verification error:", stripeError)
        return NextResponse.json({ error: "Invalid session" }, { status: 400 })
      }
    } else if (!paymentIntentId) {
      return NextResponse.json({ error: "Either sessionId or paymentIntentId is required" }, { status: 400 })
    }

    // Update membership status to active
    const updateData = {
      status: "active",
      payment_intent_id: stripeSessionData?.payment_intent || paymentIntentId,
      payment_amount: stripeSessionData?.amount_total || amount,
      payment_currency: stripeSessionData?.currency || currency || 'usd',
      activated_at: new Date().toISOString(),
      stripe_session_id: sessionId || null,
    }

    const { error: membershipError } = await supabase
      .from("memberships")
      .update(updateData)
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
