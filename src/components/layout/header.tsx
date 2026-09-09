import Link from 'next/link'
import { Menu, User } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Logo } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { CartButton } from '@/components/layout/cart-button'
import { MegaMenu, type MegaMenuGroup } from '@/components/layout/mega-menu'
import { cms } from '@/lib/cms'

export async function Header() {
  const groups = await cms.collections.getGrouped()
  const megaGroups: MegaMenuGroup[] = groups.map((g) => ({
    parent: g.parent,
    collections: g.collections.map((c) => ({ slug: c.slug, title: c.title })),
  }))

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Logo />
            <nav className="hidden md:flex md:gap-1">
              <MegaMenu groups={megaGroups} />
              <Link
                href="/collections"
                className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/10 hover:text-foreground"
              >
                All Products
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button type="button" variant="ghost" size="icon" aria-label="My account" asChild>
              <Link href="/account">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <CartButton />
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Container>
    </header>
  )
}
