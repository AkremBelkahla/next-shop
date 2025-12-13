import { Container } from '@/components/ui/container'
import { ProductCardSkeleton } from '@/components/product/product-card-skeleton'

export default function Loading() {
  return (
    <div className="py-12 md:py-16">
      <Container>
        <div className="mb-12 space-y-4">
          <div className="h-10 w-48 animate-pulse bg-muted rounded" />
          <div className="h-6 w-96 animate-pulse bg-muted rounded" />
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </Container>
    </div>
  )
}
