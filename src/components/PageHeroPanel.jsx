const toneClass = {
  paper: 'border-t-2 border-rust-600 bg-white px-6 py-8 sm:px-10 sm:py-10',
  /** State page intro on a colored band. */
  statePage: 'border-t-2 border-rust-600 bg-white px-6 py-8 sm:px-10 sm:py-10',
  /** Compact title block over a photograph. */
  statePageCompact: 'border-t-2 border-rust-600 bg-[#f6f3ec]/92 px-6 py-4 sm:px-8 sm:py-5',
  sageDark: 'border-t-2 border-rust-400 bg-sage-900 px-6 py-8 text-sage-50 sm:px-10 sm:py-10',
}

/** Paper title block for intros that sit on a band or photograph. */
export function PageHeroPanel({ children, className = '', tone = 'paper' }) {
  const base = toneClass[tone] ?? toneClass.paper
  return <div className={`${base} ${className}`.trim()}>{children}</div>
}
