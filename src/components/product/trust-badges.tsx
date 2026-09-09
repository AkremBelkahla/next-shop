import { RefreshCw, Shield, Truck } from 'lucide-react'
import type { ProductWithRelations } from '@/types/product'

interface TrustBadgesProps {
  product?: ProductWithRelations
}

export function TrustBadges({ product }: TrustBadgesProps) {
  const badges = [
    {
      icon: Truck,
      label: product?.shippingInformation ?? 'Free shipping over €50',
    },
    {
      icon: RefreshCw,
      label: product?.returnPolicy ?? '30-day easy returns',
    },
    {
      icon: Shield,
      label: product?.warrantyInformation ?? 'Secure checkout',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-3 rounded-none border bg-muted/30 p-4 sm:grid-cols-3">
      {badges.map((badge) => (
        <div key={badge.label} className="flex items-center gap-2 text-sm">
          <badge.icon className="h-4 w-4 shrink-0 text-accent" />
          <span className="text-muted-foreground">{badge.label}</span>
        </div>
      ))}
    </div>
  )
}
