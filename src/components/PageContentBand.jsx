import { SectionAmbience } from './SectionAmbience'
import { RouteFieldAmbience, routeFieldSectionClass } from './RouteFieldAmbience'
import ScrollReveal from './ScrollReveal'

/** Match Home mid-page sections: wide column + sage-tinted wash */
const contentShell = 'max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-10'

const washBg = {
  /** Semi-transparent so the sitewide underlay shows through beneath cards. */
  amber: 'bg-gradient-to-b from-white/72 via-amber-50/42 to-sage-100/48',
  rust: 'bg-gradient-to-b from-[#fffdfb]/74 via-rust-50/40 to-sage-100/50',
}

/**
 * Main content column below a page hero.
 * `field="route"` uses the Home intro / Contact road field (state pages).
 * Default keeps the softer mesh wash for blog/more/about.
 */
export default function PageContentBand({
  children,
  variant = 'paper',
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
      className={`relative overflow-hidden border-b ${
        wash === 'rust' ? 'border-rust-200/40' : 'border-sage-300/50'
      } ${washBg[wash] ?? washBg.amber}`}
    >
      <SectionAmbience variant={variant} />
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
