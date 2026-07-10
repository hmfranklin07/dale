import { Link, useParams, Navigate } from 'react-router-dom'
import states from '../data/states.json'
import towns from '../data/towns.json'
import { PageHeroPanel } from '../components/PageHeroPanel'
import PageContentBand from '../components/PageContentBand'
import SectionHeading, { pageTitleClass } from '../components/SectionHeading'
import StateVideoTeaser from '../components/StateVideoTeaser'
import { formatDate } from './blogData'
import { featuredInterviewsForState, featuredVlogsForState, interviewsForState, comingSoonInterviewsForState, vlogsForState } from '../lib/stateContent'
import { stateHeroBandSectionClass } from '../config/mapPinColors'
import { STATE_PHOTO_HEROES } from '../lib/statePhotoHeroes'

/** State intro hero: same max column site-wide; side inset matches Home hero (`px-2.5 sm:px-4`) so the white card sits closer to the viewport than body sections. */
const stateHeroShell = 'max-w-6xl mx-auto w-full px-2.5 sm:px-4 lg:px-6'

/** State intro heroes — same height for photo and gradient bands. */
const STATE_HERO_MIN_H = 'min-h-[17rem] sm:min-h-[19.5rem] md:min-h-[22.5rem]'
/** @deprecated alias — photo states use the same band height */
const STATE_PHOTO_HERO_MIN_H = STATE_HERO_MIN_H
const townBySlug = Object.fromEntries(towns.map((t) => [t.slug, t]))
const stateSlugs = new Set(states.map((s) => s.slug))

const photoHeroIntroClass =
  'mx-auto mt-2.5 max-w-xl text-base leading-tight sm:mt-3 sm:text-lg sm:leading-snug'

/** `on: "trees"` → white over foliage; `on: "sky"` → dark over bright sky. */
function photoHeroSegmentClass(on) {
  return on === 'sky' ? pageTitleClass : 'text-white/90'
}

function PhotoHeroIntro({ state, nyPhotoHero, darkOnSky = false }) {
  const fallback = `Short-form field notes, sit-down interviews, and reflections from the towns we visit in ${state.name}. Content updates as the trip goes on.`
  const intro = state.heroIntro || fallback
  const segments = state.heroIntroSegments

  if (segments?.length) {
    return (
      <p className={photoHeroIntroClass}>
        {segments.map((segment, index) => (
          <span key={index} className={photoHeroSegmentClass(segment.on)}>
            {segment.text}
          </span>
        ))}
      </p>
    )
  }

  const introTone = nyPhotoHero ? 'text-white/90' : darkOnSky ? pageTitleClass : 'text-sage-100/92'
  return <p className={`${photoHeroIntroClass} ${introTone}`}>{intro}</p>
}

