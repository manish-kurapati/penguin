import type { Metadata } from 'next'
import ShopCatalog from '@/components/ShopCatalog'

export const metadata: Metadata = { title: 'Shop all' }
export default function Shop() { return <main className="interior-page shop-page"><div className="page-heading section-shell"><p className="eyebrow">A wardrobe full of wonder</p><h1>Little things, <em>big joy.</em></h1><p>Find their next favorite in the world of Little Penguin.</p></div><div className="section-shell shop-content"><ShopCatalog/></div></main> }
