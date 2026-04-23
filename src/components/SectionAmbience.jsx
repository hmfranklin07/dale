/**
 * Multi-layer section backgrounds: soft mesh + blurred color orbs.
 * No icons — just depth, warmth, and a little rust/sage/amber so pages aren’t “flat beige.”
 */
/** Base wash: darker on the left, lighter toward the right */
const mesh = {
  hero: 'from-sage-800/55 via-sage-400/42 to-amber-100/55',
  paper: 'from-sage-600/72 via-orange-100/65 to-white/95',
  sage: 'from-sage-700/58 via-amber-100/48 to-rust-200/52',
  map: 'from-sage-600/55 via-earth-200/40 to-amber-100/55',
  dark: 'from-sage-900/78 via-earth-900/55 to-rust-500/38',
}

const tones = {
  hero: { t: 'bg-sage-500/48', br: 'bg-rust-500/42', tr: 'bg-amber-300/45', bl: 'bg-sage-600/36' },
  paper: { t: 'bg-orange-300/52', br: 'bg-sage-400/52', tr: 'bg-rust-300/48', bl: 'bg-white/52' },
  sage: { t: 'bg-sage-600/38', br: 'bg-rust-400/36', tr: 'bg-amber-300/36', bl: 'bg-sage-500/30' },
  map: { t: 'bg-sage-500/38', br: 'bg-earth-300/34', tr: 'bg-amber-300/38', bl: 'bg-rust-300/30' },
  dark: { t: 'bg-sage-700/40', br: 'bg-rust-800/40', tr: 'bg-amber-900/28', bl: 'bg-sage-800/30' },
}

export function SectionAmbience({ variant = 'sage' }) {
  const c = tones[variant] || tones.sage
  const m = mesh[variant] || mesh.sage

  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none select-none"
      aria-hidden
    >
      <div className={`absolute inset-0 bg-gradient-to-r opacity-100 ${m}`} />
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
