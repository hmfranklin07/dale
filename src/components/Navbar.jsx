import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import states from '../data/states.json'

const primary = [
  { to: '/', label: 'Home' },
  { to: '/blog', label: 'Blog' },
]

/** Microscope outline — paths from Lucide (ISC). https://lucide.dev/icons/microscope */
function NavbarMicroscopeIcon({ className = 'h-7 w-7 shrink-0 text-sage-700' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 18h8" />
      <path d="M3 22h18" />
      <path d="M14 22a7 7 0 1 0 0-14h-1" />
      <path d="M9 14h2" />
      <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
      <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
    </svg>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `px-2.5 sm:px-3 py-2 rounded-lg text-sm font-medium transition-colors shrink-0 ${
      isActive
        ? 'bg-sage-900 text-white shadow-sm shadow-sage-900/25 ring-1 ring-sage-700/50'
        : 'text-earth-800 hover:bg-sage-100/95 hover:text-sage-900'
    }`

  const mobileLink = ({ isActive }) =>
    `block px-3 py-2.5 text-sm font-medium rounded-lg ${
      isActive
        ? 'bg-sage-900 text-white ring-1 ring-sage-700/50'
        : 'text-earth-800 hover:bg-sage-100/95 hover:text-sage-900'
    }`

  return (
    <nav className="sticky top-0 z-50 border-b border-sage-800/25 bg-gradient-to-r from-sage-100/92 via-amber-50/95 to-sage-900/18 shadow-sm shadow-sage-900/10 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <NavbarMicroscopeIcon className="h-7 w-7 shrink-0 text-sage-700 sm:h-8 sm:w-8" />
            <span className="font-display bg-gradient-to-r from-earth-900 via-sage-900 to-sage-700 bg-clip-text text-lg text-transparent sm:text-xl">
              STEM Across Rural America
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
              className="p-2 rounded-lg text-earth-800 hover:bg-sage-200/80 hover:text-sage-900"
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

        <div className="hidden md:flex lg:hidden border-t border-sage-800/15 bg-sage-900/5 py-2 overflow-x-auto gap-1">
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
        <div className="lg:hidden border-t border-sage-800/15 bg-gradient-to-b from-white to-sage-50/95 max-h-[80vh] overflow-y-auto">
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
            <p className="pt-2 pb-1 px-1 text-xs font-semibold text-sage-800 uppercase tracking-wide">States</p>
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
