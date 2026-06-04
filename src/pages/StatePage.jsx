import { Link, useParams, Navigate } from 'react-router-dom'
import states from '../data/states.json'
import towns from '../data/towns.json'
import { PageHeroPanel } from '../components/PageHeroPanel'
import PageContentBand from '../components/PageContentBand'
import SectionHeading, { pageTitleClass } from '../components/SectionHeading'
import StateVideoTeaser from '../components/StateVideoTeaser'
import { excerpt, formatDate } from './blogData'
import { interviewsForState, reflectionsForState, vlogsForState } from '../lib/stateContent'
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
      to="/"
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
      <article className="card group overflow-hidden !ring-rust-300/45 transition-shadow hover:shadow-lg hover:shadow-rust-900/15">
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

function ReflectionComingSoon({ stateName }) {
  return (
    <article className="card card-body max-w-2xl border-2 border-rust-400/80 !ring-rust-300/55 ring-2 sm:p-8">
      <h2 className="font-display text-2xl text-earth-900 sm:text-3xl">Stay Tuned!</h2>
      <p className="mt-4 text-earth-700 leading-relaxed sm:text-lg">
        Reflections from {stateName} will appear soon.
      </p>
    </article>
  )
}

export default function StatePage() {
  const { stateSlug } = useParams()
  if (!stateSlugs.has(stateSlug)) {
    return <Navigate to="/" replace />
  }

  const state = states.find((s) => s.slug === stateSlug)
  const stateVlogs = vlogsForState(stateSlug)
  const stateInterviews = interviewsForState(stateSlug)
  const stateReflections = reflectionsForState(stateSlug)

  const featuredVlogs = stateVlogs.slice(0, 3)
  const latestInterview = stateInterviews[0]
  const latestReflection = stateReflections[0]

  const photoHero = STATE_PHOTO_HEROES[stateSlug]
  const nyPhotoHero = stateSlug === 'new-york' && photoHero
  const ilPhotoHero = stateSlug === 'illinois' && photoHero
  const isNewYork = stateSlug === 'new-york'

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
                className={`h-full w-full object-cover ${photoHero.positionClass}`}
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </>
        )}
        <div
          className={`relative z-10 flex min-h-0 flex-1 flex-col min-h-[inherit] ${
            ilPhotoHero ? 'items-start justify-start' : photoHero ? 'items-start justify-center' : 'justify-center'
          }`}
        >
          <div className={`${stateHeroShell} absolute inset-x-0 top-0 z-20 pt-4 sm:pt-5 md:pt-6`}>
            <HeroBackLink light={nyPhotoHero} />
          </div>

          {photoHero ? (
            <div
              className={`${stateHeroShell} w-full text-center ${
                ilPhotoHero
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
                <PhotoHeroIntro state={state} nyPhotoHero={nyPhotoHero} darkOnSky={ilPhotoHero} />
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
        {!isNewYork ? (
          <div className="card card-body mx-auto max-w-2xl border-2 border-rust-400/80 text-center !ring-rust-300/55 ring-2 sm:p-10">
            <p className="font-display text-2xl text-earth-900 sm:text-3xl">Check back soon!</p>
            <p className="mt-4 text-earth-700 leading-relaxed sm:text-lg">
              This stop is still ahead on the trip. Videos, conversations, and reflections from {state.name} will show
              up here as I go.
            </p>
          </div>
        ) : (
        <div className="space-y-16 sm:space-y-20 [&_article.card]:border-sage-200/90 [&_article.card]:shadow-md [&_article.card]:shadow-sage-900/[0.08] [&_article.card]:ring-1 [&_article.card]:ring-rust-200/30">
          <section>
            <SectionHeading>Featured videos</SectionHeading>
            <div className="space-y-6">
              {featuredVlogs.length > 0 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:items-stretch">
                  {featuredVlogs.map((vlog) => (
                    <StateVideoTeaser key={vlog.id} vlog={vlog} stateSlug={stateSlug} />
                  ))}
                </div>
              )}
              <div className="flex justify-start">
                <Link
                  to={`/${stateSlug}/videos`}
                  className="inline-flex items-center gap-2 rounded-xl border border-sage-300/80 bg-white/90 px-5 py-2.5 text-sm font-semibold text-earth-800 shadow-sm ring-1 ring-rust-300/40 transition-colors hover:border-rust-400/75 hover:bg-rust-50/95 hover:text-rust-900"
                >
                  View all videos
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </section>

          <section>
            <SectionHeading>Featured conversations</SectionHeading>
            <div className="space-y-6">
              {latestInterview ? (
                <Link
                  to={`/${stateSlug}/transcriptions/${latestInterview.id}`}
                  className="block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-rust-400/70"
                >
                  <article className="card group overflow-hidden !ring-rust-300/45 transition-shadow hover:shadow-lg hover:shadow-rust-900/15">
                    <div className="card-body sm:p-8">
                      <div className="flex flex-col items-start gap-2">
                        {(latestInterview.townLabel || townBySlug[latestInterview.townSlug]) && (
                          <span className="badge-sage inline-block w-fit max-w-full">
                            {latestInterview.townLabel ?? townBySlug[latestInterview.townSlug]?.name}
                          </span>
                        )}
                        <time className="block text-xs text-earth-500">{formatDate(latestInterview.date)}</time>
                      </div>
                      <h2 className="font-display mt-3 text-2xl text-earth-900 transition-colors group-hover:text-rust-800 sm:text-3xl">
                        {latestInterview.title || latestInterview.personName}
                      </h2>
                      <p className="mt-2 text-sm text-earth-600">
                        {latestInterview.personName} · {latestInterview.role} · {latestInterview.school}
                      </p>
                      <p className="mt-4 text-earth-800 leading-relaxed sm:text-lg">
                        {latestInterview.summary ||
                          excerpt(latestInterview.questions[0]?.a || latestInterview.questions[0]?.q || '', 320)}
                      </p>
                      <p className="mt-4 text-sm font-semibold text-rust-800">Read conversation →</p>
                    </div>
                  </article>
                </Link>
              ) : (
                <TranscriptionFillerCard stateSlug={stateSlug} />
              )}
              <div className="flex justify-start">
                <Link
                  to={`/${stateSlug}/transcriptions`}
                  className="inline-flex items-center gap-2 rounded-xl border border-sage-300/80 bg-white/90 px-5 py-2.5 text-sm font-semibold text-earth-800 shadow-sm ring-1 ring-rust-300/40 transition-colors hover:border-rust-400/75 hover:bg-rust-50/95 hover:text-rust-900"
                >
                  View all conversations
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </section>

          <section>
            <SectionHeading>Reflections</SectionHeading>
            <div className="space-y-6">
              {latestReflection ? (
                <Link
                  to={`/${stateSlug}/reflections`}
                  className="block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-rust-400/70"
                >
                  <article className="card group overflow-hidden !ring-rust-300/45 transition-shadow hover:shadow-lg hover:shadow-rust-900/15">
                    <div className="card-body sm:p-8">
                      <time className="block text-xs text-earth-500">{formatDate(latestReflection.date)}</time>
                      <h2 className="font-display mt-3 text-2xl text-earth-900 transition-colors group-hover:text-rust-800 sm:text-3xl">
                        {latestReflection.title}
                      </h2>
                      <p className="mt-4 text-earth-800 leading-relaxed sm:text-lg">{excerpt(latestReflection.text, 320)}</p>
                      <p className="mt-4 text-sm font-semibold text-rust-800">All reflections in this state →</p>
                    </div>
                  </article>
                </Link>
              ) : (
                <ReflectionFillerCard stateSlug={stateSlug} />
              )}
              <div className="flex justify-start">
                <Link
                  to={`/${stateSlug}/reflections`}
                  className="inline-flex items-center gap-2 rounded-xl border border-sage-300/80 bg-white/90 px-5 py-2.5 text-sm font-semibold text-earth-800 shadow-sm ring-1 ring-rust-300/40 transition-colors hover:border-rust-400/75 hover:bg-rust-50/95 hover:text-rust-900"
                >
                  View all reflections
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </section>

          <section>
            <SectionHeading>Blogs</SectionHeading>
            <div className="space-y-6">
              <Link
                to={`/blog/state/${stateSlug}`}
                className="block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-rust-400/70"
              >
                <article className="card group overflow-hidden !ring-rust-300/45 transition-shadow hover:shadow-lg hover:shadow-rust-900/15">
                  <div className="card-body sm:p-8">
                    <p className="text-earth-800 leading-relaxed sm:text-lg">
                      See all blogs from {state.name} in one place.
                    </p>
                    <p className="mt-4 text-sm font-semibold text-rust-800">Open blog →</p>
                  </div>
                </article>
              </Link>
              <div className="flex justify-start">
                <Link
                  to={`/blog/state/${stateSlug}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-sage-300/80 bg-white/90 px-5 py-2.5 text-sm font-semibold text-earth-800 shadow-sm ring-1 ring-rust-300/40 transition-colors hover:border-rust-400/75 hover:bg-rust-50/95 hover:text-rust-900"
                >
                  View blog
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </section>
        </div>
        )}
      </PageContentBand>
    </>
  )
}
