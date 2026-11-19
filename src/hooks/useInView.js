import { useEffect, useRef, useState } from 'react'

/** Reveal a block once, just before it reaches the visible viewport. */
export function useInView() {
  const ref = useRef(null)
  const [hasEntered, setHasEntered] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver !== 'function') return

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setHasEntered(true)
      observer.disconnect()
    }, { rootMargin: '0px 0px 8px' })

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { ref, hasEntered }
}
