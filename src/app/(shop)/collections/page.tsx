import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui/container'
import { Card } from '@/components/ui/card'
import { cms } from '@/lib/cms'

export const metadata = {
  title: 'Collections | Next Shop',
  description: 'Browse our curated collections',
}

export default async function CollectionsPage() {
  const collections = await cms.collections.getAll()

  return (
    <div className="py-12 md:py-16">
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Collections</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore our curated collections
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection: { id: string; slug: string; title: string; description: string | null; image: string | null }) => (
            <Link key={collection.id} href={`/collections/${collection.slug}`}>
              <Card className="group overflow-hidden transition-all hover:shadow-lg">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  {collection.image && (
                    <Image
                      src={collection.image}
                      alt={collection.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold">{collection.title}</h2>
                  {collection.description && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {collection.description}
                    </p>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  )
}
