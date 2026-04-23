import towns from '../data/towns.json'
import vlogs from '../data/vlogs.json'
import interviews from '../data/interviews.json'
import reflections from '../data/reflections.json'
import { sortDateValue } from '../pages/blogData'

export function townSlugsInState(stateSlug) {
  return new Set(towns.filter((t) => t.stateSlug === stateSlug).map((t) => t.slug))
}

export function vlogsForState(stateSlug) {
  const slugs = townSlugsInState(stateSlug)
  return [...vlogs].filter((v) => slugs.has(v.townSlug)).sort((a, b) => sortDateValue(b.date) - sortDateValue(a.date))
}

export function interviewsForState(stateSlug) {
  const slugs = townSlugsInState(stateSlug)
  return [...interviews]
    .filter((i) => slugs.has(i.townSlug))
    .sort((a, b) => sortDateValue(b.date) - sortDateValue(a.date))
}

export function reflectionsForState(stateSlug) {
  return [...reflections]
    .filter((r) => r.stateSlug === stateSlug)
    .sort((a, b) => sortDateValue(b.date) - sortDateValue(a.date))
}
