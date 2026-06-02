import { Link, Navigate, useParams } from 'react-router-dom'
import states from '../data/states.json'
import towns from '../data/towns.json'
import { innerPageTopBandSectionClass, stateSubpageHeroSectionClass } from '../config/mapPinColors'
import { SectionAmbience } from '../components/SectionAmbience'
import PageContentBand from '../components/PageContentBand'
import { pageTitleClass } from '../components/SectionHeading'
import { formatDate } from './blogData'
import { interviewById, interviewBelongsToState } from '../lib/stateContent'

const sectionShell = 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-10'
const stateSlugs = new Set(states.map((s) => s.slug))
const townBySlug = Object.fromEntries(towns.map((t) => [t.slug, t]))

export default function StateTranscription() {
  const { stateSlug, interviewId } = useParams()
  if (!stateSlugs.has(stateSlug)) {
    return <Navigate to="/" replace />
  }

  const interview = interviewById(interviewId)
  if (!interview || !interviewBelongsToState(interview, stateSlug)) {
    return <Navigate to={`/${stateSlug}/transcriptions`} replace />
  }

  const state = states.find((s) => s.slug === stateSlug)
  const town = townBySlug[interview.townSlug]
  const displayTitle = interview.title || interview.personName

  return (
    <>
      <section
        className={`relative overflow-hidden border-b border-sage-200/60 ${innerPageTopBandSectionClass} ${stateSubpageHeroSectionClass}`}
      >
        <SectionAmbience variant="paper" />
        <div className="relative z-10 flex flex-1 flex-col justify-center">
          <div className={`${sectionShell} py-8 sm:py-10`}>
            <Link
              to={`/${stateSlug}/transcriptions`}
              className="text-sage-900 hover:text-rust-800 mb-4 inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
            >
              <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to written conversations
            </Link>
            <div className="flex flex-col items-start gap-2">
              {(interview.townLabel || town) && (
                <span className="badge-sage inline-block">{interview.townLabel ?? town?.name}</span>
              )}
              <time className="text-xs text-earth-500">{formatDate(interview.date)}</time>
            </div>
            <h1 className={`font-display mt-3 text-3xl sm:text-4xl ${pageTitleClass}`}>{displayTitle}</h1>
            <p className="mt-2 text-sm text-earth-600 sm:text-base">
              {interview.personName} · {interview.role} · {interview.school}
            </p>
          </div>
        </div>
      </section>

      <PageContentBand>
        <article className="mx-auto max-w-3xl">
          {interview.intro && (
            <p className="mb-8 text-earth-800 leading-relaxed italic sm:text-lg">{interview.intro}</p>
          )}
          <div className="space-y-8">
            {interview.questions.map((qa, idx) => (
              <div key={idx}>
                <p className="mb-2 text-sm font-semibold text-sage-700 sm:text-base">Q: {qa.q}</p>
                <blockquote className="border-l-2 border-rust-300/50 pl-4 text-sm leading-relaxed text-earth-800 sm:text-base">
                  &ldquo;{qa.a}&rdquo;
                </blockquote>
              </div>
            ))}
          </div>
        </article>
      </PageContentBand>
    </>
  )
}
