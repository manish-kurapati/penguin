import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ShopCatalog from '@/components/ShopCatalog'
import { categories } from '@/data'

export function generateStaticParams() { return categories.map(c => ({ category: c.slug })) }
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> { const { category } = await params; return { title: categories.find(c => c.slug === category)?.name || 'Collection' } }
export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) { const { category: slug } = await params; const category = categories.find(c => c.slug === slug); if (!category) notFound(); return <main className="interior-page shop-page"><div className="page-heading section-shell"><p className="eyebrow">The little penguin collection</p><h1>{category.name}<em>.</em></h1><p>{category.subtitle}.</p></div><div className="section-shell shop-content"><ShopCatalog initialCategory={slug}/></div></main> }
