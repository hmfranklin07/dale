import { innerPageTopBandSectionClass } from '../config/mapPinColors'
import RouteDoodleBackground from '../components/RouteDoodleBackground'
import { SectionAmbience } from '../components/SectionAmbience'
import PageContentBand from '../components/PageContentBand'
import { pageTitleClass } from '../components/SectionHeading'
import BlogBackLink from '../components/BlogBackLink'
import { formatDate, sectionShell, sortedBlogs } from './blogData'

export default function BlogPosts() {
  return (
    <>
      <section
        className={`relative overflow-hidden border-b border-sage-200/60 ${innerPageTopBandSectionClass}`}
      >
        <SectionAmbience variant="paper" />
        <RouteDoodleBackground />
        <div className="relative z-10">
          <div className={`${sectionShell} py-8 sm:py-10`}>
            <BlogBackLink />
            <h1 className={`font-display mt-4 text-3xl sm:text-4xl ${pageTitleClass}`}>All blog posts</h1>
            <p className="mt-3 max-w-2xl text-earth-800 sm:text-lg leading-relaxed">
              Longer write-ups from the trip—newest at the top.
            </p>
          </div>
        </div>
      </section>

      <PageContentBand>
        {sortedBlogs.length === 0 ? (
          <p className="text-earth-600">No blog posts yet. Add them in vlogBlogs.json when you are ready.</p>
        ) : (
          <div className="space-y-8">
            {sortedBlogs.map((b) => (
              <article key={b.id} className="card card-body">
                {b.townLabel && <span className="badge-sage mb-2 inline-block">{b.townLabel}</span>}
                <time className="text-xs text-earth-500 block mb-1">{formatDate(b.date)}</time>
                <h2 className="font-display text-xl text-earth-900 mb-3 sm:text-2xl">{b.title}</h2>
                <p className="text-earth-800 leading-relaxed whitespace-pre-line">{b.text}</p>
              </article>
            ))}
          </div>
        )}
      </PageContentBand>
    </>
  )
}
