import Link from 'next/link'
import { money, type Product } from '@/data'
import WishlistButton from './WishlistButton'

export default function ProductCard({ product }: { product: Product }) { return <article className="product-card"><Link href={`/product/${product.slug}`} className="product-card-link"><div className="product-photo"><img src={product.image} alt={product.name} loading="lazy"/></div><div className="product-meta"><div><span className="product-category">{product.categoryLabel} · {product.color}</span><h3>{product.name}</h3></div><span className="product-price">{money(product.price)}</span></div></Link><WishlistButton slug={product.slug}/></article> }
