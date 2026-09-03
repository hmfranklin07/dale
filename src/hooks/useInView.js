import { useEffect, useRef, useState } from 'react'

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Tracks whether an element is in the viewport — toggles on every enter/exit
 * so scroll reveal animations can replay. `exitEdge` is `top` when scrolled
 * past (down) or `bottom` when scrolled back up above the element.
 *
 * Enter is deferred by a double rAF (plus optional `enterDelay`) so the hidden
 * state always paints before the visible transition — otherwise elements already
 * on screen on first load never visibly fade in.
 */
export function useInView({ threshold = 0.15, rootMargin = '0px 0px -5%', enterDelay = 0 } = {}) {
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

    let raf1 = 0
    let raf2 = 0
    let timer = 0

    const cancelPendingEnter = () => {
      if (raf1) cancelAnimationFrame(raf1)
      if (raf2) cancelAnimationFrame(raf2)
      if (timer) window.clearTimeout(timer)
      raf1 = 0
      raf2 = 0
      timer = 0
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cancelPendingEnter()
          // Paint opacity-0 first, then flip to visible so CSS transitions run.
          raf1 = requestAnimationFrame(() => {
            raf2 = requestAnimationFrame(() => {
              const show = () => {
                setInView(true)
                setExitEdge(null)
              }
              if (enterDelay > 0) {
                timer = window.setTimeout(show, enterDelay)
              } else {
                show()
              }
            })
          })
          return
        }

        cancelPendingEnter()
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
    return () => {
      cancelPendingEnter()
      observer.disconnect()
    }
  }, [threshold, rootMargin, enterDelay])

  return { ref, inView, exitEdge }
}
