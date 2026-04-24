import { HERO_ACCENT_RUST } from '../config/mapPinColors'

const toneClass = {
  paper:
    'rounded-3xl border border-sage-300/80 border-l-4 bg-white/40 p-6 shadow-2xl shadow-black/[0.09] ring-2 ring-sage-400/45 backdrop-blur-md sm:p-8 md:p-10',
  /** State page intro: solid white card, rust-500 left bar (same as blog / home heroes). */
  statePage:
    'rounded-3xl border border-sage-300/90 border-l-4 bg-white p-6 shadow-2xl shadow-black/[0.1] ring-2 ring-sage-400/50 sm:p-8 md:p-10',
  /** State page over a photo hero — mostly white, still a hint of photo through; rust bar only. */
  statePageGlass:
    'rounded-3xl border-0 border-l-4 border-solid bg-white/72 p-6 shadow-none backdrop-blur-md sm:p-8 md:p-10',
  sageDark:
    'rounded-3xl border border-white/10 border-l-4 border-l-orange-400/85 bg-gradient-to-br from-sage-800 via-sage-800 to-sage-950 p-6 shadow-2xl shadow-black/30 ring-1 ring-orange-200/25 sm:p-8 md:p-10',
}

/* Frosted / paper panel used in Home hero — reuse on Vlog + state intro */
export function PageHeroPanel({ children, className = '', tone = 'paper' }) {
  const base = toneClass[tone] ?? toneClass.paper
  const barStyle =
    tone === 'statePage' || tone === 'statePageGlass' || tone === 'paper'
      ? { borderLeftColor: HERO_ACCENT_RUST }
      : undefined
  return (
    <div className={`${base} ${className}`.trim()} style={barStyle}>
      {children}
    </div>
  )
}
