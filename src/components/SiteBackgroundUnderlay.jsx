/**
 * Sitewide decorative underlay — continuous rust-orange dotted paths behind content.
 */
export default function SiteBackgroundUnderlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-x-clip" aria-hidden>
      <svg
        className="h-full min-h-full w-full text-rust-400"
        viewBox="0 0 1000 5200"
        preserveAspectRatio="xMidYMin slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 120 0
             C 180 320, 420 180, 480 480
             S 220 900, 560 1100
             S 900 1280, 360 1500
             S 40 1800, 640 2000
             S 960 2400, 280 2700
             S 100 3000, 720 3200
             S 860 3600, 200 4000
             S 200 4500, 600 5000
             S 500 5100, 400 5200"
          stroke="currentColor"
          strokeWidth="1.35"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="6 14"
          fill="none"
          opacity="0.2"
        />
        <path
          d="M 880 0
             C 600 400, 980 650, 520 900
             S 180 1150, 800 1400
             S 900 1800, 300 2100
             S 100 2550, 700 2800
             S 900 3200, 200 3600
             S 200 4000, 600 4300
             S 500 4700, 760 4950
             S 820 5100, 720 5200"
          stroke="#ed9473"
          strokeWidth="1.1"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="5 16"
          fill="none"
          opacity="0.16"
        />
        <path
          d="M 500 0
             C 540 420, 460 840, 520 1260
             S 480 1680, 500 2100
             S 520 2520, 480 2940
             S 500 3360, 520 3780
             S 480 4200, 500 4620
             S 520 5040, 500 5200"
          stroke="#e2724d"
          strokeWidth="0.9"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="4 18"
          fill="none"
          opacity="0.1"
        />
      </svg>
    </div>
  )
}
