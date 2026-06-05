/**
 * Sitewide decorative underlay — rust + sage pattern behind page content.
 * Cards and panels sit above this via opaque/semi-opaque section backgrounds.
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
          <pattern id="site-bg-tile" width="420" height="420" patternUnits="userSpaceOnUse">
            <circle cx="72" cy="88" r="46" fill="#f5bca4" opacity="0.22" />
            <circle cx="340" cy="112" r="34" fill="#b3bea3" opacity="0.2" />
            <circle cx="300" cy="340" r="52" fill="#ed9473" opacity="0.14" />
            <circle cx="96" cy="320" r="28" fill="#93a37e" opacity="0.18" />

            <path
              d="M20 180 C80 120, 140 220, 200 160 S320 80, 400 140"
              stroke="#e2724d"
              strokeWidth="2"
              strokeDasharray="7 16"
              strokeLinecap="round"
              fill="none"
              opacity="0.28"
            />
            <path
              d="M40 360 C120 300, 180 400, 260 340 S360 280, 410 360"
              stroke="#768963"
              strokeWidth="1.6"
              strokeDasharray="5 14"
              strokeLinecap="round"
              fill="none"
              opacity="0.22"
            />

            <circle cx="210" cy="210" r="3" fill="#e2724d" opacity="0.35" />
            <circle cx="228" cy="198" r="2" fill="#cf5733" opacity="0.3" />
            <circle cx="198" cy="224" r="2.5" fill="#e2724d" opacity="0.28" />
            <path
              d="M210 210 L228 198 L198 224 Z"
              stroke="#e2724d"
              strokeWidth="1"
              strokeDasharray="2 5"
              fill="none"
              opacity="0.25"
            />

            <path
              d="M350 260 L380 290 L350 320 L320 290 Z"
              stroke="#768963"
              strokeWidth="1.5"
              fill="#d2d8c8"
              fillOpacity="0.12"
              opacity="0.3"
            />
          </pattern>
        </defs>

        <rect width="1000" height="5200" fill="url(#site-bg-tile)" />

        <path
          d="M 80 0 C 140 320, 380 180, 440 480 S 180 900, 520 1100 S 860 1280, 320 1500 S 0 1800, 600 2000 S 920 2400, 240 2700 S 60 3000, 680 3200 S 820 3600, 160 4000 S 160 4500, 560 5000"
          stroke="currentColor"
          strokeWidth="1.4"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="6 14"
          fill="none"
          opacity="0.16"
        />
        <path
          d="M 880 120 C 600 400, 980 650, 520 900 S 180 1150, 800 1400 S 900 1800, 300 2100 S 100 2550, 700 2800 S 900 3200, 200 3600 S 200 4000, 600 4300"
          className="text-sage-500"
          stroke="currentColor"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="5 16"
          fill="none"
          opacity="0.14"
        />
      </svg>
    </div>
  )
}
