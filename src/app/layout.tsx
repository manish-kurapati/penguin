import type { Metadata } from 'next'
import '@fontsource/cardo/400.css'
import '@fontsource/cardo/700.css'
import '@fontsource/cardo/400-italic.css'
import '@fontsource-variable/nunito-sans'
import './globals.css'
import './store.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ToastHost from '@/components/ToastHost'

export const metadata: Metadata = { title: { default: 'Little Penguin — Cute, comfy, made with love', template: '%s | Little Penguin' }, description: 'Thoughtful, comfy kidswear for little adventures.' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en-AU"><body><Header/>{children}<Footer/><ToastHost/></body></html> }
