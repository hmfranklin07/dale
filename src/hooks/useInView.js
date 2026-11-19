import { useEffect, useRef, useState } from 'react'

/** Track entry and exit so the reveal can replay on the next pass. */
export function useInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver !== 'function') return

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting)
    }, { rootMargin: '20px 0px' })

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { ref, inView }
}
