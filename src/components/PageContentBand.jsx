import { SectionAmbience } from './SectionAmbience'

/** Match Home mid-page sections: wide column + sage-tinted wash */
const contentShell = 'max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-10'

const washBg = {
  /** Default body band — cream → soft amber → sage floor (a bit more depth than flat sage-900/10) */
  amber: 'bg-gradient-to-b from-white/97 via-amber-50/55 to-sage-100/58',
  /** Blog hub — warm paper + rust wash, settles into sage (no heavy sage-900 edge) */
  rust: 'bg-gradient-to-b from-[#fffdfb]/[0.98] via-rust-50/52 to-sage-100/62',
}

/**
 * Main content column: sage + warm wash + corner ambience, matches Home body sections.
 * `wash="rust"` uses the same rust orange as badges/links site-wide (Blog hub).
 */
export default function PageContentBand({ children, variant = 'paper', wash = 'amber' }) {
  return (
    <div
      className={`relative overflow-hidden border-b ${
        wash === 'rust' ? 'border-rust-200/40' : 'border-sage-300/50'
      } ${washBg[wash] ?? washBg.amber}`}
    >
      <SectionAmbience variant={variant} />
      <div className={`relative z-10 ${contentShell} py-10 sm:py-14 lg:py-16`}>{children}</div>
    </div>
  )
}
