import { useLocation } from 'react-router-dom'

/**
 * Very subtle rust-orange dotted path behind page content (not on Home).
 * Sits in the app shell so it extends with the full document height on long pages.
 */
export default function SiteWindingPath() {
  const { pathname } = useLocation()
  if (pathname === '/') return null

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-x-clip"
      aria-hidden
    >
      <svg
        className="h-full min-h-full w-full text-rust-400/90"
        viewBox="0 0 1000 5200"
        preserveAspectRatio="xMidYMin meet"
        fill="none"
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
             S 500 5200, 400 5200"
          className="opacity-[0.18] sm:opacity-20"
          stroke="currentColor"
          strokeWidth="1.35"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1.2 12"
        />
        <path
          d="M 880 120
             C 600 400, 980 650, 520 900
             S 180 1150, 800 1400
             S 900 1800, 300 2100
             S 100 2550, 700 2800
             S 900 3200, 200 3600
             S 200 4000, 600 4300
             S 500 5000, 800 5200"
          className="opacity-10 sm:opacity-[0.12]"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1.2 16"
        />
      </svg>
    </div>
  )
}
