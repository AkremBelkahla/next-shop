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
      { url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800', alt: 'Canvas Tote Bag - Front View', position: 0 },
      { url: 'https://images.unsplash.com/photo-1574365569389-a10d488ca3fb?w=800', alt: 'Canvas Tote Bag - Folded', position: 1 },
      { url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800', alt: 'Canvas Tote Bag - Detail', position: 2 },
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
      { url: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800', alt: 'Ceramic Mug Set - Full Set', position: 0 },
      { url: 'https://images.unsplash.com/photo-1542556398-95fb5b9f9b48?w=800', alt: 'Ceramic Mug Set - Pair', position: 1 },
      { url: 'https://images.unsplash.com/photo-1687158179173-b9f3eac1fde9?w=800', alt: 'Ceramic Mug Set - On Table', position: 2 },
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
      { url: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800', alt: 'Premium Notebook - Cover', position: 0 },
      { url: 'https://images.unsplash.com/photo-1581431886211-6b932f8367f2?w=800', alt: 'Premium Notebook - On Desk', position: 1 },
      { url: 'https://images.unsplash.com/photo-1554757387-fa0367573d09?w=800', alt: 'Premium Notebook - Open Pages', position: 2 },
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
      { url: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800', alt: 'Merino Wool Scarf - Full View', position: 0 },
      { url: 'https://images.unsplash.com/photo-1491245257527-395e9c480145?w=800', alt: 'Merino Wool Scarf - Folded', position: 1 },
      { url: 'https://images.unsplash.com/photo-1601379327700-05347ab58e57?w=800', alt: 'Merino Wool Scarf - Detail', position: 2 },
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
      { url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800', alt: 'Stainless Steel Water Bottle - Front View', position: 0 },
      { url: 'https://images.unsplash.com/photo-1544003484-3cd181d17917?w=800', alt: 'Stainless Steel Water Bottle - Black', position: 1 },
      { url: 'https://images.unsplash.com/photo-1605714312496-01e90cb509cc?w=800', alt: 'Stainless Steel Water Bottle - White', position: 2 },
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
      { url: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800', alt: 'Ribbed Wool Beanie - Front View', position: 0 },
      { url: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800', alt: 'Ribbed Wool Beanie - Colors', position: 1 },
      { url: 'https://images.unsplash.com/photo-1612887726773-e64e20cf08fe?w=800', alt: 'Ribbed Wool Beanie - Detail', position: 2 },
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
      { url: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800', alt: 'Full-Grain Leather Belt - Front View', position: 0 },
      { url: 'https://images.unsplash.com/photo-1711443982852-b3df5c563448?w=800', alt: 'Full-Grain Leather Belt - Flat Lay', position: 1 },
      { url: 'https://images.unsplash.com/photo-1637868796504-32f45a96d5a0?w=800', alt: 'Full-Grain Leather Belt - Styled', position: 2 },
    ],
    variants: [
      { title: 'Brown / 32"', sku: 'LB-BRN-32', price: 4500, inventory: 25, options: { color: 'Brown', size: '32"' } },
      { title: 'Brown / 34"', sku: 'LB-BRN-34', price: 4500, inventory: 25, options: { color: 'Brown', size: '34"' } },
      { title: 'Black / 32"', sku: 'LB-BLK-32', price: 4500, inventory: 25, options: { color: 'Black', size: '32"' } },
      { title: 'Black / 34"', sku: 'LB-BLK-34', price: 4500, inventory: 25, options: { color: 'Black', size: '34"' } },
    ],
    collectionSlugs: ['bestsellers', 'accessories', 'sale'],
  },
  {
    id: 'prod_leather-crossbody-bag',
    slug: 'leather-crossbody-bag',
    title: 'Leather Crossbody Bag',
    description:
      'Compact crossbody bag in soft full-grain leather with an adjustable strap and magnetic flap closure. Fits daily essentials without the bulk, with an interior zip pocket for cards and keys.',
    price: 9900,
    compareAtPrice: 12900,
    featured: true,
    createdAt: now,
    updatedAt: now,
    images: [
      { url: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=800', alt: 'Leather Crossbody Bag - Front View', position: 0 },
      { url: 'https://images.unsplash.com/photo-1605733513597-a8f8341084e6?w=800', alt: 'Leather Crossbody Bag - Detail', position: 1 },
      { url: 'https://images.unsplash.com/photo-1473188588951-666fce8e7c68?w=800', alt: 'Leather Crossbody Bag - Lifestyle', position: 2 },
    ],
    variants: [
      { title: 'Brown', sku: 'CCB-BRN', price: 9900, inventory: 30, options: { color: 'Brown' } },
      { title: 'Black', sku: 'CCB-BLK', price: 9900, inventory: 28, options: { color: 'Black' } },
    ],
    collectionSlugs: ['new-arrivals', 'sale'],
  },
  {
    id: 'prod_wool-peacoat',
    slug: 'wool-peacoat',
    title: 'Wool Peacoat',
    description:
      'Tailored double-breasted peacoat in a heavyweight wool blend. Structured shoulders, notch lapels, and a full satin lining keep it sharp from office to evening.',
    price: 24900,
    compareAtPrice: null,
    featured: false,
    createdAt: now,
    updatedAt: now,
    images: [
      { url: 'https://images.unsplash.com/photo-1608635680046-aebf91c1a9c8?w=800', alt: 'Wool Peacoat - Front View', position: 0 },
      { url: 'https://images.unsplash.com/photo-1737508945707-ebdccee97cc5?w=800', alt: 'Wool Peacoat - Styled', position: 1 },
      { url: 'https://images.unsplash.com/photo-1606453860825-29443dab3893?w=800', alt: 'Wool Peacoat - Detail', position: 2 },
    ],
    variants: [
      { title: 'Camel / S', sku: 'WP-CML-S', price: 24900, inventory: 12, options: { color: 'Camel', size: 'S' } },
      { title: 'Camel / M', sku: 'WP-CML-M', price: 24900, inventory: 15, options: { color: 'Camel', size: 'M' } },
      { title: 'Charcoal / M', sku: 'WP-CHR-M', price: 24900, inventory: 15, options: { color: 'Charcoal', size: 'M' } },
      { title: 'Charcoal / L', sku: 'WP-CHR-L', price: 24900, inventory: 10, options: { color: 'Charcoal', size: 'L' } },
    ],
    collectionSlugs: ['bestsellers', 'new-arrivals'],
  },
  {
    id: 'prod_canvas-sneakers',
    slug: 'canvas-sneakers',
    title: 'Canvas Low-Top Sneakers',
    description:
      'Everyday low-top sneakers in durable cotton canvas with a cushioned insole and rubber sole. A wardrobe staple that pairs with everything from denim to tailored trousers.',
    price: 7900,
    compareAtPrice: 9900,
    featured: false,
    createdAt: now,
    updatedAt: now,
    images: [
      { url: 'https://images.unsplash.com/photo-1562105962-2fbaaf107fe3?w=800', alt: 'Canvas Low-Top Sneakers - Front View', position: 0 },
      { url: 'https://images.unsplash.com/photo-1676379760823-ebf91f45de0b?w=800', alt: 'Canvas Low-Top Sneakers - Pair', position: 1 },
      { url: 'https://images.unsplash.com/photo-1496202703211-aa28e9500c30?w=800', alt: 'Canvas Low-Top Sneakers - Detail', position: 2 },
    ],
    variants: [
      { title: 'White / 40', sku: 'CS-WHT-40', price: 7900, inventory: 20, options: { color: 'White', size: '40' } },
      { title: 'White / 42', sku: 'CS-WHT-42', price: 7900, inventory: 22, options: { color: 'White', size: '42' } },
      { title: 'Black / 40', sku: 'CS-BLK-40', price: 7900, inventory: 18, options: { color: 'Black', size: '40' } },
      { title: 'Black / 42', sku: 'CS-BLK-42', price: 7900, inventory: 20, options: { color: 'Black', size: '42' } },
    ],
    collectionSlugs: ['bestsellers', 'sale'],
  },
  {
    id: 'prod_silk-pocket-square',
    slug: 'silk-pocket-square',
    title: 'Silk Pocket Square',
    description:
      'Hand-rolled-edge pocket square in 100% mulberry silk. A finishing touch for a blazer or suit jacket, sized generously at 33cm x 33cm for classic folds.',
    price: 2900,
    compareAtPrice: 3900,
    featured: false,
    createdAt: now,
    updatedAt: now,
    images: [
      { url: 'https://images.unsplash.com/photo-1776127839720-c0ab710d9d37?w=800', alt: 'Silk Pocket Square - Folded', position: 0 },
      { url: 'https://images.unsplash.com/photo-1777795530497-205664bbd965?w=800', alt: 'Silk Pocket Square - Styled', position: 1 },
      { url: 'https://images.unsplash.com/photo-1606603050383-42d5c4e72031?w=800', alt: 'Silk Pocket Square - Detail', position: 2 },
    ],
    variants: [
      { title: 'Navy Paisley', sku: 'SPS-NVY', price: 2900, inventory: 40, options: { pattern: 'Navy Paisley' } },
      { title: 'Burgundy Print', sku: 'SPS-BUR', price: 2900, inventory: 35, options: { pattern: 'Burgundy Print' } },
    ],
    collectionSlugs: ['accessories', 'sale'],
  },
  {
    id: 'prod_leather-card-holder',
    slug: 'leather-card-holder',
    title: 'Leather Card Holder',
    description:
      'Slim card holder in vegetable-tanned leather with 4 card slots and a central pull-tab pocket. Cuts the bulk of a full wallet for a minimalist everyday carry.',
    price: 3900,
    compareAtPrice: 4900,
    featured: false,
    createdAt: now,
    updatedAt: now,
    images: [
      { url: 'https://images.unsplash.com/photo-1628483211662-9bcc692c46dc?w=800', alt: 'Leather Card Holder - Front View', position: 0 },
      { url: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=800', alt: 'Leather Card Holder - Detail', position: 1 },
      { url: 'https://images.unsplash.com/photo-1601592996763-f05c9c80a7f1?w=800', alt: 'Leather Card Holder - Black', position: 2 },
    ],
    variants: [
      { title: 'Cognac', sku: 'LCH-COG', price: 3900, inventory: 45, options: { color: 'Cognac' } },
      { title: 'Black', sku: 'LCH-BLK', price: 3900, inventory: 40, options: { color: 'Black' } },
    ],
    collectionSlugs: ['accessories', 'sale'],
  },
  {
    id: 'prod_denim-trucker-jacket',
    slug: 'denim-trucker-jacket',
    title: 'Denim Trucker Jacket',
    description:
      'Classic trucker jacket in rigid cotton denim, garment-washed for a broken-in feel. Button-front closure, chest flap pockets, and a timeless boxy fit.',
    price: 11900,
    compareAtPrice: null,
    featured: false,
    createdAt: now,
    updatedAt: now,
    images: [
      { url: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=800', alt: 'Denim Trucker Jacket - Front View', position: 0 },
      { url: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=800', alt: 'Denim Trucker Jacket - Detail', position: 1 },
      { url: 'https://images.unsplash.com/photo-1537465978529-d23b17165b3b?w=800', alt: 'Denim Trucker Jacket - Styled', position: 2 },
    ],
    variants: [
      { title: 'Light Wash / M', sku: 'DTJ-LW-M', price: 11900, inventory: 18, options: { color: 'Light Wash', size: 'M' } },
      { title: 'Light Wash / L', sku: 'DTJ-LW-L', price: 11900, inventory: 16, options: { color: 'Light Wash', size: 'L' } },
      { title: 'Dark Wash / M', sku: 'DTJ-DW-M', price: 11900, inventory: 18, options: { color: 'Dark Wash', size: 'M' } },
      { title: 'Dark Wash / L', sku: 'DTJ-DW-L', price: 11900, inventory: 16, options: { color: 'Dark Wash', size: 'L' } },
    ],
    collectionSlugs: ['bestsellers', 'new-arrivals'],
  },
  {
    id: 'prod_cashmere-sweater',
    slug: 'cashmere-sweater',
    title: 'Cashmere Knit Sweater',
    description:
      'Crew-neck sweater in pure two-ply cashmere, knitted for warmth without the weight. A soft, breathable layer that holds its shape wash after wash.',
    price: 15900,
    compareAtPrice: 19900,
    featured: true,
    createdAt: now,
    updatedAt: now,
    images: [
      { url: 'https://images.unsplash.com/photo-1631541909061-71e349d1f203?w=800', alt: 'Cashmere Knit Sweater - Front View', position: 0 },
      { url: 'https://images.unsplash.com/photo-1604573824419-289a9a10672c?w=800', alt: 'Cashmere Knit Sweater - Styled', position: 1 },
      { url: 'https://images.unsplash.com/photo-1636146049394-0924c2b66104?w=800', alt: 'Cashmere Knit Sweater - Detail', position: 2 },
    ],
    variants: [
      { title: 'Oatmeal', sku: 'CSW-OAT', price: 15900, inventory: 25, options: { color: 'Oatmeal' } },
      { title: 'Charcoal', sku: 'CSW-CHR', price: 15900, inventory: 22, options: { color: 'Charcoal' } },
      { title: 'Navy', sku: 'CSW-NVY', price: 15900, inventory: 20, options: { color: 'Navy' } },
    ],
    collectionSlugs: ['new-arrivals', 'sale'],
  },
  {
    id: 'prod_leather-driving-gloves',
    slug: 'leather-driving-gloves',
    title: 'Leather Driving Gloves',
    description:
      'Supple lambskin driving gloves with a knuckle vent and snap-strap wrist closure. Unlined palm for grip and feel, finished with contrast stitching.',
    price: 5900,
    compareAtPrice: 7500,
    featured: false,
    createdAt: now,
    updatedAt: now,
    images: [
      { url: 'https://images.unsplash.com/photo-1643650374762-196c86358df3?w=800', alt: 'Leather Driving Gloves - Styled', position: 0 },
      { url: 'https://images.unsplash.com/photo-1617118602199-d3c05ae37ed8?w=800', alt: 'Leather Driving Gloves - Detail', position: 1 },
      { url: 'https://images.unsplash.com/photo-1549396555-3d107fd70c85?w=800', alt: 'Leather Driving Gloves - Colors', position: 2 },
    ],
    variants: [
      { title: 'Brown / M', sku: 'LDG-BRN-M', price: 5900, inventory: 30, options: { color: 'Brown', size: 'M' } },
      { title: 'Brown / L', sku: 'LDG-BRN-L', price: 5900, inventory: 28, options: { color: 'Brown', size: 'L' } },
      { title: 'Black / M', sku: 'LDG-BLK-M', price: 5900, inventory: 30, options: { color: 'Black', size: 'M' } },
      { title: 'Black / L', sku: 'LDG-BLK-L', price: 5900, inventory: 28, options: { color: 'Black', size: 'L' } },
    ],
    collectionSlugs: ['accessories', 'sale'],
  },
  {
    id: 'prod_knit-throw-blanket',
    slug: 'knit-throw-blanket',
    title: 'Chunky Knit Throw Blanket',
    description:
      'Oversized throw in a chunky cable knit, woven from a soft acrylic-wool blend. Adds texture and warmth to a sofa or bed, measuring 130cm x 170cm.',
    price: 6500,
    compareAtPrice: 8500,
    featured: false,
    createdAt: now,
    updatedAt: now,
    images: [
      { url: 'https://images.unsplash.com/photo-1674475760738-8c7af859f821?w=800', alt: 'Chunky Knit Throw Blanket - Lifestyle', position: 0 },
      { url: 'https://images.unsplash.com/photo-1600369672770-985fd30004eb?w=800', alt: 'Chunky Knit Throw Blanket - Detail', position: 1 },
      { url: 'https://images.unsplash.com/photo-1600369672890-ac00f1907858?w=800', alt: 'Chunky Knit Throw Blanket - Color', position: 2 },
    ],
    variants: [
      { title: 'Ivory', sku: 'KTB-IVR', price: 6500, inventory: 24, options: { color: 'Ivory' } },
      { title: 'Sage', sku: 'KTB-SGE', price: 6500, inventory: 20, options: { color: 'Sage' } },
      { title: 'Charcoal', sku: 'KTB-CHR', price: 6500, inventory: 22, options: { color: 'Charcoal' } },
    ],
    collectionSlugs: ['sale'],
  },
  {
    id: 'prod_structured-tote-bag',
    slug: 'structured-tote-bag',
    title: 'Structured Tote Bag',
    description:
      'Work-ready tote in structured vegan leather with a reinforced base and magnetic top closure. Fits a 15" laptop, with an interior organizer pocket.',
    price: 8900,
    compareAtPrice: null,
    featured: true,
    createdAt: now,
    updatedAt: now,
    images: [
      { url: 'https://images.unsplash.com/photo-1614179689702-355944cd0918?w=800', alt: 'Structured Tote Bag - Front View', position: 0 },
      { url: 'https://images.unsplash.com/photo-1572196284554-4e321b0e7e0b?w=800', alt: 'Structured Tote Bag - Detail', position: 1 },
      { url: 'https://images.unsplash.com/photo-1654707636750-ab67a11b21b7?w=800', alt: 'Structured Tote Bag - Lifestyle', position: 2 },
    ],
    variants: [
      { title: 'Black', sku: 'STB-BLK', price: 8900, inventory: 35, options: { color: 'Black' } },
      { title: 'Tan', sku: 'STB-TAN', price: 8900, inventory: 30, options: { color: 'Tan' } },
    ],
    collectionSlugs: ['bestsellers', 'accessories'],
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
