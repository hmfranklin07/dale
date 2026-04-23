import { Link } from 'react-router-dom'
import states from '../data/states.json'
import { SectionAmbience } from '../components/SectionAmbience'
import { PageHeroPanel } from '../components/PageHeroPanel'
import PageContentBand from '../components/PageContentBand'
import SectionHeading, { pageTitleClass } from '../components/SectionHeading'
import { excerpt, formatDate, sectionShell, sortedBlogs, sortedVlogs, townBySlug } from './blogData'

export default function Blog() {
  const latestBlog = sortedBlogs[0]
  const latestVlog = sortedVlogs[0]
  const latestVlogTown = latestVlog ? townBySlug[latestVlog.townSlug] : null
  const latestVlogTownLabel = latestVlogTown
    ? latestVlogTown.isRegion
      ? latestVlogTown.name
      : `${latestVlogTown.name}, ${latestVlogTown.state}`
    : null

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
            {latestVlog ? (
              <div className="space-y-6">
                <Link
                  to="/blog/videos"
                  className="block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-rust-400/70"
                >
                  <article className="card group overflow-hidden transition-shadow hover:shadow-lg hover:shadow-rust-900/15">
                    {latestVlog.youtubeId ? (
                      <div className="aspect-video overflow-hidden bg-sage-900/5 ring-1 ring-sage-200/50">
                        <img
                          src={`https://img.youtube.com/vi/${latestVlog.youtubeId}/hqdefault.jpg`}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-video items-center justify-center bg-sage-100/80 ring-1 ring-sage-200/50">
                        <div className="text-center text-earth-600 px-4">
                          <svg
                            className="mx-auto mb-2 h-12 w-12 opacity-40"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <p className="text-sm font-medium">Video thumbnail when you add a YouTube ID</p>
                          <p className="mt-2 text-xs text-earth-500">
                            Set <code className="rounded bg-white/80 px-1 py-0.5 text-[0.7rem]">youtubeId</code> on
                            this vlog in <code className="rounded bg-white/80 px-1 py-0.5 text-[0.7rem]">vlogs.json</code>
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="card-body sm:p-8">
                      {latestVlogTownLabel && (
                        <span className="badge-sage mb-3 inline-block">{latestVlogTownLabel}</span>
                      )}
                      <time className="text-xs text-earth-500">{formatDate(latestVlog.date)}</time>
                      <h2 className="font-display mt-2 text-2xl text-earth-900 transition-colors group-hover:text-rust-800 sm:text-3xl">
                        {latestVlog.title}
                      </h2>
                      <p className="mt-4 text-earth-800 leading-relaxed sm:text-lg">
                        {excerpt(latestVlog.reflection, 320)}
                      </p>
                      <p className="mt-4 text-sm font-semibold text-rust-800">Open all videos →</p>
                    </div>
                  </article>
                </Link>
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
                Your latest video will appear here when you add an entry in{' '}
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
                  <article className="texture-dots flex min-h-[7.5rem] flex-col items-center justify-center rounded-2xl border border-sage-300/80 bg-white/90 p-6 text-center shadow-md shadow-rust-900/10 ring-1 ring-amber-200/40 transition-all duration-300 hover:-translate-y-0.5 hover:border-rust-200/80 hover:shadow-lg hover:shadow-rust-900/15 sm:min-h-[8.5rem] sm:p-8">
                    <span className="font-display text-xl text-earth-900 transition-colors group-hover:text-rust-800 sm:text-2xl">
                      {s.name}
                    </span>
                    <span className="mt-2 text-sm text-earth-600">Blogs &amp; videos from this stop</span>
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
