import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { geoAlbersUsa } from 'd3-geo'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import states from '../data/states.json'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json'

// Four sage steps — collectively darker than before so the map sits closer to sage-900 accents
// Index 0 = lightest … 3 = darkest (still well above sage-900 #333c2e for legibility)
const STATE_FILLS = ['#c9d4b8', '#aebb9c', '#92a180', '#768b66']
const FILL_HOVER = '#9daa84'
const STROKE = '#3c4735'

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
const PIN_TIP_X = 12
const PIN_TIP_Y = 24
const stateBySlug = Object.fromEntries(states.map((s) => [s.slug, s]))
const STOP_LABELS_BY_SLUG = {
  'new-york': 'Stop 1',
  illinois: 'Stop 2',
  nebraska: 'Stop 3',
  idaho: 'Stop 4',
  arkansas: 'Stop 5',
  florida: 'Stop 6',
}

// Route control points: follows requested destinations, then smoothed for natural curvature.
const ROUTE_CONTROL_POINTS = [
  // Outbound north arc: New York pin -> Ohio -> Indiana -> Illinois pin
  stateBySlug['new-york'] && [stateBySlug['new-york'].lng, stateBySlug['new-york'].lat],
  [-78.2, 42.0], // Immediate westbound departure from NY pin
  [-78.2, 41.95], // Western NY corridor (well south of lake edge)
  [-80.0, 41.75], // NW Pennsylvania arc
  [-81.69, 41.5], // Cleveland corridor
  [-82.9988, 39.9612], // Ohio (Columbus)
  [-84.9, 39.7], // Ohio/Indiana bend
  [-86.1581, 39.7684], // Indiana (Indianapolis)
  [-87.7, 40.9], // Illinois bend
  stateBySlug.illinois && [stateBySlug.illinois.lng, stateBySlug.illinois.lat],

  // Continue north arc: Illinois pin -> Iowa -> Nebraska pin
  [-90.8, 41.9], // Mississippi crossing bend
  [-92.1, 42.0], // N Iowa sweep
  [-93.62, 41.59], // Des Moines (Iowa)
  [-95.2, 41.8], // W Iowa bend
  [-96.0, 41.6], // Omaha corridor
  stateBySlug.nebraska && [stateBySlug.nebraska.lng, stateBySlug.nebraska.lat],

  // Continue north arc: Nebraska pin -> west through Nebraska -> up to Rapid City -> WY -> Idaho pin
  [-99.2, 41.9], // West-central Nebraska
  [-101.0, 41.6], // Central-west Nebraska
  [-103.0, 41.5], // Western Nebraska
  [-103.23, 44.08], // Rapid City
  [-105.6, 44.3], // Northern Wyoming corridor
  [-108.2, 44.1], // Northern Wyoming / Montana border corridor
  [-110.3, 43.8], // NW Wyoming toward Idaho
  [-112.2, 43.3], // Idaho Falls corridor
  stateBySlug.idaho && [stateBySlug.idaho.lng, stateBySlug.idaho.lat],

  // Return south arc: Idaho pin -> Yosemite -> LA -> Grand Canyon -> Amarillo -> Oklahoma City -> Arkansas pin
  [-116.8, 43.2], // Boise area
  [-118.7, 41.4], // N Nevada
  [-119.81, 39.53], // Reno corridor
  [-120.2, 38.5], // Sierra crest approach
  [-119.54, 37.87], // Yosemite
  [-118.8, 36.3], // Central CA descent
  [-118.2437, 34.0522], // Los Angeles
  [-116.4, 34.4], // Mojave bend
  [-114.7, 35.2], // AZ border corridor
  [-112.14, 36.05], // Grand Canyon
  [-110.9, 35.3], // E Arizona
  [-109.56, 35.08], // Flagstaff / I-40 eastbound
  [-106.65, 35.08], // Albuquerque
  [-104.2, 35.2], // E New Mexico
  [-101.83, 35.22], // Amarillo
  [-99.7, 35.3], // W Oklahoma
  [-97.52, 35.47], // Oklahoma City
  [-95.2, 35.8], // E Oklahoma
  stateBySlug.arkansas && [stateBySlug.arkansas.lng, stateBySlug.arkansas.lat],

  // Continue south arc: Arkansas pin -> top of Mississippi -> Alabama -> smoother Florida panhandle -> Florida pin
  [-92.3, 35.2], // Central AR bend
  [-90.05, 35.15], // Memphis corridor
  [-89.6, 34.35], // N Mississippi
  [-88.2, 34.1], // NE Mississippi
  [-87.1, 33.55], // W Alabama
  [-86.3, 32.45], // Central Alabama
  [-85.5, 31.25], // SE Alabama / Dothan corridor
  [-86.15, 30.95], // Enter Florida panhandle (west)
  [-85.45, 30.62], // Panhandle curve
  [-84.75, 30.48], // Panhandle eastbound
  [-84.0, 30.4], // Tallahassee corridor
  [-83.15, 30.35], // North Florida east
  stateBySlug.florida && [stateBySlug.florida.lng, stateBySlug.florida.lat],

  // Swing back north-east: Florida pin -> DC -> New York pin
  [-81.1, 32.08], // Savannah
  [-79.93, 32.78], // Charleston corridor
  [-78.64, 35.78], // Raleigh
  [-77.44, 37.54], // Richmond
  [-77.04, 38.91], // Washington, DC
  [-75.6, 40.6], // East-side PA corridor
  [-75.3, 41.35], // Right-side approach arc toward NY
  [-76.2, 41.95], // Enter NY from east/right side
  stateBySlug['new-york'] && [stateBySlug['new-york'].lng, stateBySlug['new-york'].lat],
].filter(Boolean)

