'use client'

import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Logo } from '@/components/ui/logo'
import type { MegaMenuGroup } from '@/components/layout/mega-menu'

interface MobileMenuProps {
  groups: MegaMenuGroup[]
}

export function MobileMenu({ groups }: MobileMenuProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button type="button" variant="ghost" size="icon" aria-label="Open menu" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-80">
        <SheetHeader>
          <SheetTitle className="text-left">
            <Logo />
          </SheetTitle>
        </SheetHeader>
        <nav className="mt-8 flex flex-col gap-2">
          {[
            { href: '/collections', label: 'All Products' },
            { href: '/collections?filter=deals', label: 'Deals' },
            { href: '/about', label: 'About' },
            { href: '/contact', label: 'Contact' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-2 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent/10"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8">
          <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Categories
          </p>
          <div className="flex flex-col gap-4">
            {groups.map((group) => (
              <div key={group.parent} className="px-2">
                <p className="mb-1 text-sm font-semibold">{group.parent}</p>
                <ul className="flex flex-col gap-1">
                  {group.collections.map((collection) => (
                    <li key={collection.slug}>
                      <Link
                        href={`/collections/${collection.slug}`}
                        className="block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {collection.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
