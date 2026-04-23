import { Link, Navigate, useParams } from 'react-router-dom'
import states from '../data/states.json'
import { SectionAmbience } from '../components/SectionAmbience'
import PageContentBand from '../components/PageContentBand'
import SectionHeading, { pageTitleClass } from '../components/SectionHeading'
import { formatDate } from './blogData'
import { reflectionsForState } from '../lib/stateContent'

const sectionShell = 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-10'
const stateSlugs = new Set(states.map((s) => s.slug))

export default function StateReflections() {
  const { stateSlug } = useParams()
  if (!stateSlugs.has(stateSlug)) {
    return <Navigate to="/" replace />
  }

  const state = states.find((s) => s.slug === stateSlug)
  const list = reflectionsForState(stateSlug)

  return (
    <>
      <section className="relative overflow-hidden border-b border-sage-200/60 bg-gradient-to-b from-white via-amber-50/40 to-sage-200/55">
        <SectionAmbience variant="paper" />
        <div className="relative z-10">
          <div className={`${sectionShell} py-8 sm:py-10`}>
            <Link
              to={`/${stateSlug}`}
              className="text-sage-900 hover:text-rust-800 mb-4 inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
            >
              <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to {state.name}
            </Link>
            <h1 className={`font-display mt-2 text-3xl sm:text-4xl ${pageTitleClass}`}>Reflections · {state.name}</h1>
            <p className="mt-3 max-w-2xl text-earth-800 sm:text-lg leading-relaxed">
              Longer written reflections from this part of the trip.
            </p>
          </div>
        </div>
      </section>

      <PageContentBand>
        <SectionHeading>All reflections</SectionHeading>
        {list.length === 0 ? (
          <div className="card card-body text-center text-earth-600">
            <p>
              No reflections for {state.name} yet. Add objects with <code className="text-sm">stateSlug</code> matching{' '}
              <code className="text-sm">{stateSlug}</code> in reflections.json.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {list.map((r) => (
              <article key={r.id} className="card card-body">
                <time className="mb-2 block text-xs text-earth-500">{formatDate(r.date)}</time>
                <h2 className="font-display mb-3 text-2xl text-earth-900">{r.title}</h2>
                <p className="leading-relaxed text-earth-800 whitespace-pre-line">{r.text}</p>
              </article>
            ))}
          </div>
        )}
      </PageContentBand>
    </>
  )
}
