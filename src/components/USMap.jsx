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
} from '../config/mapPinColors'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json'

// Four sage steps — index 0 = darkest … 3 = lightest (more dark states than light)
const STATE_FILLS = ['#656d44', '#8d9962', '#b1b584', '#ced1aa']
const FILL_HOVER = '#99a667'
const FILL_POP = '#afbd7d'
const STROKE = '#3b3f2b'
const STROKE_POP = '#535a34'
const EXCLUDED_STATE_NAMES = new Set(['alaska', 'hawaii'])

/** Trip-stop states that lift slightly on hover. */
const HIGHLIGHT_STATE_NAMES = new Set([
  'new york',
  'illinois',
  'idaho',
  'arkansas',
  'oklahoma',
  'florida',
  'nebraska',
  'arizona',
  'south dakota',
  'massachusetts',
])

/** Map geography names that route to a different page slug (e.g. Arizona → More). */
const STATE_ROUTE_SLUG_OVERRIDES = {
  arizona: 'more',
  'south dakota': 'more',
  florida: 'more',
  massachusetts: 'more',
  oklahoma: 'arkansas',
}

/** Rapid City corridor — shared by route curve and see-more pin */
const RAPID_CITY_LNG = -103.25
const RAPID_CITY_LAT = 44.05

/** North Florida — see-more side pin (coords shared with route curve). */
const NORTH_FLORIDA_LNG = -82.1221
const NORTH_FLORIDA_LAT = 30.2819

/** Harvard University — reflection pin only; not a road-trip stop. */
const HARVARD_LNG = -71.1167
const HARVARD_LAT = 42.3744

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
    linkHash: 'grand-canyon',
    geoStateName: 'arizona',
    isSidePin: true,
  },
  {
    id: 'rapid-city',
    name: 'Rapid City',
    heroIntro: 'See more · South Dakota',
    badgeLabel: 'See more',
    lng: RAPID_CITY_LNG,
    lat: RAPID_CITY_LAT,
    linkSlug: 'more',
    geoStateName: 'south dakota',
    isSidePin: true,
  },
  {
    id: 'north-florida',
    name: 'North Florida',
    heroIntro: 'See more · Florida',
    badgeLabel: 'See more',
    lng: NORTH_FLORIDA_LNG,
    lat: NORTH_FLORIDA_LAT,
    linkSlug: 'more',
    geoStateName: 'florida',
    isSidePin: true,
  },
  {
    id: 'harvard',
    name: 'Harvard',
    heroIntro: 'See more · Massachusetts',
    badgeLabel: 'See more',
    lng: HARVARD_LNG,
    lat: HARVARD_LAT,
    linkSlug: 'more',
    linkHash: 'from-rural-america-to-the-ivy-league',
    geoStateName: 'massachusetts',
    isSidePin: true,
  },
]

/** Primary geography name used for pin hover pop (single state on the map). */
const STATE_NAME_BY_SLUG = Object.fromEntries(
  states.map((s) => [s.slug, (s.mapStateName || s.name).trim().toLowerCase()])
)

/** Geography name → page slug, including multi-state stops (e.g. Oklahoma → arkansas). */
const SLUG_BY_STATE_NAME = Object.fromEntries(
  states.flatMap((s) => {
    const names = s.mapStateNames?.length
      ? s.mapStateNames
      : [s.mapStateName || s.name]
    return names.map((n) => [String(n).trim().toLowerCase(), s.slug])
  })
)

const POP_SCALE = 1.058
const POP_LIFT = 7

/**
 * Proper 4-coloring of the contiguous US — no two land-adjacent states share a shade.
 * Indices map into STATE_FILLS (0 darkest … 3 lightest).
 */
