'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'

export default function VideoHero() {
  const section = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const target = useRef(0)
  const seeking = useRef(false)
  const [ready, setReady] = useState(false)
  function scrub(clientX: number) {
    const element = section.current
    const film = video.current
    if (window.matchMedia('(max-width: 760px)').matches || !element || !film || !Number.isFinite(film.duration) || film.duration <= 0) return
    const rect = element.getBoundingClientRect()
    // The penguin occupies the right side of the frame. Let a cursor moving
    // around it travel through the full, short clip instead of only its end.
    const position = (clientX - rect.left) / rect.width
    const progress = Math.min(1, Math.max(0, (position - .35) / .6))
    target.current = progress * film.duration
    if (!seeking.current && Math.abs(film.currentTime - target.current) > .035) {
      seeking.current = true
      film.currentTime = target.current
    }
  }
  return <section ref={section} className="hero-scroll" aria-label="Little Penguin collection" onPointerEnter={event => scrub(event.clientX)} onPointerMove={event => scrub(event.clientX)} onPointerDown={event => scrub(event.clientX)}><div className="hero-sticky"><video ref={video} className={`hero-video ${ready ? 'video-ready' : ''}`} poster="/hero-poster.jpg" muted playsInline preload="auto" onLoadedMetadata={() => { setReady(true); target.current = 0; if (video.current) video.current.currentTime = 0 }} onSeeked={() => { seeking.current = false; if (video.current && Math.abs(video.current.currentTime - target.current) > .06) { seeking.current = true; video.current.currentTime = target.current } }} aria-hidden="true"><source src="/little-penguin-film.mp4" type="video/mp4" media="(min-width: 761px)"/></video><div className="hero-mobile-image" role="img" aria-label="Baby penguin in a colorful scarf in a snowy mountain landscape"/><div className="hero-wash"/><div className="hero-content"><div className="hero-kicker">The world of Little Penguin</div><h1>Little comforts,<br/><em>big adventures.</em></h1><p>Made with love for your little ones. Comfy pieces for all the wonderful places they&apos;ll go.</p><Link href="/shop" className="button hero-button">Explore collection</Link></div></div></section>
}
