export default function SectionHeading({ children, align = 'left', className = '', id }) {
  return (
    <div className={`mb-6 sm:mb-8 ${align === 'center' ? 'text-center' : ''} ${className}`.trim()}>
      <h2
        id={id}
        className={`font-display text-[1.85rem] leading-[1.15] text-earth-900 sm:text-[2.15rem] ${
          align === 'center' ? 'mx-auto max-w-3xl' : ''
        }`}
      >
        {children}
      </h2>
      <span
        className={`mt-3 block h-px w-10 bg-rust-600 ${align === 'center' ? 'mx-auto' : ''}`}
        aria-hidden
      />
    </div>
  )
}

/** Main page / hero titles — solid dark text (no green gradient). */
export const pageTitleClass = 'text-earth-900'
