import { SimpleAccordionItem } from '@/components/ui/accordion-item'
import type { ProductWithRelations } from '@/types/product'

interface ProductDetailsAccordionProps {
  product: ProductWithRelations
}

export function ProductDetailsAccordion({ product }: ProductDetailsAccordionProps) {
  return (
    <div>
      <SimpleAccordionItem title="Details" defaultOpen>
        <ul className="list-disc space-y-1 pl-4">
          {product.variants.length > 0 && (
            <li>
              Available in {product.variants.length} option
              {product.variants.length > 1 ? 's' : ''}:{' '}
              {product.variants.map((variant) => variant.title).join(', ')}
            </li>
          )}
          <li>Part of {product.collections.map((c) => c.title).join(', ') || 'our catalog'}</li>
        </ul>
      </SimpleAccordionItem>

      <SimpleAccordionItem title="Shipping & Returns">
        <p>
          Free standard shipping on orders over €50. Orders are typically processed within
          1-2 business days and delivered within 3-5 business days.
        </p>
        <p className="mt-2">
          Not the right fit? Return any unused item within 30 days for a full refund.
        </p>
      </SimpleAccordionItem>

      <SimpleAccordionItem title="Care Instructions">
        <p>
          Store in a cool, dry place away from direct sunlight. Refer to the product label for
          specific cleaning recommendations.
        </p>
      </SimpleAccordionItem>
    </div>
  )
}
