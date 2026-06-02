/**
 * Decorative paper plane with a dotted flight trail — “messages from the road.”
 * Purely visual; hidden from assistive tech.
 */
export default function PaperAirplaneTrail({ className = '' }) {
  return (
    <div
      className={`pointer-events-none absolute select-none text-rust-500/75 ${className}`.trim()}
      aria-hidden
    >
      <svg
        viewBox="0 0 160 110"
        className="h-[5.5rem] w-[8rem] sm:h-[7rem] sm:w-[10rem] md:h-[8rem] md:w-[11.5rem]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 14 98
             C 28 82, 42 72, 58 62
             S 78 48, 88 42"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeDasharray="2.5 7"
          className="opacity-55"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 22 92
             C 34 80, 48 68, 62 58"
          stroke="currentColor"
          strokeWidth="0.85"
          strokeLinecap="round"
          strokeDasharray="1.5 10"
          className="opacity-30"
          vectorEffect="non-scaling-stroke"
        />
        <g transform="translate(86 38) rotate(-18)">
          <path
            d="M 0 18 L 44 0 L 18 14 L 26 38 Z"
            className="fill-rust-400/85"
          />
          <path
            d="M 0 18 L 44 0 L 18 14 Z"
            className="fill-rust-500/95"
          />
          <path
            d="M 18 14 L 26 38 L 44 0"
            className="fill-sage-600/35"
          />
          <path
            d="M 0 18 L 18 14"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeLinecap="round"
            className="stroke-rust-600/40"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      </svg>
    </div>
  )
}
