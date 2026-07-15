import { Link, Navigate, useParams } from 'react-router-dom'
import states from '../data/states.json'
import VideoEmbed from '../components/VideoEmbed'
import StateSubpageHero from '../components/StateSubpageHero'
import PageContentBand from '../components/PageContentBand'
import { formatDate, vlogLocationLabel } from './blogData'
import { vlogsForState } from '../lib/stateContent'
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
      <StateSubpageHero
        backTo={`/${stateSlug}`}
        backLabel={`Back to ${state.name}`}
        title={`Videos · ${state.name}`}
        description="Conversations from this stop."
      />

      <PageContentBand>
        {list.length === 0 ? (
          <div className="card card-body text-center text-earth-600">
            <p>No videos linked to towns in {state.name} yet. Add video entries with matching town slugs.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {list.map((v) => (
              <Link
                key={v.id}
                to={`/${stateSlug}/videos/${v.id}`}
                className="block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-rust-400/70"
              >
                <article className="card card-hover-pop group flex h-full min-w-0 flex-col overflow-hidden">
                  <VideoEmbed youtubeId={v.youtubeId} videoSrc={v.videoSrc} title={v.title} />
                  <div className="card-body flex flex-1 flex-col">
                    <div className="mb-2 flex flex-col items-start gap-2">
                      <span className="badge-sage max-w-full truncate text-[0.65rem]">{vlogLocationLabel(v)}</span>
                      <time className="block text-xs text-earth-500">{formatDate(v.date)}</time>
                    </div>
                    <h2 className="font-display mb-2 text-xl leading-snug text-earth-900 transition-colors group-hover:text-rust-800 lg:text-[1.35rem]">
                      {v.title}
                    </h2>
                    <p className="flex-1 text-sm leading-relaxed text-earth-800 whitespace-pre-line">{v.reflection}</p>
                    <p className="mt-3 text-xs font-semibold text-rust-800">Watch video →</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </PageContentBand>
    </>
  )
}
