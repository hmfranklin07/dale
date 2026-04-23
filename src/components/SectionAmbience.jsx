/**
 * Multi-layer section backgrounds: soft mesh + blurred color orbs.
 * No icons — just depth, warmth, and a little rust/sage/amber so pages aren’t “flat beige.”
 */
const mesh = {
  hero: 'from-amber-100/35 via-sage-200/25 to-rust-200/20',
  paper: 'from-white/80 via-amber-50/40 to-sage-100/35',
  sage: 'from-sage-300/30 via-amber-50/25 to-rust-100/20',
  map: 'from-sage-200/30 via-earth-200/20 to-amber-50/25',
  dark: 'from-sage-900/40 via-earth-900/20 to-rust-950/25',
}

const tones = {
  hero: { t: 'bg-sage-400/35', br: 'bg-rust-400/25', tr: 'bg-amber-200/30', bl: 'bg-sage-500/20' },
  paper: { t: 'bg-amber-200/35', br: 'bg-sage-300/30', tr: 'bg-rust-200/25', bl: 'bg-white/30' },
  sage: { t: 'bg-sage-500/20', br: 'bg-rust-300/22', tr: 'bg-amber-200/20', bl: 'bg-sage-400/18' },
  map: { t: 'bg-sage-400/25', br: 'bg-earth-300/22', tr: 'bg-amber-100/25', bl: 'bg-rust-200/15' },
  dark: { t: 'bg-sage-600/25', br: 'bg-rust-800/25', tr: 'bg-amber-900/15', bl: 'bg-sage-800/20' },
}

export function SectionAmbience({ variant = 'sage' }) {
  const c = tones[variant] || tones.sage
  const m = mesh[variant] || mesh.sage

  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none select-none"
      aria-hidden
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br opacity-90 ${m}`}
      />
      <div
        className={`-left-1/4 -top-1/3 absolute h-[min(100%,30rem)] w-[min(100%,30rem)] max-h-[95vw] max-w-[95vw] rounded-full ${c.t} opacity-90 blur-3xl sm:h-[36rem] sm:w-[36rem]`}
      />
      <div
        className={`-bottom-1/4 -right-1/4 absolute h-[min(100%,26rem)] w-[min(100%,26rem)] rounded-full ${c.br} opacity-90 blur-3xl sm:h-[30rem] sm:w-[30rem]`}
      />
      <div
        className={`absolute -top-1/4 right-0 h-[20rem] w-[20rem] translate-x-1/4 translate-y-0 rounded-full ${c.tr} opacity-70 blur-3xl sm:h-80 sm:w-80`}
      />
      <div
        className={`-bottom-1/4 -left-1/4 absolute h-[20rem] w-[20rem] max-w-[85vw] rounded-full ${c.bl} opacity-60 blur-3xl sm:h-80 sm:w-80`}
      />
    </div>
  )
}
