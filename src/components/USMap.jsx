import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import states from '../data/states.json'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json'

export default function USMap() {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(null)

  return (
    <div className="relative">
      <ComposableMap
        projection="geoAlbersUsa"
        projectionConfig={{ scale: 1000 }}
        className="w-full h-auto"
        style={{ maxHeight: '500px' }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey || geo.id}
                geography={geo}
                fill="#d2d8c8"
                stroke="#f6f7f4"
                strokeWidth={1}
                style={{
                  default: { outline: 'none' },
                  hover: { fill: '#b3bea3', outline: 'none' },
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
            <g transform="translate(-12, -24)">
              <path
                d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 16 8 16s8-10.75 8-16c0-4.42-3.58-8-8-8z"
                fill={hovered?.slug === s.slug ? '#e2724d' : '#cf5733'}
                stroke="#fff"
                strokeWidth={1.5}
              />
              <circle cx={12} cy={8} r={3} fill="#fff" />
            </g>
          </Marker>
        ))}
      </ComposableMap>

      {hovered && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg px-5 py-3 pointer-events-none border border-sage-100 text-center max-w-sm">
          <p className="font-display text-lg text-earth-900">
            {hovered.name} ({hovered.abbr})
          </p>
          <p className="text-sm text-earth-500">Click to open this state’s tab</p>
        </div>
      )}
    </div>
  )
}
