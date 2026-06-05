/**
 * Sitewide decorative underlay — soft rust-orange wash behind page content.
 * Cards and panels sit above this via semi-opaque section backgrounds.
 */
export default function SiteBackgroundUnderlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-x-clip" aria-hidden>
      <svg
        className="h-full min-h-full w-full"
        viewBox="0 0 1000 5200"
        preserveAspectRatio="xMidYMin slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="site-bg-tile" width="560" height="560" patternUnits="userSpaceOnUse">
            <circle cx="180" cy="160" r="210" fill="#fce9e2" opacity="0.55" />
            <circle cx="420" cy="380" r="240" fill="#fad7c9" opacity="0.35" />
            <circle cx="320" cy="120" r="120" fill="#f5bca4" opacity="0.18" />
          </pattern>
          <linearGradient id="site-bg-fade" x1="0" y1="0" x2="1000" y2="5200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fdf6f3" stopOpacity="0.45" />
            <stop offset="45%" stopColor="#fce9e2" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#fad7c9" stopOpacity="0.28" />
          </linearGradient>
        </defs>

        <rect width="1000" height="5200" fill="url(#site-bg-tile)" />
        <rect width="1000" height="5200" fill="url(#site-bg-fade)" />

        <path
          d="M 120 0 C 200 420, 360 280, 420 680 S 220 1180, 500 1480 S 820 1780, 360 2100 S 80 2520, 560 2840 S 760 3280, 280 3620 S 140 4060, 520 4480 S 480 4920, 360 5200"
          stroke="#ed9473"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          fill="none"
          opacity="0.11"
        />
        <path
          d="M 860 240 C 680 620, 920 920, 540 1240 S 240 1580, 720 1880 S 880 2280, 340 2620 S 160 3020, 640 3360 S 820 3780, 420 4140 S 300 4560, 680 4920"
          stroke="#f5bca4"
          strokeWidth="0.85"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          fill="none"
          opacity="0.14"
        />
      </svg>
    </div>
  )
}
