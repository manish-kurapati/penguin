'use client'

import { useEffect, useRef, useState } from 'react'

export function showToast(message: string) {
  window.dispatchEvent(new CustomEvent<string>('shop-toast', { detail: message }))
}

export default function ToastHost() {
  const [message, setMessage] = useState('')
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onToast = (event: Event) => {
      if (timer.current) clearTimeout(timer.current)
      setMessage((event as CustomEvent<string>).detail)
      timer.current = setTimeout(() => setMessage(''), 3200)
    }
    window.addEventListener('shop-toast', onToast)
    return () => {
      window.removeEventListener('shop-toast', onToast)
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  return <div className={`shop-toast${message ? ' shop-toast-visible' : ''}`} role="status" aria-live="polite" aria-atomic="true">{message}</div>
}
