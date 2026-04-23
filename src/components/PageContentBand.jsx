import { SectionAmbience } from './SectionAmbience'

const narrow = 'max-w-3xl mx-auto px-2.5 sm:px-4'

/**
 * Main content column: sage/amber wash + corner ambience, matches Home body sections.
 */
export default function PageContentBand({ children, variant = 'paper' }) {
  return (
    <div className="relative overflow-hidden border-b border-sage-300/55 bg-gradient-to-b from-white/98 via-amber-100/40 to-sage-200/52">
      <SectionAmbience variant={variant} />
      <div className={`relative z-10 ${narrow} w-full py-10 sm:py-14 lg:py-16`}>{children}</div>
    </div>
  )
}
