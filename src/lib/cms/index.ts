import {
  getProducts,
  getProductBySlug,
  getFeaturedProducts,
  searchProducts,
  getRelatedProducts,
} from '../products'
import {
  getCollections,
  getCollectionBySlug,
  getFeaturedCollections,
} from '../collections'

export const cms = {
  products: {
    getAll: getProducts,
    getBySlug: getProductBySlug,
    getFeatured: getFeaturedProducts,
    search: searchProducts,
    getRelated: getRelatedProducts,
  },
  collections: {
    getAll: getCollections,
    getBySlug: getCollectionBySlug,
    getFeatured: getFeaturedCollections,
  },
}

export type CMS = typeof cms
