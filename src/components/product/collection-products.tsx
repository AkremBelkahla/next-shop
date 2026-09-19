'use client'

import { useMemo, useState, useId } from 'react'
import { ProductGrid } from '@/components/product/product-grid'
import { Star } from 'lucide-react'
import type { ProductWithRelations } from '@/types/product'

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'

type RatingFilter = 'all' | '4+' | '3+' | '2+' | '1+'

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

const ratingLabels: Record<RatingFilter, string> = {
  all: 'All ratings',
  '4+': '4 stars & up',
  '3+': '3 stars & up',
  '2+': '2 stars & up',
  '1+': '1 star & up',
}

export function CollectionProducts({ products }: CollectionProductsProps) {
  const [sort, setSort] = useState<SortOption>('featured')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [selectedBrand, setSelectedBrand] = useState<string>('all')
  const [selectedRating, setSelectedRating] = useState<RatingFilter>('all')

  const priceRange = useMemo(() => {
    const prices = products.map((p) => p.price)
    return {
      min: prices.length > 0 ? Math.min(...prices) : 0,
      max: prices.length > 0 ? Math.max(...prices) : 0,
    }
  }, [products])

  const displayRange = useMemo(
    () => ({
      min: (priceRange.min / 100).toFixed(2),
      max: (priceRange.max / 100).toFixed(2),
    }),
    [priceRange]
  )

  const brands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand).filter(Boolean))).sort() as string[],
    [products]
  )

  const min = useMemo(
    () => (minPrice ? Math.round(Number(minPrice) * 100) : priceRange.min),
    [minPrice, priceRange.min]
  )
  const max = useMemo(
    () => (maxPrice ? Math.round(Number(maxPrice) * 100) : priceRange.max),
    [maxPrice, priceRange.max]
  )
  const minId = useId()
  const maxId = useId()
  const brandId = useId()
  const ratingId = useId()
  const sortId = useId()

  const filteredAndSorted = useMemo(() => {
    const items = products.filter((product) => {
      const inPrice = product.price >= min && product.price <= max
      const inBrand = selectedBrand === 'all' || product.brand === selectedBrand
      const inRating =
        selectedRating === 'all' ||
        (product.rating ?? 0) >= Number(selectedRating.replace('+', ''))
      return inPrice && inBrand && inRating
    })

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
  }, [products, min, max, selectedBrand, selectedRating, sort])

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 rounded-none border border-border/60 bg-card p-4 md:flex-row md:items-end md:justify-between">
        <div className="grid w-full gap-4 sm:grid-cols-2 md:flex md:items-end md:gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor={minId} className="text-xs font-medium text-muted-foreground">
              Min price
            </label>
            <input
              id={minId}
              type="number"
              step="0.01"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder={displayRange.min}
              className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/50 md:w-28"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor={maxId} className="text-xs font-medium text-muted-foreground">
              Max price
            </label>
            <input
              id={maxId}
              type="number"
              step="0.01"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder={displayRange.max}
              className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/50 md:w-28"
            />
          </div>
          {brands.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <label htmlFor={brandId} className="text-xs font-medium text-muted-foreground">
                Brand
              </label>
              <select
                id={brandId}
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/50 md:w-40"
              >
                <option value="all">All brands</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="flex flex-col gap-1.5">
            <label htmlFor={ratingId} className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
              <Star className="h-3 w-3" />
              Rating
            </label>
            <select
              id={ratingId}
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value as RatingFilter)}
              className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/50 md:w-40"
            >
              {(Object.keys(ratingLabels) as RatingFilter[]).map((key) => (
                <option key={key} value={key}>
                  {ratingLabels[key]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={sortId} className="text-xs font-medium text-muted-foreground">
            Sort by
          </label>
          <select
            id={sortId}
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/50 md:w-44"
          >
            {(Object.keys(sortLabels) as SortOption[]).map((key) => (
              <option key={key} value={key}>
                {sortLabels[key]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mb-4 text-sm text-muted-foreground">
        {filteredAndSorted.length} {filteredAndSorted.length === 1 ? 'product' : 'products'}
      </p>

      <ProductGrid products={filteredAndSorted} />
    </div>
  )
}
