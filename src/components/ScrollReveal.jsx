import { useInView } from '../hooks/useInView'

const HIDDEN = {
  up: 'opacity-0 translate-y-10',
  down: 'opacity-0 -translate-y-8',
  left: 'opacity-0 -translate-x-10',
  right: 'opacity-0 translate-x-10',
  scale: 'opacity-0 scale-[0.94]',
  fade: 'opacity-0',
}

const EXIT_UP = 'opacity-0 -translate-y-7 scale-[0.98]'
const EXIT_DOWN = 'opacity-0 translate-y-10 scale-[0.97]'

/**
 * Scroll-triggered reveal — replays when leaving and re-entering the viewport.
 * Respects prefers-reduced-motion via useInView.
 */
export default function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  replay = true,
  threshold = 0.14,
  rootMargin = '0px 0px -6%',
  as: Tag = 'div',
}) {
  const { ref, inView, exitEdge } = useInView({ threshold, rootMargin })

  let hiddenClass = HIDDEN[direction] ?? HIDDEN.up
  if (replay && !inView && exitEdge) {
    hiddenClass = exitEdge === 'top' ? EXIT_UP : EXIT_DOWN
  }

  return (
    <Tag
      ref={ref}
      className={`motion-reduce:transform-none motion-reduce:opacity-100 transition-[opacity,transform] duration-[920ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        inView ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : hiddenClass
      } ${className}`.trim()}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  )
}
