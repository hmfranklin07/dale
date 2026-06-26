import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
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

const TRANSCRIPTION_PHOTO_HERO_MIN_H = 'min-h-[17rem] sm:min-h-[19.5rem] md:min-h-[22.5rem]'

function answerParagraphs(answer) {
  if (Array.isArray(answer)) return answer
  if (typeof answer === 'string' && answer.includes('\n\n')) {
    return answer.split(/\n\n+/).filter(Boolean)
  }
  return answer ? [answer] : []
}

export default function StateTranscription() {
  const { stateSlug, interviewId } = useParams()
  const location = useLocation()
  if (!stateSlugs.has(stateSlug)) {
    return <Navigate to="/" replace />
  }

  const state = states.find((s) => s.slug === stateSlug)
  const interview = interviewById(interviewId)
  if (!interview || !interviewBelongsToState(interview, stateSlug)) {
    return <Navigate to={`/${stateSlug}/transcriptions`} replace />
  }

  const town = townBySlug[interview.townSlug]
  const displayTitle = interview.title || interview.personName
  const photoHero = Boolean(interview.photo)
  const fromStatePage = location.state?.from === 'state'
  const backTo = fromStatePage ? `/${stateSlug}` : `/${stateSlug}/transcriptions`
  const backLabel = fromStatePage ? `Back to ${state.name}` : 'Back to all conversations'
  const heroPositionClass = interview.heroPositionClass || 'object-[50%_42%] sm:object-[50%_38%]'

  return (
    <>
      <section
        className={`relative flex flex-col overflow-hidden border-b ${
          photoHero
            ? `${TRANSCRIPTION_PHOTO_HERO_MIN_H} border-sage-800/30`
            : 'min-h-[14rem] border-sage-600/50 bg-sage-500 sm:min-h-[16rem] md:min-h-[17rem]'
        }`}
      >
        {photoHero ? (
          <>
            <div className="absolute inset-0 z-0">
              <img
                src={interview.photo}
                alt=""
                sizes="100vw"
                className={`h-full w-full object-cover ${heroPositionClass}`}
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
            <div
              className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-sage-950/55 via-sage-950/15 to-sage-950/65"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_90%_70%_at_50%_35%,transparent_0%,rgba(15,23,20,0.45)_100%)]"
              aria-hidden
            />

            <div className={`${heroShell} absolute inset-x-0 top-0 z-20 pt-4 sm:pt-5 md:pt-6`}>
              <Link
                to={backTo}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-white/95 drop-shadow-sm transition-colors hover:text-white"
              >
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {backLabel}
              </Link>
            </div>

            <div className="relative z-10 flex min-h-[inherit] flex-1 flex-col items-start justify-start">
              <div
                className={`${heroShell} w-full pb-10 pt-14 text-center sm:pb-12 sm:pt-16 md:pb-14 md:pt-[4.25rem]`}
              >
                <div className="relative mx-auto w-full max-w-2xl py-3 sm:py-4">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 border-y border-white/20 bg-sage-950/25 backdrop-blur-md"
                  />
                  {(interview.townLabel || town) && (
                    <span className="inline-block rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/95 backdrop-blur-sm">
                      {interview.townLabel ?? town?.name}
                    </span>
                  )}
                  <h1 className="font-display mt-3 text-[2.5rem] leading-[1.02] text-white drop-shadow-md sm:mt-4 sm:text-[3.25rem] lg:text-[3.75rem]">
                    {displayTitle}
                  </h1>
                  <div
                    className="mx-auto mt-2.5 h-px w-14 bg-gradient-to-r from-transparent via-rust-400 to-transparent sm:mt-3 sm:w-20"
                    aria-hidden
                  />
                  <p className="mx-auto mt-2.5 max-w-xl text-base leading-snug text-white/90 sm:mt-3 sm:text-lg">
                    {interview.personName} · {interview.role} · {interview.school}
                  </p>
                  <time className="mt-2 block text-xs text-white/75 sm:text-sm">{formatDate(interview.date)}</time>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
        <div className={`${heroShell} absolute inset-x-0 top-0 z-20 pt-4 sm:pt-5 md:pt-6`}>
          <Link
            to={backTo}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white transition-colors hover:text-orange-100"
          >
            <svg className="h-4 w-4 shrink-0 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {backLabel}
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
          </>
        )}
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
