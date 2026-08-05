import type {
  Collection,
  Product,
  ProductImage,
  ProductVariant,
  ProductWithRelations,
} from '@/types/product'

const now = new Date('2024-01-01T00:00:00.000Z')

interface RawProduct extends Product {
  images: Omit<ProductImage, 'id' | 'productId'>[]
  variants: Omit<ProductVariant, 'id' | 'productId'>[]
  collectionSlugs: string[]
}

export const collectionsData: Collection[] = [
  {
    id: 'col_new-arrivals',
    slug: 'new-arrivals',
    title: 'New Arrivals',
    description: 'Discover our latest products',
    image:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    featured: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'col_bestsellers',
    slug: 'bestsellers',
    title: 'Bestsellers',
    description: 'Our most popular products',
    image:
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800',
    featured: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'col_accessories',
    slug: 'accessories',
    title: 'Accessories',
    description: 'Complete your look',
    image:
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800',
    featured: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'col_sale',
    slug: 'sale',
    title: 'Sale',
    description: 'Limited time offers',
    image:
      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800',
    featured: false,
    createdAt: now,
    updatedAt: now,
  },
]

const rawProducts: RawProduct[] = [
  {
    id: 'prod_classic-leather-backpack',
    slug: 'classic-leather-backpack',
    title: 'Classic Leather Backpack',
    description:
      'Premium full-grain leather backpack with laptop compartment. Handcrafted with attention to detail, featuring brass hardware and cotton lining. Perfect for daily commute or weekend adventures.',
    price: 12900,
    compareAtPrice: 15900,
    featured: true,
    createdAt: now,
    updatedAt: now,
    images: [
      { url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800', alt: 'Classic Leather Backpack - Front View', position: 0 },
      { url: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800', alt: 'Classic Leather Backpack - Side View', position: 1 },
      { url: 'https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=800', alt: 'Classic Leather Backpack - Detail', position: 2 },
    ],
    variants: [
      { title: 'Brown', sku: 'CLB-BRN', price: 12900, inventory: 15, options: { color: 'Brown' } },
      { title: 'Black', sku: 'CLB-BLK', price: 12900, inventory: 20, options: { color: 'Black' } },
    ],
    collectionSlugs: ['new-arrivals', 'bestsellers'],
  },
  {
    id: 'prod_minimalist-watch',
    slug: 'minimalist-watch',
    title: 'Minimalist Watch',
    description:
      'Elegant timepiece with Japanese quartz movement. Sapphire crystal glass, stainless steel case, and genuine leather strap. Water resistant up to 50m.',
    price: 8900,
    compareAtPrice: null,
    featured: true,
    createdAt: now,
    updatedAt: now,
    images: [
      { url: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800', alt: 'Minimalist Watch - Front', position: 0 },
      { url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800', alt: 'Minimalist Watch - Side', position: 1 },
    ],
    variants: [
      { title: 'Silver / Black Strap', sku: 'MW-SLV-BLK', price: 8900, inventory: 30, options: { color: 'Silver', strap: 'Black' } },
      { title: 'Gold / Brown Strap', sku: 'MW-GLD-BRN', price: 9900, inventory: 25, options: { color: 'Gold', strap: 'Brown' } },
    ],
    collectionSlugs: ['new-arrivals', 'accessories'],
  },
  {
    id: 'prod_wireless-headphones',
    slug: 'wireless-headphones',
    title: 'Wireless Headphones',
    description:
      'Premium over-ear headphones with active noise cancellation. 30-hour battery life, premium sound quality, and comfortable memory foam cushions.',
    price: 24900,
    compareAtPrice: 29900,
    featured: true,
    createdAt: now,
    updatedAt: now,
    images: [
      { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800', alt: 'Wireless Headphones', position: 0 },
      { url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800', alt: 'Wireless Headphones - Detail', position: 1 },
    ],
    variants: [
      { title: 'Matte Black', sku: 'WH-BLK', price: 24900, inventory: 40, options: { color: 'Matte Black' } },
      { title: 'Silver', sku: 'WH-SLV', price: 24900, inventory: 35, options: { color: 'Silver' } },
    ],
    collectionSlugs: ['bestsellers', 'sale'],
  },
  {
    id: 'prod_canvas-tote-bag',
    slug: 'canvas-tote-bag',
    title: 'Canvas Tote Bag',
    description:
      'Durable organic cotton canvas tote with leather handles. Spacious interior perfect for groceries, books, or daily essentials. Eco-friendly and sustainable.',
    price: 3900,
    compareAtPrice: null,
    featured: false,
    createdAt: now,
    updatedAt: now,
    images: [
      { url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800', alt: 'Canvas Tote Bag', position: 0 },
    ],
    variants: [
      { title: 'Natural', sku: 'CTB-NAT', price: 3900, inventory: 50, options: { color: 'Natural' } },
      { title: 'Navy', sku: 'CTB-NVY', price: 3900, inventory: 45, options: { color: 'Navy' } },
    ],
    collectionSlugs: ['new-arrivals', 'accessories'],
  },
  {
    id: 'prod_ceramic-mug-set',
    slug: 'ceramic-mug-set',
    title: 'Ceramic Mug Set',
    description:
      'Set of 4 handcrafted ceramic mugs. Microwave and dishwasher safe. Each mug holds 350ml and features a unique reactive glaze finish.',
    price: 4900,
    compareAtPrice: null,
    featured: false,
    createdAt: now,
    updatedAt: now,
    images: [
      { url: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800', alt: 'Ceramic Mug Set', position: 0 },
    ],
    variants: [
      { title: 'Set of 4', sku: 'CMS-4', price: 4900, inventory: 25, options: { quantity: '4' } },
    ],
    collectionSlugs: ['new-arrivals'],
  },
  {
    id: 'prod_premium-notebook',
    slug: 'premium-notebook',
    title: 'Premium Notebook',
    description:
      'Hardcover notebook with 192 pages of premium 100gsm paper. Elastic closure, ribbon bookmark, and expandable inner pocket. Perfect for journaling or sketching.',
    price: 2900,
    compareAtPrice: null,
    featured: false,
    createdAt: now,
    updatedAt: now,
    images: [
      { url: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800', alt: 'Premium Notebook', position: 0 },
    ],
    variants: [
      { title: 'Black', sku: 'PN-BLK', price: 2900, inventory: 60, options: { color: 'Black' } },
      { title: 'Navy', sku: 'PN-NVY', price: 2900, inventory: 55, options: { color: 'Navy' } },
      { title: 'Forest Green', sku: 'PN-GRN', price: 2900, inventory: 50, options: { color: 'Forest Green' } },
    ],
    collectionSlugs: ['accessories'],
  },
  {
    id: 'prod_sunglasses-aviator',
    slug: 'sunglasses-aviator',
    title: 'Aviator Sunglasses',
    description:
      'Classic aviator style with polarized lenses. UV400 protection, lightweight metal frame, and adjustable nose pads for maximum comfort.',
    price: 7900,
    compareAtPrice: 9900,
    featured: true,
    createdAt: now,
    updatedAt: now,
    images: [
      { url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800', alt: 'Aviator Sunglasses', position: 0 },
      { url: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800', alt: 'Aviator Sunglasses - Detail', position: 1 },
    ],
    variants: [
      { title: 'Gold / Green Lens', sku: 'SG-GLD-GRN', price: 7900, inventory: 30, options: { frame: 'Gold', lens: 'Green' } },
      { title: 'Silver / Gray Lens', sku: 'SG-SLV-GRY', price: 7900, inventory: 35, options: { frame: 'Silver', lens: 'Gray' } },
    ],
    collectionSlugs: ['bestsellers', 'accessories', 'sale'],
  },
  {
    id: 'prod_wool-scarf',
    slug: 'wool-scarf',
    title: 'Merino Wool Scarf',
    description:
      'Luxuriously soft merino wool scarf. Lightweight yet warm, perfect for layering. Measures 180cm x 30cm.',
    price: 5900,
    compareAtPrice: null,
    featured: false,
    createdAt: now,
    updatedAt: now,
    images: [
      { url: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800', alt: 'Merino Wool Scarf', position: 0 },
    ],
    variants: [
      { title: 'Charcoal', sku: 'WS-CHR', price: 5900, inventory: 40, options: { color: 'Charcoal' } },
      { title: 'Camel', sku: 'WS-CML', price: 5900, inventory: 35, options: { color: 'Camel' } },
      { title: 'Navy', sku: 'WS-NVY', price: 5900, inventory: 30, options: { color: 'Navy' } },
    ],
    collectionSlugs: ['accessories'],
  },
  {
    id: 'prod_stainless-water-bottle',
    slug: 'stainless-water-bottle',
    title: 'Stainless Steel Water Bottle',
    description:
      'Double-walled vacuum insulated bottle keeps drinks cold for 24h or hot for 12h. BPA-free, leak-proof lid. 750ml capacity.',
    price: 3500,
    compareAtPrice: null,
    featured: false,
    createdAt: now,
    updatedAt: now,
    images: [
      { url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800', alt: 'Stainless Steel Water Bottle', position: 0 },
    ],
    variants: [
      { title: 'Matte Black', sku: 'WB-BLK', price: 3500, inventory: 70, options: { color: 'Matte Black' } },
      { title: 'White', sku: 'WB-WHT', price: 3500, inventory: 65, options: { color: 'White' } },
      { title: 'Mint', sku: 'WB-MNT', price: 3500, inventory: 60, options: { color: 'Mint' } },
    ],
    collectionSlugs: ['new-arrivals'],
  },
  {
    id: 'prod_leather-wallet',
    slug: 'leather-wallet',
    title: 'Leather Bifold Wallet',
    description:
      'Slim bifold wallet crafted from vegetable-tanned leather. 6 card slots, 2 bill compartments, and RFID blocking technology.',
    price: 6900,
    compareAtPrice: 8900,
    featured: true,
    createdAt: now,
    updatedAt: now,
    images: [
      { url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800', alt: 'Leather Bifold Wallet', position: 0 },
      { url: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800', alt: 'Leather Bifold Wallet - Open', position: 1 },
    ],
    variants: [
      { title: 'Cognac', sku: 'LW-COG', price: 6900, inventory: 45, options: { color: 'Cognac' } },
      { title: 'Black', sku: 'LW-BLK', price: 6900, inventory: 50, options: { color: 'Black' } },
    ],
    collectionSlugs: ['bestsellers', 'accessories', 'sale'],
  },
  {
    id: 'prod_wireless-earbuds',
    slug: 'wireless-earbuds',
    title: 'True Wireless Earbuds',
    description:
      'Compact true wireless earbuds with active noise cancellation, IPX4 water resistance, and 28-hour total battery life with the charging case. Touch controls and low-latency mode for gaming.',
    price: 14900,
    compareAtPrice: 17900,
    featured: true,
    createdAt: now,
    updatedAt: now,
    images: [
      { url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800', alt: 'True Wireless Earbuds', position: 0 },
      { url: 'https://images.unsplash.com/photo-1590658006821-27f6b1eae4e6?w=800', alt: 'True Wireless Earbuds - Case', position: 1 },
    ],
    variants: [
      { title: 'Black', sku: 'TWE-BLK', price: 14900, inventory: 40, options: { color: 'Black' } },
      { title: 'White', sku: 'TWE-WHT', price: 14900, inventory: 35, options: { color: 'White' } },
    ],
    collectionSlugs: ['new-arrivals', 'bestsellers'],
  },
  {
    id: 'prod_wool-beanie',
    slug: 'wool-beanie',
    title: 'Ribbed Wool Beanie',
    description:
      'Soft ribbed-knit beanie made from responsibly sourced merino wool. Stretchy fit, fleece-lined headband for extra warmth without the itch.',
    price: 3200,
    compareAtPrice: null,
    featured: false,
    createdAt: now,
    updatedAt: now,
    images: [
      { url: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800', alt: 'Ribbed Wool Beanie', position: 0 },
    ],
    variants: [
      { title: 'Charcoal', sku: 'RWB-CHR', price: 3200, inventory: 50, options: { color: 'Charcoal' } },
      { title: 'Camel', sku: 'RWB-CML', price: 3200, inventory: 45, options: { color: 'Camel' } },
      { title: 'Burgundy', sku: 'RWB-BUR', price: 3200, inventory: 40, options: { color: 'Burgundy' } },
    ],
    collectionSlugs: ['accessories'],
  },
  {
    id: 'prod_leather-belt',
    slug: 'leather-belt',
    title: 'Full-Grain Leather Belt',
    description:
      'Classic full-grain leather belt with a solid brass buckle. Hand-cut and burnished edges for a refined finish that ages beautifully over time.',
    price: 4500,
    compareAtPrice: 5900,
    featured: false,
    createdAt: now,
    updatedAt: now,
    images: [
      { url: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800', alt: 'Full-Grain Leather Belt', position: 0 },
    ],
    variants: [
      { title: 'Brown / 32"', sku: 'LB-BRN-32', price: 4500, inventory: 25, options: { color: 'Brown', size: '32"' } },
      { title: 'Brown / 34"', sku: 'LB-BRN-34', price: 4500, inventory: 25, options: { color: 'Brown', size: '34"' } },
      { title: 'Black / 32"', sku: 'LB-BLK-32', price: 4500, inventory: 25, options: { color: 'Black', size: '32"' } },
      { title: 'Black / 34"', sku: 'LB-BLK-34', price: 4500, inventory: 25, options: { color: 'Black', size: '34"' } },
    ],
    collectionSlugs: ['bestsellers', 'accessories', 'sale'],
  },
]

export const productsData: ProductWithRelations[] = rawProducts.map(
  (rawProduct) => {
    const { images, variants, collectionSlugs, ...productInfo } = rawProduct

    return {
      ...productInfo,
      images: images.map((image, index) => ({
        ...image,
        id: `${productInfo.id}_img_${index}`,
        productId: productInfo.id,
      })),
      variants: variants.map((variant) => ({
        ...variant,
        id: `${productInfo.id}_var_${variant.sku}`,
        productId: productInfo.id,
      })),
      collections: collectionSlugs
        .map((slug) => collectionsData.find((c) => c.slug === slug))
        .filter((c): c is Collection => c !== undefined),
    }
  }
)
