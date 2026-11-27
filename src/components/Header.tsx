'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [count, setCount] = useState(0)
  const [wishCount, setWishCount] = useState(0)
  useEffect(() => {
    const update = () => { try { setCount(JSON.parse(localStorage.getItem('little-penguin-bag') || '[]').length) } catch { setCount(0) } }
    update(); window.addEventListener('bag-updated', update); return () => window.removeEventListener('bag-updated', update)
  }, [])
  useEffect(() => { const update = () => { try { setWishCount(JSON.parse(localStorage.getItem('little-penguin-wishlist') || '[]').length) } catch { setWishCount(0) } }; update(); window.addEventListener('wishlist-updated', update); return () => window.removeEventListener('wishlist-updated', update) }, [])
  useEffect(() => setOpen(false), [pathname])
  const links = [{ href: '/', label: 'Home' }, { href: '/shop', label: 'Shop' }, { href: '/about', label: 'About' }, { href: '/contact', label: 'Contact' }]
  return <header className="site-header">
    <div className="header-inner">
      <Link href="/" className="brand" aria-label="Little Penguin home"><img src="/little-penguin-logo.png" className="brand-lockup" alt="Little Penguin. Cute, comfy, made with love."/></Link>
      <nav className={`main-nav ${open ? 'nav-open' : ''}`} aria-label="Main navigation">{links.map(link => <Link key={link.href} href={link.href} className={pathname === link.href ? 'active' : ''}>{link.label}</Link>)}</nav>
      <div className="header-actions"><Link href="/wishlist" className="icon-link" aria-label={`Wishlist, ${wishCount} items`}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.5 8.5c0 4.2-8.5 10.5-8.5 10.5S3.5 12.7 3.5 8.5a4.5 4.5 0 0 1 8.5-2 4.5 4.5 0 0 1 8.5 2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></svg>{wishCount > 0 && <span className="icon-count">{wishCount}</span>}</Link><Link href="/bag" className="icon-link" aria-label={`Shopping bag, ${count} items`}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.5 8h15l-1 12h-13l-1-12Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="M9 9V6a3 3 0 0 1 6 0v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>{count > 0 && <span className="icon-count">{count}</span>}</Link><button className="menu-toggle" type="button" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}><span/><span/></button></div>
    </div>
  </header>
}
