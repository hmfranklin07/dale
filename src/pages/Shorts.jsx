import { Link } from 'react-router-dom'
import shorts from '../data/shorts.json'
import towns from '../data/towns.json'

const townMap = Object.fromEntries(towns.map((t) => [t.slug, t]))
const sortedShorts = [...shorts].sort((a, b) => new Date(b.date) - new Date(a.date))

export default function Shorts() {
  return (
    <>
      <section className="bg-gradient-to-b from-sage-100 to-sage-50 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="badge-sage mb-4 inline-block">From the Road</span>
          <h1 className="section-title text-4xl sm:text-5xl mb-4">Road Updates</h1>
          <p className="text-lg text-earth-600">
            Quick dispatches, observations, and moments from the journey.
          </p>
        </div>
      </section>

      <div className="page-container">
        <div className="max-w-2xl mx-auto">
          {sortedShorts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4 opacity-30">📝</div>
              <h3 className="font-display text-xl text-earth-900 mb-2">No Updates Yet</h3>
              <p className="text-earth-500">The trip hasn't started yet. Check back soon!</p>
            </div>
          ) : (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-sage-200 hidden sm:block" />

              <div className="space-y-6">
                {sortedShorts.map((post) => {
                  const town = townMap[post.townSlug]
                  return (
                    <div key={post.id} className="relative sm:pl-12">
                      {/* Timeline dot */}
                      <div className="absolute left-2.5 top-6 w-3 h-3 rounded-full bg-rust-500 border-2 border-white hidden sm:block" />

                      <article className="card card-body">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          {town && (
                            <Link to={`/towns/${town.slug}`} className="badge-sage hover:bg-sage-200 transition-colors">
                              {town.name}, {town.state}
                            </Link>
                          )}
                          <time className="text-xs text-earth-400">
                            {new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', {
                              weekday: 'long',
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </time>
                        </div>
                        <h2 className="font-display text-xl text-earth-900 mb-2">{post.title}</h2>
                        <p className="text-earth-600 leading-relaxed">{post.text}</p>
                        {post.image && (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="mt-4 rounded-xl w-full object-cover max-h-64"
                          />
                        )}
                      </article>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
