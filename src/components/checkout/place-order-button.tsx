'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { clearCartAction } from '@/app/actions'
import { useCart } from '@/components/cart/cart-provider'
import { ORDERS_STORAGE_KEY } from '@/lib/constants'
import type { Order } from '@/types/product'

export function PlaceOrderButton() {
  const router = useRouter()
  const { cart, setCart } = useCart()
  const [isPlacing, setIsPlacing] = useState(false)

  async function handlePlaceOrder() {
    if (cart.items.length === 0) return

    setIsPlacing(true)
    try {
      const order: Order = {
        id: crypto.randomUUID(),
        items: cart.items,
        total: cart.total,
        createdAt: new Date().toISOString(),
      }

      const existing: Order[] = JSON.parse(
        localStorage.getItem(ORDERS_STORAGE_KEY) ?? '[]'
      )
      localStorage.setItem(
        ORDERS_STORAGE_KEY,
        JSON.stringify([order, ...existing])
      )

      const clearedCart = await clearCartAction()
      setCart(clearedCart)

      router.push(`/checkout/success?order=${order.id}`)
    } finally {
      setIsPlacing(false)
    }
  }

  return (
    <Button
      size="lg"
      type="button"
      className="w-full"
      onClick={handlePlaceOrder}
      disabled={isPlacing}
    >
      {isPlacing ? 'Placing Order...' : 'Place Order'}
    </Button>
  )
}
