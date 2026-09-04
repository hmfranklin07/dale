import { useInView } from '../hooks/useInView'

const DEFAULT_OPTS = { threshold: 0.1, rootMargin: '0px 0px -6%', enterDelay: 16 }

export function revealStateClass(inView, exitEdge) {
  if (inView) return 'is-revealed'
  return exitEdge === 'top' ? 'scroll-reveal-exit-top' : ''
}

/**
 * Fade / slide in when the block enters the viewport (and again on re-entry).
 * `delay` 1–3 adds a short stagger; `photo` uses the softer photo zoom fade.
 */
export default function ScrollReveal({
  children,
  className = '',
  delay,
  photo = false,
  as: Tag = 'div',
  ...observeOpts
}) {
  const { ref, inView, exitEdge } = useInView({ ...DEFAULT_OPTS, ...observeOpts })
  const base = photo ? 'scroll-reveal-photo' : 'scroll-reveal'
  const delayClass = delay ? `scroll-reveal-delay-${delay}` : ''
  const state = revealStateClass(inView, exitEdge)

  return (
    <Tag ref={ref} className={`${base} ${delayClass} ${state} ${className}`.trim()}>
      {children}
    </Tag>
  )
}
