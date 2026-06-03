import { Link, Navigate, useParams } from 'react-router-dom'
import states from '../data/states.json'
import PageContentBand from '../components/PageContentBand'
import VideoEmbed from '../components/VideoEmbed'
import { pageTitleClass } from '../components/SectionHeading'
import { formatDate, vlogLocationLabel } from './blogData'
import { vlogBelongsToState, vlogById } from '../lib/stateContent'

const shell = 'max-w-4xl mx-auto w-full'
const stateSlugs = new Set(states.map((s) => s.slug))

export default function StateVideo() {
  const { stateSlug, videoId } = useParams()
  if (!stateSlugs.has(stateSlug)) {
    return <Navigate to="/" replace />
  }

  const state = states.find((s) => s.slug === stateSlug)
  const vlog = vlogById(videoId)
  if (!vlog || !vlogBelongsToState(vlog, stateSlug)) {
    return <Navigate to={`/${stateSlug}/videos`} replace />
  }

  const townLabel = vlogLocationLabel(vlog)

  return (
    <PageContentBand wash="rust" variant="sage">
      <div className={shell}>
        <Link
          to={`/${stateSlug}`}
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-earth-800 transition-colors hover:text-rust-800"
        >
          <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to {state.name}
        </Link>

        <VideoEmbed youtubeId={vlog.youtubeId} videoSrc={vlog.videoSrc} title={vlog.title} />

        <div className="mt-6 sm:mt-8">
          <div className="flex flex-col items-start gap-2">
            {townLabel && <span className="badge-sage inline-block">{townLabel}</span>}
            <time className="text-xs text-earth-500 sm:text-sm">{formatDate(vlog.date)}</time>
          </div>
          <h1 className={`font-display mt-3 text-3xl sm:text-4xl ${pageTitleClass}`}>{vlog.title}</h1>
          {vlog.reflection && (
            <p className="mt-4 text-earth-800 leading-relaxed sm:text-lg">{vlog.reflection}</p>
          )}
        </div>
      </div>
    </PageContentBand>
  )
}
