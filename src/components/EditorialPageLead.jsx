import { useId } from 'react'

/**
 * Short kicker + rule for blog / state hubs so the first content band feels less empty.
 */
export default function EditorialPageLead({ kicker, subtitle, align = 'left' }) {
  const isCenter = align === 'center'
  const kickerId = useId()
  return (
    <div
      className={`relative mb-10 sm:mb-12 ${isCenter ? 'text-center' : ''}`.trim()}
      aria-labelledby={kickerId}
    >
      <div
        className={`flex gap-3 sm:gap-4 ${isCenter ? 'flex-col items-center' : 'flex-col items-start sm:flex-row sm:items-center'}`}
      >
        <span
          className={`h-1.5 shrink-0 rounded-full bg-gradient-to-r from-rust-600 via-rust-500 to-rust-400 ${
            isCenter ? 'w-24' : 'w-16 sm:w-20'
          }`}
          aria-hidden
        />
        <div className={isCenter ? 'mx-auto max-w-2xl' : 'min-w-0 max-w-2xl'}>
          <p id={kickerId} className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-rust-800 sm:text-xs">
            {kicker}
          </p>
          {subtitle ? (
            <p className={`mt-2 text-sm leading-relaxed text-earth-700 sm:text-base ${isCenter ? 'mx-auto' : ''}`}>
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
      <div className="mt-5 flex items-center justify-center gap-1.5 sm:mt-6" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`h-1 w-1 rounded-full ${i === 1 ? 'bg-rust-500' : 'bg-sage-400/80'}`}
          />
        ))}
      </div>
      <div
        className="mx-auto mt-5 h-px max-w-3xl bg-gradient-to-r from-transparent via-sage-400/50 to-transparent sm:mt-6"
        aria-hidden
      />
    </div>
  )
}
