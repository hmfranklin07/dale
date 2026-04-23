import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import states from '../data/states.json'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json'

// Aligned with Tailwind sage/earth in tailwind.config.js — four related sage shades (same hue family)
// Index 0 = lightest … 3 = darkest
const STATE_FILLS = ['#e5ebdd', '#d8e1d0', '#cbd7c3', '#becdb6']
const FILL_HOVER = '#b3bea3'
const STROKE = '#5c6d4d'

/** Optional manual fill index (0–3) for specific states, keyed by lowercased `properties.name` */
const SHADE_OVERRIDES = {
  maine: 3, // darker
  indiana: 0, // lighter
  idaho: 3, // darker
  washington: 0, // lighter
}

function normalizedStateName(geo) {
  const p = geo.properties || {}
  const n = p.name || p.NAME
  if (n == null || n === '') return null
  return String(n).trim().toLowerCase()
}

/**
 * Stable 0..3 per feature — use a name/id hash (not FIPS % 4) so light/dark shades
 * are scattered across the map instead of clumping by region.
 */
function stateShadeIndex(geo) {
  const p = geo.properties || {}
  const stateName = normalizedStateName(geo)
  if (stateName && Object.prototype.hasOwnProperty.call(SHADE_OVERRIDES, stateName)) {
    return SHADE_OVERRIDES[stateName]
  }
  const label = [p.name, p.NAME, p.nam, p.stusps, p.STUSPS, geo.id].filter(Boolean).join('|')
  if (!label) return 0
  let h = 2166136261
  for (let i = 0; i < label.length; i++) h = Math.imul(h ^ label.charCodeAt(i), 16777619)
  h = (h ^ (h >>> 16)) | 0
  h = Math.imul(h, 2246822507) | 0
  h = (h ^ (h >>> 13)) | 0
  return (h >>> 0) & 3
}
// Rust pin body + thin lighter-rust rim; center dot uses same family (slightly thicker dot outline only)
const PIN_DEFAULT = '#c24e32'
const PIN_HOVER = '#d85f3f'
const PIN_STROKE = '#df8f72'
const PIN_OUTLINE_WIDTH = 1.05
const PIN_INNER_FILL = '#fff8f5'
const PIN_INNER_STROKE = '#e29a82'
const PIN_INNER_OUTLINE_WIDTH = 0.72

// Pin path is ~24 units tall; scale + translate anchor the tip on lat/lng
const PIN_SCALE = 2.15
const PIN_TX = -23
const PIN_TY = -47

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
              geographies.map((geo) => {
                const fill = STATE_FILLS[stateShadeIndex(geo)]
                return (
                <Geography
                  key={geo.rsmKey || geo.id}
                  geography={geo}
                  fill={fill}
                  stroke={STROKE}
                  strokeWidth={0.65}
                  style={{
                    default: { outline: 'none' },
                    hover: { fill: FILL_HOVER, outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                />
                )
              })
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
                  r={21}
                  fill="rgba(0,0,0,0)"
                  className="cursor-pointer"
                />
                <path
                  d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 16 8 16s8-10.75 8-16c0-4.42-3.58-8-8-8z"
                  fill={hovered?.slug === s.slug ? PIN_HOVER : PIN_DEFAULT}
                  stroke={PIN_STROKE}
                  strokeWidth={PIN_OUTLINE_WIDTH}
                  strokeLinejoin="round"
                />
                <circle
                  cx={12}
                  cy={8}
                  r={3.5}
                  fill={PIN_INNER_FILL}
                  stroke={PIN_INNER_STROKE}
                  strokeWidth={PIN_INNER_OUTLINE_WIDTH}
                  className="pointer-events-none"
                />
              </g>
            </Marker>
          ))}
        </ComposableMap>
      </div>

      {hovered && (
        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 w-[min(100%,20rem)] max-w-sm -translate-x-1/2 sm:bottom-5">
          <div
            className="rounded-xl border-2 border-amber-200/50 bg-gradient-to-b from-rust-600/95 via-rust-800/98 to-rust-950/98 px-4 py-3 text-center shadow-lg shadow-rust-900/35 ring-1 ring-amber-200/40"
          >
            <p className="font-display text-lg leading-tight text-amber-50/95">
              {hovered.place}
              {!hovered.mapLabelPlaceOnly && (
                <>
                  {', '}
                  {hovered.abbr}
                </>
              )}
            </p>
            <p className="mt-0.5 text-xs uppercase tracking-wider text-amber-200/90">{hovered.name}</p>
            <p className="mt-2 text-sm text-amber-100/90">Click for field notes &amp; interviews</p>
          </div>
        </div>
      )}
    </div>
  )
}
