import { Link } from 'react-router-dom'

export default function ContentCard({ title, date, text, badge, badgeClass, link, image }) {
  const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const content = (
    <article className="card group">
      {image && (
        <div className="aspect-video overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="card-body">
        <div className="flex items-center gap-3 mb-3">
          {badge && <span className={badgeClass || 'badge-sage'}>{badge}</span>}
          <time className="text-xs text-earth-500">{formattedDate}</time>
        </div>
        <h3 className="font-display text-xl text-earth-900 mb-2 transition-colors group-hover:text-rust-800">
          {title}
        </h3>
        {text && (
          <p className="text-earth-700 text-sm leading-relaxed line-clamp-3">{text}</p>
        )}
      </div>
    </article>
  )

  if (link) {
    return <Link to={link} className="block">{content}</Link>
  }

  return content
}
