import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function scrollToHashTarget(el) {
  const navbarGap = 88
  const bottomGap = 48
  const absoluteTop = el.getBoundingClientRect().top + window.scrollY
  const alignTop = absoluteTop - navbarGap
  const alignForFullView = absoluteTop + el.offsetHeight - window.innerHeight + bottomGap
  const scrollTop = Math.max(0, Math.max(alignTop, alignForFullView))

  window.scrollTo({ top: scrollTop, behavior: 'smooth' })
}

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      const scrollToTarget = () => {
        const el = document.getElementById(id)
        if (el) {
          scrollToHashTarget(el)
          return true
        }
        return false
      }

      if (!scrollToTarget()) {
        const timer = window.setTimeout(scrollToTarget, 50)
        return () => window.clearTimeout(timer)
      }
      return
    }

    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
