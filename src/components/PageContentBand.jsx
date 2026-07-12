import { SectionAmbience } from './SectionAmbience'
import ScrollReveal from './ScrollReveal'

/** Match Home mid-page sections: wide column + sage-tinted wash */
const contentShell = 'max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-10'

const washBg = {
  /** Semi-transparent so the sitewide underlay shows through beneath cards. */
  amber: 'bg-gradient-to-b from-white/78 via-amber-50/48 to-sage-100/52',
  rust: 'bg-gradient-to-b from-[#fffdfb]/78 via-rust-50/44 to-sage-100/54',
}

/**
 * Main content column: sage + warm wash + corner ambience, matches Home body sections.
 * `wash="rust"` uses the same rust orange as badges/links site-wide (Blog hub).
 */
export default function PageContentBand({ children, variant = 'paper', wash = 'amber', reveal = true }) {
  const inner = (
    <div className={`relative z-10 ${contentShell} py-10 sm:py-14 lg:py-16`}>{children}</div>
  )

  return (
    <div
      className={`relative overflow-hidden border-b ${
        wash === 'rust' ? 'border-rust-200/40' : 'border-sage-300/50'
      } ${washBg[wash] ?? washBg.amber}`}
    >
      <SectionAmbience variant={variant} />
      {reveal ? (
        <ScrollReveal direction="up" threshold={0.06} rootMargin="0px 0px -4%">
          {inner}
        </ScrollReveal>
      ) : (
        inner
      )}
    </div>
  )
}
