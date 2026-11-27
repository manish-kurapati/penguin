import type { Metadata } from 'next'
import BagContents from '@/components/BagContents'

export const metadata: Metadata = { title: 'Your bag' }
export default function Bag() { return <main className="interior-page"><div className="page-heading section-shell"><p className="eyebrow">A little something for your little one</p><h1>Your bag<em>.</em></h1></div><div className="section-shell"><BagContents/></div></main> }
