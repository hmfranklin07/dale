/** Road-sign style construction worker — orange diamond + digger pictogram. */
export default function ConstructionWorkerIcon({ className = 'mx-auto h-20 w-20' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Under construction"
    >
      {/* Construction orange diamond */}
      <path
        d="M40 4 L76 40 L40 76 L4 40 Z"
        fill="#e2724d"
        stroke="#8f3b24"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Soft inner diamond highlight */}
      <path d="M40 11 L69 40 L40 69 L11 40 Z" fill="#ed9473" opacity="0.35" />
      {/* Worker silhouette (black, road-sign style) */}
      <g fill="#1a1512">
        {/* Hard hat */}
        <ellipse cx="40" cy="28.5" rx="8.2" ry="4.6" />
        <path d="M30.5 29.5h19c.8 0 1.4.5 1.4 1.1s-.6 1.1-1.4 1.1h-19c-.8 0-1.4-.5-1.4-1.1s.6-1.1 1.4-1.1Z" />
        {/* Head */}
        <circle cx="40" cy="34.2" r="3.6" />
        {/* Torso */}
        <path d="M33.2 38.2c1.8-1.2 4.1-1.9 6.8-1.9s5 .7 6.8 1.9l2.2 11.2H31l2.2-11.2Z" />
        {/* Legs */}
        <rect x="34.2" y="49.2" width="4.2" height="8.8" rx="1.1" />
        <rect x="41.6" y="49.2" width="4.2" height="8.8" rx="1.1" />
        {/* Shovel shaft + blade */}
        <rect x="25.2" y="40" width="2.2" height="16.5" rx="1" transform="rotate(-18 26.3 48.25)" />
        <path d="M20.8 54.2c-.2 2.4 1.1 3.8 3.4 3.6 1.6-.1 2.7-1 3.2-2.6.4-1.3-.1-2.5-1.3-3.1-1.8-.9-4.8-.7-5.3 2.1Z" />
        {/* Arm to shovel */}
        <path d="M33.5 40.2c-1.6 1.4-2.8 3.2-3.5 5.2l2 1c.6-1.6 1.5-3 2.7-4.1l-1.2-2.1Z" />
      </g>
    </svg>
  )
}
