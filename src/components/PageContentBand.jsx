import { SectionAmbience } from './SectionAmbience'

/** Match Home mid-page sections: wide column + sage-tinted wash */
const contentShell = 'max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-10'

/**
 * Main content column: sage/amber wash + corner ambience, matches Home body sections.
 */
export default function PageContentBand({ children, variant = 'paper' }) {
  return (
    <div className="relative overflow-hidden border-b border-sage-300/55 bg-gradient-to-b from-white/98 via-amber-100/40 to-sage-900/10">
      <SectionAmbience variant={variant} />
      <div className={`relative z-10 ${contentShell} py-10 sm:py-14 lg:py-16`}>{children}</div>
    </div>
  )
}
