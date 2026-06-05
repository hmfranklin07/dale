import { Link } from 'react-router-dom'
import YouTubeThumbnail from './YouTubeThumbnail'
import { formatDate } from '../pages/blogData'

export default function StateVideoTeaser({ vlog, stateSlug }) {
  return (
    <Link
      to={`/${stateSlug}/videos/${vlog.id}`}
      className="block h-full min-w-0 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-rust-400/70"
    >
      <article className="card group flex h-full flex-col overflow-hidden !border-2 !border-sage-700 !ring-0 transition-shadow hover:!border-sage-800 hover:shadow-lg hover:shadow-sage-900/12">
        <div className="relative aspect-video shrink-0 overflow-hidden bg-sage-900/5">
          {vlog.videoSrc ? (
            <video
              src={vlog.videoSrc}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              muted
              playsInline
              preload="metadata"
              aria-hidden
            />
          ) : vlog.youtubeId ? (
            <YouTubeThumbnail
              youtubeId={vlog.youtubeId}
              frame={vlog.youtubeThumbnailFrame}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full min-h-[6.5rem] items-center justify-center bg-gradient-to-br from-sage-100 to-sage-200/70 px-3">
              <p className="text-center text-xs font-medium text-earth-600">Add a YouTube ID for a thumbnail</p>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col p-3 sm:p-3.5">
          <h3 className="font-display text-2xl leading-tight text-earth-900 transition-colors group-hover:text-rust-800 sm:text-3xl">
            {vlog.title}
          </h3>
          {vlog.reflection && (
            <p className="mt-1.5 text-sm leading-snug text-earth-700">{vlog.reflection}</p>
          )}
          <div className="mt-auto shrink-0 pt-2.5">
            <time className="block text-xs text-earth-500">{formatDate(vlog.date)}</time>
            <p className="mt-1.5 text-sm font-semibold text-rust-700 group-hover:text-rust-600">Watch video →</p>
          </div>
        </div>
      </article>
    </Link>
  )
}
