import { ORDERS_STORAGE_KEY } from '@/lib/constants'
import type { Order } from '@/types/product'

const EMPTY_ORDERS: Order[] = []

/* -------------------------------------------------------------------------- */
/*  Cached snapshot for useSyncExternalStore                                   */
/*  getSnapshot() must return a stable reference when the data hasn't         */
/*  changed, otherwise React re-renders in an infinite loop.                  */
/* -------------------------------------------------------------------------- */

let cachedOrders: Order[] | null = null

function readOrdersFromStorage(): Order[] {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) ?? '[]')
  } catch {
    return EMPTY_ORDERS
  }
}

export function subscribeToOrders(onStoreChange: () => void) {
  const handler = () => {
    cachedOrders = null // invalidate cache so next getSnapshot re-reads
    onStoreChange()
  }
  window.addEventListener('storage', handler)
  return () => {
    window.removeEventListener('storage', handler)
  }
}

export function getOrders(): Order[] {
  if (cachedOrders === null) {
    cachedOrders = readOrdersFromStorage()
  }
  return cachedOrders
}

export function getServerOrders(): Order[] {
  return EMPTY_ORDERS
}

/** Invalidate the cache after writing to localStorage from the same tab. */
export function invalidateOrdersCache(): void {
  cachedOrders = null
}
