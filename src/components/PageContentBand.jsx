import { SectionAmbience } from './SectionAmbience'

/** Match Home mid-page sections: wide column + sage-tinted wash */
const contentShell = 'max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-10'

const washBg = {
  /** Semi-transparent so the sitewide underlay shows through beneath cards. */
  amber: 'bg-gradient-to-b from-white/72 via-amber-50/42 to-sage-100/48',
  rust: 'bg-gradient-to-b from-[#fffdfb]/74 via-rust-50/40 to-sage-100/50',
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
