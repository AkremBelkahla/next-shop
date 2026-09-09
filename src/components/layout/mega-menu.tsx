'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface MegaMenuGroup {
  parent: string
  collections: { slug: string; title: string }[]
}

export function MegaMenu({ groups }: { groups: MegaMenuGroup[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(true)
  }

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        type="button"
        className="flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/10 hover:text-foreground"
        aria-expanded={isOpen}
      >
        Categories
        <ChevronDown
          className={cn(
            'h-4 w-4 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <div className="fixed inset-x-0 top-16 z-50 mx-auto flex justify-center px-4">
          <div className="w-full max-w-[1000px] rounded-none border bg-background shadow-xl">
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 p-6 sm:grid-cols-4 lg:grid-cols-7">
              {groups.map((group) => (
                <div key={group.parent} className="min-w-0">
                  <h4 className="border-b pb-2 text-xs font-semibold uppercase tracking-wider text-foreground/80">
                    {group.parent}
                  </h4>
                  <ul className="mt-2 space-y-1.5">
                    {group.collections.map((collection) => (
                      <li key={collection.slug}>
                        <Link
                          href={`/collections/${collection.slug}`}
                          className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
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
        </div>
      )}
    </div>
  )
}
