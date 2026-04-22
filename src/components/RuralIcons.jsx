/* Simple line icons + soft field background for the home page */

export function IconBarn({ className = 'h-7 w-7' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 20V14l10-8 10 8v6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 20h16v5H8z" />
      <path strokeLinecap="round" d="M10 20v-2h2v2m10 0v-2h-2v2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8l4-2 4 2" />
    </svg>
  )
}

export function IconFence({ className = 'h-7 w-7' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path strokeLinecap="round" d="M3 12h26M3 18h26" />
      <path strokeLinecap="round" d="M7 12v12M12 9v15M17 12v12M22 9v15M27 12v12" />
    </svg>
  )
}

export function IconHills({ className = 'h-7 w-7' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 24c4-5 6-5 9-1 3-6 6-6 9 0 2-3 3-3 4 0 1-1 1-1 1h16" />
      <path strokeLinecap="round" d="M10 20l2-1 2 1" />
    </svg>
  )
}

/**
 * Large, low-contrast edge markers only — a few big shapes bleeding off the left and right
 * (no center clutter). "fill" is slightly more visible; "soft" a touch lighter.
 */
export function RuralFieldBackground({ density = 'soft' }) {
  const subtle =
    density === 'fill'
      ? 'text-sage-600/[0.1] sm:text-sage-600/[0.13]'
      : 'text-sage-500/[0.08] sm:text-sage-500/[0.1]'

  const sizeLg = 'h-36 w-36 sm:h-48 sm:w-48 md:h-56 md:w-56'
  const sizeMd = 'h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48'

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
      aria-hidden
    >
      <div className={`absolute inset-0 ${subtle}`}>
        {/* “Soft” hero: one large mark per side only */}
        {density === 'soft' ? (
          <>
            <IconBarn
              className={`-left-8 sm:-left-5 top-[6%] sm:top-[8%] absolute ${sizeLg} rotate-[-12deg]`}
            />
            <IconHills
              className={`-right-6 sm:-right-4 bottom-[8%] sm:bottom-[10%] absolute ${sizeLg} rotate-[9deg]`}
            />
          </>
        ) : (
          <>
            {/* “Fill” sections: two per side, top and bottom, bleeding into margins (none in the center) */}
            <IconBarn
              className={`-left-8 sm:-left-5 -top-2 sm:top-[3%] absolute ${sizeLg} rotate-[-10deg]`}
            />
            <IconFence
              className={`-left-6 sm:-left-3 bottom-[-3%] sm:bottom-[5%] absolute ${sizeMd} rotate-[5deg] opacity-90`}
            />
            <IconHills
              className={`-right-4 sm:-right-2 -top-1 sm:top-[5%] absolute ${sizeLg} rotate-[7deg]`}
            />
            <IconBarn
              className={`-right-8 sm:-right-6 -bottom-4 sm:bottom-[0%] absolute ${sizeLg} rotate-[-4deg] opacity-90`}
            />
          </>
        )}
      </div>
    </div>
  )
}
