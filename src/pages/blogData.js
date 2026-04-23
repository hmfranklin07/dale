import vlogs from '../data/vlogs.json'
import vlogBlogs from '../data/vlogBlogs.json'
import towns from '../data/towns.json'

export const sectionShell = 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-10'

export const townBySlug = Object.fromEntries(towns.map((t) => [t.slug, t]))

export const sortedVlogs = [...vlogs].sort((a, b) => new Date(b.date) - new Date(a.date))
export const sortedBlogs = [...vlogBlogs].sort((a, b) => new Date(b.date) - new Date(a.date))

export function formatDate(d) {
  return new Date(d + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function excerpt(text, max = 220) {
  if (!text) return ''
  const t = text.trim().replace(/\s+/g, ' ')
  return t.length <= max ? t : `${t.slice(0, max).trim()}…`
}
