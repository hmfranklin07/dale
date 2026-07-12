export default function SectionHeading({ children, align = 'left', className = '', id, kicker }) {
  return (
    <div className={`mb-6 sm:mb-8 ${align === 'center' ? 'text-center' : ''} ${className}`.trim()}>
      {kicker && <p className={`section-kicker mb-2 ${align === 'center' ? 'mx-auto' : ''}`}>{kicker}</p>}
      <h2
        id={id}
        className={`font-display flex gap-3 text-2xl text-earth-900 sm:gap-4 sm:text-3xl lg:text-[2rem] ${
          align === 'center' ? 'mx-auto max-w-3xl justify-center' : 'items-start'
        }`}
      >
        {align === 'left' && (
          <span
            className="mt-1 h-9 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-rust-400 via-rust-500 to-rust-700 shadow-sm shadow-rust-900/20"
            aria-hidden
          />
        )}
        <span className="min-w-0 text-left leading-tight tracking-[-0.01em]">{children}</span>
      </h2>
    </div>
  )
}

/** Main page / hero titles — solid dark text (no green gradient). */
export const pageTitleClass = 'text-earth-900'