const STATE_SHADE_BY_NAME = {
  alabama: 3,
  arizona: 2,
  arkansas: 2,
  california: 0,
  colorado: 0,
  connecticut: 2,
  delaware: 2,
  florida: 1,
  georgia: 0,
  idaho: 0,
  illinois: 3,
  indiana: 0,
  iowa: 1,
  kansas: 3,
  kentucky: 2,
  louisiana: 1,
  maine: 0,
  maryland: 1,
  massachusetts: 0,
  michigan: 2,
  minnesota: 2,
  mississippi: 0,
  missouri: 0,
  montana: 1,
  nebraska: 2,
  nevada: 3,
  'new hampshire': 1,
  'new jersey': 3,
  'new mexico': 3,
  'new york': 1,
  'north carolina': 2,
  'north dakota': 3,
  ohio: 1,
  oklahoma: 1,
  oregon: 1,
  pennsylvania: 0,
  'rhode island': 1,
  'south carolina': 1,
  'south dakota': 0,
  tennessee: 1,
  texas: 0,
  utah: 1,
  vermont: 2,
  virginia: 0,
  washington: 2,
  'west virginia': 3,
  wisconsin: 0,
  wyoming: 3,
}

function normalizedStateName(geo) {
  const p = geo.properties || {}
  const n = p.name || p.NAME
  if (n == null || n === '') return null
  return String(n).trim().toLowerCase()
}

/** Shade index 0..3 — adjacency-safe when named; hash fallback for anything else. */
function stateShadeIndex(geo) {
  const stateName = normalizedStateName(geo)
  if (stateName && Object.prototype.hasOwnProperty.call(STATE_SHADE_BY_NAME, stateName)) {
    return STATE_SHADE_BY_NAME[stateName]
  }
  const p = geo.properties || {}
  const label = [p.name, p.NAME, p.nam, p.stusps, p.STUSPS, geo.id].filter(Boolean).join('|')
  if (!label) return 0
  let h = 2166136261
  for (let i = 0; i < label.length; i++) h = Math.imul(h ^ label.charCodeAt(i), 16777619)
  return (h >>> 0) & 3
}
const PIN_DEFAULT = PIN_BODY_DEFAULT
const PIN_HOVER = PIN_BODY_HOVER

// Pin path is ~24 units tall; scale + translate anchor the tip on lat/lng
const PIN_SCALE = 2.15
const PIN_TIP_X = 12
const PIN_TIP_Y = 24
const SIDE_PIN_DIAMOND_SCALE = 2.9
const SIDE_PIN_INNER_SCALE = 2.15
/** Match teardrop rim thickness after diamond’s larger scale transform */
const SIDE_PIN_STROKE_WIDTH = (PIN_RIM_WIDTH * PIN_SCALE) / SIDE_PIN_DIAMOND_SCALE
const SIDE_PIN_TIP_X = 12
const SIDE_PIN_TIP_Y = 18
/** See more badge — wider than stop labels for comfortable padding */
const SIDE_BADGE_WIDTH = 84
const SIDE_BADGE_INNER_WIDTH = 79
const STOP_BADGE_WIDTH = 64
const STOP_BADGE_INNER_WIDTH = 59
const BADGE_HEIGHT = 23
const BADGE_INNER_HEIGHT = 18.8
const BADGE_RX = 3
const BADGE_INNER_RX = 2
const BADGE_FONT_SIZE = 14.4
const BADGE_Y_OFFSET = 26.5
const stateBySlug = Object.fromEntries(states.map((s) => [s.slug, s]))
const STOP_LABELS_BY_SLUG = {
  'new-york': 'Stop 1',
  illinois: 'Stop 2',
  nebraska: 'Stop 3',
  idaho: 'Stop 4',
  arkansas: 'Stop 5',
}

