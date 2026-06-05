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
  return vlogs
    .map((v, index) => ({ v, index }))
    .filter(({ v }) => slugs.has(v.townSlug))
    .sort((a, b) => {
      const byDate = sortDateValue(b.v.date) - sortDateValue(a.v.date)
      return byDate !== 0 ? byDate : a.index - b.index
    })
    .map(({ v }) => v)
}

export function featuredVlogsForState(stateSlug) {
  return vlogsForState(stateSlug)
    .filter((v) => v.featured === true)
    .slice(0, 3)
}

export function vlogById(id) {
  return vlogs.find((v) => v.id === id)
}

export function vlogBelongsToState(vlog, stateSlug) {
  const slugs = townSlugsInState(stateSlug)
  return slugs.has(vlog.townSlug)
}

export function interviewsForState(stateSlug) {
  const slugs = townSlugsInState(stateSlug)
  return [...interviews]
    .filter((i) => slugs.has(i.townSlug))
    .sort((a, b) => sortDateValue(b.date) - sortDateValue(a.date))
}

export function interviewById(id) {
  return interviews.find((i) => i.id === id)
}

export function interviewBelongsToState(interview, stateSlug) {
  const slugs = townSlugsInState(stateSlug)
  return slugs.has(interview.townSlug)
}

export function reflectionsForState(stateSlug) {
  return [...reflections]
    .filter((r) => r.stateSlug === stateSlug)
    .sort((a, b) => sortDateValue(b.date) - sortDateValue(a.date))
}
