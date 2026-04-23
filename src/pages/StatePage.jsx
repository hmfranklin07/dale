import { Link, useParams, Navigate } from 'react-router-dom'
import states from '../data/states.json'
import towns from '../data/towns.json'
import interviews from '../data/interviews.json'
import shorts from '../data/shorts.json'
import vlogs from '../data/vlogs.json'
import YouTubeEmbed from '../components/YouTubeEmbed'
import { SectionAmbience } from '../components/SectionAmbience'
import { PageHeroPanel } from '../components/PageHeroPanel'
import PageContentBand from '../components/PageContentBand'
import SectionHeading, { pageTitleClass } from '../components/SectionHeading'

const shell = 'max-w-6xl mx-auto px-2.5 sm:px-4'
const townBySlug = Object.fromEntries(towns.map((t) => [t.slug, t]))
const stateSlugs = new Set(states.map((s) => s.slug))

function formatDate(d) {
  return new Date(d + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function StatePage() {
  const { stateSlug } = useParams()
  if (!stateSlugs.has(stateSlug)) {
    return <Navigate to="/" replace />
  }

  const state = states.find((s) => s.slug === stateSlug)
  const stateTowns = towns.filter((t) => t.stateSlug === stateSlug)
  const townSlugs = new Set(stateTowns.map((t) => t.slug))

  const stateShorts = shorts
    .filter((s) => townSlugs.has(s.townSlug))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
  const stateInterviews = interviews
    .filter((i) => townSlugs.has(i.townSlug))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
  const stateVlogs = vlogs
    .filter((v) => townSlugs.has(v.townSlug))
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <>
      <section className="relative overflow-hidden border-b border-sage-200/50 bg-gradient-to-b from-amber-50/90 via-sage-100/75 to-sage-200/55">
        <SectionAmbience variant="hero" />
        <div className="relative z-10">
          <div className={`${shell} py-12 sm:py-16 md:py-20`}>
            <PageHeroPanel>
              <Link
                to="/"
                className="text-sage-800 hover:text-rust-800 text-sm font-medium mb-4 inline-flex items-center gap-1.5 rounded-lg transition-colors"
              >
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to home &amp; map
              </Link>
              <span className="badge-sage mb-3 inline-block">{state.abbr}</span>
              <h1
                className={`font-display mb-3 sm:mb-4 text-4xl leading-tight sm:text-5xl ${pageTitleClass}`}
              >
                {state.name}
              </h1>
              <p className="text-base text-earth-800 leading-relaxed sm:text-lg">
                Short-form field notes, sit-down interviews, and reflections from the towns we visit
                in {state.name}. Content updates as the trip goes on.
              </p>
            </PageHeroPanel>
          </div>
        </div>
      </section>

      <PageContentBand>
        <div className="space-y-20">
          <section>
            <SectionHeading>Short-form content</SectionHeading>
            <p className="text-earth-800 -mt-2 mb-8 sm:text-lg leading-relaxed">
              Individual interview clips and a little about each town.
            </p>
            {stateTowns.length === 0 ? (
              <p className="text-earth-600">Towns for this state will be listed here.</p>
            ) : (
              <div className="space-y-10">
                {stateTowns.map((town) => {
                  const townSh = stateShorts.filter((s) => s.townSlug === town.slug)
                  return (
                    <div key={town.slug} className="card card-body">
                      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                        <div>
                          <h3 className="font-display text-xl text-earth-900">
                            {town.name}
                          </h3>
                          <p className="text-sm text-earth-600">Visited {formatDate(town.date)}</p>
                        </div>
                      </div>
                      <p className="text-earth-800 mb-4 leading-relaxed">{town.summary}</p>
                      {townSh.length > 0 ? (
                        <div className="space-y-3 border-t border-sage-200/80 pt-4">
                          {townSh.map((s) => (
                            <div key={s.id}>
                              <p className="text-xs text-earth-500 mb-1">{formatDate(s.date)}</p>
                              <h4 className="font-medium text-earth-900">{s.title}</h4>
                              <p className="text-sm text-earth-800 mt-1">{s.text}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-earth-600 border-t border-sage-200/80 pt-4">
                          Road updates and short interview clips for {town.name} will appear here.
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </section>

          <section>
            <SectionHeading>Written interviews &amp; statements</SectionHeading>
            <p className="text-earth-800 -mt-2 mb-8 sm:text-lg leading-relaxed">
              Longer sit-downs and Q&amp;A, transcribed and edited for the site.
            </p>
            {stateInterviews.length === 0 ? (
              <div className="card card-body text-center text-earth-600">
                <p>Written interviews and statements for {state.name} will be published as visits wrap up.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {stateInterviews.map((interview) => {
                  const t = townBySlug[interview.townSlug]
                  return (
                    <article key={interview.id} className="card card-body">
                      <div className="mb-6">
                        {t && <span className="badge-sage mb-2 inline-block">{t.name}</span>}
                        <h3 className="font-display text-2xl text-earth-900">{interview.personName}</h3>
                        <p className="text-earth-600 text-sm">
                          {interview.role} · {interview.school}
                        </p>
                        <time className="text-xs text-earth-500">{formatDate(interview.date)}</time>
                      </div>
                      <div className="space-y-5">
                        {interview.questions.map((qa, idx) => (
                          <div key={idx}>
                            <p className="text-sm font-semibold text-sage-700 mb-1">Q: {qa.q}</p>
                            <blockquote className="text-earth-800 pl-4 text-sm sm:text-base leading-relaxed border-l-2 border-rust-300/50">
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
          </section>

          <section>
            <SectionHeading>Reflections</SectionHeading>
            <p className="text-earth-800 -mt-2 mb-8 sm:text-lg leading-relaxed">
              Room to process the trip: what stood out, what I’m still thinking about.
            </p>
            {stateVlogs.length === 0 ? (
              <div className="card card-body text-center text-earth-600">
                <p>Reflections tied to {state.name} (including vlog context when available) will go here.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {stateVlogs.map((v) => {
                  const t = townBySlug[v.townSlug]
                  return (
                    <div key={v.id} className="card overflow-hidden">
                      {v.youtubeId && (
                        <YouTubeEmbed youtubeId={v.youtubeId} title={v.title} />
                      )}
                      <div className="card-body">
                        {t && (
                          <p className="text-xs text-earth-600 mb-1">
                            {t.name} · {formatDate(v.date)}
                          </p>
                        )}
                        <h3 className="font-display text-xl text-earth-900 mb-3">{v.title}</h3>
                        <p className="text-earth-800 leading-relaxed whitespace-pre-line">{v.reflection}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </section>
        </div>
      </PageContentBand>
    </>
  )
}
