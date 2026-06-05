/** Wide-viewport side gutters — playful sage + rust accents outside the content column. */
const gutterWidth = 'max(0px, calc((100vw - 72rem) / 2))'

function LeftMarginArt() {
  return (
    <svg
      className="h-full w-full text-sage-600"
      viewBox="0 0 200 2400"
      preserveAspectRatio="xMaxYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className="opacity-[0.42]" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M150 120 C110 220, 60 280, 90 380 S170 520, 120 640 S40 820, 100 980"
          strokeWidth="2.2"
          strokeDasharray="6 14"
        />
        <path d="M130 1180 C80 1280, 140 1380, 90 1480 S60 1680, 110 1780 S150 1980, 95 2140" strokeWidth="1.6" strokeDasharray="4 12" />
      </g>

      <g className="opacity-50">
        <ellipse cx="118" cy="260" rx="34" ry="52" fill="#93a37e" transform="rotate(-18 118 260)" />
        <ellipse cx="92" cy="300" rx="22" ry="38" fill="#768963" transform="rotate(24 92 300)" />
        <path
          d="M118 208 L118 340 M118 260 C98 248, 86 268, 98 286 M118 260 C138 248, 150 268, 138 286"
          stroke="#5c6d4d"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      <g className="opacity-45">
        <circle cx="140" cy="920" r="28" fill="#b3bea3" />
        <circle cx="108" cy="960" r="16" fill="#768963" />
        <circle cx="152" cy="990" r="11" fill="#93a37e" />
        <path d="M140 892 L140 1020 M112 920 L168 920" stroke="#5c6d4d" strokeWidth="1.5" opacity="0.7" />
        <path d="M124 904 L156 936 M156 904 L124 936" stroke="#5c6d4d" strokeWidth="1.5" opacity="0.7" />
      </g>

      <g className="opacity-[0.38]">
        <ellipse cx="105" cy="1560" rx="40" ry="28" fill="#93a37e" transform="rotate(-8 105 1560)" />
        <ellipse cx="135" cy="1595" rx="26" ry="18" fill="#768963" transform="rotate(14 135 1595)" />
        <path
          d="M105 1530 C85 1545, 78 1575, 95 1605 S130 1640, 110 1670"
          stroke="#5c6d4d"
          strokeWidth="2"
          strokeDasharray="5 10"
        />
      </g>

      <g className="opacity-40">
        <circle cx="125" cy="2060" r="6" fill="#768963" />
        <circle cx="98" cy="2095" r="4" fill="#93a37e" />
        <circle cx="148" cy="2110" r="5" fill="#5c6d4d" />
        <circle cx="112" cy="2145" r="3.5" fill="#768963" />
        <path d="M125 2060 L98 2095 L148 2110 L112 2145" stroke="#768963" strokeWidth="1.2" strokeDasharray="3 6" />
      </g>
    </svg>
  )
}

function RightMarginArt() {
  return (
    <svg
      className="h-full w-full text-rust-500"
      viewBox="0 0 200 2400"
      preserveAspectRatio="xMinYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className="opacity-[0.38]" stroke="currentColor" strokeLinecap="round">
        <path
          d="M50 180 C90 280, 30 360, 70 480 S120 620, 60 760 S20 940, 80 1100"
          strokeWidth="2.2"
          strokeDasharray="6 14"
        />
        <path d="M65 1320 C25 1420, 95 1520, 55 1640 S15 1820, 75 1960 S110 2140, 60 2260" strokeWidth="1.6" strokeDasharray="4 12" />
      </g>

      <g className="opacity-50">
        <circle cx="95" cy="240" r="36" fill="#f5bca4" />
        <circle cx="95" cy="240" r="24" fill="#ed9473" />
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * Math.PI) / 4
          const x2 = 95 + Math.cos(angle) * 58
          const y2 = 240 + Math.sin(angle) * 58
          return <line key={i} x1="95" y1="240" x2={x2} y2={y2} stroke="#e2724d" strokeWidth="2.2" strokeLinecap="round" />
        })}
      </g>

      <g className="opacity-[0.44]">
        <path
          d="M40 880 L160 880 L130 940 L70 940 Z"
          fill="#fad7c9"
          stroke="#e2724d"
          strokeWidth="2"
        />
        <circle cx="100" cy="910" r="14" fill="#e2724d" opacity="0.35" />
        <path d="M100 896 L100 924 M86 910 L114 910" stroke="#cf5733" strokeWidth="2" strokeLinecap="round" />
      </g>

      <g className="opacity-45">
        <rect x="52" y="1520" width="96" height="96" rx="18" fill="#fce9e2" stroke="#e2724d" strokeWidth="2" transform="rotate(12 100 1568)" />
        <circle cx="100" cy="1568" r="10" fill="#e2724d" />
        <path d="M100 1554 L100 1582 M86 1568 L114 1568" stroke="#faf9f5" strokeWidth="2" strokeLinecap="round" />
      </g>

      <g className="opacity-[0.4]">
        <path
          d="M55 2040 Q100 2000, 145 2040 T55 2120 T145 2160"
          stroke="#ed9473"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="55" cy="2040" r="5" fill="#e2724d" />
        <circle cx="145" cy="2160" r="5" fill="#cf5733" />
      </g>
    </svg>
  )
}

export default function SideMarginArt() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] hidden overflow-x-clip xl:block" aria-hidden>
      <div className="absolute inset-y-0 left-0" style={{ width: gutterWidth }}>
        <LeftMarginArt />
      </div>
      <div className="absolute inset-y-0 right-0" style={{ width: gutterWidth }}>
        <RightMarginArt />
      </div>
    </div>
  )
}
