import { RouteFieldAmbience, routeFieldSectionClass } from './RouteFieldAmbience'
import ScrollReveal from './ScrollReveal'

/** Match Home mid-page sections: wide column + flat paper ground */
const contentShell = 'max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-10'

const washBg = {
  amber: 'bg-[#f6f3ec]',
  rust: 'bg-sage-50',
}

/**
 * Main content column below a page hero.
 * `field="route"` uses the Home intro / Contact road field (state pages).
 * Default is a flat paper ground for blog, more, and about.
 */
export default function PageContentBand({
  children,
  wash = 'amber',
  field = 'mesh',
  compact = false,
  reveal = true,
}) {
  const body = reveal ? <ScrollReveal className="w-full">{children}</ScrollReveal> : children

  if (field === 'route') {
    return (
      <div className={routeFieldSectionClass}>
        <RouteFieldAmbience />
        <div
          className={`relative z-10 ${contentShell} ${
            compact ? 'py-5 sm:py-6 lg:py-7' : 'py-10 sm:py-14 lg:py-16'
          }`}
        >
          {body}
        </div>
      </div>
    )
  }

  return (
    <div
      className={`relative overflow-hidden border-b border-earth-200 ${washBg[wash] ?? washBg.amber}`}
    >
      <div
        className={`relative z-10 ${contentShell} ${
          compact ? 'py-5 sm:py-6 lg:py-7' : 'py-10 sm:py-14 lg:py-16'
        }`}
      >
        {body}
      </div>
    </div>
  )
}
