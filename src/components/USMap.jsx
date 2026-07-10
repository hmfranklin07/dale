import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { geoAlbersUsa, geoPath } from 'd3-geo'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import states from '../data/states.json'
import { preloadStatePhotoHero } from '../lib/statePhotoHeroes'
import {
  PIN_BODY_DEFAULT,
  PIN_BODY_HOVER,
  PIN_INNER_FILL,
  PIN_RIM_COLOR,
  PIN_RIM_WIDTH,
  PIN_DIAMOND_FILL,
  PIN_DIAMOND_FILL_HOVER,
  PIN_DIAMOND_STROKE,
  PIN_DIAMOND_INNER,
} from '../config/mapPinColors'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json'

// Four sage steps — slightly more contrast than the soft default, but not the heavy “pop” pass
// Index 0 = lightest … 3 = darkest
const STATE_FILLS = ['#c4d1b2', '#a7b58c', '#81986a', '#5c6a47']
const FILL_HOVER = '#8da56e'
const FILL_POP = '#a3bc84'
const STROKE = '#343b2e'
const STROKE_POP = '#4a5638'
const EXCLUDED_STATE_NAMES = new Set(['alaska', 'hawaii'])

/** Trip-stop states that lift slightly on hover. */
const HIGHLIGHT_STATE_NAMES = new Set([
  'new york',
  'illinois',
  'idaho',
  'arkansas',
  'florida',
  'nebraska',
  'arizona',
])

/** Map geography names that route to a different page slug (e.g. Arizona → More). */
const STATE_ROUTE_SLUG_OVERRIDES = {
  arizona: 'more',
}

/** Side-trip pins — not full research stops; visually distinct from stop markers. */
const MAP_SIDE_PINS = [
  {
    id: 'grand-canyon',
    name: 'Grand Canyon',
    heroIntro: 'See more · Arizona',
    badgeLabel: 'See more',
    lng: -112.1401,
    lat: 36.0544,
    linkSlug: 'more',
    geoStateName: 'arizona',
    isSidePin: true,
  },
]

const STATE_NAME_BY_SLUG = Object.fromEntries(
  states.map((s) => [s.slug, s.name.trim().toLowerCase()])
)

const SLUG_BY_STATE_NAME = Object.fromEntries(
  states.map((s) => [s.name.trim().toLowerCase(), s.slug])
)

const POP_SCALE = 1.058
const POP_LIFT = 7

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
  delaware: -1, // one shade lighter
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
const PIN_DEFAULT = PIN_BODY_DEFAULT
const PIN_HOVER = PIN_BODY_HOVER

// Pin path is ~24 units tall; scale + translate anchor the tip on lat/lng
const PIN_SCALE = 2.15
const PIN_TIP_X = 12
const PIN_TIP_Y = 24
const SIDE_PIN_SCALE = 1.98
const SIDE_PIN_TIP_X = 12
const SIDE_PIN_TIP_Y = 18
const stateBySlug = Object.fromEntries(states.map((s) => [s.slug, s]))
const STOP_LABELS_BY_SLUG = {
  'new-york': 'Stop 1',
  illinois: 'Stop 2',
  nebraska: 'Stop 3',
  idaho: 'Stop 4',
  arkansas: 'Stop 5',
  florida: 'Stop 6',
}

