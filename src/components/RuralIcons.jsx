/* Filled rural silhouettes for the home page background (stroke-free) */

function BarnFilled({ className = 'h-7 w-7' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden>
      <path fill="currentColor" d="M2 30V16L16 2L30 16V30H2z" />
      <rect x="12" y="20" width="8" height="10" fill="currentColor" fillOpacity="0.32" />
    </svg>
  )
}

function FenceFilled({ className = 'h-7 w-7' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden>
      <g fill="currentColor">
        <rect y="10" x="0" width="32" height="2.4" />
        <rect y="19" x="0" width="32" height="2.4" />
        <rect x="1.5" y="4" width="3" height="24" rx="0.5" />
        <rect x="7.5" y="3" width="3" height="25" rx="0.5" />
        <rect x="14.5" y="2" width="3" height="26" rx="0.5" />
        <rect x="21.5" y="3" width="3" height="25" rx="0.5" />
        <rect x="27.5" y="4" width="3" height="24" rx="0.5" />
      </g>
    </svg>
  )
}

function HillsFilled({ className = 'h-7 w-7' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden>
      <path
        fill="currentColor"
        d="M0 32V20 Q8 8 16 16 T32 12 V32H0z"
      />
    </svg>
  )
}

/**
 * Filled icons pinned to section corners (no rotation).
 * "soft" = two diagonal corners; "fill" = all four corners of the block.
 */
export function RuralFieldBackground({ density = 'soft' }) {
  const subtle =
    density === 'fill'
      ? 'text-sage-600/[0.11] sm:text-sage-600/[0.14]'
      : 'text-sage-500/[0.09] sm:text-sage-500/[0.12]'

  const corner = 'h-32 w-32 sm:h-40 sm:w-40 md:h-44 md:w-44'
  const cornerLg = 'h-28 w-28 sm:h-36 sm:w-36 md:h-40 md:w-40'

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
      aria-hidden
    >
      <div className={`absolute inset-0 ${subtle}`}>
        {density === 'soft' ? (
          <>
            <BarnFilled className={`absolute top-0 left-0 ${corner}`} />
            <HillsFilled className={`absolute bottom-0 right-0 ${corner}`} />
          </>
        ) : (
          <>
            <BarnFilled className={`absolute top-0 left-0 ${corner}`} />
            <HillsFilled className={`absolute top-0 right-0 ${corner}`} />
            <FenceFilled className={`absolute bottom-0 left-0 ${cornerLg}`} />
            <BarnFilled className={`absolute bottom-0 right-0 ${corner}`} />
          </>
        )}
      </div>
    </div>
  )
}
