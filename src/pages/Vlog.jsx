import { Link } from 'react-router-dom'
import vlogs from '../data/vlogs.json'
import vlogBlogs from '../data/vlogBlogs.json'
import towns from '../data/towns.json'
import YouTubeEmbed from '../components/YouTubeEmbed'
import SocialLinks from '../components/SocialLinks'

const townBySlug = Object.fromEntries(towns.map((t) => [t.slug, t]))
const sortedVlogs = [...vlogs].sort((a, b) => new Date(b.date) - new Date(a.date))
const sortedBlogs = [...vlogBlogs].sort((a, b) => new Date(b.date) - new Date(a.date))

function formatDate(d) {
  return new Date(d + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function Vlog() {
  return (
    <>
      <section className="bg-gradient-to-b from-earth-100 to-sage-50 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="badge-earth mb-4 inline-block">Vlog</span>
          <h1 className="section-title text-4xl sm:text-5xl mb-4">Field diary: video, B‑roll, and write-ups</h1>
          <p className="text-lg text-earth-600">
            YouTube vlog style cuts, B‑roll from the road, and longer written blogs about the communities we visit.
          </p>
          <div className="mt-8">
            <SocialLinks size="large" />
          </div>
        </div>
      </section>

      <div className="page-container">
        <div className="max-w-3xl mx-auto space-y-20">
          <section>
            <h2 className="font-display text-2xl text-earth-900 mb-2">Short-form & B‑roll</h2>
            <p className="text-earth-600 mb-8">
              Quick vlog style moments: driving, towns, and the space between the formal sit-downs. When
              a clip is ready to embed, add its YouTube ID in your vlog data so it can play on this page
              too.
            </p>
            {sortedVlogs.length === 0 ? (
              <div className="card card-body text-center text-earth-500">Vlog posts will show up as you add them.</div>
            ) : (
              <div className="space-y-10">
                {sortedVlogs.map((v) => {
                  const town = townBySlug[v.townSlug]
                  return (
                    <article key={v.id} className="card overflow-hidden">
                      <YouTubeEmbed youtubeId={v.youtubeId} title={v.title} />
                      <div className="card-body">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          {town && (
                            <Link
                              to={`/${town.stateSlug}`}
                              className="badge-sage hover:bg-sage-200 transition-colors"
                            >
                              {town.name}, {town.state}
                            </Link>
                          )}
                          <time className="text-xs text-earth-400">{formatDate(v.date)}</time>
                        </div>
                        <h3 className="font-display text-2xl text-earth-900 mb-3">{v.title}</h3>
                        <p className="text-earth-700 leading-relaxed whitespace-pre-line">{v.reflection}</p>
                      </div>
                    </article>
                  )
                })}
              </div>
            )}
          </section>

          <section>
            <h2 className="font-display text-2xl text-earth-900 mb-2">Link out</h2>
            <p className="text-earth-600 mb-6">Follow the trip in motion on the channels I update most often.</p>
            <SocialLinks className="justify-start" size="large" />
          </section>

          <section>
            <h2 className="font-display text-2xl text-earth-900 mb-2">Written blogs: experiences in each town</h2>
            <p className="text-earth-600 mb-8">Longer posts about what I saw, who I met, and how each place is shaping the project.</p>
            {sortedBlogs.length === 0 ? (
              <p className="text-earth-500">No written blog posts yet. Add them alongside your other site content when you are ready.</p>
            ) : (
              <div className="space-y-6">
                {sortedBlogs.map((b) => (
                  <article key={b.id} className="card card-body">
                    {b.townLabel && <span className="badge-sage mb-2 inline-block">{b.townLabel}</span>}
                    <time className="text-xs text-earth-400 block mb-1">{formatDate(b.date)}</time>
                    <h3 className="font-display text-xl text-earth-900 mb-3">{b.title}</h3>
                    <p className="text-earth-700 leading-relaxed whitespace-pre-line">{b.text}</p>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  )
}