function HeroBackLink({ light = false, className = '' }) {
  return (
    <Link
      to="/#map"
      className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
        light ? 'text-white/95 hover:text-white' : 'text-earth-800 hover:text-rust-800'
      } ${className}`.trim()}
    >
      <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      Back to home &amp; map
    </Link>
  )
}

function TranscriptionFillerCard({ stateSlug }) {
  return (
    <Link
      to={`/${stateSlug}/transcriptions`}
      className="block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-rust-400/70"
    >
      <article className="card card-hover-pop group overflow-hidden !ring-rust-300/45">
        <div className="card-body sm:p-8">
          <div className="flex flex-col items-start gap-2">
            <span className="badge-sage inline-block w-fit">Location</span>
            <time className="block text-xs text-earth-500">Date</time>
          </div>
          <h2 className="font-display mt-3 text-2xl text-earth-900 transition-colors group-hover:text-rust-800 sm:text-3xl">
            Title
          </h2>
          <p className="mt-2 text-sm text-earth-600">Text · Text</p>
          <p className="mt-4 text-earth-800 leading-relaxed sm:text-lg">Text</p>
          <p className="mt-4 text-sm font-semibold text-rust-800">View all conversations →</p>
        </div>
      </article>
    </Link>
  )
}

function ComingSoonConversationCard({ interview }) {
  return (
    <article className="card overflow-hidden !border-2 !border-dashed !border-sage-500/75 !bg-gradient-to-br !from-sage-50/95 !via-white !to-rust-50/40 !ring-0 !shadow-sm">
      <div className="card-body p-5 sm:p-6">
        {interview.townLabel && <span className="badge-rust inline-block">{interview.townLabel}</span>}
        <h2 className="font-display mt-3 text-xl leading-snug text-earth-900 sm:mt-3.5 sm:text-2xl">
          {interview.title}
        </h2>
        <div className="mt-2.5 h-px w-14 bg-gradient-to-r from-rust-400/90 to-transparent sm:w-16" aria-hidden />
        {interview.credit && <p className="mt-2.5 text-sm font-medium text-sage-800/90">{interview.credit}</p>}
        {interview.summary && (
          <p className="mt-3 text-sm leading-relaxed text-earth-800 sm:text-base">{interview.summary}</p>
        )}
      </div>
    </article>
  )
}

function CheckBackSoonCard({ stateName }) {
  return (
    <div className="card card-body mx-auto max-w-2xl border-2 border-rust-400/80 text-center !ring-rust-300/55 ring-2 sm:p-10">
      <p className="font-display text-2xl text-earth-900 sm:text-3xl">Check back soon!</p>
      <p className="mt-4 text-earth-700 leading-relaxed sm:text-lg">
        More conversations from {stateName} are on the way. Stay tuned!
      </p>
    </div>
  )
}

function ViewAllBanner({ to, title, subtitle, count, countLabel }) {
  return (
    <Link
      to={to}
      className="group flex w-full items-center justify-between gap-4 rounded-2xl border-2 border-rust-500/90 bg-gradient-to-r from-rust-500 to-rust-600 px-5 py-4 shadow-lg shadow-rust-900/20 ring-2 ring-rust-400/70 transition-[transform,box-shadow,background] duration-300 hover:-translate-y-0.5 hover:from-rust-600 hover:to-rust-700 hover:shadow-xl hover:shadow-rust-900/28 focus:outline-none focus-visible:ring-2 focus-visible:ring-rust-300 motion-reduce:hover:translate-y-0 sm:px-7 sm:py-5"
    >
      <div className="min-w-0 text-left">
        <p className="font-display text-xl leading-tight text-white sm:text-2xl">{title}</p>
        <p className="mt-1 text-sm leading-snug text-rust-50/92 sm:text-base">{subtitle}</p>
      </div>
      <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
        {count != null && countLabel && (
          <span className="rounded-full bg-white/18 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/95 ring-1 ring-white/25 sm:text-sm">
            {count} {countLabel}
          </span>
        )}
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-lg text-white ring-1 ring-white/25 transition-transform duration-300 group-hover:translate-x-0.5 sm:h-11 sm:w-11 sm:text-xl"
          aria-hidden
        >
          →
        </span>
      </div>
    </Link>
  )
}

export default function StatePage() {
  const { stateSlug } = useParams()
  if (!stateSlugs.has(stateSlug)) {
    return <Navigate to="/" replace />
  }

  const state = states.find((s) => s.slug === stateSlug)
  const featuredVlogs = featuredVlogsForState(stateSlug)
  const featuredInterviews = featuredInterviewsForState(stateSlug)
  const comingSoonInterviews = comingSoonInterviewsForState(stateSlug)
  const allVlogs = vlogsForState(stateSlug)
  const allInterviews = interviewsForState(stateSlug)
  const hasVideos = allVlogs.length > 0
  const hasInterviews = allInterviews.length > 0
  const totalVideos = allVlogs.length
  const totalInterviews = allInterviews.length
  const hasConversationSection = hasInterviews || comingSoonInterviews.length > 0
  const stateHasContent = hasVideos || hasConversationSection

  const photoHero = STATE_PHOTO_HEROES[stateSlug]
  const nyPhotoHero = stateSlug === 'new-york' && photoHero
  const skyPhotoHero = photoHero && (stateSlug === 'illinois' || stateSlug === 'nebraska' || stateSlug === 'idaho')

  return (
    <>
      <section
        className={`relative overflow-hidden border-b flex flex-col ${
          photoHero
            ? `${STATE_PHOTO_HERO_MIN_H} border-sage-800/30`
            : `${STATE_HERO_MIN_H} border-sage-400/45 ${stateHeroBandSectionClass}`
        }`}
      >
        {photoHero && (
          <>
            <div className="absolute inset-0 z-0">
              <img
                src={photoHero.src}
                alt=""
                sizes="100vw"
                className={`h-full w-full object-cover ${photoHero.positionClass}${photoHero.imageClass ? ` ${photoHero.imageClass}` : ''}`}
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </>
        )}
        <div
          className={`relative z-10 flex min-h-0 flex-1 flex-col min-h-[inherit] ${
            skyPhotoHero ? 'items-start justify-start' : photoHero ? 'items-start justify-center' : 'justify-center'
          }`}
        >
          <div className={`${stateHeroShell} absolute inset-x-0 top-0 z-20 pt-4 sm:pt-5 md:pt-6`}>
            <HeroBackLink light={nyPhotoHero || skyPhotoHero} />
          </div>

          {photoHero ? (
            <div
              className={`${stateHeroShell} w-full text-center ${
                skyPhotoHero
                  ? 'pb-20 pt-14 sm:pb-24 sm:pt-[3.75rem] md:pb-28 md:pt-16'
                  : 'pb-8 pt-14 sm:pb-9 sm:pt-16 md:pb-10 md:pt-[4.25rem]'
              }`}
            >
              <div className="mx-auto w-full max-w-2xl">
                <h1
                  className={`font-display text-[2.75rem] leading-none sm:text-[3.5rem] lg:text-[4rem] xl:text-[4.5rem] ${
                    nyPhotoHero ? 'text-white drop-shadow-sm' : pageTitleClass
                  }`}
                >
                  {state.name}
                </h1>
                <div
                  className="mx-auto mt-2.5 h-px w-14 bg-gradient-to-r from-transparent via-rust-400 to-transparent sm:mt-3 sm:w-20"
                  aria-hidden
                />
                <PhotoHeroIntro state={state} nyPhotoHero={nyPhotoHero} darkOnSky={skyPhotoHero} />
              </div>
            </div>
          ) : (
            <div className={`${stateHeroShell} w-full py-12 sm:py-16 md:py-20`}>
              <PageHeroPanel tone="statePage" className="mx-auto w-full max-w-2xl text-center !py-4 sm:!py-5 md:!py-6">
                <h1 className={`font-display mt-0 mb-2 text-4xl leading-tight sm:mb-3 sm:text-5xl ${pageTitleClass}`}>
                  {state.name}
                </h1>
                <p className="text-base leading-relaxed text-earth-800 sm:text-lg">
                  {state.heroIntro
                    ? state.heroIntro
                    : `Short-form field notes, sit-down interviews, and reflections from the towns we visit in ${state.name}. Content updates as the trip goes on.`}
                </p>
              </PageHeroPanel>
            </div>
          )}
        </div>
      </section>

      <PageContentBand variant="sage">
        {!stateHasContent ? (
          state.checkBackSoon ? (
            <CheckBackSoonCard stateName={state.name} />
          ) : (
          <div className="card card-body mx-auto max-w-2xl border-2 border-rust-400/80 text-center !ring-rust-300/55 ring-2 sm:p-10">
            <p className="font-display text-2xl text-earth-900 sm:text-3xl">Check back soon!</p>
            <p className="mt-4 text-earth-700 leading-relaxed sm:text-lg">
              This stop is still ahead on the trip. Videos and conversations from {state.name} will show up here as I
              go.
            </p>
          </div>
          )
        ) : (
        <div className="space-y-16 sm:space-y-20 [&_article.card]:border-sage-200/90 [&_article.card]:shadow-md [&_article.card]:shadow-sage-900/[0.08] [&_article.card]:ring-1 [&_article.card]:ring-rust-200/30">
          {hasVideos && (
          <section>
            <SectionHeading>Featured videos</SectionHeading>
            <div className="space-y-6">
              {featuredVlogs.length > 0 && (
                <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-3 md:items-stretch md:gap-6 lg:gap-8">
                  {featuredVlogs.map((vlog) => (
                    <StateVideoTeaser key={vlog.id} vlog={vlog} stateSlug={stateSlug} />
                  ))}
                </div>
              )}
              <div className="border-t border-sage-300/55 pt-5 sm:pt-6">
                <ViewAllBanner
                  to={`/${stateSlug}/videos`}
                  title="View all videos"
                  subtitle={`Browse every field video from ${state.name} — featured picks are just the start.`}
                  count={totalVideos}
                  countLabel={totalVideos === 1 ? 'video' : 'videos'}
                />
              </div>
            </div>
          </section>
          )}

          {featuredInterviews.length > 0 && (
          <section>
            <SectionHeading>Featured conversations</SectionHeading>
            <div className="space-y-6">
              <div className="space-y-4">
                {featuredInterviews.map((interview) => (
                  <Link
                    key={interview.id}
                    to={`/${stateSlug}/transcriptions/${interview.id}`}
                    state={{ from: 'state' }}
                    className="block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-rust-400/70"
                  >
                    <article className="card card-hover-pop group overflow-hidden !border-2 !border-sage-700 !ring-0 hover:!border-sage-800 hover:shadow-lg hover:shadow-sage-900/12">
                      <div className={interview.cardPhoto ? 'flex flex-col sm:flex-row' : undefined}>
                        {interview.cardPhoto && (
                          <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-[#0a1628] sm:aspect-auto sm:w-44 sm:self-stretch md:w-48">
                            <img
                              src={interview.cardPhoto}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                        <div className="card-body flex-1 p-4 sm:p-5">
                          <time className="block text-xs text-earth-500">{formatDate(interview.date)}</time>
                          <h2 className="font-display mt-2 text-xl leading-snug text-earth-900 transition-colors group-hover:text-rust-800 sm:text-2xl">
                            {interview.title || interview.personName}
                          </h2>
                          <p className="mt-1.5 text-sm text-earth-600">
                            {interview.personName} · {interview.role} · {interview.school}
                          </p>
                          {interview.summary && (
                            <p className="mt-2.5 text-sm leading-snug text-earth-800 sm:text-base">
                              {interview.summary}
                            </p>
                          )}
                          <p className="mt-2.5 text-sm font-semibold text-rust-800">Read conversation →</p>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
              {hasInterviews && (
                <div className="border-t border-sage-300/55 pt-5 sm:pt-6">
                  <ViewAllBanner
                    to={`/${stateSlug}/transcriptions`}
                    title="View all conversations"
                    subtitle={`Read every interview and transcript from ${state.name} — more stories beyond the highlights.`}
                    count={totalInterviews}
                    countLabel={totalInterviews === 1 ? 'conversation' : 'conversations'}
                  />
                </div>
              )}
            </div>
          </section>
          )}

          {comingSoonInterviews.length > 0 && (
          <section>
            <SectionHeading>Coming soon</SectionHeading>
            <div className="space-y-4">
              {comingSoonInterviews.map((interview) => (
                <ComingSoonConversationCard key={interview.id} interview={interview} />
              ))}
            </div>
          </section>
          )}

          {state.checkBackSoon && <CheckBackSoonCard stateName={state.name} />}
        </div>
        )}
      </PageContentBand>
    </>
  )
}
