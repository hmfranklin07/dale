import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import states from '../data/states.json'
import more from '../data/more.json'
import { preloadStatePhotoHero } from '../lib/statePhotoHeroes'

/** Microscope outline — paths from Lucide (ISC). https://lucide.dev/icons/microscope */
function NavbarMicroscopeIcon({ className = 'h-7 w-7 shrink-0 text-rust-500' }) {
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

const stateSlugs = new Set(states.map((s) => s.slug))

function statesNavActive(pathname) {
  const segment = pathname.split('/').filter(Boolean)[0]
  return Boolean(segment && stateSlugs.has(segment))
}

function StatesDropdown({ linkClassBase, statesOn }) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    const onPointerDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const triggerClass = `${linkClassBase} inline-flex items-center gap-1 ${
    statesOn || open
      ? 'bg-rust-500 text-white shadow-sm shadow-rust-900/20 ring-1 ring-rust-700/45'
      : 'text-earth-800 hover:bg-sage-100/95 hover:text-sage-900'
  }`

  const stateItemClass = ({ isActive }) =>
    `block w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
      isActive
        ? 'bg-rust-500 text-white'
        : 'text-earth-800 hover:bg-sage-100/95 hover:text-sage-900'
    }`

  return (
    <div
      ref={menuRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={triggerClass}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
      >
        States
        <svg
          className={`h-3.5 w-3.5 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div role="menu" className="absolute left-0 top-full z-50 min-w-[13.5rem] pt-1.5">
          <div className="rounded-xl border border-sage-300/80 bg-white/95 p-1.5 shadow-lg shadow-sage-900/15 ring-1 ring-amber-100/60 backdrop-blur-md">
            {states.map((s) => (
              <NavLink
                key={s.slug}
                to={`/${s.slug}`}
                role="menuitem"
                className={stateItemClass}
                onMouseEnter={() => preloadStatePhotoHero(s.slug)}
                onFocus={() => preloadStatePhotoHero(s.slug)}
                onClick={() => setOpen(false)}
              >
                {s.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function DesktopNavLinks({ statesOn }) {
  const linkClass = ({ isActive }) =>
    `px-2.5 py-2 rounded-lg text-sm font-medium transition-colors shrink-0 ${
      isActive
        ? 'bg-rust-500 text-white shadow-sm shadow-rust-900/20 ring-1 ring-rust-700/45'
        : 'text-earth-800 hover:bg-sage-100/95 hover:text-sage-900'
    }`

  const linkClassBase =
    'px-2.5 py-2 rounded-lg text-sm font-medium transition-colors shrink-0'

  return (
    <>
      <NavLink to="/" end className={linkClass}>
        Home
      </NavLink>
      <NavLink to="/about" className={linkClass}>
        About
      </NavLink>
      <StatesDropdown linkClassBase={linkClassBase} statesOn={statesOn} />
      <NavLink to={`/${more.slug}`} className={linkClass}>
        More
      </NavLink>
      <NavLink to="/contact" className={linkClass}>
        Contact
      </NavLink>
    </>
  )
}

export default function Navbar() {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [mobileStatesOpen, setMobileStatesOpen] = useState(false)
  const statesOn = statesNavActive(location.pathname)

  useEffect(() => {
    setMobileStatesOpen(false)
    setOpen(false)
  }, [location.pathname])

  const mobileLink = ({ isActive }) =>
    `block px-3 py-2.5 text-sm font-medium rounded-lg ${
      isActive
        ? 'bg-rust-500 text-white ring-1 ring-rust-700/45'
        : 'text-earth-800 hover:bg-sage-100/95 hover:text-sage-900'
    }`

  return (
    <nav className="sticky top-0 z-50 border-b border-sage-800/25 bg-gradient-to-r from-sage-100/92 via-amber-50/95 to-sage-900/18 shadow-sm shadow-sage-900/10 backdrop-blur-md">
      <div className="mx-auto max-w-[88rem] px-2.5 sm:px-3.5 lg:px-4">
        <div className="flex h-16 items-center justify-between gap-3">
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <NavbarMicroscopeIcon className="h-7 w-7 shrink-0 text-rust-500 sm:h-8 sm:w-8" />
            <span className="font-display text-lg text-earth-900 sm:text-xl">
              STEM Across Rural America
            </span>
          </Link>

          <div className="hidden min-w-0 flex-1 items-center justify-end gap-1.5 lg:flex">
            <DesktopNavLinks statesOn={statesOn} />
          </div>

          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="rounded-lg p-2 text-earth-800 hover:bg-sage-200/80 hover:text-sage-900"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div className="hidden items-center justify-end gap-1.5 overflow-x-auto border-t border-sage-800/15 bg-sage-900/5 py-2 md:flex lg:hidden">
          <DesktopNavLinks statesOn={statesOn} />
        </div>
      </div>

      {open && (
        <div className="max-h-[80vh] overflow-y-auto border-t border-sage-800/15 bg-gradient-to-b from-white to-sage-50/95 lg:hidden">
          <div className="space-y-0.5 px-4 py-3">
            <NavLink to="/" end onClick={() => setOpen(false)} className={mobileLink}>
              Home
            </NavLink>
            <NavLink to="/about" onClick={() => setOpen(false)} className={mobileLink}>
              About
            </NavLink>

            <button
              type="button"
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium ${
                statesOn
                  ? 'bg-rust-500 text-white ring-1 ring-rust-700/45'
                  : 'text-earth-800 hover:bg-sage-100/95 hover:text-sage-900'
              }`}
              aria-expanded={mobileStatesOpen}
              onClick={() => setMobileStatesOpen((value) => !value)}
            >
              States
              <svg
                className={`h-4 w-4 shrink-0 transition-transform ${mobileStatesOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileStatesOpen && (
              <div className="ml-2 space-y-0.5 border-l border-sage-300/70 pl-2">
                {states.map((s) => (
                  <NavLink
                    key={s.slug}
                    to={`/${s.slug}`}
                    onClick={() => setOpen(false)}
                    className={mobileLink}
                    onMouseEnter={() => preloadStatePhotoHero(s.slug)}
                    onFocus={() => preloadStatePhotoHero(s.slug)}
                  >
                    {s.name}
                  </NavLink>
                ))}
              </div>
            )}

            <NavLink to={`/${more.slug}`} onClick={() => setOpen(false)} className={mobileLink}>
              More
            </NavLink>
            <NavLink to="/contact" onClick={() => setOpen(false)} className={mobileLink}>
              Contact
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  )
}
