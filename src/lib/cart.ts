import { cookies } from 'next/headers'
import type { Cart, CartItem } from '@/types/product'

const CART_COOKIE_NAME = 'cart'

export async function getCart(): Promise<Cart> {
  const cookieStore = await cookies()
  const cartCookie = cookieStore.get(CART_COOKIE_NAME)

  if (!cartCookie) {
    return {
      items: [],
      total: 0,
      itemCount: 0,
    }
  }

  try {
    const items: CartItem[] = JSON.parse(cartCookie.value)
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

    return {
      items,
      total,
      itemCount,
    }
  } catch {
    return {
      items: [],
      total: 0,
      itemCount: 0,
    }
  }
}

export async function addToCart(item: CartItem): Promise<Cart> {
  const cart = await getCart()
  const existingItemIndex = cart.items.findIndex(
    (i) => i.productId === item.productId && i.variantId === item.variantId
  )

  if (existingItemIndex > -1) {
    const existingItem = cart.items[existingItemIndex]
    if (existingItem) {
      cart.items[existingItemIndex] = {
        ...existingItem,
        quantity: existingItem.quantity + item.quantity,
      }
    }
  } else {
    cart.items.push(item)
  }

  await saveCart(cart.items)
  return getCart()
}

export async function removeFromCart(productId: string, variantId?: string): Promise<Cart> {
  const cart = await getCart()
  cart.items = cart.items.filter(
    (item) => !(item.productId === productId && item.variantId === variantId)
  )

  await saveCart(cart.items)
  return getCart()
}

export async function updateQuantity(
  productId: string,
  quantity: number,
  variantId?: string
): Promise<Cart> {
  const cart = await getCart()
  const itemIndex = cart.items.findIndex(
    (item) => item.productId === productId && item.variantId === variantId
  )

  if (itemIndex > -1) {
    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1)
    } else {
      const item = cart.items[itemIndex]
      if (item) {
        cart.items[itemIndex] = { ...item, quantity }
      }
    }
  }

  await saveCart(cart.items)
  return getCart()
}

export async function clearCart(): Promise<Cart> {
  await saveCart([])
  return getCart()
}

async function saveCart(items: CartItem[]): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(CART_COOKIE_NAME, JSON.stringify(items), {
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
    sameSite: 'lax',
  })
}
