/**
 * Quiet “road field” backdrop from the Home intro / Contact band:
 * sage ground + dashed rust routes (no soft glows).
 */
export function RouteFieldAmbience() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 400"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
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
      </svg>
    </div>
  )
}

/** Outer section classes — flush rust bar under a hero, sage field. */
export const routeFieldSectionClass =
  'relative overflow-hidden border-b border-sage-300/50 border-t-[5px] border-t-rust-500 bg-sage-100'
