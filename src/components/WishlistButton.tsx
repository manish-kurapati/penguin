'use client'

import { useEffect, useState } from 'react'
import { showToast } from './ToastHost'

export function readWishlist(): string[] { try { return JSON.parse(localStorage.getItem('little-penguin-wishlist') || '[]') } catch { return [] } }

export default function WishlistButton({ slug, className = '' }: { slug: string; className?: string }) {
  const [saved, setSaved] = useState(false)
  useEffect(() => { const update = () => setSaved(readWishlist().includes(slug)); update(); window.addEventListener('wishlist-updated', update); return () => window.removeEventListener('wishlist-updated', update) }, [slug])
  function toggle() { const current = readWishlist(); const removing = current.includes(slug); const next = removing ? current.filter(item => item !== slug) : [...current, slug]; localStorage.setItem('little-penguin-wishlist', JSON.stringify(next)); window.dispatchEvent(new Event('wishlist-updated')); showToast(removing ? 'Removed from wishlist' : 'Added to wishlist') }
  return <button type="button" className={`wishlist-button ${saved ? 'is-saved' : ''} ${className}`} onClick={toggle} aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'} aria-pressed={saved}><svg viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} aria-hidden="true"><path d="M20.5 8.5c0 4.2-8.5 10.5-8.5 10.5S3.5 12.7 3.5 8.5a4.5 4.5 0 0 1 8.5-2 4.5 4.5 0 0 1 8.5 2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></svg></button>
}
