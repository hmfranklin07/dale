import { Link } from 'react-router-dom'
import states from '../data/states.json'
/** Full-resolution hero (bundled as-is; replace file in repo to swap photo). */
import blogHeroBgUrl from '../assets/blog/blog-hero.jpg?url'

const blogHeroShell = 'max-w-6xl mx-auto w-full px-2.5 sm:px-4'
import PageContentBand from '../components/PageContentBand'
import SectionHeading from '../components/SectionHeading'
import { excerpt, formatDate, sortedBlogs } from './blogData'

export default function Blog() {
  const latestBlog = sortedBlogs[0]

  return (
    <>
      <section className="relative flex min-h-[17rem] flex-col overflow-hidden border-b border-sage-800/30 sm:min-h-[19.5rem] md:min-h-[22.5rem]">
        <div className="absolute inset-0 z-0">
          <img
            src={blogHeroBgUrl}
            alt=""
            sizes="100vw"
            className="h-full w-full object-cover object-[48%_48%] sm:object-[50%_44%]"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-sage-950/50 via-sage-950/58 to-sage-950/72"
          aria-hidden
        />
        <div className="relative z-10 flex min-h-[inherit] flex-col items-center justify-center">
          <div className={`${blogHeroShell} w-full py-8 text-center sm:py-10 md:py-12`}>
            <div className="mx-auto w-full max-w-3xl lg:max-w-4xl">
              <h1 className="font-display text-[2.5rem] leading-none text-white drop-shadow-sm sm:text-6xl lg:text-7xl xl:text-[4.25rem]">
                On the Road
              </h1>
              <div
                className="mx-auto mt-3 h-px w-16 bg-gradient-to-r from-transparent via-rust-400 to-transparent sm:mt-4 sm:w-24"
                aria-hidden
              />
              <p className="mx-auto mt-3 max-w-2xl text-base leading-snug text-white/90 sm:mt-4 sm:text-lg sm:leading-normal">
                Blogs from the trip!
              </p>
            </div>
          </div>
        </div>
      </section>

      <PageContentBand wash="rust" variant="sage">
        <div className="space-y-16 sm:space-y-20 [&_article.card]:border-sage-200/90 [&_article.card]:shadow-md [&_article.card]:shadow-sage-900/[0.08] [&_article.card]:ring-1 [&_article.card]:ring-rust-200/30">
          <section>
            <SectionHeading>Latest</SectionHeading>
            {latestBlog ? (
              <div className="space-y-6">
                <Link
                  to={`/blog/post/${latestBlog.id}`}
                  className="block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-rust-400/70"
                >
                  <article className="card group overflow-hidden !ring-rust-300/45 transition-shadow hover:shadow-lg hover:shadow-rust-900/15">
                    <div className="card-body sm:p-8">
                      <div className="flex flex-col items-start gap-2">
                        {latestBlog.townLabel && (
                          <span className="badge-sage inline-block w-fit max-w-full">{latestBlog.townLabel}</span>
                        )}
                        <time className="block text-xs text-earth-500">{formatDate(latestBlog.date)}</time>
                      </div>
                      <h2 className="font-display mt-3 text-2xl text-earth-900 transition-colors group-hover:text-rust-800 sm:text-3xl">
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
                    className="inline-flex items-center gap-2 rounded-xl border border-sage-300/80 bg-white/90 px-5 py-2.5 text-sm font-semibold text-earth-800 shadow-sm ring-1 ring-rust-300/40 transition-colors hover:border-rust-400/75 hover:bg-rust-50/95 hover:text-rust-900"
                  >
                    View more
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="card card-body mx-auto max-w-2xl border-2 border-rust-400/80 text-center !ring-rust-300/55 ring-2 sm:p-10">
                <p className="font-display text-2xl text-earth-900 sm:text-3xl">Check back soon!</p>
                <p className="mt-4 text-earth-700 leading-relaxed sm:text-lg">
                  Blogs will show up as the trip progresses.
                </p>
              </div>
            )}
          </section>

          <section aria-labelledby="blog-by-state-heading">
            <SectionHeading id="blog-by-state-heading">Blogs by state</SectionHeading>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {states.map((s) => (
                <Link
                  key={s.slug}
                  to={`/blog/state/${s.slug}`}
                  className="group block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-rust-400/70"
                >
                  <article className="card relative flex min-h-[9.5rem] flex-col items-center justify-center !ring-rust-300/45 px-6 py-8 text-center transition-all duration-300 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-1 before:rounded-t-2xl before:bg-rust-500 group-hover:-translate-y-0.5 group-hover:border-sage-400/90 group-hover:ring-rust-400/55 sm:min-h-[10.25rem] sm:px-8 sm:py-9">
                    <span className="relative z-10 font-display text-2xl leading-tight tracking-tight text-earth-900 transition-colors duration-300 group-hover:text-rust-800 sm:text-3xl">
                      {s.name}
                    </span>
                    <span className="relative z-10 mt-3 inline-flex items-center gap-2 text-sm text-earth-600 transition-colors group-hover:text-rust-800">
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-rust-500 ring-2 ring-rust-300/70"
                        aria-hidden
                      />
                      <span>Click to see more</span>
                      <span className="text-rust-700 transition-transform group-hover:translate-x-0.5" aria-hidden>
                        →
                      </span>
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <SectionHeading>See more</SectionHeading>
            <div className="card card-body !ring-rust-300/45 sm:p-8">
              <p className="text-earth-800 leading-relaxed sm:text-lg">
                Watch more content on my socials.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <a
                  href="https://www.youtube.com/@hannahfranklin07"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-sage-300/80 bg-white/90 px-5 py-2.5 text-sm font-semibold text-earth-800 shadow-sm ring-1 ring-rust-300/40 transition-colors hover:border-rust-400/75 hover:bg-rust-50/95 hover:text-rust-900"
                >
                  YouTube
                  <span aria-hidden>↗</span>
                </a>
                <a
                  href="https://www.instagram.com/hannuh.in.americuh/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-sage-300/80 bg-white/90 px-5 py-2.5 text-sm font-semibold text-earth-800 shadow-sm ring-1 ring-rust-300/40 transition-colors hover:border-rust-400/75 hover:bg-rust-50/95 hover:text-rust-900"
                >
                  Instagram
                  <span aria-hidden>↗</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </PageContentBand>
    </>
  )
}
