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
  getGroupedCollections,
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
    getGrouped: getGroupedCollections,
  },
}

export type CMS = typeof cms
