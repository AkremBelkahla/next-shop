import { Star } from 'lucide-react'
import { SimpleAccordionItem } from '@/components/ui/accordion-item'
import type { ProductWithRelations } from '@/types/product'

interface ProductDetailsAccordionProps {
  product: ProductWithRelations
}

export function ProductDetailsAccordion({ product }: ProductDetailsAccordionProps) {
  const defaultVariant = product.variants[0]

  return (
    <div>
      <SimpleAccordionItem title="Specifications" defaultOpen>
        <dl className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
          {product.brand && (
            <div className="flex justify-between gap-2">
              <dt className="text-sm text-muted-foreground">Brand</dt>
              <dd className="text-sm font-medium">{product.brand}</dd>
            </div>
          )}
          {defaultVariant && (
            <div className="flex justify-between gap-2">
              <dt className="text-sm text-muted-foreground">SKU</dt>
              <dd className="text-sm font-medium">{defaultVariant.sku}</dd>
            </div>
          )}
          {product.barcode && (
            <div className="flex justify-between gap-2">
              <dt className="text-sm text-muted-foreground">Barcode</dt>
              <dd className="text-sm font-medium">{product.barcode}</dd>
            </div>
          )}
          {product.weight !== null && (
            <div className="flex justify-between gap-2">
              <dt className="text-sm text-muted-foreground">Weight</dt>
              <dd className="text-sm font-medium">{product.weight} kg</dd>
            </div>
          )}
          {product.dimensions && (
            <div className="flex justify-between gap-2">
              <dt className="text-sm text-muted-foreground">Dimensions</dt>
              <dd className="text-sm font-medium">
                {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
              </dd>
            </div>
          )}
          <div className="flex justify-between gap-2">
            <dt className="text-sm text-muted-foreground">Stock</dt>
            <dd className="text-sm font-medium">{product.stock} units</dd>
          </div>
          {product.minimumOrderQuantity !== null && (
            <div className="flex justify-between gap-2">
              <dt className="text-sm text-muted-foreground">Min. order</dt>
              <dd className="text-sm font-medium">{product.minimumOrderQuantity} units</dd>
            </div>
          )}
          <div className="flex justify-between gap-2">
            <dt className="text-sm text-muted-foreground">Category</dt>
            <dd className="text-sm font-medium">
              {product.collections.map((c) => c.title).join(', ') || 'N/A'}
            </dd>
          </div>
        </dl>
      </SimpleAccordionItem>

      <SimpleAccordionItem title="Shipping & Returns">
        {product.shippingInformation && (
          <p className="text-sm text-muted-foreground">{product.shippingInformation}</p>
        )}
        {product.returnPolicy && (
          <p className="mt-2 text-sm text-muted-foreground">{product.returnPolicy}</p>
        )}
        {product.warrantyInformation && (
          <p className="mt-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Warranty:</span> {product.warrantyInformation}
          </p>
        )}
      </SimpleAccordionItem>

      {product.reviews.length > 0 && (
        <SimpleAccordionItem title={`Reviews (${product.reviews.length})`}>
          <div className="space-y-4">
            {product.reviews.map((review, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{review.reviewerName}</span>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={
                          i < review.rating
                            ? 'h-3.5 w-3.5 fill-amber-400 text-amber-400'
                            : 'h-3.5 w-3.5 text-muted-foreground/30'
                        }
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{review.comment}</p>
                <p className="mt-1 text-xs text-muted-foreground/70">
                  {new Date(review.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            ))}
          </div>
        </SimpleAccordionItem>
      )}
    </div>
  )
}
