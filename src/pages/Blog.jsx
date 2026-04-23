import { Link } from 'react-router-dom'
import vlogs from '../data/vlogs.json'
import vlogBlogs from '../data/vlogBlogs.json'
import towns from '../data/towns.json'
import states from '../data/states.json'
import YouTubeEmbed from '../components/YouTubeEmbed'
import { SectionAmbience } from '../components/SectionAmbience'
import { PageHeroPanel } from '../components/PageHeroPanel'
import PageContentBand from '../components/PageContentBand'
import SectionHeading, { pageTitleClass } from '../components/SectionHeading'

const sectionShell = 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-10'
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

function excerpt(text, max = 220) {
  if (!text) return ''
  const t = text.trim().replace(/\s+/g, ' ')
  return t.length <= max ? t : `${t.slice(0, max).trim()}…`
}

export default function Blog() {
  const latestBlog = sortedBlogs[0]

  return (
    <>
      <section className="relative overflow-hidden border-b border-sage-200/60 bg-gradient-to-b from-white via-orange-100/40 to-sage-200/55">
        <SectionAmbience variant="paper" />
        <div className="relative z-10">
          <div className={`${sectionShell} py-12 sm:py-16 md:py-20`}>
            <PageHeroPanel className="bg-white/84 text-center">
              <span className="badge-rust mb-4 inline-block">Blog</span>
              <h1 className="font-display mb-4 sm:mb-5 text-4xl leading-tight sm:text-5xl">
                <span className={pageTitleClass}>Field notes from the road</span>
              </h1>
              <p className="text-base text-earth-800 sm:text-lg leading-relaxed">
                Longer written posts and video check-ins from each stop—organized so you can read the
                latest first, browse by state, or jump straight to every post and clip.
              </p>
            </PageHeroPanel>
          </div>
        </div>
      </section>

      <PageContentBand>
        <div className="space-y-16 sm:space-y-20">
          {/* Latest */}
          <section id="latest" className="scroll-mt-24">
            <SectionHeading>Latest</SectionHeading>
            {latestBlog ? (
              <div className="space-y-6">
                <Link
                  to={`/blog#blog-${latestBlog.id}`}
                  className="block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-rust-400/70"
                >
                  <article className="card group overflow-hidden transition-shadow hover:shadow-lg hover:shadow-rust-900/15">
                    <div className="card-body sm:p-8">
                      {latestBlog.townLabel && (
                        <span className="badge-sage mb-3 inline-block">{latestBlog.townLabel}</span>
                      )}
                      <time className="text-xs text-earth-500">{formatDate(latestBlog.date)}</time>
                      <h2 className="font-display mt-2 text-2xl text-earth-900 transition-colors group-hover:text-rust-800 sm:text-3xl">
                        {latestBlog.title}
                      </h2>
                      <p className="mt-4 text-earth-800 leading-relaxed sm:text-lg">
                        {excerpt(latestBlog.text, 320)}
                      </p>
                      <p className="mt-4 text-sm font-semibold text-rust-800">Read this post →</p>
                    </div>
                  </article>
                </Link>
                <div className="flex justify-start">
                  <a
                    href="#all-blogs"
                    className="inline-flex items-center gap-2 rounded-xl border border-sage-300/80 bg-white/90 px-5 py-2.5 text-sm font-semibold text-earth-800 shadow-sm ring-1 ring-amber-200/40 transition-colors hover:border-rust-300/70 hover:bg-orange-50/90 hover:text-rust-900"
                  >
                    View more
                    <span aria-hidden>↓</span>
                  </a>
                </div>
              </div>
            ) : (
              <p className="text-earth-600 sm:text-lg">
                Your latest blog will appear here when you add an entry in{' '}
                <code className="rounded bg-sage-100/90 px-1.5 py-0.5 text-sm">vlogBlogs.json</code>.
              </p>
            )}
          </section>

          {/* Latest videos — skinnier tab */}
          <div className="flex justify-center pt-1">
            <a
              href="#all-videos"
              className="inline-flex w-full max-w-md items-center justify-center rounded-lg border border-sage-300/75 bg-gradient-to-b from-white to-orange-50/60 px-6 py-2 text-sm font-semibold tracking-wide text-earth-800 shadow-sm ring-1 ring-amber-200/35 transition-colors hover:border-rust-300/60 hover:text-rust-900"
            >
              Latest videos
            </a>
          </div>

          {/* By state */}
          <section aria-labelledby="blog-by-state-heading">
            <h2 id="blog-by-state-heading" className="sr-only">
              Browse by state
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {states.map((s) => (
                <Link
                  key={s.slug}
                  to={`/${s.slug}`}
                  className="group block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-rust-400/70"
                >
                  <article className="texture-dots flex min-h-[7.5rem] flex-col items-center justify-center rounded-2xl border border-sage-300/80 bg-white/90 p-6 text-center shadow-md shadow-rust-900/8 ring-1 ring-amber-200/40 transition-all duration-300 hover:-translate-y-0.5 hover:border-rust-200/80 hover:shadow-lg hover:shadow-rust-900/15 sm:min-h-[8.5rem] sm:p-8">
                    <span className="font-display text-xl text-earth-900 transition-colors group-hover:text-rust-800 sm:text-2xl">
                      {s.name}
                    </span>
                    <span className="mt-2 text-sm text-earth-600">Blogs &amp; videos from this stop</span>
                  </article>
                </Link>
              ))}
            </div>
          </section>

          {/* All videos */}
          <section id="all-videos" className="scroll-mt-28">
            <SectionHeading>All videos</SectionHeading>
            <p className="text-earth-800 -mt-2 mb-8 sm:text-lg leading-relaxed">
              Every embedded clip and reflection from the road, newest first.
            </p>
            {sortedVlogs.length === 0 ? (
              <div className="card card-body text-center text-earth-600">
                Videos will show up here when you add YouTube IDs in <code className="text-sm">vlogs.json</code>.
              </div>
            ) : (
              <div className="space-y-10">
                {sortedVlogs.map((v) => {
                  const town = townBySlug[v.townSlug]
                  return (
                    <article key={v.id} className="card overflow-hidden">
                      <YouTubeEmbed youtubeId={v.youtubeId} title={v.title} />
                      <div className="card-body">
                        <div className="mb-2 flex flex-wrap items-center gap-3">
                          {town && (
                            <Link
                              to={`/${town.stateSlug}`}
                              className="badge-sage transition-colors hover:bg-sage-300/90"
                            >
                              {town.isRegion ? town.name : `${town.name}, ${town.state}`}
                            </Link>
                          )}
                          <time className="text-xs text-earth-500">{formatDate(v.date)}</time>
                        </div>
                        <h3 className="font-display text-2xl text-earth-900 mb-3">{v.title}</h3>
                        <p className="text-earth-800 leading-relaxed whitespace-pre-line">{v.reflection}</p>
                      </div>
                    </article>
                  )
                })}
              </div>
            )}
          </section>

          {/* All blogs */}
          <section id="all-blogs" className="scroll-mt-28">
            <SectionHeading>All blog posts</SectionHeading>
            <p className="text-earth-800 -mt-2 mb-8 sm:text-lg leading-relaxed">
              Longer write-ups from the trip—newest at the top.
            </p>
            {sortedBlogs.length === 0 ? (
              <p className="text-earth-600">No blog posts yet. Add them in vlogBlogs.json when you are ready.</p>
            ) : (
              <div className="space-y-8">
                {sortedBlogs.map((b) => (
                  <article key={b.id} id={`blog-${b.id}`} className="card card-body scroll-mt-28">
                    {b.townLabel && <span className="badge-sage mb-2 inline-block">{b.townLabel}</span>}
                    <time className="text-xs text-earth-500 block mb-1">{formatDate(b.date)}</time>
                    <h3 className="font-display text-xl text-earth-900 mb-3 sm:text-2xl">{b.title}</h3>
                    <p className="text-earth-800 leading-relaxed whitespace-pre-line">{b.text}</p>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </PageContentBand>
    </>
  )
}
