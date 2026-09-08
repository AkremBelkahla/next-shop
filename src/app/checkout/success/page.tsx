'use client'

import { useSyncExternalStore } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Sparkles } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'
import { getOrders, getServerOrders, subscribeToOrders } from '@/lib/orders-store'
import {
  getPoints,
  getServerPoints,
  subscribeToPoints,
} from '@/lib/loyalty'

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order')
  const orders = useSyncExternalStore(subscribeToOrders, getOrders, getServerOrders)
  const order = orders.find((o) => o.id === orderId) ?? null
  const points = useSyncExternalStore(subscribeToPoints, getPoints, getServerPoints)

  return (
    <div className="py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight">Order Confirmed!</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Thank you for your purchase. This is a demo checkout — no real payment was made and
            your order was saved to this browser only.
          </p>
        </div>

        {order && (
          <div className="mx-auto mt-10 max-w-md rounded-lg border p-6 text-left">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Order Summary</h2>
              <span className="text-xs text-muted-foreground">
                #{order.id.slice(0, 8)}
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {order.items.map((item) => (
                <div
                  key={`${item.productId}-${item.variantId}`}
                  className="flex justify-between text-sm"
                >
                  <span>
                    {item.title}
                    {item.variant && (
                      <span className="text-muted-foreground"> — {item.variant.title}</span>
                    )}
                    <span className="text-muted-foreground"> × {item.quantity}</span>
                  </span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between border-t pt-4 font-semibold">
              <span>Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/account">View My Orders</Link>
          </Button>
        </div>
      </Container>
    </div>
  )
}
