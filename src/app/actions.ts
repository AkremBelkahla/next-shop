'use server'

import { redirect } from 'next/navigation'
import { addToCart } from '@/lib/cart'
import { getCart } from '@/lib/cart'
import { stripe } from '@/lib/stripe'
import type { CartItem } from '@/types/product'

export async function addToCartAction(item: CartItem) {
  await addToCart(item)
}

export async function createCheckoutSessionAction() {
  const cart = await getCart()

  if (cart.items.length === 0) {
    redirect('/cart')
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

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

  if (!session.url) {
    throw new Error('Stripe did not return a checkout URL')
  }

  redirect(session.url)
}
