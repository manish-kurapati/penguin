'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import ProductCard from './ProductCard'
import { categories, products, money } from '@/data'
import { readWishlist } from './WishlistButton'

export default function ShopCatalog({ initialCategory = 'all' }: { initialCategory?: string }) {
  const [category, setCategory] = useState(initialCategory)
  const effectiveCategory = initialCategory === 'all' ? category : initialCategory
  const [query, setQuery] = useState('')
  const [size, setSize] = useState('all')
  const [maxPrice, setMaxPrice] = useState(50)
  const [sort, setSort] = useState('featured')
  const [favorites, setFavorites] = useState(false)
  const [saved, setSaved] = useState<string[]>([])
  const [filterOpen, setFilterOpen] = useState(false)
  useEffect(() => setCategory(initialCategory), [initialCategory])
  useEffect(() => { const update = () => setSaved(readWishlist()); update(); window.addEventListener('wishlist-updated', update); return () => window.removeEventListener('wishlist-updated', update) }, [])
  const shown = useMemo(() => { const result = products.filter(product => (effectiveCategory === 'all' || product.category === effectiveCategory) && product.name.toLowerCase().includes(query.trim().toLowerCase()) && (size === 'all' || product.sizes.includes(size)) && product.price <= maxPrice && (!favorites || saved.includes(product.slug))); if (sort === 'price-low') result.sort((a,b) => a.price-b.price); if (sort === 'price-high') result.sort((a,b) => b.price-a.price); if (sort === 'name') result.sort((a,b) => a.name.localeCompare(b.name)); return result }, [effectiveCategory, query, size, maxPrice, sort, favorites, saved])
  function clear() { setCategory('all'); setQuery(''); setSize('all'); setMaxPrice(50); setFavorites(false); setSort('featured') }
  return <div className="catalog-layout"><aside className={`catalog-filters ${filterOpen ? 'filters-open' : ''}`} aria-label="Product filters"><div className="filter-title"><h2>Filter by</h2><button type="button" onClick={clear}>Clear all</button></div>{initialCategory === 'all' && <fieldset><legend>Category</legend><label><input type="radio" checked={category === 'all'} onChange={() => setCategory('all')}/> All pieces</label>{categories.map(c => <label key={c.slug}><input type="radio" checked={category === c.slug} onChange={() => setCategory(c.slug)}/> {c.name}</label>)}</fieldset>}<fieldset><legend>Size</legend><select aria-label="Filter by size" value={size} onChange={e => setSize(e.target.value)}><option value="all">All sizes</option>{['1–2Y','2–3Y','3–4Y','4–5Y','5–6Y'].map(s => <option key={s}>{s}</option>)}</select></fieldset><fieldset><legend>Price up to {money(maxPrice)} (AUD)</legend><input type="range" min="20" max="50" step="5" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))}/><div className="price-ends"><span>{money(20)}</span><span>{money(50)}</span></div></fieldset><fieldset><label className="favorite-filter"><input type="checkbox" checked={favorites} onChange={e => setFavorites(e.target.checked)}/> Wishlist only</label></fieldset></aside><div className="catalog-main"><div className="catalog-toolbar"><button className="mobile-filter-button" type="button" onClick={() => setFilterOpen(!filterOpen)}>{filterOpen ? 'Hide filters' : 'Show filters'}</button><label className="catalog-search"><span className="sr-only">Search products</span><input type="search" placeholder="Search little favorites..." value={query} onChange={e => setQuery(e.target.value)}/></label><label className="sort-control">Sort <select value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort products"><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name: A to Z</option></select></label></div><div className="catalog-count">Showing {shown.length} {shown.length === 1 ? 'piece' : 'pieces'}{effectiveCategory !== 'all' && <span> · <Link href="/shop" onClick={() => setCategory('all')}>View all categories</Link></span>}</div>{shown.length ? <div className="product-grid">{shown.map(p => <ProductCard key={p.slug} product={p}/>)}</div> : <div className="catalog-empty"><h2>No products found.</h2><p>Try another size, category, or price.</p><button className="button" onClick={clear}>Clear filters</button></div>}</div></div>
}
