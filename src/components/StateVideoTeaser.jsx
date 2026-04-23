import { Link } from 'react-router-dom'
import { excerpt, formatDate, vlogLocationLabel } from '../pages/blogData'

export default function StateVideoTeaser({ vlog, stateSlug }) {
  const townLabel = vlogLocationLabel(vlog)
  return (
    <Link
      to={`/${stateSlug}/videos`}
      className="block h-full min-w-0 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-rust-400/70"
    >
      <article className="card group flex h-full flex-col overflow-hidden !ring-rust-300/45 transition-shadow hover:shadow-lg hover:shadow-rust-900/15">
        <div className="relative aspect-video shrink-0 overflow-hidden bg-sage-900/5 ring-1 ring-sage-200/40">
          {vlog.youtubeId ? (
            <img
              src={`https://img.youtube.com/vi/${vlog.youtubeId}/mqdefault.jpg`}
              alt=""
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full min-h-[6.5rem] items-center justify-center bg-gradient-to-br from-sage-100 to-sage-200/70 px-3">
              <p className="text-center text-xs font-medium text-earth-600">Add a YouTube ID for a thumbnail</p>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <div className="flex flex-col items-start gap-2">
            {townLabel && (
              <span className="badge-sage inline-block max-w-full truncate text-[0.65rem]">{townLabel}</span>
            )}
            <time className="block text-[0.65rem] text-earth-500">{formatDate(vlog.date)}</time>
          </div>
          <h3 className="font-display mt-2 line-clamp-2 text-lg leading-snug text-earth-900 transition-colors group-hover:text-rust-800">
            {vlog.title}
          </h3>
          <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-earth-600">{excerpt(vlog.reflection, 120)}</p>
          <p className="mt-3 text-xs font-semibold text-rust-800">All videos in this state →</p>
        </div>
      </article>
    </Link>
  )
}
