import { Link } from 'react-router-dom'
import YouTubeEmbed from '../components/YouTubeEmbed'
import { SectionAmbience } from '../components/SectionAmbience'
import PageContentBand from '../components/PageContentBand'
import SectionHeading, { pageTitleClass } from '../components/SectionHeading'
import BlogBackLink from '../components/BlogBackLink'
import { formatDate, sectionShell, sortedVlogs, townBySlug } from './blogData'

export default function BlogVideos() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-sage-200/60 bg-gradient-to-b from-white via-orange-100/35 to-sage-200/50">
        <SectionAmbience variant="paper" />
        <div className="relative z-10">
          <div className={`${sectionShell} py-8 sm:py-10`}>
            <BlogBackLink />
            <h1 className={`font-display mt-4 text-3xl sm:text-4xl ${pageTitleClass}`}>All videos</h1>
            <p className="mt-3 max-w-2xl text-earth-800 sm:text-lg leading-relaxed">
              Every embedded clip and reflection from the road, newest first.
            </p>
          </div>
        </div>
      </section>

      <PageContentBand>
        <SectionHeading>Video posts</SectionHeading>
        <p className="text-earth-800 -mt-2 mb-8 sm:text-lg leading-relaxed">
          Add YouTube IDs in <code className="text-sm">vlogs.json</code> when clips are ready to embed.
        </p>
        {sortedVlogs.length === 0 ? (
          <div className="card card-body text-center text-earth-600">
            Videos will show up here when you add entries in vlogs.json.
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
                    <h2 className="font-display text-2xl text-earth-900 mb-3">{v.title}</h2>
                    <p className="text-earth-800 leading-relaxed whitespace-pre-line">{v.reflection}</p>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </PageContentBand>
    </>
  )
}
