/* Frosted / paper panel used in Home hero — reuse on Vlog + state intro */
export function PageHeroPanel({ children, className = '' }) {
  return (
    <div
      className={`texture-dots rounded-3xl border border-white/60 border-l-4 border-l-rust-400/50 bg-white/40 p-6 shadow-2xl shadow-rust-900/5 ring-1 ring-sage-200/50 backdrop-blur-md sm:p-8 md:p-10 ${className}`}
    >
      {children}
    </div>
  )
}
