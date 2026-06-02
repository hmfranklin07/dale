import { Link, Navigate, useParams } from 'react-router-dom'
import states from '../data/states.json'
import towns from '../data/towns.json'
import PageContentBand from '../components/PageContentBand'
import { SectionAmbience } from '../components/SectionAmbience'
import PaperAirplaneTrail from '../components/PaperAirplaneTrail'
import { pageTitleClass } from '../components/SectionHeading'
import { formatDate } from './blogData'
import { interviewById, interviewBelongsToState } from '../lib/stateContent'

const heroShell = 'max-w-6xl mx-auto w-full px-2.5 sm:px-4 lg:px-6'
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

  const town = townBySlug[interview.townSlug]
  const displayTitle = interview.title || interview.personName

  return (
    <>
      <section className="relative flex min-h-[14rem] flex-col overflow-hidden border-b border-sage-400/50 sm:min-h-[16rem] md:min-h-[17rem]">
        <SectionAmbience variant="paper" />
        <div
          className="absolute inset-y-0 left-0 z-[1] w-1 bg-gradient-to-b from-rust-400/90 via-sage-500/75 to-orange-300/80"
          aria-hidden
        />
        <PaperAirplaneTrail className="right-3 top-[42%] z-[1] -translate-y-1/2 opacity-80 sm:right-8 md:right-12 lg:right-16" />

        <div className={`${heroShell} absolute inset-x-0 top-0 z-20 pt-4 sm:pt-5 md:pt-6`}>
          <Link
            to={`/${stateSlug}/transcriptions`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-sage-900 transition-colors hover:text-rust-800"
          >
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to written conversations
          </Link>
        </div>

        <div className="relative z-10 flex min-h-[inherit] flex-1 flex-col items-center justify-center">
          <div className={`${heroShell} w-full pb-8 pt-12 text-center sm:pb-9 sm:pt-14 md:pb-10 md:pt-16`}>
            <div className="mx-auto max-w-3xl">
              {(interview.townLabel || town) && (
                <span className="badge-sage inline-block">{interview.townLabel ?? town?.name}</span>
              )}
              <h1 className={`font-display mt-3 text-[2rem] leading-[1.08] sm:mt-4 sm:text-4xl lg:text-[2.75rem] ${pageTitleClass}`}>
                {displayTitle}
              </h1>
              <div
                className="mx-auto mt-3 h-px w-14 bg-gradient-to-r from-sage-500/40 via-rust-400 to-orange-300/70 sm:mt-4 sm:w-24"
                aria-hidden
              />
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-snug text-earth-800 sm:mt-4 sm:text-base">
                {interview.personName} · {interview.role} · {interview.school}
              </p>
              <time className="mt-2 block text-xs text-sage-700/80 sm:text-sm">{formatDate(interview.date)}</time>
            </div>
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
