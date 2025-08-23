import { createSupabaseServerClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
})
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')

  if (!endpointSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not set')
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  if (!sig) {
    console.error('No stripe signature found')
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 })
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object
      console.log('Payment succeeded:', session.id)
      
      // Update membership status
      try {
        const supabase = await createSupabaseServerClient()
        const userId = session.metadata?.userId
        
        if (userId) {
          const { error } = await supabase
            .from("memberships")
            .update({ 
              status: "active",
              current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
            })
            .eq("user_id", userId)

          if (error) {
            console.error("Failed to update membership:", error)
          } else {
            // Also update profile
            await supabase
              .from("profiles")
              .update({ 
                membership_tier: "active"
              })
              .eq("user_id", userId)
          }
        }
      } catch (error) {
        console.error('Error updating membership:', error)
      }
      break
    
    case 'invoice.payment_succeeded':
      // Handle successful recurring payment
      console.log('Recurring payment succeeded:', event.data.object.id)
      break
    
    case 'customer.subscription.deleted':
      // Handle subscription cancellation
      const subscription = event.data.object
      console.log('Subscription cancelled:', subscription.id)
      
      try {
        const supabase = await createSupabaseServerClient()
        // You might want to update membership status here
        // This depends on your business logic
      } catch (error) {
        console.error('Error handling subscription cancellation:', error)
      }
      break
    
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
