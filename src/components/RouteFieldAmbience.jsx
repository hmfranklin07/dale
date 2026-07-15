/**
 * Quiet “road field” backdrop: rust rail, warm ground band, dotted routes.
 * Shared by Contact, Home body, and state content bands.
 */
const viewBoxes = {
  /** Short content sections (Contact card band, state page body) */
  section: '0 0 1000 400',
  /** Tall stacked home body (bio + map) */
  tall: '0 0 1000 900',
}

const routes = {
  section: (
    <>
      <path
        d="M -40 95 C 160 55, 280 165, 460 110 S 720 50, 900 140 S 980 210, 1040 190"
        stroke="#c45a3a"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeDasharray="5 13"
        opacity="0.42"
      />
      <path
        d="M -20 210 C 180 175, 320 265, 500 205 S 780 145, 960 245 S 1020 300, 1060 285"
        stroke="#b4532a"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeDasharray="4 15"
        opacity="0.32"
      />
      <path
        d="M -30 325 C 200 285, 360 365, 540 300 S 820 230, 1000 340"
        stroke="#d9774f"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeDasharray="3 16"
        opacity="0.28"
      />
    </>
  ),
  tall: (
    <>
      <path
        d="M -40 90 C 160 50, 280 160, 460 105 S 720 45, 900 135 S 980 200, 1040 180"
        stroke="#c45a3a"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeDasharray="5 13"
        opacity="0.4"
      />
      <path
        d="M -20 280 C 180 240, 320 340, 500 275 S 780 210, 960 320 S 1020 390, 1060 370"
        stroke="#b4532a"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeDasharray="4 15"
        opacity="0.3"
      />
      <path
        d="M -30 480 C 200 430, 360 540, 540 470 S 820 390, 1000 520"
        stroke="#d9774f"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeDasharray="3 16"
        opacity="0.28"
      />
      <path
        d="M -20 680 C 170 640, 340 760, 520 690 S 800 610, 980 740 S 1040 810, 1060 790"
        stroke="#c45a3a"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeDasharray="5 14"
        opacity="0.26"
      />
      <path
        d="M -40 840 C 200 800, 380 880, 560 820 S 840 760, 1020 860"
        stroke="#d9774f"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="3 17"
        opacity="0.22"
      />
    </>
  ),
}

/** Outer section classes — flush rust bar under a hero, sage field. */
export const routeFieldSectionClass =
  'relative overflow-hidden border-b border-sage-300/50 border-t-[5px] border-t-rust-500 bg-sage-100'

/** Continuation of a route field (no second rust top bar). */
export const routeFieldContinueClass =
  'relative overflow-hidden border-b border-sage-300/50 bg-sage-100'

export function RouteFieldAmbience({
  variant = 'section',
  rail = true,
  band = true,
}) {
  const vb = viewBoxes[variant] || viewBoxes.section
  const paths = routes[variant] || routes.section

  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      {rail && <div className="absolute inset-y-0 left-0 w-3 bg-rust-500 sm:w-3.5" />}
      {band && (
        <>
          <div className="absolute inset-x-0 bottom-0 h-24 bg-rust-200/55 sm:h-28" />
          <div className="absolute inset-x-0 bottom-24 h-px bg-rust-400/35 sm:bottom-28" />
        </>
      )}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={vb}
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {paths}
      </svg>
    </div>
  )
}
