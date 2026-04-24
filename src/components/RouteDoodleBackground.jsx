/**
 * Decorative dashed “route” curves behind the main content band (below heroes).
 * Short local SVGs (aspect preserved) — not stretched edge-to-edge.
 */
export default function RouteDoodleBackground() {
  return (
    <div
      className="route-doodle-wrap pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      {/* Upper left — two short arcs */}
      <svg
        className="route-doodle-svg absolute left-[2%] top-[10%] h-32 w-[13.5rem] text-orange-500/50 sm:h-40 sm:w-[17rem]"
        viewBox="0 0 280 200"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          className="route-doodle-path"
          d="M 24 168 Q 118 36 258 92"
        />
        <path
          className="route-doodle-path route-doodle-path--b"
          d="M 48 128 C 92 188 156 52 264 78"
        />
      </svg>

      {/* Upper right */}
      <svg
        className="route-doodle-svg route-doodle-svg--accent absolute right-[1%] top-[18%] h-28 w-[12rem] text-orange-500/40 sm:h-36 sm:w-[15rem]"
        viewBox="0 0 260 180"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          className="route-doodle-path route-doodle-path--c"
          d="M 28 140 Q 120 28 232 96"
        />
        <path
          className="route-doodle-path route-doodle-path--d"
          d="M 200 152 C 152 88 88 148 36 44"
        />
      </svg>

      {/* Mid band — narrow squiggle */}
      <svg
        className="route-doodle-svg absolute left-1/2 top-[38%] h-24 w-[11rem] -translate-x-1/2 text-orange-600/38 sm:h-28 sm:w-[13rem]"
        viewBox="0 0 240 160"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          className="route-doodle-path route-doodle-path--e"
          d="M 20 112 C 72 40 128 168 220 56"
        />
      </svg>

      {/* Lower left */}
      <svg
        className="route-doodle-svg absolute bottom-[12%] left-[4%] h-36 w-[14rem] text-orange-500/44 sm:h-44 sm:w-[17.5rem]"
        viewBox="0 0 300 220"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          className="route-doodle-path route-doodle-path--b"
          d="M 32 48 Q 156 196 276 72"
        />
        <path
          className="route-doodle-path"
          d="M 56 180 C 120 96 200 200 268 120"
        />
      </svg>

      {/* Lower right */}
      <svg
        className="route-doodle-svg route-doodle-svg--accent absolute bottom-[8%] right-[3%] h-32 w-[12.5rem] text-orange-500/42 sm:h-40 sm:w-64"
        viewBox="0 0 280 200"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          className="route-doodle-path route-doodle-path--d"
          d="M 40 160 Q 140 24 248 100"
        />
        <path
          className="route-doodle-path route-doodle-path--c"
          d="M 220 168 C 168 112 96 152 44 52"
        />
      </svg>
    </div>
  )
}
