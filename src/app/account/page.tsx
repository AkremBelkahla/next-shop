'use client'

import { useSyncExternalStore } from 'react'
import Link from 'next/link'
import { PackageOpen } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'
import { getOrders, getServerOrders, subscribeToOrders } from '@/lib/orders-store'

export default function AccountPage() {
  const orders = useSyncExternalStore(subscribeToOrders, getOrders, getServerOrders)

  return (
    <div className="py-12 md:py-16">
      <Container>
        <h1 className="text-3xl font-bold tracking-tight">My Account</h1>
        <p className="mt-2 text-muted-foreground">
          This is a demo store — orders are saved to this browser only, not to a real account.
        </p>

        <h2 className="mt-10 text-xl font-semibold">Order History</h2>

        {orders.length === 0 ? (
          <div className="mt-6 flex flex-col items-center gap-4 rounded-lg border border-dashed py-16 text-center">
            <PackageOpen className="h-10 w-10 text-muted-foreground" />
            <p className="text-muted-foreground">You haven&apos;t placed any orders yet.</p>
            <Button asChild>
              <Link href="/">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="rounded-lg border p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold">Order #{order.id.slice(0, 8)}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <p className="font-semibold">{formatPrice(order.total)}</p>
                </div>

                <div className="mt-4 space-y-2 border-t pt-4">
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
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}
