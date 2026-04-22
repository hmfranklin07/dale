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
 * Large, low-contrast icons behind section content (not for small inline use).
 * density: "soft" = hero/lighter; "fill" = more coverage for white sections
 */
export function RuralFieldBackground({ density = 'soft' }) {
  const subtle =
    density === 'fill'
      ? 'text-sage-600/[0.12] sm:text-sage-600/[0.16]'
      : 'text-sage-500/[0.1] sm:text-sage-500/[0.13]'
  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
      aria-hidden
    >
      <div className={`absolute inset-0 ${subtle}`}>
        <IconBarn className="absolute -left-6 -top-4 h-44 w-44 sm:h-56 sm:w-56 rotate-[-14deg] scale-110" />
        <IconFence className="absolute right-[-4%] top-[6%] h-52 w-52 sm:h-64 sm:w-64 rotate-[10deg]" />
        <IconHills className="absolute left-[8%] bottom-[-5%] h-40 w-40 sm:h-52 sm:w-52 rotate-[-4deg]" />
        <IconFence className="absolute right-[20%] bottom-[12%] h-36 w-36 sm:h-44 sm:w-44 rotate-[-8deg] opacity-80" />
        <IconBarn className="absolute left-[40%] top-[18%] h-28 w-28 sm:h-36 sm:w-36 rotate-[6deg] opacity-70" />
        <IconHills className="absolute right-[-2%] bottom-[-6%] h-48 w-48 sm:h-60 sm:w-60 rotate-[12deg]" />
        {density === 'fill' && (
          <>
            <IconBarn className="absolute right-[35%] top-[-3%] h-24 w-24 sm:h-32 sm:w-32 rotate-[-6deg] opacity-60" />
            <IconFence className="absolute left-[12%] top-[35%] h-32 w-32 sm:h-40 sm:w-40 rotate-[14deg] opacity-50" />
            <IconHills className="absolute right-[8%] top-[42%] h-20 w-20 sm:h-28 sm:w-28 opacity-50" />
            <IconBarn className="absolute left-[-2%] top-[55%] h-32 w-32 rotate-[9deg] opacity-55" />
            <IconHills className="absolute left-[30%] bottom-[8%] h-24 w-24 sm:h-32 sm:w-32 rotate-[-11deg] opacity-55" />
          </>
        )}
      </div>
    </div>
  )
}
