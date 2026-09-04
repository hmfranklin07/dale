import { useEffect, useState } from 'react'

/** Fade in on load (header + body together) — not scroll-gated. */
export default function MountFade({ children, className = '' }) {
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setRevealed(true)
      return
    }
    let raf2 = 0
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setRevealed(true))
    })
    return () => {
      cancelAnimationFrame(raf1)
      if (raf2) cancelAnimationFrame(raf2)
    }
  }, [])

  return (
    <div className={`scroll-reveal ${revealed ? 'is-revealed' : ''} ${className}`.trim()}>
      {children}
    </div>
  )
}
