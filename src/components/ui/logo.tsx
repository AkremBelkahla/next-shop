import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn('text-xl font-bold tracking-tight', className)}>
      Next Shop
    </Link>
  )
}
