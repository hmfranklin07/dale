import { HERO_ACCENT_RUST } from '../config/mapPinColors'

const toneClass = {
  paper:
    'rounded-3xl border border-sage-300/80 border-l-4 bg-white/40 p-6 shadow-2xl shadow-black/[0.09] ring-2 ring-sage-400/45 backdrop-blur-md sm:p-8 md:p-10',
  /** State page intro: solid white card, rust-500 left bar (same as blog / home heroes). */
  statePage:
    'rounded-3xl border border-sage-300/90 border-l-4 bg-white p-6 shadow-2xl shadow-black/[0.1] ring-2 ring-sage-400/50 sm:p-8 md:p-10',
  /** Same card as `statePage` (Idaho): identical border, ring, shadow, horizontal insets — less vertical padding for a shorter box (e.g. NY over photo). */
  statePageCompact:
    'rounded-3xl border border-sage-300/90 border-l-4 bg-white px-6 py-3 shadow-2xl shadow-black/[0.1] ring-2 ring-sage-400/50 sm:px-8 sm:py-4 md:px-10 md:py-5',
  sageDark:
    'rounded-3xl border border-white/10 border-l-4 border-l-orange-400/85 bg-gradient-to-br from-sage-800 via-sage-800 to-sage-950 p-6 shadow-2xl shadow-black/30 ring-1 ring-orange-200/25 sm:p-8 md:p-10',
}

/** Frosted / paper panel for Home + blog + state intros. */
export function PageHeroPanel({ children, className = '', tone = 'paper' }) {
  const base = toneClass[tone] ?? toneClass.paper
  const panelStyle =
    tone === 'statePage' || tone === 'statePageCompact' || tone === 'paper'
      ? { borderLeftColor: HERO_ACCENT_RUST }
      : undefined
  return (
    <div className={`${base} ${className}`.trim()} style={panelStyle}>
      {children}
    </div>
  )
}
