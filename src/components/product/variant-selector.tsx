'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { ProductVariant } from '@prisma/client'

interface VariantSelectorProps {
  variants: ProductVariant[]
  selectedVariantId: string | null
  onVariantChange: (variantId: string) => void
}

export function VariantSelector({
  variants,
  selectedVariantId,
  onVariantChange,
}: VariantSelectorProps) {
  if (variants.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium">Select Variant</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {variants.map((variant) => (
            <Button
              key={variant.id}
              variant="outline"
              size="sm"
              onClick={() => onVariantChange(variant.id)}
              className={cn(
                selectedVariantId === variant.id && 'border-primary bg-primary/10'
              )}
              disabled={variant.inventory === 0}
            >
              {variant.title}
              {variant.inventory === 0 && ' (Out of stock)'}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
