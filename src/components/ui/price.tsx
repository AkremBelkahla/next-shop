import { formatPrice } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface PriceProps {
  amount: number
  currency?: string
  className?: string
  compareAtAmount?: number | null
}

export function Price({ amount, currency = 'EUR', className, compareAtAmount }: PriceProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="font-semibold">{formatPrice(amount, currency)}</span>
      {compareAtAmount && compareAtAmount > amount && (
        <span className="text-sm text-muted-foreground line-through">
          {formatPrice(compareAtAmount, currency)}
        </span>
      )}
    </div>
  )
}
