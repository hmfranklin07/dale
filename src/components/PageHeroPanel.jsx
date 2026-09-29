import { HERO_ACCENT_RUST } from '../config/mapPinColors'

const toneClass = {
  paper:
    'border border-sage-300/80 border-l-4 bg-white/55 p-6 shadow-sm backdrop-blur-md sm:p-8 md:p-10',
  /** State page intro: solid white panel, rust-500 left bar. */
  statePage:
    'border border-sage-300/90 border-l-4 bg-white p-6 shadow-sm sm:p-8 md:p-10',
  /** NY over photo: same frame as `statePage`, slightly frosted so the image shows through. */
  statePageCompact:
    'border border-sage-300/90 border-l-4 bg-[rgba(255,255,255,0.72)] px-6 py-3 shadow-sm backdrop-blur-md sm:px-8 sm:py-4 md:px-10 md:py-5',
  sageDark:
    'border border-white/10 border-l-4 border-l-orange-400/85 bg-sage-900 p-6 shadow-sm sm:p-8 md:p-10',
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