// Keep exact control points so the curve passes through destination pin tips.
const ROUTE_WAYPOINTS = ROUTE_CONTROL_POINTS
const ROUTE_PROJECTION = geoAlbersUsa().scale(1480).translate([600, 350])

function routePathD(points) {
  const projected = points
    .map((pt) => ROUTE_PROJECTION(pt))
    .filter(Boolean)
    .map(([x, y]) => ({ x, y }))

  if (projected.length < 2) return ''
  if (projected.length === 2) {
    const [a, b] = projected
    return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} L ${b.x.toFixed(2)} ${b.y.toFixed(2)}`
  }

  let d = `M ${projected[0].x.toFixed(2)} ${projected[0].y.toFixed(2)}`
  for (let i = 0; i < projected.length - 1; i++) {
    const p0 = i === 0 ? projected[0] : projected[i - 1]
    const p1 = projected[i]
    const p2 = projected[i + 1]
    const p3 = i + 2 < projected.length ? projected[i + 2] : p2

    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6

    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`
  }
  return d
}

const ROUTE_PATH_D = routePathD(ROUTE_WAYPOINTS)

export default function USMap() {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(null)

  return (
    <div className="relative w-full">
      <div
        className="overflow-hidden rounded-2xl border-2 border-rust-200/50 bg-gradient-to-b from-sage-600/72 via-amber-50/28 to-sage-100/72 p-1.5 shadow-lg shadow-rust-900/8 ring-1 ring-amber-100/60 sm:p-2"
        style={{ boxShadow: 'inset 0 1px 0 0 rgba(255, 252, 245, 0.45), 0 8px 24px -6px rgba(100, 70, 55, 0.1)' }}
      >
        <ComposableMap
          width={1200}
          height={700}
          projection="geoAlbersUsa"
          projectionConfig={{ scale: 1480 }}
          className="h-auto w-full block"
        >
          <defs>
            <linearGradient id="stopBadgeFill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fffdf8" />
              <stop offset="100%" stopColor="#f9efe7" />
            </linearGradient>
            <filter id="stopBadgeShadow" x="-30%" y="-40%" width="160%" height="220%">
              <feDropShadow dx="0" dy="1.2" stdDeviation="0.9" floodColor="#6a2e1d" floodOpacity="0.2" />
            </filter>
          </defs>

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

          {ROUTE_PATH_D && (
            <>
              {/* faint halo so the dashed route reads on darker sage state fills */}
              <path
                d={ROUTE_PATH_D}
                fill="none"
                stroke="rgba(255, 248, 240, 0.55)"
                strokeWidth={4.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="5 3"
                style={{ pointerEvents: 'none' }}
              />
              <path
                d={ROUTE_PATH_D}
                fill="none"
                stroke="#f97316"
                strokeWidth={2.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="5 3"
                opacity={0.98}
                style={{ pointerEvents: 'none' }}
              />
            </>
          )}

          {states.map((s) => (
            <Marker
              key={s.slug}
              coordinates={[s.lng, s.lat]}
              onClick={() => navigate(`/${s.slug}`)}
              onMouseEnter={() => setHovered(s)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'pointer' }}
            >
              <g transform={`translate(${-PIN_TIP_X * PIN_SCALE}, ${-PIN_TIP_Y * PIN_SCALE}) scale(${PIN_SCALE})`}>
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
              {STOP_LABELS_BY_SLUG[s.slug] && (
                <g className="pointer-events-none select-none" transform="translate(0 23.5)">
                  <rect
                    x={-27}
                    y={-11}
                    width={54}
                    height={19}
                    rx={9.5}
                    fill="url(#stopBadgeFill)"
                    stroke="#e8a188"
                    strokeWidth={1}
                    filter="url(#stopBadgeShadow)"
                  />
                  <rect
                    x={-25.3}
                    y={-9.3}
                    width={50.6}
                    height={15.6}
                    rx={8.2}
                    fill="none"
                    stroke="rgba(255,255,255,0.65)"
                    strokeWidth={0.7}
                  />
                  <text
                    x={0}
                    y={-0.15}
                    textAnchor="middle"
                    dominantBaseline="central"
                    alignmentBaseline="middle"
                    fill="#8f3b24"
                    fontFamily="'DM Serif Display', Georgia, serif"
                    fontSize="12.2"
                    fontWeight="400"
                    letterSpacing="0.15"
                  >
                    {STOP_LABELS_BY_SLUG[s.slug]}
                  </text>
                </g>
              )}
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
