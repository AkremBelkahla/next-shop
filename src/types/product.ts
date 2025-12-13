import type { Product, ProductVariant, ProductImage, Collection } from '@prisma/client'

export type ProductWithRelations = Product & {
  images: ProductImage[]
  variants: ProductVariant[]
  collections: Collection[]
}

export type CollectionWithProducts = Collection & {
  products: ProductWithRelations[]
}

export interface CartItem {
  productId: string
  variantId?: string
  quantity: number
  price: number
  title: string
  image?: string
  variant?: {
    title: string
    options?: Record<string, string>
  }
}

export interface Cart {
  items: CartItem[]
  total: number
  itemCount: number
}
