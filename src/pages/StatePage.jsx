import { Link, useParams, Navigate } from 'react-router-dom'
import states from '../data/states.json'
import towns from '../data/towns.json'
import interviews from '../data/interviews.json'
import shorts from '../data/shorts.json'
import vlogs from '../data/vlogs.json'
import YouTubeEmbed from '../components/YouTubeEmbed'

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
      <section className="bg-gradient-to-b from-sage-200/50 to-sage-100/90 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="text-sage-800 hover:text-sage-900 text-sm font-medium mb-4 inline-flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to home & map
          </Link>
          <span className="badge-sage mb-3 inline-block">
            {state.abbr} · {stateTowns.length} {stateTowns.length === 1 ? 'stop' : 'stops'}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl text-earth-900 mb-3">{state.name}</h1>
          <p className="text-lg text-earth-700 leading-relaxed">
            Short-form field notes, sit-down interviews, and reflections from the towns we visit
            in {state.name}. Content updates as the trip goes on.
          </p>
        </div>
      </section>

      <div className="page-container">
        <div className="max-w-3xl mx-auto space-y-20">
          {/* Towns + short-form */}
          <section>
            <h2 className="font-display text-2xl text-earth-900 mb-2">Short-form content</h2>
            <p className="text-earth-700 mb-8">
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
                      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
                        <div>
                          <h3 className="font-display text-xl text-earth-900">
                            {town.name}
                          </h3>
                          <p className="text-sm text-earth-600">Visited {formatDate(town.date)}</p>
                        </div>
                      </div>
                      <p className="text-earth-700 leading-relaxed mb-4">{town.summary}</p>
                      {townSh.length > 0 ? (
                        <div className="space-y-3 border-t border-sage-200/90 pt-4">
                          {townSh.map((s) => (
                            <div key={s.id}>
                              <p className="text-xs text-earth-500 mb-1">{formatDate(s.date)}</p>
                              <h4 className="font-medium text-earth-900">{s.title}</h4>
                              <p className="text-sm text-earth-700 mt-1">{s.text}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-earth-600 border-t border-sage-200/90 pt-4">
                          Road updates and short interview clips for {town.name} will appear here.
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </section>

          {/* Written interviews / statements */}
          <section>
            <h2 className="font-display text-2xl text-earth-900 mb-2">Written interviews & statements</h2>
            <p className="text-earth-700 mb-8">Longer sit-downs and Q&amp;A, transcribed and edited for the site.</p>
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
                            <blockquote className="text-earth-800 leading-relaxed pl-4 border-l-2 border-sage-300 text-sm sm:text-base">
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

          {/* Reflections */}
          <section>
            <h2 className="font-display text-2xl text-earth-900 mb-2">Reflections</h2>
            <p className="text-earth-700 mb-8">Room to process the trip: what stood out, what I’m still thinking about.</p>
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
                        <p className="text-earth-700 leading-relaxed whitespace-pre-line">{v.reflection}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  )
}
