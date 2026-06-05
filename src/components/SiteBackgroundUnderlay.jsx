/**
 * Sitewide decorative underlay — rust-orange wash behind page content.
 * Cards and panels sit above this via semi-opaque section backgrounds.
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
        <defs>
          <pattern id="site-bg-tile" width="360" height="360" patternUnits="userSpaceOnUse">
            <path
              d="M16 150 C64 108, 118 188, 168 142 S268 92, 332 138"
              stroke="#e2724d"
              strokeWidth="1.5"
              strokeDasharray="6 14"
              strokeLinecap="round"
              fill="none"
              opacity="0.22"
            />
            <path
              d="M28 300 C96 256, 148 332, 220 288 S300 248, 344 304"
              stroke="#ed9473"
              strokeWidth="1.2"
              strokeDasharray="5 12"
              strokeLinecap="round"
              fill="none"
              opacity="0.18"
            />
          </pattern>
        </defs>

        <rect width="1000" height="5200" fill="url(#site-bg-tile)" />

        <path
          d="M 120 0 C 180 320, 420 180, 480 480 S 220 900, 560 1100 S 900 1280, 360 1500 S 40 1800, 640 2000 S 960 2400, 280 2700 S 100 3000, 720 3200 S 860 3600, 200 4000 S 200 4500, 600 5000"
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
          d="M 880 120 C 600 400, 980 650, 520 900 S 180 1150, 800 1400 S 900 1800, 300 2100 S 100 2550, 700 2800 S 900 3200, 200 3600 S 200 4000, 600 4300"
          stroke="#ed9473"
          strokeWidth="1.1"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="5 16"
          fill="none"
          opacity="0.16"
        />
      </svg>
    </div>
  )
}
