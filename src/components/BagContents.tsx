'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { money, products } from '@/data'

type BagItem = { slug: string; size: string; key: string }
export default function BagContents() {
  const [items, setItems] = useState<BagItem[]>([])
  useEffect(() => { try { setItems(JSON.parse(localStorage.getItem('little-penguin-bag') || '[]')) } catch { setItems([]) } }, [])
  function save(next: BagItem[]) { setItems(next); localStorage.setItem('little-penguin-bag', JSON.stringify(next)); window.dispatchEvent(new Event('bag-updated')) }
  function change(slug: string, size: string, amount: number) { if (amount > 0) save([...items, { slug, size, key: `${Date.now()}-${Math.random()}` }]); else { const index = items.findIndex(item => item.slug === slug && item.size === size); if (index >= 0) save(items.filter((_, i) => i !== index)) } }
  function remove(slug: string, size: string) { save(items.filter(item => item.slug !== slug || item.size !== size)) }
  const groups = useMemo(() => { const grouped = new Map<string, { slug: string; size: string; quantity: number }>(); for (const item of items) { const key = `${item.slug}|${item.size}`; const current = grouped.get(key); grouped.set(key, { slug: item.slug, size: item.size, quantity: (current?.quantity || 0) + 1 }) } return [...grouped.values()] }, [items])
  const total = items.reduce((sum, item) => sum + (products.find(p => p.slug === item.slug)?.price || 0), 0)
  return items.length ? <div className="bag-layout"><div className="bag-items">{groups.map(group => { const product = products.find(p => p.slug === group.slug); if (!product) return null; return <div className="bag-item" key={`${group.slug}-${group.size}`}><Link href={`/product/${product.slug}`} className="bag-photo"><img src={product.image} alt={product.name}/></Link><div><p className="eyebrow">{product.categoryLabel}</p><h2><Link href={`/product/${product.slug}`}>{product.name}</Link></h2><p>Size: {group.size}</p><div className="bag-item-actions"><div className="quantity-control" aria-label={`Quantity for ${product.name}`}><button type="button" onClick={() => change(group.slug, group.size, -1)} aria-label="Decrease quantity">−</button><span>{group.quantity}</span><button type="button" onClick={() => change(group.slug, group.size, 1)} aria-label="Increase quantity">+</button></div><button className="remove-item" onClick={() => remove(group.slug, group.size)}>Remove</button></div></div><strong>{money(product.price * group.quantity)}</strong></div> })}</div><aside className="bag-summary"><p className="eyebrow">Your selection</p><h2>Order summary</h2><div><span>Items ({items.length})</span><strong>{money(total)}</strong></div><p>Shipping and checkout will be available when the store is connected to an ordering service.</p><Link href="/shop" className="button">Continue shopping</Link></aside></div> : <div className="empty-bag"><h2>Your bag is empty.</h2><p>Find something lovely for a little adventurer.</p><Link href="/shop" className="button">Shop the collection</Link></div>
}
