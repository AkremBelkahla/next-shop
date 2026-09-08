export interface Product {
  id: string
  slug: string
  title: string
  description: string
  price: number
  compareAtPrice: number | null
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ProductVariant {
  id: string
  productId: string
  title: string
  sku: string
  price: number
  inventory: number
  options: Record<string, string> | null
}

export interface ProductImage {
  id: string
  productId: string
  url: string
  alt: string
  position: number
}

export interface Collection {
  id: string
  slug: string
  title: string
  description: string | null
  image: string | null
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

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

export interface Order {
  id: string
  items: CartItem[]
  total: number
  createdAt: string
  subtotal?: number
  couponCode?: string
  couponDiscount?: number
  freeShipping?: boolean
  pointsRedeemed?: number
  pointsDiscount?: number
  pointsEarned?: number
}
