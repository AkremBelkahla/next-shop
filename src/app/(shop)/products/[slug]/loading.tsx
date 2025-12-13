import { Container } from '@/components/ui/container'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="py-12 md:py-16">
      <Container>
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-lg" />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-10 w-1/4" />
              <Skeleton className="h-24 w-full" />
            </div>
            <Skeleton className="h-px w-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <div className="flex gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-9 w-20" />
                ))}
              </div>
            </div>
            <Skeleton className="h-px w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </Container>
    </div>
  )
}
