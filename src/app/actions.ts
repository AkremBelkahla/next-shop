'use server'

import { addToCart, clearCart, removeFromCart, updateQuantity } from '@/lib/cart'
import type { CartItem } from '@/types/product'

export async function addToCartAction(item: CartItem) {
  return addToCart(item)
}

export async function removeFromCartAction(productId: string, variantId?: string) {
  return removeFromCart(productId, variantId)
}

export async function updateQuantityAction(
  productId: string,
  quantity: number,
  variantId?: string
) {
  return updateQuantity(productId, quantity, variantId)
}

export async function clearCartAction() {
  return clearCart()
}
