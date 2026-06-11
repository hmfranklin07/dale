import { Link, Navigate, useParams } from 'react-router-dom'
import states from '../data/states.json'
import towns from '../data/towns.json'
import PageContentBand from '../components/PageContentBand'
import { pageTitleClass } from '../components/SectionHeading'
import { HERO_ACCENT_RUST } from '../config/mapPinColors'
import { formatDate } from './blogData'
import { interviewById, interviewBelongsToState } from '../lib/stateContent'

const heroShell = 'max-w-6xl mx-auto w-full px-2.5 sm:px-4 lg:px-6'
const stateSlugs = new Set(states.map((s) => s.slug))
const townBySlug = Object.fromEntries(towns.map((t) => [t.slug, t]))

function answerParagraphs(answer) {
  if (Array.isArray(answer)) return answer
  if (typeof answer === 'string' && answer.includes('\n\n')) {
    return answer.split(/\n\n+/).filter(Boolean)
  }
  return answer ? [answer] : []
}

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
      <section className="relative flex min-h-[14rem] flex-col overflow-hidden border-b border-sage-600/50 bg-sage-500 sm:min-h-[16rem] md:min-h-[17rem]">
        <div className={`${heroShell} absolute inset-x-0 top-0 z-20 pt-4 sm:pt-5 md:pt-6`}>
          <Link
            to={`/${stateSlug}/transcriptions`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white transition-colors hover:text-orange-100"
          >
            <svg className="h-4 w-4 shrink-0 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to written conversations
          </Link>
        </div>

        <div className="relative z-10 flex min-h-[inherit] flex-1 flex-col items-center justify-center">
          <div className={`${heroShell} w-full py-10 pt-14 sm:py-12 sm:pt-16 md:py-14 md:pt-[4.25rem]`}>
            <div
              className="mx-auto max-w-3xl rounded-2xl border-2 bg-white px-6 py-8 text-center shadow-lg shadow-sage-900/[0.08] sm:px-10 sm:py-10"
              style={{ borderColor: HERO_ACCENT_RUST }}
            >
              {(interview.townLabel || town) && (
                <span className="badge-sage inline-block">{interview.townLabel ?? town?.name}</span>
              )}
              <h1 className={`font-display mt-3 text-[2rem] leading-[1.08] sm:mt-4 sm:text-4xl lg:text-[2.75rem] ${pageTitleClass}`}>
                {displayTitle}
              </h1>
              <div className="mx-auto mt-3 h-0.5 w-16 bg-rust-400 sm:mt-4 sm:w-20" aria-hidden />
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-snug text-earth-800 sm:mt-4 sm:text-base">
                {interview.personName} · {interview.role} · {interview.school}
              </p>
              <time className="mt-2 block text-xs text-sage-700 sm:text-sm">{formatDate(interview.date)}</time>
            </div>
          </div>
        </div>
      </section>

      <PageContentBand wash="rust" variant="sage">
        <article className="mx-auto max-w-3xl">
          {interview.intro && (
            <>
              <div className="mx-auto mb-6 h-0.5 w-20 bg-orange-400/80 sm:mb-8 sm:w-28" aria-hidden />
              <p className="mb-8 text-earth-800 leading-relaxed italic sm:mb-10 sm:text-lg">{interview.intro}</p>
            </>
          )}
          <div className="space-y-8 sm:space-y-10">
            {(interview.questions ?? []).map((qa, idx) => {
              const paragraphs = answerParagraphs(qa.a)
              const lastIdx = paragraphs.length - 1

              return (
                <div key={idx}>
                  <p className="mb-2 text-sm font-semibold text-sage-700 sm:text-base">Q: {qa.q}</p>
                  <blockquote className="border-l-[3px] border-orange-400 pl-4 text-sm leading-relaxed text-earth-800 sm:text-base">
                    {paragraphs.map((paragraph, pIdx) => (
                      <p key={pIdx} className={pIdx > 0 ? 'mt-4' : undefined}>
                        {pIdx === 0 && '\u201C'}
                        {paragraph}
                        {pIdx === lastIdx && '\u201D'}
                      </p>
                    ))}
                  </blockquote>
                </div>
              )
            })}
          </div>
        </article>
      </PageContentBand>
    </>
  )
}
