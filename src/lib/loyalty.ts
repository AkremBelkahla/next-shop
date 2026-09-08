import { LOYALTY_STORAGE_KEY } from '@/lib/constants'

/**
 * Loyalty points are stored client-side in localStorage (no auth in this
 * storefront). 1 point is earned per €1 spent (per 100 cents). Points can be
 * redeemed at checkout: 100 points = €1 (100 cents) discount.
 */
export const POINTS_PER_EURO = 1
export const POINTS_PER_EURO_CENT = 100
export const REDEEM_POINTS_PER_EURO = 100
export const MIN_REDEEM_POINTS = 100

export function subscribeToPoints(onStoreChange: () => void) {
  window.addEventListener('storage', onStoreChange)
  return () => {
    window.removeEventListener('storage', onStoreChange)
  }
}

export function getPoints(): number {
  try {
    const raw = localStorage.getItem(LOYALTY_STORAGE_KEY)
    if (raw == null) return 0
    const parsed = JSON.parse(raw)
    return typeof parsed === 'number' && Number.isFinite(parsed) ? parsed : 0
  } catch {
    return 0
  }
}

export function getServerPoints(): number {
  return 0
}

export function setPoints(points: number): void {
  const safe = Math.max(0, Math.floor(points))
  localStorage.setItem(LOYALTY_STORAGE_KEY, String(safe))
  window.dispatchEvent(new Event('storage'))
}

/** Award points for a spend amount (in cents). Returns the new balance. */
export function addPointsForSpend(totalCents: number): number {
  const earned = Math.floor(totalCents / POINTS_PER_EURO_CENT) * POINTS_PER_EURO
  if (earned <= 0) return getPoints()
  setPoints(getPoints() + earned)
  return getPoints()
}

/** Deduct redeemed points. Returns the new balance. */
export function spendPoints(points: number): number {
  setPoints(getPoints() - points)
  return getPoints()
}

/** Convert a number of points into a discount amount in cents. */
export function pointsToDiscount(points: number): number {
  return Math.floor(points / REDEEM_POINTS_PER_EURO) * 100
}

/** Convert a discount amount in cents into the points required to redeem it. */
export function discountToPoints(discountCents: number): number {
  return Math.ceil(discountCents / 100) * REDEEM_POINTS_PER_EURO
}