// Route control points: actual driving corridors (I-90/I-80 west, Black Hills/Yellowstone,
// I-84 through Idaho, Yosemite across to Arizona, I-40 east, OKC/Tulsa to Arkansas).
const ROUTE_CONTROL_POINTS = [
  // Arkport, NY → Bradford, IL (I-90 / I-80) — stay on land along southern Lake Erie
  stateBySlug['new-york'] && [stateBySlug['new-york'].lng, stateBySlug['new-york'].lat],
  [-78.55, 42.13], // I-86 toward the southern Lake Erie shore
  [-79.35, 42.08], // Dunkirk — southern Lake Erie shore
  [-80.0852, 42.1292], // Erie, PA (I-90)
  [-81.6944, 41.4993], // Cleveland (I-90)
  [-83.5552, 41.6528], // Toledo (I-80/90)
  [-86.252, 41.6761], // South Bend, IN (I-80/90)
  [-88.0, 41.56], // I-80 south of Chicago
  stateBySlug.illinois && [stateBySlug.illinois.lng, stateBySlug.illinois.lat],

  // Bradford → Grand Island, NE (I-80)
  [-91.15, 41.58], // I-80 into eastern Iowa
  [-93.6091, 41.6005], // Des Moines (I-80)
  [-95.9345, 41.2565], // Omaha (I-80)
  [-97.592, 40.8681], // York, NE (I-80)
  stateBySlug.nebraska && [stateBySlug.nebraska.lng, stateBySlug.nebraska.lat],

  // Grand Island → Sturgis, SD
  [-100.7654, 41.1239], // North Platte, NE (I-80)
  [-102.95, 41.51], // Western Nebraska
  [-103.38, 42.67], // Approach the Black Hills from the south
  [RAPID_CITY_LNG, RAPID_CITY_LAT], // Rapid City area (I-90)
  [-103.586, 44.4097], // Sturgis, SD

  // Sturgis → Yellowstone
  [-104.62, 44.43], // Northeast Wyoming (US-16)
  [-106.69, 44.35], // Buffalo, WY
  [-109.0568, 44.5263], // Cody, WY
  [-111.105, 44.6621], // West Yellowstone, MT

  // Yellowstone → eastern Idaho → Twin Falls → Boise (I-84)
  [-112.32, 43.14], // Idaho Falls / Pocatello corridor
  [-114.4609, 42.563], // Twin Falls
  stateBySlug.idaho && [stateBySlug.idaho.lng, stateBySlug.idaho.lat],

  // Boise → Yosemite via northern Nevada and the Sierra foothills
  [-117.36, 43.14], // Southeast Oregon
  [-117.7357, 40.973], // Winnemucca, NV
  [-119.8138, 39.5296], // Reno, NV
  [-120.32, 38.5], // Sierra foothills
  [-119.59, 37.74], // Yosemite Valley

  // Yosemite → Grand Canyon via the eastern Sierra and southern Nevada
  [-118.77, 37.85], // Eastern Sierra
  [-117.23, 37.65], // Central Nevada
  [-115.14, 36.17], // Las Vegas, NV
  [-113.95, 35.37], // Kingman / I-40 corridor
  [-112.1401, 36.0544], // Grand Canyon

  // Grand Canyon → Amarillo (I-40)
  [-110.82, 35.49], // Toward I-40 in eastern Arizona
  [-108.72, 35.33], // Western New Mexico
  [-106.6504, 35.0844], // Albuquerque
  [-101.8313, 35.222], // Amarillo

  // Amarillo → Cave Springs, AR (I-40 → OKC → Tulsa)
  [-97.5164, 35.4676], // Oklahoma City
  [-95.9928, 36.154], // Tulsa
  stateBySlug.arkansas && [stateBySlug.arkansas.lng, stateBySlug.arkansas.lat],

  // Arkansas → North Florida through the western Panhandle
  [-92.3, 35.23], // Central Arkansas
  [-90.09, 34.91], // Memphis corridor
  [-88.05, 33.94], // Northeast Mississippi
  [-86.75, 32.91], // Central Alabama
  [-86.12, 31.08], // Approach the western Panhandle
  [-85.17, 30.58], // Panhandle eastbound
  [-83.73, 30.42], // Tallahassee corridor
  [NORTH_FLORIDA_LNG, NORTH_FLORIDA_LAT],

  // Swing back north-east: Florida see-more pin -> DC -> New York pin
  [-81.58, 31.57], // Georgia coastal plain
  [-80.19, 33.02], // Charleston corridor
  [-78.64, 35.78], // Raleigh
  [-77.04, 38.91], // Washington, DC
  [-76.03, 40.46], // Eastern Pennsylvania
  [-76.28, 41.83], // Arc toward New York
  [-76.96, 42.28], // Enter from the east
  stateBySlug['new-york'] && [stateBySlug['new-york'].lng, stateBySlug['new-york'].lat],
].filter(Boolean)

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
  const last = projected.length - 1
  const closed = projected[0].x === projected[last].x && projected[0].y === projected[last].y
  const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y)
  for (let i = 0; i < last; i++) {
    const p0 = projected[i - 1] ?? projected[closed ? last - 1 : 0]
    const p1 = projected[i]
    const p2 = projected[i + 1]
    const p3 = projected[i + 2] ?? projected[closed ? 1 : last]
    const length = distance(p1, p2)
    if (length === 0) continue

    // Scale each handle to the length of its segment so short bends do not overshoot.
    const startWeight = length / (3 * (distance(p0, p1) + length))
    const endWeight = length / (3 * (length + distance(p2, p3)))
    const cp1x = p1.x + (p2.x - p0.x) * startWeight
    const cp1y = p1.y + (p2.y - p0.y) * startWeight
    const cp2x = p2.x - (p3.x - p1.x) * endWeight
    const cp2y = p2.y - (p3.y - p1.y) * endWeight

    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`
  }
  return d
}

const ROUTE_PATH_D = routePathD(ROUTE_CONTROL_POINTS)

function popTransform([cx, cy], scale = 1, lift = 0) {
  // Keep the same transform function list at rest and when popped so CSS
  // interpolates as a straight vertical lift + scale (no sideways drift).
  return `translate(${cx.toFixed(2)}px, ${(cy - lift).toFixed(2)}px) scale(${scale}) translate(${(-cx).toFixed(2)}px, ${(-cy).toFixed(2)}px)`
}

const POP_TRANSITION = 'transform 0.38s cubic-bezier(0.22, 1, 0.36, 1), filter 0.38s ease'

export default function USMap() {
  const navigate = useNavigate()
  const mapWrapRef = useRef(null)
  const [hovered, setHovered] = useState(null)
  const [hoveredGeo, setHoveredGeo] = useState(null)
  /** Center-x and top-y (px) for tooltip under the hovered pin, relative to map wrap. */
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  const poppedState =
    hoveredGeo || (hovered ? STATE_NAME_BY_SLUG[hovered.slug] ?? hovered.geoStateName : null)

  const clearHover = () => {
    setHovered(null)
    setHoveredGeo(null)
  }

  const routeSlugForStateName = (stateName) =>
    STATE_ROUTE_SLUG_OVERRIDES[stateName] ?? SLUG_BY_STATE_NAME[stateName]

  const goToState = (stateName) => {
    const slug = routeSlugForStateName(stateName)
    if (!slug) return
    preloadStatePhotoHero(slug)
    navigate(`/${slug}`)
  }

  const goToSlug = (slug, hash) => {
    if (!slug) return
    preloadStatePhotoHero(slug)
    navigate(hash ? `/${slug}#${hash}` : `/${slug}`)
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
    const nudgeX = s.nudgeX ?? 0
    const nudgeY = s.nudgeY ?? 0
    setTooltipPos({
      x: svgRect.left - wrapRect.left + (mx + nudgeX) * sx,
      y: svgRect.top - wrapRect.top + (my + belowTipSvg + nudgeY) * sy,
    })
  }

  return (
    <div
      ref={mapWrapRef}
      className="relative w-full"
      onMouseLeave={clearHover}
      onPointerLeave={clearHover}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) clearHover()
      }}
    >
      <div
        className="overflow-hidden rounded-md border border-earth-200 bg-white p-1 shadow-sm sm:p-1.5"
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
              <stop offset="100%" stopColor="#f3e6d6" />
            </linearGradient>
            <filter id="stopBadgeShadow" x="-30%" y="-40%" width="160%" height="220%">
              <feDropShadow dx="0" dy="1.2" stdDeviation="0.9" floodColor="#5e3a26" floodOpacity="0.2" />
            </filter>
            <filter id="statePopShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#262916" floodOpacity="0.22" />
              <feDropShadow dx="0" dy="7" stdDeviation="5" floodColor="#32361f" floodOpacity="0.28" />
              <feDropShadow dx="0" dy="14" stdDeviation="10" floodColor="#202212" floodOpacity="0.16" />
            </filter>
          </defs>

          <Geographies geography={GEO_URL}>
            {({ geographies }) => {
              // Stable paint order — never re-sort on hover. Reordering remounts paths mid-hover
              // and can drop mouseLeave, leaving a state stuck "popped".
              const visible = geographies
                .filter((geo) => !EXCLUDED_STATE_NAMES.has(normalizedStateName(geo) ?? ''))
                .sort((a, b) => {
                  const aHi = HIGHLIGHT_STATE_NAMES.has(normalizedStateName(a) ?? '')
                  const bHi = HIGHLIGHT_STATE_NAMES.has(normalizedStateName(b) ?? '')
                  if (aHi === bHi) {
                    return String(a.rsmKey || a.id).localeCompare(String(b.rsmKey || b.id))
                  }
                  return aHi ? 1 : -1
                })

              return visible.map((geo) => {
                const stateName = normalizedStateName(geo)
                const isHighlight = stateName && HIGHLIGHT_STATE_NAMES.has(stateName)
                const isPopped = stateName && stateName === poppedState
                const fill = isPopped ? FILL_POP : STATE_FILLS[stateShadeIndex(geo)]
                const [cx, cy] = isHighlight ? geoCentroid(geo) : [0, 0]
                const stateSlug = stateName
                  ? STATE_ROUTE_SLUG_OVERRIDES[stateName] ?? SLUG_BY_STATE_NAME[stateName]
                  : null

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
                      transform: isPopped
                        ? popTransform([cx, cy], POP_SCALE, POP_LIFT)
                        : popTransform([cx, cy], 1, 0),
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
                      onMouseLeave={() => {
                        setHoveredGeo((current) => (current === stateName ? null : current))
                      }}
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
                stroke={PIN_BODY_DEFAULT}
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
            // Multi-state stops (e.g. AR & OK): pin rises with either hovered state
            const pinPopNames = (s.mapStateNames?.length
              ? s.mapStateNames
              : [s.mapStateName || s.name]
            ).map((n) => String(n).trim().toLowerCase())
            const isPinPopped = Boolean(poppedState && pinPopNames.includes(poppedState))

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
              onMouseLeave={clearHover}
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
                <g className="pointer-events-none select-none" transform={`translate(0 ${BADGE_Y_OFFSET})`}>
                  <rect
                    x={-STOP_BADGE_WIDTH / 2}
                    y={-BADGE_HEIGHT / 2}
                    width={STOP_BADGE_WIDTH}
                    height={BADGE_HEIGHT}
                    rx={BADGE_RX}
                    fill="url(#stopBadgeFill)"
                    stroke={PIN_RIM_COLOR}
                    strokeWidth={1.15}
                    filter="url(#stopBadgeShadow)"
                  />
                  <rect
                    x={-STOP_BADGE_INNER_WIDTH / 2}
                    y={-BADGE_INNER_HEIGHT / 2}
                    width={STOP_BADGE_INNER_WIDTH}
                    height={BADGE_INNER_HEIGHT}
                    rx={BADGE_INNER_RX}
                    fill="none"
                    stroke="rgba(250,249,245,0.65)"
                    strokeWidth={0.8}
                  />
                  <text
                    x={0}
                    y={-0.15}
                    textAnchor="middle"
                    dominantBaseline="central"
                    alignmentBaseline="middle"
                    className="font-display fill-rust-700"
                    fontSize={BADGE_FONT_SIZE}
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
                onClick={() => goToSlug(pin.linkSlug, pin.linkHash)}
                onMouseEnter={() => {
                  setHoveredGeo(pin.geoStateName)
                  setHovered(pin)
                  requestAnimationFrame(() => placeTooltipForState(pin))
                }}
                onMouseLeave={clearHover}
                style={{ cursor: 'pointer' }}
              >
                <g
                  transform={`translate(${pin.nudgeX ?? 0} ${pin.nudgeY ?? 0})`}
                  style={{
                    transform: isPinPopped ? 'translate(0px, -5px) scale(1.06)' : 'translate(0px, 0px) scale(1)',
                    transition: POP_TRANSITION,
                    transformOrigin: `${SIDE_PIN_TIP_X}px ${SIDE_PIN_TIP_Y}px`,
                  }}
                >
                  <g
                    transform={`translate(${-SIDE_PIN_TIP_X * SIDE_PIN_DIAMOND_SCALE}, ${-SIDE_PIN_TIP_Y * SIDE_PIN_DIAMOND_SCALE}) scale(${SIDE_PIN_DIAMOND_SCALE})`}
                  >
                    <circle cx={12} cy={8} r={18} fill="rgba(0,0,0,0)" className="cursor-pointer" />
                    <path
                      d="M12 2 L18 10 L12 18 L6 10 Z"
                      fill={isHovered ? PIN_DIAMOND_FILL_HOVER : PIN_DIAMOND_FILL}
                      stroke={PIN_DIAMOND_STROKE}
                      strokeWidth={SIDE_PIN_STROKE_WIDTH}
                      strokeLinejoin="round"
                    />
                    <g transform={`translate(12, 10) scale(${SIDE_PIN_INNER_SCALE / SIDE_PIN_DIAMOND_SCALE})`}>
                      <circle
                        cx={0}
                        cy={0}
                        r={3.5}
                        fill={PIN_INNER_FILL}
                        stroke={PIN_DIAMOND_STROKE}
                        strokeWidth={PIN_RIM_WIDTH}
                        className="pointer-events-none"
                      />
                    </g>
                  </g>
                  <g className="pointer-events-none select-none" transform={`translate(0 ${BADGE_Y_OFFSET})`}>
                    <rect
                      x={-SIDE_BADGE_WIDTH / 2}
                      y={-BADGE_HEIGHT / 2}
                      width={SIDE_BADGE_WIDTH}
                      height={BADGE_HEIGHT}
                      rx={BADGE_RX}
                      fill="url(#stopBadgeFill)"
                      stroke={PIN_RIM_COLOR}
                      strokeWidth={1.15}
                      filter="url(#stopBadgeShadow)"
                    />
                    <rect
                      x={-(SIDE_BADGE_INNER_WIDTH / 2)}
                      y={-BADGE_INNER_HEIGHT / 2}
                      width={SIDE_BADGE_INNER_WIDTH}
                      height={BADGE_INNER_HEIGHT}
                      rx={BADGE_INNER_RX}
                      fill="none"
                      stroke="rgba(250,249,245,0.65)"
                      strokeWidth={0.8}
                    />
                    <text
                      x={0}
                      y={-0.15}
                      textAnchor="middle"
                      dominantBaseline="central"
                      alignmentBaseline="middle"
                      className="font-display fill-rust-700"
                      fontSize={BADGE_FONT_SIZE}
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
          className="pointer-events-none absolute z-20 w-[min(17.5rem,calc(100%-1.5rem))] max-w-sm rounded-md border border-earth-200 bg-white px-4 py-2.5 text-center shadow-md"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y,
            transform: 'translate(-50%, 0)',
          }}
        >
          <p className="font-display text-[1.35rem] leading-none tracking-[-0.02em] text-earth-900">
            {hovered.name}
          </p>
          {hovered.heroIntro ? (
            <p
              className="mt-2 font-sans text-[0.72rem] font-medium uppercase leading-none tracking-[0.14em]"
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
