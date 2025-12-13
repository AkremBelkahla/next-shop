import { ProductCard } from './product-card'
import type { ProductWithRelations } from '@/types/product'

interface ProductGridProps {
  products: ProductWithRelations[]
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">No products found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
