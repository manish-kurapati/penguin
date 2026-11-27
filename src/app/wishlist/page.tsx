import type { Metadata } from 'next'
import WishlistContents from '@/components/WishlistContents'

export const metadata: Metadata = { title: 'Wishlist' }
export default function Wishlist() { return <main className="interior-page"><div className="page-heading section-shell"><p className="eyebrow">Saved for later</p><h1>Your wishlist</h1></div><div className="section-shell wishlist-page"><WishlistContents/></div></main> }
