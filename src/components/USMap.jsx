import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import states from '../data/states.json'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json'

// Aligned with Tailwind sage/earth in tailwind.config.js
const FILL = '#d8e1d0'
const FILL_HOVER = '#b3bea3'
const STROKE = '#5c6d4d'
const PIN_DEFAULT = '#cf5733' // rust-600
const PIN_HOVER = '#e2724d' // rust-500
const PIN_STROKE = '#f6f7f4' // sage-50

// Pin path is ~24 units tall; scale 1.85 and translate so tip stays on lat/lng
const PIN_SCALE = 1.85
const PIN_TX = -20
const PIN_TY = -40

export default function USMap() {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(null)

  return (
    <div className="relative w-full">
      <div
        className="overflow-hidden rounded-2xl border-2 border-rust-200/50 bg-gradient-to-b from-sage-50/95 via-amber-50/25 to-sage-100/70 p-1.5 shadow-lg shadow-rust-900/8 ring-1 ring-amber-100/60 sm:p-2"
        style={{ boxShadow: 'inset 0 1px 0 0 rgba(255, 252, 245, 0.45), 0 8px 24px -6px rgba(100, 70, 55, 0.1)' }}
      >
        <ComposableMap
          width={1200}
          height={700}
          projection="geoAlbersUsa"
          projectionConfig={{ scale: 1480 }}
          className="h-auto w-full block"
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey || geo.id}
                  geography={geo}
                  fill={FILL}
                  stroke={STROKE}
                  strokeWidth={0.65}
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
              <g transform={`translate(${PIN_TX}, ${PIN_TY}) scale(${PIN_SCALE})`}>
                {/* Large hit area so pins are easy to click / tap */}
                <circle
                  cx={12}
                  cy={6}
                  r={18}
                  fill="rgba(0,0,0,0)"
                  className="cursor-pointer"
                />
                <path
                  d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 16 8 16s8-10.75 8-16c0-4.42-3.58-8-8-8z"
                  fill={hovered?.slug === s.slug ? PIN_HOVER : PIN_DEFAULT}
                  stroke={PIN_STROKE}
                  strokeWidth={2.2}
                />
                <circle cx={12} cy={8} r={3.2} fill="#fffdf9" className="pointer-events-none" />
              </g>
            </Marker>
          ))}
        </ComposableMap>
      </div>

      {hovered && (
        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 w-[min(100%,20rem)] max-w-sm -translate-x-1/2 sm:bottom-5">
          <div
            className="rounded-xl border-2 border-rust-200/50 bg-gradient-to-b from-sage-900/95 to-earth-900/98 px-4 py-3 text-center shadow-lg shadow-earth-900/20 ring-1 ring-amber-200/20"
          >
            <p className="font-display text-lg leading-tight text-amber-50/95">
              {hovered.place}
              {', '}
              {hovered.abbr}
            </p>
            <p className="mt-0.5 text-xs uppercase tracking-wider text-sage-300/95">{hovered.name}</p>
            <p className="mt-2 text-sm text-sage-200/90">Click for field notes &amp; interviews</p>
          </div>
        </div>
      )}
    </div>
  )
}
