'use client'

import { useCallback, useEffect, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Tag, X, Sparkles, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatPrice } from '@/lib/utils'
import { applyCoupon } from '@/lib/coupons'
import {
  getPoints,
  getServerPoints,
  spendPoints,
  addPointsForSpend,
  subscribeToPoints,
  pointsToDiscount,
  REDEEM_POINTS_PER_EURO,
  MIN_REDEEM_POINTS,
} from '@/lib/loyalty'
import { clearCartAction } from '@/app/actions'
import { useCart } from '@/components/cart/cart-provider'
import {
  COUPON_STORAGE_KEY,
  ORDERS_STORAGE_KEY,
  REDEEM_POINTS_STORAGE_KEY,
} from '@/lib/constants'
import type { Order } from '@/types/product'

/* -------------------------------------------------------------------------- */
/*  localStorage helpers for the applied coupon + points redemption toggle    */
/* -------------------------------------------------------------------------- */

function subscribeToKey(key: string, onStoreChange: () => void) {
  const handler = (e: StorageEvent) => {
    if (e.key === null || e.key === key) onStoreChange()
  }
  window.addEventListener('storage', handler)
  return () => window.removeEventListener('storage', handler)
}

function readKey(key: string): string {
  try {
    return localStorage.getItem(key) ?? ''
  } catch {
    return ''
  }
}

function writeKey(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
    window.dispatchEvent(new StorageEvent('storage', { key }))
  } catch {
    /* ignore */
  }
}

/* -------------------------------------------------------------------------- */
/*  Main component                                                             */
/* -------------------------------------------------------------------------- */

interface OrderSummaryProps {
  subtotal: number
  mode: 'cart' | 'checkout'
}

