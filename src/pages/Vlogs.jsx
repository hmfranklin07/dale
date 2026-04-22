import { Link } from 'react-router-dom'
import vlogs from '../data/vlogs.json'
import towns from '../data/towns.json'
import YouTubeEmbed from '../components/YouTubeEmbed'

const townMap = Object.fromEntries(towns.map((t) => [t.slug, t]))
const sortedVlogs = [...vlogs].sort((a, b) => new Date(b.date) - new Date(a.date))

export default function Vlogs() {
  return (
    <>
      <section className="bg-gradient-to-b from-earth-100 to-sage-50 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="badge-earth mb-4 inline-block">Reflections</span>
          <h1 className="section-title text-4xl sm:text-5xl mb-4">Vlogs & Reflections</h1>
          <p className="text-lg text-earth-600">
            Video diaries and written reflections from each stop along the way.
          </p>
        </div>
      </section>

      <div className="page-container">
        <div className="max-w-3xl mx-auto">
          {sortedVlogs.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4 opacity-30">🎬</div>
              <h3 className="font-display text-xl text-earth-900 mb-2">No Vlogs Yet</h3>
              <p className="text-earth-500">Videos and reflections will appear here as the trip progresses.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {sortedVlogs.map((vlog) => {
                const town = townMap[vlog.townSlug]
                return (
                  <article key={vlog.id} className="card overflow-hidden">
                    <YouTubeEmbed youtubeId={vlog.youtubeId} title={vlog.title} />
                    <div className="card-body">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        {town && (
                          <Link to={`/towns/${town.slug}`} className="badge-sage hover:bg-sage-200 transition-colors">
                            {town.name}, {town.state}
                          </Link>
                        )}
                        <time className="text-xs text-earth-400">
                          {new Date(vlog.date + 'T00:00:00').toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </time>
                      </div>
                      <h2 className="font-display text-2xl text-earth-900 mb-4">{vlog.title}</h2>
                      <div className="text-earth-700 leading-relaxed whitespace-pre-line">
                        {vlog.reflection}
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
