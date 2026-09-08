import { RefreshCw, Shield, Truck } from 'lucide-react'

const badges = [
  { icon: Truck, label: 'Free shipping over €50' },
  { icon: RefreshCw, label: '30-day easy returns' },
  { icon: Shield, label: 'Secure checkout' },
]

export function TrustBadges() {
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
