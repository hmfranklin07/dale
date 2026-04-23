const toneClass = {
  paper:
    'texture-dots rounded-3xl border border-white/60 border-l-4 border-l-rust-400/50 bg-white/40 p-6 shadow-2xl shadow-rust-900/5 ring-1 ring-sage-200/50 backdrop-blur-md sm:p-8 md:p-10',
  sageDark:
    'rounded-3xl border border-white/10 border-l-4 border-l-orange-400/85 bg-gradient-to-br from-sage-800 via-sage-800 to-sage-950 p-6 shadow-2xl shadow-black/30 ring-1 ring-orange-200/25 sm:p-8 md:p-10',
}

/* Frosted / paper panel used in Home hero — reuse on Vlog + state intro */
export function PageHeroPanel({ children, className = '', tone = 'paper' }) {
  const base = toneClass[tone] ?? toneClass.paper
  return <div className={`${base} ${className}`.trim()}>{children}</div>
}
