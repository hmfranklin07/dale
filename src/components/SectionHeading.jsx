export default function SectionHeading({ children, align = 'left', className = '', id }) {
  return (
    <div className={`mb-6 sm:mb-8 ${align === 'center' ? 'text-center' : ''} ${className}`.trim()}>
      <h2
        id={id}
        className={`font-display flex gap-3 text-2xl text-earth-900 sm:gap-4 sm:text-3xl ${
          align === 'center' ? 'mx-auto max-w-3xl justify-center' : 'items-start'
        }`}
      >
        {align === 'left' && (
          <span
            className="mt-0.5 h-9 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-rust-400 to-rust-600"
            aria-hidden
          />
        )}
        <span className="min-w-0 text-left leading-tight">{children}</span>
      </h2>
    </div>
  )
}

/** Main page / hero titles — solid dark text (no green gradient). */
export const pageTitleClass = 'text-earth-900'
