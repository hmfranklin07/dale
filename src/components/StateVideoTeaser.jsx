import { Link } from 'react-router-dom'
import YouTubeThumbnail from './YouTubeThumbnail'
import { formatDate } from '../pages/blogData'

export default function StateVideoTeaser({ vlog, stateSlug }) {
  return (
    <Link
      to={`/${stateSlug}/videos/${vlog.id}`}
      className="block h-full min-w-0 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-rust-400/70"
    >
      <article className="card group flex h-full flex-col overflow-hidden !border-2 !border-rust-700 !ring-0 transition-shadow hover:!border-rust-800 hover:shadow-lg hover:shadow-rust-900/15">
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
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full min-h-[6.5rem] items-center justify-center bg-gradient-to-br from-sage-100 to-sage-200/70 px-3">
              <p className="text-center text-xs font-medium text-earth-600">Add a YouTube ID for a thumbnail</p>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <h3 className="font-display text-2xl leading-tight text-earth-900 transition-colors group-hover:text-rust-800 sm:text-3xl">
            {vlog.title}
          </h3>
          {vlog.reflection && (
            <p className="mt-3 text-sm leading-relaxed text-earth-700">{vlog.reflection}</p>
          )}
          <div className="mt-4">
            <time className="block text-xs text-earth-500">{formatDate(vlog.date)}</time>
            <p className="mt-2 text-xs font-semibold text-rust-800">Watch video →</p>
          </div>
        </div>
      </article>
    </Link>
  )
}
