import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import states from '../data/states.json'

const primary = [
  { to: '/', label: 'Home' },
  { to: '/vlog', label: 'Vlog' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `px-2.5 sm:px-3 py-2 rounded-lg text-sm font-medium transition-colors shrink-0 ${
      isActive ? 'bg-sage-200 text-sage-900' : 'text-earth-800 hover:text-earth-900 hover:bg-sage-100/90'
    }`

  const mobileLink = ({ isActive }) =>
    `block px-3 py-2.5 text-sm font-medium rounded-lg ${
      isActive ? 'bg-sage-200 text-sage-900' : 'text-earth-800 hover:bg-sage-100/90'
    }`

  return (
    <nav className="sticky top-0 z-50 border-b border-sage-200/50 bg-gradient-to-r from-amber-50/55 via-white/95 to-sage-100/60 shadow-sm shadow-earth-900/5 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">🔬</span>
            <span className="font-display bg-gradient-to-r from-earth-900 to-sage-800 bg-clip-text text-lg text-transparent sm:text-xl">
              STEM on the Road
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-0.5 flex-1 min-w-0 justify-end">
            {primary.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === '/'} className={linkClass}>
                {link.label}
              </NavLink>
            ))}
            {states.map((s) => (
              <NavLink key={s.slug} to={`/${s.slug}`} className={linkClass}>
                {s.name}
              </NavLink>
            ))}
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-lg text-earth-800 hover:bg-sage-100/90"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div className="hidden md:flex lg:hidden border-t border-sage-200/90 py-2 overflow-x-auto gap-1">
          {primary.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setOpen(false)}
              className={linkClass}
            >
              {link.label}
            </NavLink>
          ))}
          {states.map((s) => (
            <NavLink key={s.slug} to={`/${s.slug}`} onClick={() => setOpen(false)} className={linkClass}>
              {s.name}
            </NavLink>
          ))}
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-sage-200/90 bg-white max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-3 space-y-0.5">
            {primary.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setOpen(false)}
                className={mobileLink}
              >
                {link.label}
              </NavLink>
            ))}
            <p className="pt-2 pb-1 px-1 text-xs font-semibold text-earth-500 uppercase tracking-wide">States</p>
            {states.map((s) => (
              <NavLink
                key={s.slug}
                to={`/${s.slug}`}
                onClick={() => setOpen(false)}
                className={mobileLink}
              >
                {s.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
