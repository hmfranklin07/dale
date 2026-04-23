import { SectionAmbience } from './SectionAmbience'

const narrow = 'max-w-3xl mx-auto px-2.5 sm:px-4'

/**
 * Main content column: sage/amber wash + corner ambience, matches Home body sections.
 */
export default function PageContentBand({ children, variant = 'paper' }) {
  return (
    <div className="relative overflow-hidden border-b border-sage-200/50 bg-gradient-to-b from-white/95 via-amber-50/28 to-sage-100/42">
      <SectionAmbience variant={variant} />
      <div className={`relative z-10 ${narrow} w-full py-10 sm:py-14 lg:py-16`}>{children}</div>
    </div>
  )
}
