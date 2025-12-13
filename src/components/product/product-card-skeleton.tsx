import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-square w-full" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-6 w-1/4" />
      </div>
    </Card>
  )
}
