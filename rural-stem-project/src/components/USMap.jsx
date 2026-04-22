import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps'
import towns from '../data/towns.json'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json'

export default function USMap() {
  const navigate = useNavigate()
  const [hoveredTown, setHoveredTown] = useState(null)

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
                key={geo.rpianoProperty?.val || geo.id}
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

        {towns.map((town) => (
          <Marker
            key={town.slug}
            coordinates={[town.lng, town.lat]}
            onClick={() => navigate(`/towns/${town.slug}`)}
            onMouseEnter={() => setHoveredTown(town)}
            onMouseLeave={() => setHoveredTown(null)}
            style={{ cursor: 'pointer' }}
          >
            <g transform="translate(-12, -24)">
              <path
                d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 16 8 16s8-10.75 8-16c0-4.42-3.58-8-8-8z"
                fill={hoveredTown?.slug === town.slug ? '#e2724d' : '#cf5733'}
                stroke="#fff"
                strokeWidth={1.5}
              />
              <circle cx={12} cy={8} r={3} fill="#fff" />
            </g>
          </Marker>
        ))}
      </ComposableMap>

      {hoveredTown && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg px-5 py-3 pointer-events-none border border-sage-100">
          <p className="font-display text-lg text-earth-900">{hoveredTown.name}</p>
          <p className="text-sm text-earth-500">{hoveredTown.state}</p>
        </div>
      )}
    </div>
  )
}
