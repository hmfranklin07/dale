import { Link } from 'react-router-dom'
import YouTubeEmbed from '../components/YouTubeEmbed'
import { innerPageTopBandSectionClass } from '../config/mapPinColors'
import { SectionAmbience } from '../components/SectionAmbience'
import PageContentBand from '../components/PageContentBand'
import SectionHeading, { pageTitleClass } from '../components/SectionHeading'
import BlogBackLink from '../components/BlogBackLink'
import { formatDate, sectionShell, sortedVlogs, townBySlug, vlogLocationLabel } from './blogData'

export default function BlogVideos() {
  return (
    <>
      <section
        className={`relative overflow-hidden border-b border-sage-200/60 ${innerPageTopBandSectionClass}`}
      >
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {sortedVlogs.map((v) => {
              const town = townBySlug[v.townSlug]
              return (
                <article key={v.id} className="card flex h-full min-w-0 flex-col overflow-hidden">
                  <YouTubeEmbed youtubeId={v.youtubeId} title={v.title} />
                  <div className="card-body flex flex-1 flex-col">
                    <div className="mb-2 flex flex-col items-start gap-2">
                      {town && (
                        <Link
                          to={`/${town.stateSlug}`}
                          className="badge-sage max-w-full truncate text-[0.65rem] transition-colors hover:bg-sage-300/90"
                        >
                          {vlogLocationLabel(v)}
                        </Link>
                      )}
                      <time className="block text-xs text-earth-500">{formatDate(v.date)}</time>
                    </div>
                    <h2 className="font-display mb-2 text-xl leading-snug text-earth-900 lg:text-[1.35rem]">
                      {v.title}
                    </h2>
                    <p className="flex-1 text-sm leading-relaxed text-earth-800 whitespace-pre-line">
                      {v.reflection}
                    </p>
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
