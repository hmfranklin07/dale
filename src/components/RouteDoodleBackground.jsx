/**
 * Decorative dashed “route” curves for blog / state hero bands — sits above gradient, below content.
 */
export default function RouteDoodleBackground() {
  return (
    <div
      className="route-doodle-wrap pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      <svg
        className="route-doodle-svg absolute inset-0 h-[125%] w-full -translate-y-[6%] text-sage-700/50"
        viewBox="0 0 1200 380"
        preserveAspectRatio="none"
      >
        <path
          className="route-doodle-path route-doodle-path--a"
          d="M -60 300 C 180 80, 340 360, 520 160 S 820 40, 1260 220"
        />
        <path
          className="route-doodle-path route-doodle-path--b"
          d="M 40 400 C 260 180, 480 380, 700 120 S 960 20, 1280 280"
        />
        <path
          className="route-doodle-path route-doodle-path--c"
          d="M -80 140 C 200 260, 420 60, 640 200 S 900 340, 1240 80"
        />
      </svg>
      <svg
        className="route-doodle-svg route-doodle-svg--rust absolute inset-0 h-full w-full translate-y-2 text-rust-500/35"
        viewBox="0 0 1200 380"
        preserveAspectRatio="none"
      >
        <path
          className="route-doodle-path route-doodle-path--d"
          d="M 100 360 C 320 120, 540 320, 760 100 S 1040 200, 1220 40"
        />
        <path
          className="route-doodle-path route-doodle-path--e"
          d="M -40 200 C 220 40, 400 280, 620 140 S 880 60, 1180 300"
        />
      </svg>
    </div>
  )
}
