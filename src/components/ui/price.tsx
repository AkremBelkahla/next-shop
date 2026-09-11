import { formatPrice } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface PriceProps {
  amount: number
  currency?: string
  className?: string
  compareAtAmount?: number | null
}

export function Price({ amount, currency = 'EUR', className, compareAtAmount }: PriceProps) {
  const hasDiscount = compareAtAmount && compareAtAmount > amount
  const discountPercent = hasDiscount
    ? Math.round(((compareAtAmount - amount) / compareAtAmount) * 100)
    : 0

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <span className="font-semibold">{formatPrice(amount, currency)}</span>
      {hasDiscount && (
        <>
          <span className="text-sm text-muted-foreground line-through">
            {formatPrice(compareAtAmount, currency)}
          </span>
          <span className="text-xs font-medium text-accent">-{discountPercent}%</span>
        </>
      )}
    </div>
  )
}
