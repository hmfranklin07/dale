import { Link, Navigate, useParams } from 'react-router-dom'
import states from '../data/states.json'
import YouTubeEmbed from '../components/YouTubeEmbed'
import { innerPageTopBandSectionClass } from '../config/mapPinColors'
import RouteDoodleBackground from '../components/RouteDoodleBackground'
import { SectionAmbience } from '../components/SectionAmbience'
import PageContentBand from '../components/PageContentBand'
import SectionHeading, { pageTitleClass } from '../components/SectionHeading'
import { formatDate, vlogLocationLabel } from './blogData'
import { vlogsForState } from '../lib/stateContent'

const sectionShell = 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-10'
const stateSlugs = new Set(states.map((s) => s.slug))

export default function StateVideos() {
  const { stateSlug } = useParams()
  if (!stateSlugs.has(stateSlug)) {
    return <Navigate to="/" replace />
  }

  const state = states.find((s) => s.slug === stateSlug)
  const list = vlogsForState(stateSlug)

  return (
    <>
      <section
        className={`relative overflow-hidden border-b border-sage-200/60 ${innerPageTopBandSectionClass}`}
      >
        <SectionAmbience variant="paper" />
        <RouteDoodleBackground />
        <div className="relative z-10">
          <div className={`${sectionShell} py-8 sm:py-10`}>
            <Link
              to={`/${stateSlug}`}
              className="text-sage-900 hover:text-rust-800 mb-4 inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
            >
              <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to {state.name}
            </Link>
            <h1 className={`font-display mt-2 text-3xl sm:text-4xl ${pageTitleClass}`}>Videos · {state.name}</h1>
            <p className="mt-3 max-w-2xl text-earth-800 sm:text-lg leading-relaxed">
              Conversations and interviews from this stop, with room for embedded clips when YouTube IDs are added.
            </p>
          </div>
        </div>
      </section>

      <PageContentBand>
        {list.length === 0 ? (
          <div className="card card-body text-center text-earth-600">
            <p>No videos linked to towns in {state.name} yet. Add entries in vlogs.json with matching town slugs.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {list.map((v) => (
              <article key={v.id} className="card flex h-full min-w-0 flex-col overflow-hidden">
                <YouTubeEmbed youtubeId={v.youtubeId} title={v.title} />
                <div className="card-body flex flex-1 flex-col">
                  <div className="mb-2 flex flex-col items-start gap-2">
                    <span className="badge-sage max-w-full truncate text-[0.65rem]">{vlogLocationLabel(v)}</span>
                    <time className="block text-xs text-earth-500">{formatDate(v.date)}</time>
                  </div>
                  <h2 className="font-display mb-2 text-xl leading-snug text-earth-900 lg:text-[1.35rem]">{v.title}</h2>
                  <p className="flex-1 text-sm leading-relaxed text-earth-800 whitespace-pre-line">{v.reflection}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </PageContentBand>
    </>
  )
}
