import { Link, Navigate, useParams } from 'react-router-dom'
import states from '../data/states.json'
import towns from '../data/towns.json'
import { SectionAmbience } from '../components/SectionAmbience'
import PageContentBand from '../components/PageContentBand'
import SectionHeading, { pageTitleClass } from '../components/SectionHeading'
import { formatDate } from './blogData'
import { interviewsForState } from '../lib/stateContent'

const sectionShell = 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-10'
const stateSlugs = new Set(states.map((s) => s.slug))
const townBySlug = Object.fromEntries(towns.map((t) => [t.slug, t]))

export default function StateTranscriptions() {
  const { stateSlug } = useParams()
  if (!stateSlugs.has(stateSlug)) {
    return <Navigate to="/" replace />
  }

  const state = states.find((s) => s.slug === stateSlug)
  const list = interviewsForState(stateSlug)

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
            <h1 className={`font-display mt-2 text-3xl sm:text-4xl ${pageTitleClass}`}>Transcriptions · {state.name}</h1>
            <p className="mt-3 max-w-2xl text-earth-800 sm:text-lg leading-relaxed">
              Written interviews and conversations from this stop.
            </p>
          </div>
        </div>
      </section>

      <PageContentBand>
        <SectionHeading>All transcriptions</SectionHeading>
        {list.length === 0 ? (
          <div className="card card-body text-center text-earth-600">
            <p>No transcriptions for {state.name} yet. Add entries in interviews.json for towns in this state.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {list.map((interview) => {
              const t = townBySlug[interview.townSlug]
              return (
                <article key={interview.id} className="card card-body">
                  <div className="mb-6">
                    {(interview.townLabel || t) && (
                      <span className="badge-sage mb-2 inline-block">{interview.townLabel ?? t?.name}</span>
                    )}
                    <h2 className="font-display text-2xl text-earth-900">{interview.personName}</h2>
                    <p className="text-earth-600 text-sm">
                      {interview.role} · {interview.school}
                    </p>
                    <time className="text-xs text-earth-500">{formatDate(interview.date)}</time>
                  </div>
                  <div className="space-y-5">
                    {interview.questions.map((qa, idx) => (
                      <div key={idx}>
                        <p className="text-sm font-semibold text-sage-700 mb-1">Q: {qa.q}</p>
                        <blockquote className="border-l-2 border-rust-300/50 pl-4 text-sm leading-relaxed text-earth-800 sm:text-base">
                          “{qa.a}”
                        </blockquote>
                      </div>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </PageContentBand>
    </>
  )
}