// Route control points: actual driving corridors (I-90/I-80 west, Black Hills/Yellowstone,
// I-84 through Idaho, CA/NV return south, I-40 east, OKC/Tulsa to Arkansas).
const ROUTE_CONTROL_POINTS = [
  // Arkport, NY → Bradford, IL (I-90 / I-80) — stay on land along southern Lake Erie
  stateBySlug['new-york'] && [stateBySlug['new-york'].lng, stateBySlug['new-york'].lat],
  [-77.9, 42.22], // Southwest toward I-86 (below Lake Ontario)
  [-78.55, 42.12], // Jamestown / Chautauqua corridor
  [-79.35, 42.08], // Dunkirk — southern Lake Erie shore
  [-80.0852, 42.1292], // Erie, PA (I-90)
  [-81.6944, 41.4993], // Cleveland (I-90)
  [-83.5552, 41.6528], // Toledo (I-80/90)
  [-86.252, 41.6761], // South Bend, IN (I-80/90)
  [-87.75, 41.88], // Chicago area (I-80 west)
  [-88.42, 41.36], // Morris, IL (I-80)
  stateBySlug.illinois && [stateBySlug.illinois.lng, stateBySlug.illinois.lat],

  // Bradford → Grand Island, NE (I-80)
  [-90.58, 41.51], // Quad Cities bend (I-80)
  [-91.5302, 41.6611], // Iowa City (I-80)
  [-93.6091, 41.6005], // Des Moines (I-80)
  [-95.9345, 41.2565], // Omaha (I-80)
  [-97.592, 40.8681], // York, NE (I-80)
  stateBySlug.nebraska && [stateBySlug.nebraska.lng, stateBySlug.nebraska.lat],

  // Grand Island → Sturgis, SD
  [-100.7654, 41.1239], // North Platte, NE (I-80)
  [-102.978, 41.1427], // Sidney, NE (I-80)
  [-103.6616, 41.8666], // Scottsbluff, NE
  [-103.586, 44.4097], // Sturgis, SD

  // Sturgis → Yellowstone
  [-104.62, 44.35], // Northeast Wyoming (US-16)
  [-106.69, 44.35], // Buffalo, WY
  [-109.0568, 44.5263], // Cody, WY
  [-111.105, 44.6621], // West Yellowstone, MT

  // Yellowstone → Idaho Falls → Pocatello → Twin Falls → Boise (I-84)
  [-112.0339, 43.4917], // Idaho Falls
  [-112.4454, 42.8713], // Pocatello
  [-114.4609, 42.563], // Twin Falls
  [-115.6912, 43.1329], // Mountain Home (I-84)
  stateBySlug.idaho && [stateBySlug.idaho.lng, stateBySlug.idaho.lat],

  // Boise → Los Angeles (smooth southwest arc, no Sierra detour)
  [-117.5, 41.4], // Southern Idaho / Nevada corridor
  [-119.0, 38.6], // Eastern California sweep
  [-119.1, 36.0], // Central Valley
  [-118.6, 34.8], // Tejon Pass approach
  [-118.2437, 34.0522], // Los Angeles

  // Los Angeles → Grand Canyon
  [-117.0228, 34.8958], // Barstow (I-15/I-40)
  [-114.6147, 34.8481], // Needles, CA
  [-114.053, 35.1894], // Kingman, AZ (I-40)
  [-111.6513, 35.1983], // Flagstaff (I-40)
  [-112.1401, 36.0544], // Grand Canyon

  // Grand Canyon → Amarillo (I-40)
  [-110.6979, 35.0242], // Winslow, AZ
  [-108.7426, 35.5281], // Gallup, NM
  [-106.6504, 35.0844], // Albuquerque
  [-103.725, 35.1798], // Tucumcari, NM
  [-101.8313, 35.222], // Amarillo

  // Amarillo → Cave Springs, AR (I-40 → OKC → Tulsa)
  [-99.4043, 35.4117], // Elk City, OK
  [-97.5164, 35.4676], // Oklahoma City
  [-95.9928, 36.154], // Tulsa
  [-94.16, 36.08], // NW Arkansas approach
  stateBySlug.arkansas && [stateBySlug.arkansas.lng, stateBySlug.arkansas.lat],

  // Eastern return — unchanged
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
/** Must match ComposableMap: translate(center) then scale (see react-simple-maps makeProjection). */
const MAP_W = 1200
const MAP_H = 700
const MAP_SCALE = 1480
const MAP_PROJECTION = geoAlbersUsa().translate([MAP_W / 2, MAP_H / 2]).scale(MAP_SCALE)
const GEO_PATH = geoPath().projection(MAP_PROJECTION)

function geoCentroid(geo) {
  return GEO_PATH.centroid(geo)
}

/** Route curve uses the same centering so it lines up with pins. */
const ROUTE_PROJECTION = MAP_PROJECTION

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

function popTransform([cx, cy], scale = POP_SCALE, lift = POP_LIFT) {
  return `translate(${cx.toFixed(2)}px, ${(cy - lift).toFixed(2)}px) scale(${scale}) translate(${(-cx).toFixed(2)}px, ${(-cy).toFixed(2)}px)`
}

const POP_TRANSITION = 'transform 0.42s cubic-bezier(0.34, 1.28, 0.64, 1), filter 0.42s ease'

export default function USMap() {
  const navigate = useNavigate()
  const mapWrapRef = useRef(null)
  const [hovered, setHovered] = useState(null)
  const [hoveredGeo, setHoveredGeo] = useState(null)
  /** Center-x and top-y (px) for tooltip under the hovered pin, relative to map wrap. */
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  const poppedState = hoveredGeo || (hovered ? STATE_NAME_BY_SLUG[hovered.slug] ?? hovered.geoStateName : null)

  const routeSlugForStateName = (stateName) =>
    STATE_ROUTE_SLUG_OVERRIDES[stateName] ?? SLUG_BY_STATE_NAME[stateName]

  const goToState = (stateName) => {
    const slug = routeSlugForStateName(stateName)
    if (!slug) return
    preloadStatePhotoHero(slug)
    navigate(`/${slug}`)
  }

  const goToSlug = (slug) => {
    if (!slug) return
    preloadStatePhotoHero(slug)
    navigate(`/${slug}`)
  }

  /** Pin anchor from lat/lng → SVG viewBox coords, then map to CSS px under the marker (not cursor). */
  const placeTooltipForState = (s) => {
    const wrap = mapWrapRef.current
    if (!wrap) return
    const svg = wrap.querySelector('svg')
    if (!svg) return
    const projected = MAP_PROJECTION([s.lng, s.lat])
    if (!projected) return
    const [mx, my] = projected
    const svgRect = svg.getBoundingClientRect()
    const wrapRect = wrap.getBoundingClientRect()
    const sx = svgRect.width / MAP_W
    const sy = svgRect.height / MAP_H
    // Marker `<g>` is anchored at the pin tip; offset down past teardrop + optional stop badge.
    const belowTipSvg = 52
    setTooltipPos({
      x: svgRect.left - wrapRect.left + mx * sx,
      y: svgRect.top - wrapRect.top + (my + belowTipSvg) * sy,
    })
  }

  return (
    <div
      ref={mapWrapRef}
      className="relative w-full"
      onMouseLeave={() => {
        setHovered(null)
        setHoveredGeo(null)
      }}
    >
      <div
        className="overflow-hidden rounded-2xl border-2 border-rust-200/50 bg-gradient-to-b from-white/98 via-sage-50/95 to-sage-100/75 p-1.5 shadow-lg shadow-rust-900/10 ring-1 ring-amber-100/60 sm:p-2"
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
              <stop offset="0%" stopColor="#faf9f5" />
              <stop offset="100%" stopColor="#f9efe7" />
            </linearGradient>
            <filter id="stopBadgeShadow" x="-30%" y="-40%" width="160%" height="220%">
              <feDropShadow dx="0" dy="1.2" stdDeviation="0.9" floodColor="#6a2e1d" floodOpacity="0.2" />
            </filter>
            <filter id="statePopShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#1f2618" floodOpacity="0.22" />
              <feDropShadow dx="0" dy="7" stdDeviation="5" floodColor="#2a3322" floodOpacity="0.28" />
              <feDropShadow dx="0" dy="14" stdDeviation="10" floodColor="#1a1f14" floodOpacity="0.16" />
            </filter>
          </defs>

          <Geographies geography={GEO_URL}>
            {({ geographies }) => {
              const visible = geographies.filter(
                (geo) => !EXCLUDED_STATE_NAMES.has(normalizedStateName(geo) ?? '')
              )
              const sorted = [...visible].sort((a, b) => {
                const aPop = normalizedStateName(a) === poppedState
                const bPop = normalizedStateName(b) === poppedState
                if (aPop && !bPop) return 1
                if (!aPop && bPop) return -1
                return 0
              })

              return sorted.map((geo) => {
                const stateName = normalizedStateName(geo)
                const isHighlight = stateName && HIGHLIGHT_STATE_NAMES.has(stateName)
                const isPopped = stateName && stateName === poppedState
                const fill = isPopped ? FILL_POP : STATE_FILLS[stateShadeIndex(geo)]
                const [cx, cy] = isHighlight ? geoCentroid(geo) : [0, 0]

                const stateSlug = stateName ? SLUG_BY_STATE_NAME[stateName] : null

                if (!isHighlight) {
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
                }

                return (
                  <g
                    key={geo.rsmKey || geo.id}
                    style={{
                      transform: isPopped ? popTransform([cx, cy]) : 'translate(0px, 0px) scale(1)',
                      transition: POP_TRANSITION,
                      filter: isPopped ? 'url(#statePopShadow)' : 'none',
                    }}
                  >
                    <Geography
                      geography={geo}
                      fill={fill}
                      stroke={isPopped ? STROKE_POP : STROKE}
                      strokeWidth={isPopped ? 0.95 : 0.65}
                      onMouseEnter={() => {
                        if (stateSlug) preloadStatePhotoHero(stateSlug)
                        setHoveredGeo(stateName)
                      }}
                      onMouseLeave={() => setHoveredGeo(null)}
                      onClick={() => goToState(stateName)}
                      style={{
                        default: {
                          outline: 'none',
                          cursor: 'pointer',
                          transition: 'fill 0.35s ease, stroke 0.35s ease, stroke-width 0.35s ease',
                        },
                        hover: { outline: 'none', cursor: 'pointer' },
                        pressed: { outline: 'none', cursor: 'pointer' },
                      }}
                    />
                  </g>
                )
              })
            }}
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

          {states.map((s) => {
            const stateName = STATE_NAME_BY_SLUG[s.slug]
            const isPinPopped = poppedState === stateName

            return (
            <Marker
              key={s.slug}
              coordinates={[s.lng, s.lat]}
              onClick={() => navigate(`/${s.slug}`)}
              onMouseEnter={() => {
                preloadStatePhotoHero(s.slug)
                setHovered(s)
                requestAnimationFrame(() => placeTooltipForState(s))
              }}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'pointer' }}
            >
              <g
                style={{
                  transform: isPinPopped ? 'translate(0px, -6px) scale(1.07)' : 'translate(0px, 0px) scale(1)',
                  transition: POP_TRANSITION,
                  transformOrigin: '12px 24px',
                }}
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
                    stroke="rgba(250,249,245,0.65)"
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
              </g>
            </Marker>
            )
          })}

          {MAP_SIDE_PINS.map((pin) => {
            const isPinPopped = poppedState === pin.geoStateName
            const isHovered = hovered?.id === pin.id

            return (
              <Marker
                key={pin.id}
                coordinates={[pin.lng, pin.lat]}
                onClick={() => goToSlug(pin.linkSlug)}
                onMouseEnter={() => {
                  setHoveredGeo(pin.geoStateName)
                  setHovered(pin)
                  requestAnimationFrame(() => placeTooltipForState(pin))
                }}
                onMouseLeave={() => {
                  setHovered(null)
                  setHoveredGeo(null)
                }}
                style={{ cursor: 'pointer' }}
              >
                <g
                  style={{
                    transform: isPinPopped ? 'translate(0px, -5px) scale(1.06)' : 'translate(0px, 0px) scale(1)',
                    transition: POP_TRANSITION,
                    transformOrigin: `${SIDE_PIN_TIP_X}px ${SIDE_PIN_TIP_Y}px`,
                  }}
                >
                  <g
                    transform={`translate(${-SIDE_PIN_TIP_X * SIDE_PIN_SCALE}, ${-SIDE_PIN_TIP_Y * SIDE_PIN_SCALE}) scale(${SIDE_PIN_SCALE})`}
                  >
                    <circle cx={12} cy={8} r={18} fill="rgba(0,0,0,0)" className="cursor-pointer" />
                    <path
                      d="M12 2 L18 10 L12 18 L6 10 Z"
                      fill={isHovered ? PIN_DIAMOND_FILL_HOVER : PIN_DIAMOND_FILL}
                      stroke={PIN_DIAMOND_STROKE}
                      strokeWidth={PIN_RIM_WIDTH}
                      strokeLinejoin="round"
                    />
                    <circle
                      cx={12}
                      cy={10}
                      r={3.5}
                      fill={PIN_DIAMOND_INNER}
                      stroke={PIN_DIAMOND_STROKE}
                      strokeWidth={PIN_RIM_WIDTH}
                      className="pointer-events-none"
                    />
                  </g>
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
                      stroke="rgba(250,249,245,0.65)"
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
                      {pin.badgeLabel}
                    </text>
                  </g>
                </g>
              </Marker>
            )
          })}
        </ComposableMap>
      </div>

      {hovered && (
        <div
          className="pointer-events-none absolute z-20 w-[min(17.5rem,calc(100%-1.5rem))] max-w-sm rounded-xl border-2 border-rust-400 bg-white px-4 py-2.5 text-center shadow-lg shadow-rust-900/20"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y,
            transform: 'translate(-50%, 0)',
          }}
        >
          <p className="font-display text-[18px] font-semibold uppercase leading-none tracking-wider text-earth-900 sm:text-[20px] sm:leading-none">
            {hovered.name}
          </p>
          {hovered.heroIntro ? (
            <p
              className="mt-2 font-display text-[13px] font-semibold leading-none tracking-wider sm:text-sm sm:leading-none"
              style={{ color: PIN_BODY_DEFAULT }}
            >
              {hovered.heroIntro}
            </p>
          ) : null}
          <p
            className={`text-sm leading-tight text-earth-700 ${hovered.heroIntro ? 'mt-1' : 'mt-2'}`}
          >
            {hovered.isSidePin ? 'Click to see more' : 'Click for field notes & interviews'}
          </p>
        </div>
      )}
    </div>
  )
}
