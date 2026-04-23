import { Link, useParams, Navigate } from 'react-router-dom'
import states from '../data/states.json'
import towns from '../data/towns.json'
import { SectionAmbience } from '../components/SectionAmbience'
import { PageHeroPanel } from '../components/PageHeroPanel'
import PageContentBand from '../components/PageContentBand'
import SectionHeading, { pageTitleClass } from '../components/SectionHeading'
import StateVideoTeaser from '../components/StateVideoTeaser'
import { excerpt, formatDate } from './blogData'
import { interviewsForState, reflectionsForState, vlogsForState } from '../lib/stateContent'

const sectionShell = 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-10'
const townBySlug = Object.fromEntries(towns.map((t) => [t.slug, t]))
const stateSlugs = new Set(states.map((s) => s.slug))

export default function StatePage() {
  const { stateSlug } = useParams()
  if (!stateSlugs.has(stateSlug)) {
    return <Navigate to="/" replace />
  }

  const state = states.find((s) => s.slug === stateSlug)
  const stateVlogs = vlogsForState(stateSlug)
  const stateInterviews = interviewsForState(stateSlug)
  const stateReflections = reflectionsForState(stateSlug)

  const videoSlots = [stateVlogs[0], stateVlogs[1], stateVlogs[2]]
  const hasAnyVideo = stateVlogs.length > 0
  const latestInterview = stateInterviews[0]
  const latestReflection = stateReflections[0]

  return (
    <>
      <section className="relative overflow-hidden border-b border-sage-200/60 bg-gradient-to-b from-white via-amber-50/40 to-sage-200/55">
        <SectionAmbience variant="paper" />
        <div className="relative z-10">
          <div className={`${sectionShell} py-12 sm:py-16 md:py-20`}>
            <PageHeroPanel className="bg-white/84">
              <Link
                to="/"
                className="mb-4 inline-flex items-center gap-1.5 rounded-lg text-sm font-medium text-sage-900 transition-colors hover:text-rust-800"
              >
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to home &amp; map
              </Link>
              <h1
                className={`font-display mt-1 mb-3 text-4xl leading-tight sm:mb-4 sm:text-5xl ${pageTitleClass}`}
              >
                {state.name}
              </h1>
              <p className="text-base leading-relaxed text-earth-800 sm:text-lg">
                {state.heroIntro
                  ? state.heroIntro
                  : `Short-form field notes, sit-down interviews, and reflections from the towns we visit in ${state.name}. Content updates as the trip goes on.`}
              </p>
              <p className="mt-5 text-base text-earth-800 sm:text-lg">
                <Link
                  to={`/blog/state/${state.slug}`}
                  className="font-semibold text-rust-800 underline decoration-rust-400/60 underline-offset-2 transition-colors hover:text-rust-950"
                >
                  See {state.name} blogs and vlogs here
                </Link>
              </p>
            </PageHeroPanel>
          </div>
        </div>
      </section>

      <PageContentBand>
        <div className="space-y-16 sm:space-y-20">
          <section>
            <SectionHeading>Latest videos</SectionHeading>
            <p className="-mt-2 mb-8 text-earth-800 sm:text-lg leading-relaxed">
              Conversations and interviews from this stop.
            </p>
            {hasAnyVideo ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:items-stretch">
                  {videoSlots.map((vlog, idx) =>
                    vlog ? (
                      <StateVideoTeaser key={vlog.id} vlog={vlog} stateSlug={stateSlug} />
                    ) : (
                      <div
                        key={`video-slot-${idx}`}
                        className="flex min-h-[12rem] flex-col items-center justify-center rounded-2xl border border-dashed border-rust-400/65 bg-gradient-to-b from-rust-50/90 via-white to-sage-100/40 p-5 text-center ring-1 ring-rust-200/50"
                      >
                        <span className="text-xs font-semibold uppercase tracking-wide text-rust-800">Open slot</span>
                        <p className="mt-2 text-sm text-earth-600">
                          Add another vlog for a town in {state.name} in vlogs.json to fill this column.
                        </p>
                      </div>
                    ),
                  )}
                </div>
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
            ) : (
              <p className="text-earth-600 sm:text-lg">
                Videos for {state.name} will show here when you add vlogs tied to towns in this state.
              </p>
            )}
          </section>

          <section>
            <SectionHeading>Latest transcriptions</SectionHeading>
            <p className="-mt-2 mb-8 text-earth-800 sm:text-lg leading-relaxed">
              Written interviews and conversations from this stop.
            </p>
            {latestInterview ? (
              <div className="space-y-6">
                <Link
                  to={`/${stateSlug}/transcriptions`}
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
                        {latestInterview.personName}
                      </h2>
                      <p className="mt-2 text-sm text-earth-600">
                        {latestInterview.role} · {latestInterview.school}
                      </p>
                      <p className="mt-4 text-earth-800 leading-relaxed sm:text-lg">
                        {excerpt(latestInterview.questions[0]?.a || latestInterview.questions[0]?.q || '', 320)}
                      </p>
                      <p className="mt-4 text-sm font-semibold text-rust-800">All transcriptions in this state →</p>
                    </div>
                  </article>
                </Link>
                <div className="flex justify-start">
                  <Link
                    to={`/${stateSlug}/transcriptions`}
                    className="inline-flex items-center gap-2 rounded-xl border border-sage-300/80 bg-white/90 px-5 py-2.5 text-sm font-semibold text-earth-800 shadow-sm ring-1 ring-rust-300/40 transition-colors hover:border-rust-400/75 hover:bg-rust-50/95 hover:text-rust-900"
                  >
                    View all transcriptions
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            ) : (
              <p className="text-earth-600 sm:text-lg">
                Transcriptions for {state.name} will show here when you add interviews for towns in this state.
              </p>
            )}
          </section>

          <section>
            <SectionHeading>Reflections</SectionHeading>
            <p className="-mt-2 mb-8 text-earth-800 sm:text-lg leading-relaxed">
              Longer written notes from the road while they are still fresh.
            </p>
            {latestReflection ? (
              <div className="space-y-6">
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
            ) : (
              <div className="space-y-4">
                <p className="text-earth-600 sm:text-lg">
                  Reflections for {state.name} live in reflections.json (use <code className="text-sm">stateSlug</code>{' '}
                  <code className="text-sm">{stateSlug}</code>). You can still open the archive now:
                </p>
                <Link
                  to={`/${stateSlug}/reflections`}
                  className="inline-flex items-center gap-2 rounded-xl border border-sage-300/80 bg-white/90 px-5 py-2.5 text-sm font-semibold text-earth-800 shadow-sm ring-1 ring-rust-300/40 transition-colors hover:border-rust-400/75 hover:bg-rust-50/95 hover:text-rust-900"
                >
                  Reflections archive
                  <span aria-hidden>→</span>
                </Link>
              </div>
            )}
          </section>
        </div>
      </PageContentBand>
    </>
  )
}
