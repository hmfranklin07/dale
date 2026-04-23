import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ComposableMap, Geographies, Geography, Marker, Line } from 'react-simple-maps'
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
  alaska: 3, // darker
  indiana: 0, // lighter
  idaho: 3, // darker
  washington: 0, // lighter
  nevada: 0, // lightest shade
  wisconsin: 0, // lighter
  'south dakota': 0, // lighter
  kansas: 3, // darker
  california: 3, // darkest shade
}

/** Relative one-step tweaks from the computed shade index (clamped 0..3). */
const SHADE_ADJUSTMENTS = {
  arkansas: +1, // one shade darker
  missouri: -1, // one shade lighter
  'new jersey': +1, // one shade darker
  'new york': +2, // two shades darker
  massachusetts: +1, // one shade darker
  'south carolina': -1, // one shade lighter
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
  const base = (h >>> 0) & 3
  if (stateName && Object.prototype.hasOwnProperty.call(SHADE_ADJUSTMENTS, stateName)) {
    return Math.max(0, Math.min(3, base + SHADE_ADJUSTMENTS[stateName]))
  }
  return base
}
// Rust pin body + same light-orange rim on teardrop and center dot (matched color + stroke width)
const PIN_DEFAULT = '#c24e32'
const PIN_HOVER = '#d85f3f'
const PIN_RIM_COLOR = '#df8f72'
const PIN_RIM_WIDTH = 1.05
const PIN_INNER_FILL = '#fff8f5'

// Pin path is ~24 units tall; scale + translate anchor the tip on lat/lng
const PIN_SCALE = 2.15
const PIN_TX = -23
const PIN_TY = -47
const stateBySlug = Object.fromEntries(states.map((s) => [s.slug, s]))

// Route sketched along major interstate-style corridors so segments look natural and continuous.
const ROUTE_WAYPOINTS = [
  // New York pin -> Ohio -> Indiana -> Illinois pin
  stateBySlug['new-york'] && [stateBySlug['new-york'].lng, stateBySlug['new-york'].lat],
  [-75.5, 42.6], // Southern NY arc
  [-77.61, 43.16], // Rochester corridor
  [-78.88, 42.89], // Buffalo
  [-80.1, 42.13], // Erie
  [-81.69, 41.5], // Cleveland
  [-82.99, 39.96], // Columbus (Ohio)
  [-84.2, 39.76], // I-70 westbound bend
  [-86.16, 39.77], // Indianapolis (Indiana)
  [-87.63, 41.88], // Chicago approach
  stateBySlug.illinois && [stateBySlug.illinois.lng, stateBySlug.illinois.lat],

  // Illinois pin -> Iowa -> Nebraska pin
  [-90.57, 41.52], // Quad Cities
  [-91.53, 41.66], // Iowa City
  [-93.62, 41.59], // Des Moines (Iowa)
  [-95.93, 41.26], // Omaha
  stateBySlug.nebraska && [stateBySlug.nebraska.lng, stateBySlug.nebraska.lat],

  // Nebraska pin -> South Dakota -> Wyoming -> Idaho pin
  [-99.08, 40.7], // Across Nebraska
  [-100.35, 44.37], // Pierre (South Dakota)
  [-103.23, 44.08], // Rapid City
  [-104.82, 41.14], // Cheyenne (Wyoming)
  [-106.31, 42.85], // Casper
  [-108.5, 41.59], // Rock Springs
  [-110.76, 42.87], // Western Wyoming
  [-112.44, 42.87], // Pocatello corridor
  stateBySlug.idaho && [stateBySlug.idaho.lng, stateBySlug.idaho.lat],

  // Idaho pin -> Yosemite -> LA -> Grand Canyon -> Amarillo -> Oklahoma City -> Arkansas pin
  [-116.2, 43.61], // Boise
  [-119.81, 39.53], // Reno
  [-120.2, 38.1], // Sierra approach
  [-119.54, 37.87], // Yosemite
  [-118.24, 34.05], // Los Angeles
  [-116.54, 33.83], // Inland SoCal bend
  [-114.62, 35.19], // Kingman corridor
  [-112.14, 36.05], // Grand Canyon
  [-109.56, 35.08], // Flagstaff / I-40 eastbound
  [-106.65, 35.08], // Albuquerque
  [-103.02, 35.2], // Eastern NM
  [-101.83, 35.22], // Amarillo
  [-99.5, 35.4], // Western OK
  [-97.52, 35.47], // Oklahoma City
  [-95.99, 35.47], // Eastern OK
  stateBySlug.arkansas && [stateBySlug.arkansas.lng, stateBySlug.arkansas.lat],

  // Arkansas pin -> Alabama -> Florida pin -> DC -> back to New York pin
  [-90.05, 35.15], // Memphis
  [-88.04, 30.69], // Mobile corridor
  [-86.81, 33.52], // Birmingham (Alabama)
  [-84.39, 33.75], // Atlanta
  stateBySlug.florida && [stateBySlug.florida.lng, stateBySlug.florida.lat],
  [-81.1, 32.08], // Savannah corridor
  [-79.93, 32.78], // Charleston
  [-78.64, 35.78], // Raleigh
  [-77.44, 37.54], // Richmond
  [-77.04, 38.91], // Washington, DC
  [-75.17, 39.95], // Philadelphia
  [-74.01, 40.71], // NYC
  stateBySlug['new-york'] && [stateBySlug['new-york'].lng, stateBySlug['new-york'].lat],
].filter(Boolean)

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

          {ROUTE_WAYPOINTS.slice(0, -1).map((from, idx) => {
            const to = ROUTE_WAYPOINTS[idx + 1]
            return (
              <Line
                key={`route-segment-${idx}`}
                from={from}
                to={to}
                stroke="#b44b2d"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="5 3"
                style={{ pointerEvents: 'none' }}
              />
            )
          })}

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
                  stroke={PIN_RIM_COLOR}
                  strokeWidth={PIN_RIM_WIDTH}
                  strokeLinejoin="round"
                />
                <circle
                  cx={12}
                  cy={8}
                  r={3.5}
                  fill={PIN_INNER_FILL}
                  stroke={PIN_RIM_COLOR}
                  strokeWidth={PIN_RIM_WIDTH}
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
