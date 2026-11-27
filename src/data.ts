export type Product = {
  slug: string
  name: string
  category: 'tshirts' | 'shirts' | 'sweaters' | 'shorts' | 'pants' | 'dresses'
  categoryLabel: string
  price: number
  image: string
  color: string
  sizes: string[]
  description: string
}

export const categories = [
  { slug: 'tshirts', name: 'T-shirts', subtitle: 'Easy favorites for every day', image: '/images/category-tshirts.webp' },
  { slug: 'shirts', name: 'Shirts', subtitle: 'Ready for any occasion', image: '/images/category-shirts.webp' },
  { slug: 'sweaters', name: 'Sweaters', subtitle: 'A little extra cozy', image: '/images/category-sweaters.webp' },
  { slug: 'shorts', name: 'Shorts', subtitle: 'For days on the move', image: '/images/category-shorts.webp' },
  { slug: 'pants', name: 'Pants', subtitle: 'Comfort for every step', image: '/images/category-pants.webp' },
  { slug: 'dresses', name: 'Girls’ dresses', subtitle: 'Made for all the twirls', image: '/images/category-dresses.webp' }
] as const

export const products: Product[] = [
  { slug: 'sunshine-cotton-tee', name: 'Sunshine Cotton Tee', category: 'tshirts', categoryLabel: 'T-shirts', price: 24, image: '/images/tee-sunshine.webp', color: 'Soft gold', sizes: ['1–2Y','2–3Y','3–4Y','4–5Y','5–6Y'], description: 'A sunny little everyday tee in a soft cotton feel, made for playtime and everything after.' },
  { slug: 'cloud-cotton-tee', name: 'Cloud Cotton Tee', category: 'tshirts', categoryLabel: 'T-shirts', price: 24, image: '/images/tee-cloud.webp', color: 'Warm ivory', sizes: ['1–2Y','2–3Y','3–4Y','4–5Y','5–6Y'], description: 'An easy ivory tee with a hint of gold, ready to pair with all their favorite things.' },
  { slug: 'everyday-ivory-shirt', name: 'Everyday Ivory Shirt', category: 'shirts', categoryLabel: 'Shirts', price: 32, image: '/images/shirt-ivory.webp', color: 'Warm ivory', sizes: ['1–2Y','2–3Y','3–4Y','4–5Y','5–6Y'], description: 'A soft button-up shirt for dressed-up days and everything in between.' },
  { slug: 'oatmeal-knit-sweater', name: 'Oatmeal Knit Sweater', category: 'sweaters', categoryLabel: 'Sweaters', price: 39, image: '/images/sweater-oat.webp', color: 'Oatmeal', sizes: ['1–2Y','2–3Y','3–4Y','4–5Y','5–6Y'], description: 'The coziest kind of layer, with a soft textured knit and plenty of room to move.' },
  { slug: 'honey-knit-sweater', name: 'Honey Knit Sweater', category: 'sweaters', categoryLabel: 'Sweaters', price: 39, image: '/images/sweater-honey.webp', color: 'Honey gold', sizes: ['1–2Y','2–3Y','3–4Y','4–5Y','5–6Y'], description: 'A warm golden layer for cooler days, cozy moments, and big discoveries.' },
  { slug: 'golden-play-shorts', name: 'Golden Play Shorts', category: 'shorts', categoryLabel: 'Shorts', price: 26, image: '/images/shorts-gold.webp', color: 'Light gold', sizes: ['1–2Y','2–3Y','3–4Y','4–5Y','5–6Y'], description: 'Easy pull-on shorts with room to run, climb, and play.' },
  { slug: 'oatmeal-everyday-pants', name: 'Oatmeal Everyday Pants', category: 'pants', categoryLabel: 'Pants', price: 32, image: '/images/pants-oat.webp', color: 'Oatmeal', sizes: ['1–2Y','2–3Y','3–4Y','4–5Y','5–6Y'], description: 'A comfortable relaxed fit for little legs that never stop moving.' },
  { slug: 'sunbeam-twirl-dress', name: 'Sunbeam Twirl Dress', category: 'dresses', categoryLabel: 'Dresses', price: 45, image: '/images/dress-sunbeam.webp', color: 'Sunbeam gold', sizes: ['1–2Y','2–3Y','3–4Y','4–5Y','5–6Y'], description: 'A playful puff-sleeve dress with a swishy skirt made for spinning into the day.' },
  { slug: 'ivory-day-dress', name: 'Ivory Day Dress', category: 'dresses', categoryLabel: 'Dresses', price: 45, image: '/images/dress-ivory.webp', color: 'Warm ivory', sizes: ['1–2Y','2–3Y','3–4Y','4–5Y','5–6Y'], description: 'A beautifully simple little dress for everyday celebrations and quiet moments alike.' }
]

export const money = (amount: number) => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(amount)
