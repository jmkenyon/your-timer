// app/api/checkout/route.ts

import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'


export async function POST(request: Request) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')
    
    // Get the price ID and user info from the request body
    const body = await request.json()
    const { priceId, userId, userEmail } = body

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard/billing`,
      customer_email: userEmail,
      metadata: {
        userId: userId,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err: unknown) {
    if (err instanceof Error) {
      const status =
        typeof (err as { statusCode?: number }).statusCode === "number"
          ? (err as { statusCode?: number }).statusCode
          : 500
  
      return NextResponse.json(
        { error: err.message },
        { status }
      )
    }
  
    return NextResponse.json(
      { error: "Unknown error" },
      { status: 500 }
    )
  }
}