export type CouponType = 'percentage' | 'fixed' | 'shipping'

export interface Coupon {
  code: string
  type: CouponType
  /** Percentage discount (0-100) when type === 'percentage'. */
  value: number
  /** Minimum subtotal in cents required to apply the coupon. */
  minSubtotal?: number
  description: string
}

/**
 * Predefined coupon codes for the demo storefront.
 * There is no admin panel — codes are managed here.
 */
export const COUPONS: Coupon[] = [
  {
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    description: '10% off your order',
  },
  {
    code: 'SUMMER20',
    type: 'percentage',
    value: 20,
    minSubtotal: 5000,
    description: '20% off orders over €50',
  },
  {
    code: 'SAVE5',
    type: 'fixed',
    value: 500,
    minSubtotal: 3000,
    description: '€5 off orders over €30',
  },
  {
    code: 'FREESHIP',
    type: 'shipping',
    value: 0,
    description: 'Free shipping on your order',
  },
]

export function getCoupon(code: string): Coupon | null {
  const normalized = code.trim().toUpperCase()
  return COUPONS.find((c) => c.code === normalized) ?? null
}

export interface CouponResult {
  coupon: Coupon
  discount: number
  /** True when the coupon grants free shipping (no monetary line-item discount). */
  freeShipping: boolean
  error?: string
}

/**
 * Validate a coupon against the current subtotal (in cents) and compute the
 * monetary discount applied to the order. Free shipping coupons return a
 * 0 discount and `freeShipping: true`.
 */
export function applyCoupon(
  code: string,
  subtotal: number
): CouponResult | { coupon: null; error: string } {
  const coupon = getCoupon(code)

  if (!coupon) {
    return { coupon: null, error: 'Invalid coupon code.' }
  }

  if (coupon.minSubtotal && subtotal < coupon.minSubtotal) {
    return {
      coupon,
      error: `Requires a minimum subtotal of €${(coupon.minSubtotal / 100).toFixed(0)}.`,
    }
  }

  if (coupon.type === 'shipping') {
    return { coupon, discount: 0, freeShipping: true }
  }

  if (coupon.type === 'fixed') {
    const discount = Math.min(coupon.value, subtotal)
    return { coupon, discount, freeShipping: false }
  }

  // percentage
  const discount = Math.round((subtotal * coupon.value) / 100)
  return { coupon, discount, freeShipping: false }
}
