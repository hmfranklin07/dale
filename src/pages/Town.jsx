import { useParams, Link } from 'react-router-dom'
import towns from '../data/towns.json'
import interviews from '../data/interviews.json'
import vlogs from '../data/vlogs.json'
import shorts from '../data/shorts.json'
import YouTubeEmbed from '../components/YouTubeEmbed'

export default function Town() {
  const { slug } = useParams()
  const town = towns.find((t) => t.slug === slug)

  if (!town) {
    return (
      <div className="page-container text-center">
        <h1 className="section-title">Town Not Found</h1>
        <p className="text-earth-600 mb-6">We couldn't find that location.</p>
        <Link to="/" className="text-rust-600 hover:text-rust-700 font-medium">
          &larr; Back to Map
        </Link>
      </div>
    )
  }

  const townInterviews = interviews.filter((i) => i.townSlug === slug)
  const townVlogs = vlogs.filter((v) => v.townSlug === slug)
  const townShorts = shorts.filter((s) => s.townSlug === slug)

  const formattedDate = new Date(town.date + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-sage-100 to-sage-50 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="text-sage-600 hover:text-sage-800 text-sm font-medium mb-4 inline-flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Map
          </Link>
          <span className="badge-rust mb-4 block w-fit">{formattedDate}</span>
          <h1 className="font-display text-4xl sm:text-5xl text-earth-900 mb-3">
            {town.name}, {town.state}
          </h1>
          <p className="text-lg text-earth-600 leading-relaxed">{town.summary}</p>
        </div>
      </section>

      <div className="page-container">
        <div className="max-w-3xl mx-auto space-y-16">
          {/* Road Updates */}
          {townShorts.length > 0 && (
            <section>
              <h2 className="font-display text-2xl text-earth-900 mb-6">Road Updates</h2>
              <div className="space-y-4">
                {townShorts.map((s) => (
                  <div key={s.id} className="card card-body">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="badge-sage">Update</span>
                      <time className="text-xs text-earth-400">
                        {new Date(s.date + 'T00:00:00').toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
                    <h3 className="font-display text-lg text-earth-900 mb-2">{s.title}</h3>
                    <p className="text-earth-600 text-sm leading-relaxed">{s.text}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Vlogs */}
          {townVlogs.length > 0 && (
            <section>
              <h2 className="font-display text-2xl text-earth-900 mb-6">Vlogs & Reflections</h2>
              <div className="space-y-8">
                {townVlogs.map((v) => (
                  <div key={v.id} className="card overflow-hidden">
                    <YouTubeEmbed youtubeId={v.youtubeId} title={v.title} />
                    <div className="card-body">
                      <h3 className="font-display text-xl text-earth-900 mb-3">{v.title}</h3>
                      <p className="text-earth-600 leading-relaxed whitespace-pre-line">{v.reflection}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Interviews */}
          {townInterviews.length > 0 && (
            <section>
              <h2 className="font-display text-2xl text-earth-900 mb-6">Interviews</h2>
              <div className="space-y-8">
                {townInterviews.map((interview) => (
                  <div key={interview.id} className="card card-body">
                    <div className="mb-6">
                      <h3 className="font-display text-xl text-earth-900">{interview.personName}</h3>
                      <p className="text-sm text-earth-500">{interview.role} — {interview.school}</p>
                    </div>
                    <div className="space-y-6">
                      {interview.questions.map((qa, idx) => (
                        <div key={idx}>
                          <p className="text-sm font-semibold text-sage-700 mb-2">Q: {qa.q}</p>
                          <p className="text-earth-700 leading-relaxed pl-4 border-l-2 border-sage-200">
                            "{qa.a}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Empty state */}
          {townShorts.length === 0 && townVlogs.length === 0 && townInterviews.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 opacity-30">🚗</div>
              <h3 className="font-display text-xl text-earth-900 mb-2">Content Coming Soon</h3>
              <p className="text-earth-500">
                We haven't visited {town.name} yet. Check back after {formattedDate}!
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
