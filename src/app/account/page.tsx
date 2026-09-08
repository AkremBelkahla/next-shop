'use client'

import { useSyncExternalStore } from 'react'
import Link from 'next/link'
import { PackageOpen, Sparkles } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'
import { getOrders, getServerOrders, subscribeToOrders } from '@/lib/orders-store'
import {
  getPoints,
  getServerPoints,
  subscribeToPoints,
  REDEEM_POINTS_PER_EURO,
} from '@/lib/loyalty'

export default function AccountPage() {
  const orders = useSyncExternalStore(subscribeToOrders, getOrders, getServerOrders)
  const points = useSyncExternalStore(subscribeToPoints, getPoints, getServerPoints)

  return (
    <div className="py-12 md:py-16">
      <Container>
        <h1 className="text-3xl font-bold tracking-tight">My Account</h1>
        <p className="mt-2 text-muted-foreground">
          This is a demo store — orders and loyalty points are saved to this browser only, not to a real account.
        </p>

        {/* Loyalty points balance */}
        <div className="mt-8 flex items-center gap-4 rounded-none border bg-gradient-to-br from-accent/10 to-accent/5 p-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/15">
            <Sparkles className="h-6 w-6 text-accent" />
          </div>
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Loyalty Points
            </p>
            <p className="text-2xl font-bold">{points} pts</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Earn 1 pt per €1 spent · Redeem {REDEEM_POINTS_PER_EURO} pts = €1 at checkout
            </p>
          </div>
        </div>

        <h2 className="mt-10 text-xl font-semibold">Order History</h2>

        {orders.length === 0 ? (
          <div className="mt-6 flex flex-col items-center gap-4 rounded-none border border-dashed py-16 text-center">
            <PackageOpen className="h-10 w-10 text-muted-foreground" />
            <p className="text-muted-foreground">You haven&apos;t placed any orders yet.</p>
            <Button asChild>
              <Link href="/">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="rounded-none border p-6">
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

                {(order.couponCode || order.pointsRedeemed) && (
                  <div className="mt-3 space-y-1 border-t pt-3 text-xs text-accent">
                    {order.couponCode && (
                      <div className="flex justify-between">
                        <span>Coupon ({order.couponCode})</span>
                        <span>−{formatPrice(order.couponDiscount ?? 0)}</span>
                      </div>
                    )}
                    {order.pointsRedeemed ? (
                      <div className="flex justify-between">
                        <span>Points ({order.pointsRedeemed} pts)</span>
                        <span>−{formatPrice(order.pointsDiscount ?? 0)}</span>
                      </div>
                    ) : null}
                  </div>
                )}

                {order.pointsEarned ? (
                  <p className="mt-2 text-xs text-muted-foreground">
                    +{order.pointsEarned} loyalty points earned
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}
