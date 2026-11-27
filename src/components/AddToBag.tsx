'use client'

import { useState } from 'react'
import type { Product } from '@/data'
import { addBagItem } from './bagStorage'
import { showToast } from './ToastHost'

export default function AddToBag({ product }: { product: Product }) {
  const [size, setSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [error, setError] = useState(false)
  function add() { if (!size) { setError(true); return } try { addBagItem(product.slug, size, quantity); setAdded(true); showToast(`${product.name} added to bag`); setTimeout(() => setAdded(false), 2500) } catch { setError(true) } }
  return <div className="purchase-controls"><p className="size-label">Choose a size</p><div className="size-options">{product.sizes.map(s => <button type="button" className={size === s ? 'chosen' : ''} key={s} onClick={() => { setSize(s); setError(false) }}>{s}</button>)}</div>{error && <p className="form-error">Please choose a size first.</p>}<div className="purchase-row"><div className="quantity-control" aria-label="Quantity"><button type="button" onClick={() => setQuantity(Math.max(1,quantity-1))} aria-label="Decrease quantity">−</button><span>{quantity}</span><button type="button" onClick={() => setQuantity(Math.min(10,quantity+1))} aria-label="Increase quantity">+</button></div><button className="button add-button" onClick={add}>{added ? 'Added to bag' : 'Add to bag'}</button></div></div>
}
