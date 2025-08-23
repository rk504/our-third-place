import { createSupabaseServerClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
})

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient()
    
    const {
      userId,
      city,
      subIndustries,
      financeSubIndustries,
      additionalPlaces,
      slackEmail,
      howDidYouHear,
      discountCode,
      membershipTier
    } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Calculate pricing based on membership tier
    const baseMonthly = 15
    const baseAnnual = 144
    const additionalMonthly = 5
    const additionalAnnual = 50
    
    const additionalPlacesArray = additionalPlaces ? additionalPlaces.split(", ").filter((place: string) => place) : []
    const additionalCount = additionalPlacesArray.length
    
    const monthlyTotal = baseMonthly + additionalCount * additionalMonthly
    const annualTotal = baseAnnual + additionalCount * additionalAnnual
    const currentTotal = membershipTier === "annual" ? annualTotal : monthlyTotal

    // Apply discount if provided
    let finalAmount = currentTotal
    const discountCodes: Record<string, any> = {
      WELCOME10: { type: "percentage", value: 10, description: "10% off first membership" },
      SAVE20: { type: "fixed", value: 20, description: "$20 off" },
      EARLYBIRD: { type: "percentage", value: 15, description: "15% early bird discount" },
      FRIEND25: { type: "fixed", value: 25, description: "$25 friend referral discount" },
    }

    let appliedDiscount = null
    if (discountCode && discountCodes[discountCode.toUpperCase()]) {
      appliedDiscount = discountCodes[discountCode.toUpperCase()]
      if (appliedDiscount.type === "percentage") {
        finalAmount = currentTotal - (currentTotal * appliedDiscount.value) / 100
      } else {
        finalAmount = Math.max(0, currentTotal - appliedDiscount.value)
      }
    }

    // Create line items
    const lineItems = [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Our Third Place Membership',
            description: `${membershipTier === 'annual' ? 'Annual' : 'Monthly'} membership for ${city}${additionalCount > 0 ? ` + ${additionalCount} additional places` : ''}`,
          },
          unit_amount: Math.round(finalAmount * 100), // Stripe expects cents
          recurring: {
            interval: membershipTier === 'annual' ? 'year' : 'month',
          },
        },
        quantity: 1,
      },
    ]

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems as any, // Type assertion to bypass type error for now
      mode: 'subscription',
      success_url: `${request.headers.get('origin')}/payment-stripe/success?session_id={CHECKOUT_SESSION_ID}&userId=${userId}&city=${encodeURIComponent(city)}&subIndustries=${encodeURIComponent(subIndustries || '')}&financeSubIndustries=${encodeURIComponent(financeSubIndustries || '')}&additionalPlaces=${encodeURIComponent(additionalPlaces || '')}&slackEmail=${encodeURIComponent(slackEmail || '')}&howDidYouHear=${encodeURIComponent(howDidYouHear || '')}&paymentPlan=${membershipTier || 'monthly'}`,
      cancel_url: `${request.headers.get('origin')}/payment-stripe?cancelled=true`,
      customer_email: slackEmail,
      metadata: {
        userId,
        city,
        subIndustries: subIndustries || '',
        financeSubIndustries: financeSubIndustries || '',
        additionalPlaces: additionalPlaces || '',
        slackEmail: slackEmail || '',
        howDidYouHear: howDidYouHear || '',
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })

  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
