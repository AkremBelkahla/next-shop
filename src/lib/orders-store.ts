import { ORDERS_STORAGE_KEY } from '@/lib/constants'
import type { Order } from '@/types/product'

export function subscribeToOrders(onStoreChange: () => void) {
  window.addEventListener('storage', onStoreChange)
  return () => {
    window.removeEventListener('storage', onStoreChange)
  }
}

export function getOrders(): Order[] {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

export function getServerOrders(): Order[] {
  return []
}
