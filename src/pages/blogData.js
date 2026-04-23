import vlogs from '../data/vlogs.json'
import vlogBlogs from '../data/vlogBlogs.json'
import towns from '../data/towns.json'

export const sectionShell = 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-10'

export const townBySlug = Object.fromEntries(towns.map((t) => [t.slug, t]))

function sortDateValue(d) {
  if (d === 'Date' || d == null || d === '') return 0
  const t = new Date(String(d) + 'T00:00:00').getTime()
  return Number.isNaN(t) ? 0 : t
}

export const sortedVlogs = [...vlogs].sort((a, b) => sortDateValue(b.date) - sortDateValue(a.date))
export const sortedBlogs = [...vlogBlogs].sort((a, b) => sortDateValue(b.date) - sortDateValue(a.date))

/** Use literal `Date` in JSON for generic filler rows. */
export function formatDate(d) {
  if (d === 'Date') return 'Date'
  const parsed = new Date(String(d) + 'T00:00:00')
  if (Number.isNaN(parsed.getTime())) return String(d)
  return parsed.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function townLineFromSlug(townSlug) {
  const town = townBySlug[townSlug]
  if (!town) return null
  return town.isRegion ? town.name : `${town.name}, ${town.state}`
}

/** Optional `townLabel` on a vlog overrides the town-derived badge (e.g. filler `Location`). */
export function vlogLocationLabel(v) {
  if (v.townLabel != null && String(v.townLabel).trim() !== '') return v.townLabel
  return townLineFromSlug(v.townSlug)
}

export function excerpt(text, max = 220) {
  if (!text) return ''
  const t = text.trim().replace(/\s+/g, ' ')
  return t.length <= max ? t : `${t.slice(0, max).trim()}…`
}
