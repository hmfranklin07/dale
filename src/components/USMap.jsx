import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import states from '../data/states.json'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json'

// Warm field / parchment tones — read as “paper on a wooden desk”
const FILL = '#d8cfc0'
const FILL_HOVER = '#b9ad9a'
const STROKE = '#c4b6a2'

export default function USMap() {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(null)

  return (
    <div className="relative w-full">
      <div className="rounded-2xl border-2 border-earth-300/90 bg-gradient-to-b from-earth-100 via-[#e9e1d4] to-earth-200/50 shadow-[inset_0_1px_0_0_rgba(255,252,245,0.5),0_2px_12px_rgba(87,68,57,0.08)] overflow-hidden p-1 sm:p-1.5">
        <ComposableMap
          width={1200}
          height={700}
          projection="geoAlbersUsa"
          projectionConfig={{ scale: 1400 }}
          className="w-full h-auto block"
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey || geo.id}
                  geography={geo}
                  fill={FILL}
                  stroke={STROKE}
                  strokeWidth={0.6}
                  style={{
                    default: { outline: 'none' },
                    hover: { fill: FILL_HOVER, outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {states.map((s) => (
            <Marker
              key={s.slug}
              coordinates={[s.lng, s.lat]}
              onClick={() => navigate(`/${s.slug}`)}
              onMouseEnter={() => setHovered(s)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'pointer' }}
            >
              <g transform="translate(-15, -28) scale(1.15)">
                <path
                  d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 16 8 16s8-10.75 8-16c0-4.42-3.58-8-8-8z"
                  fill={hovered?.slug === s.slug ? '#b94828' : '#8f3b24'}
                  stroke="#f0ece4"
                  strokeWidth={1.6}
                />
                <circle cx={12} cy={8} r={2.6} fill="#faf8f5" />
              </g>
            </Marker>
          ))}
        </ComposableMap>
      </div>

      {hovered && (
        <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 max-w-sm w-[min(100%,20rem)] pointer-events-none z-10">
          <div className="rounded-lg border-2 border-earth-400/70 bg-[#2f2a25] px-4 py-3 text-center shadow-lg">
            <p className="font-display text-lg text-earth-100 leading-tight">
              {hovered.place}
              {', '}
              {hovered.abbr}
            </p>
            <p className="text-xs uppercase tracking-wider text-earth-400 mt-0.5">{hovered.name}</p>
            <p className="text-sm text-earth-300/95 mt-2">Click for field notes &amp; interviews</p>
          </div>
        </div>
      )}
    </div>
  )
}
