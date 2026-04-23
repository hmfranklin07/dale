import { Link } from 'react-router-dom'
import states from '../data/states.json'
import { SectionAmbience } from '../components/SectionAmbience'
import { PageHeroPanel } from '../components/PageHeroPanel'
import PageContentBand from '../components/PageContentBand'
import SectionHeading from '../components/SectionHeading'
import { excerpt, formatDate, sectionShell, sortedBlogs, sortedVlogs, townBySlug } from './blogData'

function townLabelFromSlug(townSlug) {
  const town = townBySlug[townSlug]
  if (!town) return null
  return town.isRegion ? town.name : `${town.name}, ${town.state}`
}

function BlogVideoTeaser({ vlog }) {
  const townLabel = townLabelFromSlug(vlog.townSlug)
  return (
    <Link
      to="/blog/videos"
      className="block h-full min-w-0 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-rust-400/70"
    >
      <article className="card group flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg hover:shadow-rust-900/15">
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
          {townLabel && (
            <span className="badge-sage mb-2 inline-block max-w-full truncate text-[0.65rem]">{townLabel}</span>
          )}
          <time className="text-[0.65rem] text-earth-500">{formatDate(vlog.date)}</time>
          <h3 className="font-display mt-1.5 line-clamp-2 text-lg leading-snug text-earth-900 transition-colors group-hover:text-rust-800">
            {vlog.title}
          </h3>
          <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-earth-600">{excerpt(vlog.reflection, 120)}</p>
          <p className="mt-3 text-xs font-semibold text-rust-800">Open videos →</p>
        </div>
      </article>
    </Link>
  )
}

export default function Blog() {
  const latestBlog = sortedBlogs[0]
  const videoSlots = [sortedVlogs[0], sortedVlogs[1], sortedVlogs[2]]
  const hasAnyVideo = sortedVlogs.length > 0

  return (
    <>
      <section className="relative overflow-hidden border-b border-sage-200/60 bg-gradient-to-b from-white via-orange-100/40 to-sage-200/55">
        <SectionAmbience variant="paper" />
        <div className="relative z-10">
          <div className={`${sectionShell} py-12 sm:py-16 md:py-20`}>
            <PageHeroPanel tone="sageDark" className="text-center">
              <span className="badge mb-4 inline-block bg-orange-200/95 text-earth-900 ring-1 ring-orange-100/80">
                Blog
              </span>
              <h1 className="font-display mb-4 sm:mb-5 text-4xl leading-tight sm:text-5xl">
                <span className="bg-gradient-to-r from-orange-50 via-amber-100 to-orange-50 bg-clip-text text-transparent">
                  Field notes from the road
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-base text-sage-100 sm:text-lg leading-relaxed">
                Longer written posts and video check-ins from each stop—organized so you can read the
                latest first, browse by state, or open full lists on their own pages.
              </p>
            </PageHeroPanel>
          </div>
        </div>
      </section>

      <PageContentBand>
        <div className="space-y-16 sm:space-y-20">
          <section>
            <SectionHeading>Latest</SectionHeading>
            {latestBlog ? (
              <div className="space-y-6">
                <Link
                  to={`/blog/post/${latestBlog.id}`}
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
                  <Link
                    to="/blog/posts"
                    className="inline-flex items-center gap-2 rounded-xl border border-sage-300/80 bg-white/90 px-5 py-2.5 text-sm font-semibold text-earth-800 shadow-sm ring-1 ring-amber-200/40 transition-colors hover:border-rust-300/70 hover:bg-orange-50/90 hover:text-rust-900"
                  >
                    View more
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            ) : (
              <p className="text-earth-600 sm:text-lg">
                Your latest blog will appear here when you add an entry in{' '}
                <code className="rounded bg-sage-100/90 px-1.5 py-0.5 text-sm">vlogBlogs.json</code>.
              </p>
            )}
          </section>

          <section>
            <SectionHeading>Latest videos</SectionHeading>
            {hasAnyVideo ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:items-stretch">
                  {videoSlots.map((vlog, idx) =>
                    vlog ? (
                      <BlogVideoTeaser key={vlog.id} vlog={vlog} />
                    ) : (
                      <div
                        key={`video-slot-${idx}`}
                        className="flex min-h-[12rem] flex-col items-center justify-center rounded-2xl border border-dashed border-orange-300/60 bg-gradient-to-b from-orange-50/50 via-white to-sage-100/40 p-5 text-center ring-1 ring-sage-200/50"
                      >
                        <span className="text-xs font-semibold uppercase tracking-wide text-orange-700/90">
                          Open slot
                        </span>
                        <p className="mt-2 text-sm text-earth-600">
                          Add another entry in{' '}
                          <code className="rounded bg-white/90 px-1.5 py-0.5 text-xs ring-1 ring-sage-200/60">
                            vlogs.json
                          </code>{' '}
                          to fill this teaser slot.
                        </p>
                      </div>
                    ),
                  )}
                </div>
                <div className="flex justify-start">
                  <Link
                    to="/blog/videos"
                    className="inline-flex items-center gap-2 rounded-xl border border-sage-300/80 bg-white/90 px-5 py-2.5 text-sm font-semibold text-earth-800 shadow-sm ring-1 ring-amber-200/40 transition-colors hover:border-rust-300/70 hover:bg-orange-50/90 hover:text-rust-900"
                  >
                    View more
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            ) : (
              <p className="text-earth-600 sm:text-lg">
                Up to three recent videos will show here when you add entries in{' '}
                <code className="rounded bg-sage-100/90 px-1.5 py-0.5 text-sm">vlogs.json</code>.
              </p>
            )}
          </section>

          <section aria-labelledby="blog-by-state-heading">
            <SectionHeading id="blog-by-state-heading">Blogs &amp; videos by state</SectionHeading>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {states.map((s) => (
                <Link
                  key={s.slug}
                  to={`/blog/state/${s.slug}`}
                  className="group block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-rust-400/70"
                >
                  <article className="relative flex min-h-[7.75rem] flex-col items-center justify-center overflow-hidden rounded-2xl border border-orange-200/55 bg-gradient-to-br from-white via-orange-50/45 to-sage-200/55 p-6 text-center shadow-lg shadow-sage-900/10 ring-2 ring-orange-100/70 transition-all duration-300 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-gradient-to-r before:from-rust-500/90 before:via-orange-400/95 before:to-sage-600/85 after:pointer-events-none after:absolute after:-right-8 after:-top-8 after:h-24 after:w-24 after:rounded-full after:bg-orange-200/25 after:blur-2xl group-hover:-translate-y-1 group-hover:border-orange-300/70 group-hover:shadow-xl group-hover:shadow-orange-200/30 sm:min-h-[8.75rem] sm:p-8">
                    <span className="relative font-display text-xl text-earth-900 transition-colors group-hover:text-rust-800 sm:text-2xl">
                      {s.name}
                    </span>
                    <span className="relative mt-2.5 inline-flex items-center gap-1.5 text-sm text-sage-800">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400 shadow-sm shadow-orange-300/50" aria-hidden />
                      <span>
                        <span className="font-medium text-orange-800/90">Blogs</span>
                        <span className="text-earth-500"> &amp; </span>
                        <span className="text-sage-800">videos</span>
                        <span className="text-earth-500"> from this stop</span>
                      </span>
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </PageContentBand>
    </>
  )
}
