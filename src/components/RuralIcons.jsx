/* Filled rural decorations — one motif per corner, aligned to edges with shared inset */

function BarnFilled({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" preserveAspectRatio="xMinYMin meet" aria-hidden>
      <path fill="currentColor" d="M3 28V15.2L16 2L29 15.2V28H3z" />
      <rect x="12" y="18" width="8" height="10" fill="currentColor" fillOpacity="0.26" />
      <rect x="1" y="28" width="30" height="1.2" fill="currentColor" fillOpacity="0.4" />
    </svg>
  )
}

function FenceFilled({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" preserveAspectRatio="xMinYMax meet" aria-hidden>
      <g fill="currentColor">
        <rect y="10" x="0" width="32" height="2.2" />
        <rect y="18" x="0" width="32" height="2.2" />
        <rect x="1.5" y="3.5" width="3" height="24" rx="0.4" />
        <rect x="7.5" y="2.5" width="3" height="25" rx="0.4" />
        <rect x="14.5" y="1.5" width="3" height="26" rx="0.4" />
        <rect x="21.5" y="2.5" width="3" height="25" rx="0.4" />
        <rect x="27.5" y="3.5" width="3" height="24" rx="0.4" />
        <rect y="28.2" x="0" width="32" height="1.1" fillOpacity="0.45" />
      </g>
    </svg>
  )
}

/** Hills: flat top edge of horizon along bottom-land; smooth curve, closed with full base at y=32. */
function HillsScape({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" preserveAspectRatio="xMidYMax meet" aria-hidden>
      <path
        fill="currentColor"
        d="M0 32L0 20Q8 6 16 10T32 4L32 32H0z"
      />
    </svg>
  )
}

function CornerBarnFlipped() {
  return (
    <div className="h-full w-full scale-x-[-1]">
      <BarnFilled className="h-full w-full" />
    </div>
  )
}

const cornerSize =
  'h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36 max-h-[32vw] max-w-[32vw] sm:max-w-none sm:max-h-none'

const cornerInner = 'pointer-events-none select-none overflow-visible'

/**
 * "soft" = one barn (TL) + one hills scape (BR) — diagonal balance.
 * "fill" = barn TL, barn mirror TR, fence BL, hills BR — no hills in a top row (avoids wrong horizon).
 */
export function RuralFieldBackground({ density = 'soft' }) {
  const wash =
    density === 'fill'
      ? 'text-sage-600/[0.1] sm:text-sage-600/[0.12]'
      : 'text-sage-500/[0.085] sm:text-sage-500/[0.1]'

  return (
    <div className="absolute inset-0 z-0 pointer-events-none select-none" aria-hidden>
      <div className={`absolute inset-0 ${wash}`}>
        {density === 'soft' ? (
          <>
            <div
              className={`absolute top-3 left-3 sm:top-4 sm:left-4 ${cornerSize} ${cornerInner}`}
            >
              <BarnFilled className="h-full w-full" />
            </div>
            <div
              className={`absolute bottom-3 right-3 sm:bottom-4 sm:right-4 ${cornerSize} ${cornerInner}`}
            >
              <HillsScape className="h-full w-full" />
            </div>
          </>
        ) : (
          <>
            <div
              className={`absolute top-3 left-3 sm:top-4 sm:left-4 ${cornerSize} ${cornerInner}`}
            >
              <BarnFilled className="h-full w-full" />
            </div>
            <div
              className={`absolute top-3 right-3 sm:top-4 sm:right-4 ${cornerSize} ${cornerInner}`}
            >
              <CornerBarnFlipped />
            </div>
            <div
              className={`absolute bottom-3 left-3 sm:bottom-4 sm:left-4 ${cornerSize} ${cornerInner}`}
            >
              <FenceFilled className="h-full w-full" />
            </div>
            <div
              className={`absolute bottom-3 right-3 sm:bottom-4 sm:right-4 ${cornerSize} ${cornerInner}`}
            >
              <HillsScape className="h-full w-full" />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
