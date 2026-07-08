import { useEffect, useRef, useState } from 'react'

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Tracks whether an element is in the viewport — toggles on every enter/exit
 * so scroll reveal animations can replay. `exitEdge` is `top` when scrolled
 * past (down) or `bottom` when scrolled back up above the element.
 */
export function useInView({ threshold = 0.15, rootMargin = '0px 0px -5%' } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(() => prefersReducedMotion())
  const [exitEdge, setExitEdge] = useState(null)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setInView(true)
      setExitEdge(null)
      return
    }

    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          setExitEdge(null)
          return
        }

        setInView(false)
        const { top, bottom } = entry.boundingClientRect
        const vh = window.innerHeight
        if (top >= vh - 1) {
          setExitEdge('bottom')
        } else if (bottom <= 1) {
          setExitEdge('top')
        } else {
          setExitEdge(top > vh / 2 ? 'bottom' : 'top')
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return { ref, inView, exitEdge }
}
