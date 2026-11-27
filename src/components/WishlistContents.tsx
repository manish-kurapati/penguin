'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import ProductCard from './ProductCard'
import { products, type Product } from '@/data'
import { readWishlist } from './WishlistButton'
import { addBagItem } from './bagStorage'
import { showToast } from './ToastHost'

function WishlistProduct({ product }: { product: Product }) {
  const [size, setSize] = useState('')
  const [error, setError] = useState(false)

  function add() {
    if (!size) { setError(true); return }
    try {
      addBagItem(product.slug, size)
      showToast(`${product.name} added to bag`)
      setError(false)
    } catch {
      setError(true)
    }
  }

  return <div className="wishlist-product">
    <ProductCard product={product}/>
    <div className="wishlist-purchase">
      <label>
        <span className="sr-only">Size for {product.name}</span>
        <select value={size} onChange={event => { setSize(event.target.value); setError(false) }} aria-invalid={error}>
          <option value="">Choose size</option>
          {product.sizes.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
      </label>
      <button type="button" className="button wishlist-add-button" onClick={add}>Add to bag</button>
    </div>
    {error && <p className="form-error">Please choose a size first.</p>}
  </div>
}

export default function WishlistContents() {
  const [saved, setSaved] = useState<string[]>([])
  useEffect(() => {
    const update = () => setSaved(readWishlist())
    update()
    window.addEventListener('wishlist-updated', update)
    return () => window.removeEventListener('wishlist-updated', update)
  }, [])
  const items = products.filter(product => saved.includes(product.slug))
  return items.length ? <div className="product-grid wishlist-grid">{items.map(product => <WishlistProduct key={product.slug} product={product}/>)}</div> : <div className="empty-bag"><h2>Your wishlist is empty.</h2><p>Save the pieces you love and find them here.</p><Link href="/shop" className="button">Browse the collection</Link></div>
}
