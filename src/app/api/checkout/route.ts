import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getCart } from '@/lib/cart'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export async function POST() {
  try {
    const cart = await getCart()

    if (cart.items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: cart.items.map((item) => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.title,
            description: item.variant?.title,
            images: item.image ? [item.image] : [],
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      })),
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout/cancel`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
