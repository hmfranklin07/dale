import { Link, Navigate, useParams } from 'react-router-dom'
import states from '../data/states.json'
import towns from '../data/towns.json'
import StateSubpageHero from '../components/StateSubpageHero'
import PageContentBand from '../components/PageContentBand'
import SectionHeading from '../components/SectionHeading'
import { formatDate } from './blogData'
import { interviewsForState } from '../lib/stateContent'
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
      <StateSubpageHero
        backTo={`/${stateSlug}`}
        backLabel={`Back to ${state.name}`}
        title={`Written conversations · ${state.name}`}
        description="Conversations from this stop."
      />

      <PageContentBand>
        <SectionHeading>All conversations</SectionHeading>
        {list.length === 0 ? (
          <div className="card card-body text-center text-earth-600">
            <p>No conversations for {state.name} yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {list.map((interview) => {
              const t = townBySlug[interview.townSlug]
              const displayTitle = interview.title || interview.personName
              return (
                <Link
                  key={interview.id}
                  to={`/${stateSlug}/transcriptions/${interview.id}`}
                  state={{ from: 'transcriptions' }}
                  className="block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-rust-400/70"
                >
                  <article className="card card-body group transition-shadow hover:shadow-lg hover:shadow-rust-900/15">
                    <div className="flex flex-col items-start gap-2">
                      {(interview.townLabel || t) && (
                        <span className="badge-sage inline-block">{interview.townLabel ?? t?.name}</span>
                      )}
                      <time className="text-xs text-earth-500">{formatDate(interview.date)}</time>
                    </div>
                    <h2 className="font-display mt-3 text-2xl text-earth-900 transition-colors group-hover:text-rust-800 sm:text-3xl">
                      {displayTitle}
                    </h2>
                    <p className="mt-2 text-sm text-earth-600">
                      {interview.personName} · {interview.role} · {interview.school}
                    </p>
                    {interview.summary && (
                      <p className="mt-4 text-earth-800 leading-relaxed sm:text-lg">{interview.summary}</p>
                    )}
                    <p className="mt-4 text-sm font-semibold text-rust-800">Read conversation →</p>
                  </article>
                </Link>
              )
            })}
          </div>
        )}
      </PageContentBand>
    </>
  )
}
