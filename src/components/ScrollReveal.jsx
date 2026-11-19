import { useInView } from '../hooks/useInView'

export default function ScrollReveal({
  children,
  className = '',
  delay,
  photo = false,
  as: Tag = 'div',
}) {
  const { ref, inView } = useInView()
  const photoClass = photo ? 'scroll-reveal-photo' : ''
  const delayClass = delay ? `scroll-reveal-delay-${delay}` : ''
  const state = inView ? 'is-revealed' : ''

  return (
    <Tag ref={ref} className={`scroll-reveal ${photoClass} ${delayClass} ${state} ${className}`.trim()}>
      {children}
    </Tag>
  )
}
