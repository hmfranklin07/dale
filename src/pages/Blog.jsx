import { Link } from 'react-router-dom'
import states from '../data/states.json'
import { SectionAmbience } from '../components/SectionAmbience'
import { PageHeroPanel } from '../components/PageHeroPanel'
import PageContentBand from '../components/PageContentBand'
import SectionHeading, { pageTitleClass } from '../components/SectionHeading'
import { excerpt, formatDate, sectionShell, sortedBlogs } from './blogData'

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

          <div className="flex justify-center pt-1">
            <Link
              to="/blog/videos"
              className="inline-flex w-full max-w-md items-center justify-center rounded-lg border border-sage-300/75 bg-gradient-to-b from-white to-orange-50/60 px-6 py-2 text-sm font-semibold tracking-wide text-earth-800 shadow-sm ring-1 ring-amber-200/35 transition-colors hover:border-rust-300/60 hover:text-rust-900"
            >
              Latest videos
            </Link>
          </div>

          <section aria-labelledby="blog-by-state-heading">
            <h2 id="blog-by-state-heading" className="sr-only">
              Browse by state
            </h2>
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
