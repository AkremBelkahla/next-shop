import Link from 'next/link'
import { ShoppingBag, Menu } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Logo } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import { getCart } from '@/lib/cart'

const navigation = [
  { name: 'New Arrivals', href: '/collections/new-arrivals' },
  { name: 'Bestsellers', href: '/collections/bestsellers' },
  { name: 'Accessories', href: '/collections/accessories' },
  { name: 'Sale', href: '/collections/sale' },
]

export async function Header() {
  const cart = await getCart()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Logo />
            <nav className="hidden md:flex md:gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/cart">
                <ShoppingBag className="h-5 w-5" />
                {cart.itemCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                    {cart.itemCount}
                  </span>
                )}
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Container>
    </header>
  )
}
