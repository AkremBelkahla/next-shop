import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui/container'
import { Card } from '@/components/ui/card'
import { cms } from '@/lib/cms'

export async function FeaturedCollections() {
  const collections = await cms.collections.getFeatured(3)

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Shop by Collection
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Curated selections for every style
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
                  <h3 className="text-xl font-semibold">{collection.title}</h3>
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
    </section>
  )
}
