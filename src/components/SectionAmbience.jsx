/**
 * Soft color washes in the corners/edges of a section (no pictorial icons).
 * Renders behind content; parent must be `relative overflow-hidden`.
 */
const tones = {
  hero: {
    t: 'bg-sage-400/25',
    br: 'bg-earth-200/30',
    tr: 'bg-rust-200/20',
  },
  paper: {
    t: 'bg-sage-300/20',
    br: 'bg-earth-200/25',
    tr: 'bg-sage-200/20',
  },
  sage: {
    t: 'bg-sage-500/12',
    br: 'bg-earth-300/18',
    tr: 'bg-sage-300/16',
  },
  map: {
    t: 'bg-sage-400/15',
    br: 'bg-earth-200/15',
    tr: 'bg-sage-200/10',
  },
  dark: {
    t: 'bg-sage-500/20',
    br: 'bg-rust-800/30',
    tr: 'bg-earth-800/25',
  },
}

export function SectionAmbience({ variant = 'sage' }) {
  const c = tones[variant] || tones.sage

  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none select-none"
      aria-hidden
    >
      <div
        className={`absolute -left-1/4 -top-1/3 h-[min(100%,28rem)] w-[min(100%,28rem)] max-h-[90vw] max-w-[90vw] rounded-full ${c.t} opacity-80 blur-3xl sm:h-[32rem] sm:w-[32rem]`}
      />
      <div
        className={`absolute -bottom-1/4 -right-1/4 h-[min(100%,24rem)] w-[min(100%,24rem)] rounded-full ${c.br} opacity-80 blur-3xl sm:h-[28rem] sm:w-[28rem]`}
      />
      <div
        className={`absolute -translate-y-1/4 right-0 top-0 h-[18rem] w-[18rem] translate-x-1/3 rounded-full ${c.tr} opacity-50 blur-3xl sm:h-72 sm:w-72`}
      />
    </div>
  )
}
