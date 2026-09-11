'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { ProductImage } from '@/types/product'

interface ProductImagesProps {
  images: ProductImage[]
  productTitle: string
}

export function ProductImages({ images, productTitle }: ProductImagesProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  if (images.length === 0) {
    return (
      <div className="aspect-square w-full bg-white shadow-sm" />
    )
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-none bg-white p-6 shadow-sm">
        <Image
          src={images[selectedImage]?.url || ''}
          alt={images[selectedImage]?.alt || productTitle}
          fill
          className="object-contain"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedImage(index)}
              className={cn(
                'relative aspect-square overflow-hidden rounded-none bg-white p-2 transition-all',
                selectedImage === index
                  ? 'ring-2 ring-primary ring-offset-2'
                  : 'opacity-70 hover:opacity-100'
              )}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 25vw, 12vw"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
