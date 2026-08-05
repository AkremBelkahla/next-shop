'use client'

import { createContext, useCallback, useContext, useState } from 'react'
import type { Cart } from '@/types/product'

interface CartContextValue {
  cart: Cart
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  setCart: (cart: Cart) => void
}

const CartContext = createContext<CartContextValue | null>(null)

interface CartProviderProps {
  initialCart: Cart
  children: React.ReactNode
}

export function CartProvider({ initialCart, children }: CartProviderProps) {
  const [cart, setCart] = useState<Cart>(initialCart)
  const [isOpen, setIsOpen] = useState(false)

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  return (
    <CartContext.Provider value={{ cart, isOpen, openCart, closeCart, setCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
