import { useCallback, useRef } from 'react'
import './hero.css'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const targetTime = useRef(0)
  const seeking = useRef(false)

  const seekToTarget = useCallback(() => {
    const video = videoRef.current
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0 || seeking.current) return
    if (Math.abs(targetTime.current - video.currentTime) < 0.015) return
    seeking.current = true
    video.currentTime = targetTime.current
  }, [])

  function scrub(clientX: number) {
    const video = videoRef.current
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return
    targetTime.current = Math.max(0, Math.min(1, clientX / window.innerWidth)) * video.duration
    seekToTarget()
  }

  return (
    <main
      className="penguin-hero"
      aria-label="Interactive penguin video"
      onPointerMove={(event) => scrub(event.clientX)}
    >
      <video
        ref={videoRef}
        className="penguin-video"
        src="/penguin-hero.mp4"
        poster="/penguin-poster.jpg"
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={() => { targetTime.current = 0 }}
        onSeeked={() => { seeking.current = false; seekToTarget() }}
        aria-label="Penguin moving as you move your cursor"
      />
      <div className="hero-copy">
        <p className="hero-eyebrow">Little Penguin Kidswear</p>
        <h1>Little clothes.<br />Big adventures.</h1>
        <p className="hero-description">Soft, comfy styles made for every curious little day.</p>
      </div>
    </main>
  )
}
