import { Link } from 'react-router-dom'
import { formatDate } from '../pages/blogData'

export default function ReflectionCard({ paper, badge }) {
  const label = badge ?? paper.eyebrow

  return (
    <Link to={`/reflections/${paper.id}`} className="block">
      <article className="card card-hover-pop group overflow-hidden !ring-rust-300/45">
        <div className="card-body p-5 sm:p-8">
          {label && <span className="badge-sage inline-block">{label}</span>}
          {paper.date && (
            <time className={`mb-2 block text-xs text-earth-500 ${label ? 'mt-3' : ''}`}>
              {formatDate(paper.date)}
            </time>
          )}
          <h2
            className={`font-display text-xl leading-snug text-earth-900 sm:text-2xl ${
              label && !paper.date ? 'mt-3' : ''
            }`}
          >
            {paper.title}
          </h2>
          <div className="mt-2.5 h-px w-14 bg-gradient-to-r from-rust-400/90 to-transparent sm:w-16" aria-hidden />
          {paper.credit && <p className="mt-2.5 text-sm font-medium text-sage-800/90">{paper.credit}</p>}
          {paper.summary && (
            <p className="mt-3 text-sm leading-relaxed text-earth-800 sm:text-base">{paper.summary}</p>
          )}
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-rust-800 transition-colors group-hover:text-rust-950">
            Read the reflection
            <span aria-hidden>→</span>
          </span>
        </div>
      </article>
    </Link>
  )
}
