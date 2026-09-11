'use client'

import { useMemo, useState } from 'react'
import { ProductGrid } from '@/components/product/product-grid'
import type { ProductWithRelations } from '@/types/product'

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'

interface CollectionProductsProps {
  products: ProductWithRelations[]
}

const sortLabels: Record<SortOption, string> = {
  featured: 'Featured',
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
  'name-asc': 'Name: A to Z',
  'name-desc': 'Name: Z to A',
}

export function CollectionProducts({ products }: CollectionProductsProps) {
  const [sort, setSort] = useState<SortOption>('featured')

  const sortedProducts = useMemo(() => {
    const items = [...products]
    switch (sort) {
      case 'price-asc':
        return items.sort((a, b) => a.price - b.price)
      case 'price-desc':
        return items.sort((a, b) => b.price - a.price)
      case 'name-asc':
        return items.sort((a, b) => a.title.localeCompare(b.title))
      case 'name-desc':
        return items.sort((a, b) => b.title.localeCompare(a.title))
      default:
        return items
    }
  }, [products, sort])

  return (
    <div>
      <div className="mb-6 flex items-center justify-end gap-3">
        <label htmlFor="sort" className="text-sm text-muted-foreground">
          Sort by
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          {(Object.keys(sortLabels) as SortOption[]).map((key) => (
            <option key={key} value={key}>
              {sortLabels[key]}
            </option>
          ))}
        </select>
      </div>
      <ProductGrid products={sortedProducts} />
    </div>
  )
}
