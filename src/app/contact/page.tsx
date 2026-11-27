import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import { Suspense } from 'react'

export const metadata: Metadata = { title: 'Contact' }
export default function Contact() { return <main className="interior-page"><section className="contact-layout section-shell"><div><p className="eyebrow">Contact</p><h1>Get in touch.</h1><p>Questions about a piece or sizing? Leave a note and we’ll help you get the right information.</p></div><Suspense fallback={<div className="contact-form"/>}><ContactForm/></Suspense></section></main> }
