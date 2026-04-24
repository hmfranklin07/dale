import { HERO_ACCENT_RUST } from '../config/mapPinColors'

const toneClass = {
  paper:
    'rounded-3xl border border-sage-300/80 border-l-4 bg-white/40 p-6 shadow-2xl shadow-black/[0.09] ring-2 ring-sage-400/45 backdrop-blur-md sm:p-8 md:p-10',
  /** State page intro: solid white card, rust-500 left bar (same as blog / home heroes). */
  statePage:
    'rounded-3xl border border-sage-300/90 border-l-4 bg-white p-6 shadow-2xl shadow-black/[0.1] ring-2 ring-sage-400/50 sm:p-8 md:p-10',
  /** State page over photo — white→transparent gradient only inside this panel (NY). */
  statePageGlass:
    'rounded-3xl border-0 border-l-4 border-solid overflow-hidden p-6 shadow-none sm:p-8 md:p-10',
  sageDark:
    'rounded-3xl border border-white/10 border-l-4 border-l-orange-400/85 bg-gradient-to-br from-sage-800 via-sage-800 to-sage-950 p-6 shadow-2xl shadow-black/30 ring-1 ring-orange-200/25 sm:p-8 md:p-10',
}

/** White wash inside NY text panel; stays strong across most lines, then fades for photo on the right. */
const NY_TEXTBOX_GRADIENT =
  'linear-gradient(to right, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.82) 22%, rgba(255,255,255,0.58) 45%, rgba(255,255,255,0.22) 68%, rgba(255,255,255,0.06) 82%, transparent 92%)'

/** Frosted / paper panel for Home + blog + state intros. */
export function PageHeroPanel({ children, className = '', tone = 'paper' }) {
  const base = toneClass[tone] ?? toneClass.paper
  const panelStyle =
    tone === 'statePageGlass'
      ? { borderLeftColor: HERO_ACCENT_RUST, background: NY_TEXTBOX_GRADIENT }
      : tone === 'statePage' || tone === 'paper'
        ? { borderLeftColor: HERO_ACCENT_RUST }
        : undefined
  return (
    <div className={`${base} ${className}`.trim()} style={panelStyle}>
      {children}
    </div>
  )
}