export function OrderSummary({ subtotal, mode }: OrderSummaryProps) {
  const router = useRouter()
  const { cart, setCart } = useCart()
  const [isPlacing, setIsPlacing] = useState(false)
  const [couponInput, setCouponInput] = useState('')
  const [couponError, setCouponError] = useState<string | null>(null)

  const points = useSyncExternalStore(subscribeToPoints, getPoints, getServerPoints)
  const appliedCouponCode = useSyncExternalStore(
    (cb) => subscribeToKey(COUPON_STORAGE_KEY, cb),
    () => readKey(COUPON_STORAGE_KEY),
    () => ''
  )
  const redeemFlag = useSyncExternalStore(
    (cb) => subscribeToKey(REDEEM_POINTS_STORAGE_KEY, cb),
    () => readKey(REDEEM_POINTS_STORAGE_KEY),
    () => ''
  )

  /* ----- compute discounts ------------------------------------------------ */
  const couponResult =
    appliedCouponCode !== ''
      ? applyCoupon(appliedCouponCode, subtotal)
      : null
  const couponDiscount = couponResult && 'discount' in couponResult ? couponResult.discount : 0
  const freeShipping = couponResult && 'freeShipping' in couponResult ? couponResult.freeShipping : false
  const couponErrorMessage = couponResult && couponResult.error ? couponResult.error : null

  const remainingAfterCoupon = Math.max(0, subtotal - couponDiscount)

  // Points redeemable in multiples of REDEEM_POINTS_PER_EURO, capped by balance
  // and by the remaining subtotal.
  const usableBalance = Math.floor(points / REDEEM_POINTS_PER_EURO) * REDEEM_POINTS_PER_EURO
  const maxPointsForRemaining = Math.floor(remainingAfterCoupon / 100) * REDEEM_POINTS_PER_EURO
  const redeemablePoints = Math.max(0, Math.min(usableBalance, maxPointsForRemaining))
  const wantsRedeem = redeemFlag === '1' && redeemablePoints >= MIN_REDEEM_POINTS
  const pointsRedeemed = wantsRedeem ? redeemablePoints : 0
  const pointsDiscount = pointsToDiscount(pointsRedeemed)

  const total = Math.max(0, subtotal - couponDiscount - pointsDiscount)
  const pointsEarned = Math.floor(total / 100)

  /* ----- coupon actions ---------------------------------------------------- */
  const handleApplyCoupon = useCallback(() => {
    const code = couponInput.trim()
    if (code === '') {
      setCouponError('Please enter a coupon code.')
      return
    }
    const result = applyCoupon(code, subtotal)
    if (result.coupon === null) {
      setCouponError(result.error ?? 'Invalid coupon code.')
      return
    }
    if (result.error) {
      setCouponError(result.error)
      return
    }
    setCouponError(null)
    writeKey(COUPON_STORAGE_KEY, result.coupon.code)
  }, [couponInput, subtotal])

  const handleRemoveCoupon = useCallback(() => {
    writeKey(COUPON_STORAGE_KEY, '')
    setCouponInput('')
    setCouponError(null)
  }, [])

  const handleToggleRedeem = useCallback(() => {
    const next = redeemFlag === '1' ? '0' : '1'
    writeKey(REDEEM_POINTS_STORAGE_KEY, next)
  }, [redeemFlag])

  /* ----- place order ------------------------------------------------------- */
  async function handlePlaceOrder() {
    if (cart.items.length === 0) return
    setIsPlacing(true)
    try {
      const order: Order = {
        id: crypto.randomUUID(),
        items: cart.items,
        subtotal,
        total,
        createdAt: new Date().toISOString(),
        couponCode: appliedCouponCode || undefined,
        couponDiscount: couponDiscount || undefined,
        freeShipping: freeShipping || undefined,
        pointsRedeemed: pointsRedeemed || undefined,
        pointsDiscount: pointsDiscount || undefined,
        pointsEarned: pointsEarned || undefined,
      }

      const existing: Order[] = JSON.parse(
        localStorage.getItem(ORDERS_STORAGE_KEY) ?? '[]'
      )
      localStorage.setItem(
        ORDERS_STORAGE_KEY,
        JSON.stringify([order, ...existing])
      )

      if (pointsRedeemed > 0) {
        spendPoints(pointsRedeemed)
      }
      addPointsForSpend(total)

      // Clear applied coupon + redeem flag after a successful order.
      writeKey(COUPON_STORAGE_KEY, '')
      writeKey(REDEEM_POINTS_STORAGE_KEY, '0')

      const clearedCart = await clearCartAction()
      setCart(clearedCart)

      router.push(`/checkout/success?order=${order.id}`)
    } finally {
      setIsPlacing(false)
    }
  }

  /* ----- render ------------------------------------------------------------ */
  return (
    <div className="rounded-lg border p-6 space-y-4">
      <h2 className="text-lg font-semibold">Order Summary</h2>

      {/* Coupon input */}
      <div className="space-y-2">
        {appliedCouponCode !== '' ? (
          <div className="flex items-center justify-between rounded-md border bg-muted/40 px-3 py-2">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">{appliedCouponCode}</span>
              {couponResult && 'coupon' in couponResult && couponResult.coupon && (
                <span className="text-xs text-muted-foreground">
                  — {couponResult.coupon.description}
                </span>
              )}
            </div>
            <button
              type="button"
              aria-label="Remove coupon"
              onClick={handleRemoveCoupon}
              className="shrink-0 cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Coupon code"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleApplyCoupon()
                  }
                }}
                className="uppercase"
              />
              <Button type="button" variant="outline" onClick={handleApplyCoupon}>
                Apply
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Try: WELCOME10, SUMMER20, SAVE5, FREESHIP
            </p>
          </>
        )}
        {couponError && (
          <p className="text-xs text-destructive">{couponError}</p>
        )}
        {couponErrorMessage && appliedCouponCode !== '' && (
          <p className="text-xs text-destructive">{couponErrorMessage}</p>
        )}
      </div>

      {/* Loyalty points redeem */}
      {points >= MIN_REDEEM_POINTS && (
        <div className="rounded-md border bg-muted/40 px-3 py-3">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={wantsRedeem}
              onChange={handleToggleRedeem}
              disabled={redeemablePoints < MIN_REDEEM_POINTS}
              className="mt-0.5 h-4 w-4 cursor-pointer accent-accent disabled:cursor-not-allowed disabled:opacity-40"
            />
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-sm font-medium">
                <Sparkles className="h-4 w-4 text-accent" />
                Redeem loyalty points
              </div>
              <p className="text-xs text-muted-foreground">
                Balance: {points} pts · {REDEEM_POINTS_PER_EURO} pts = €1
              </p>
              {wantsRedeem && (
                <p className="text-xs font-medium text-foreground">
                  Using {pointsRedeemed} pts → −{formatPrice(pointsDiscount)}
                </p>
              )}
              {!wantsRedeem && redeemablePoints < MIN_REDEEM_POINTS && (
                <p className="text-xs text-muted-foreground">
                  Not enough redeemable points for this order.
                </p>
              )}
            </div>
          </label>
        </div>
      )}

      {/* Breakdown */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        {couponDiscount > 0 && (
          <div className="flex justify-between text-sm text-accent">
            <span>Coupon ({appliedCouponCode})</span>
            <span>−{formatPrice(couponDiscount)}</span>
          </div>
        )}
        {pointsDiscount > 0 && (
          <div className="flex justify-between text-sm text-accent">
            <span>Points ({pointsRedeemed} pts)</span>
            <span>−{formatPrice(pointsDiscount)}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          {freeShipping ? (
            <span className="flex items-center gap-1 text-accent">
              <Truck className="h-3.5 w-3.5" /> Free
            </span>
          ) : (
            <span>Calculated at checkout</span>
          )}
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
        {pointsEarned > 0 && (
          <p className="mt-1 text-xs text-muted-foreground">
            You'll earn {pointsEarned} loyalty points with this order.
          </p>
        )}
      </div>

      {mode === 'checkout' ? (
        <>
          <Button
            size="lg"
            type="button"
            className="w-full"
            onClick={handlePlaceOrder}
            disabled={isPlacing}
          >
            {isPlacing ? 'Placing Order...' : 'Place Order'}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Demo checkout: no real payment is processed. Your order is saved locally.
          </p>
        </>
      ) : (
        <div className="space-y-2">
          <Button size="lg" className="w-full" asChild>
            <Link href="/checkout">Proceed to Checkout</Link>
          </Button>
          <Button size="lg" variant="outline" className="w-full" asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
