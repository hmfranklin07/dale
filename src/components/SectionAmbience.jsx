/**
 * Multi-layer section backgrounds: soft mesh + blurred color orbs.
 * No icons — just depth, warmth, and a little rust/sage/amber so pages aren’t “flat beige.”
 */
const mesh = {
  hero: 'from-amber-100/45 via-sage-200/32 to-rust-200/28',
  paper: 'from-white/90 via-amber-50/48 to-sage-100/42',
  sage: 'from-sage-300/38 via-amber-50/32 to-rust-100/28',
  map: 'from-sage-200/38 via-earth-200/28 to-amber-50/32',
  dark: 'from-sage-900/50 via-earth-900/30 to-rust-950/32',
}

const tones = {
  hero: { t: 'bg-sage-400/40', br: 'bg-rust-400/32', tr: 'bg-amber-200/38', bl: 'bg-sage-500/28' },
  paper: { t: 'bg-amber-200/40', br: 'bg-sage-300/36', tr: 'bg-rust-200/30', bl: 'bg-white/40' },
  sage: { t: 'bg-sage-500/28', br: 'bg-rust-300/28', tr: 'bg-amber-200/28', bl: 'bg-sage-400/24' },
  map: { t: 'bg-sage-400/30', br: 'bg-earth-300/28', tr: 'bg-amber-200/32', bl: 'bg-rust-200/22' },
  dark: { t: 'bg-sage-600/32', br: 'bg-rust-800/32', tr: 'bg-amber-900/22', bl: 'bg-sage-800/24' },
}

export function SectionAmbience({ variant = 'sage' }) {
  const c = tones[variant] || tones.sage
  const m = mesh[variant] || mesh.sage

  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none select-none"
      aria-hidden
    >
      <div className={`absolute inset-0 bg-gradient-to-br opacity-100 ${m}`} />
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
