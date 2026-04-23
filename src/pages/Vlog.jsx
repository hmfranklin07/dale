import { Link } from 'react-router-dom'
import vlogs from '../data/vlogs.json'
import vlogBlogs from '../data/vlogBlogs.json'
import towns from '../data/towns.json'
import YouTubeEmbed from '../components/YouTubeEmbed'
import SocialLinks from '../components/SocialLinks'
import { SectionAmbience } from '../components/SectionAmbience'
import { PageHeroPanel } from '../components/PageHeroPanel'
import PageContentBand from '../components/PageContentBand'
import SectionHeading, { pageTitleClass } from '../components/SectionHeading'

const shell = 'max-w-6xl mx-auto px-2.5 sm:px-4'
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
      <section className="relative overflow-hidden border-b border-sage-200/50 bg-gradient-to-b from-amber-50/90 via-sage-100/75 to-sage-200/55">
        <SectionAmbience variant="hero" />
        <div className="relative z-10">
          <div className={`${shell} py-12 sm:py-16 md:py-20`}>
            <PageHeroPanel className="text-center">
              <span className="badge-rust mb-4 inline-block">Vlog</span>
              <h1 className="font-display mb-4 sm:mb-5 text-4xl leading-tight sm:text-5xl">
                <span className={pageTitleClass}>Field diary: video, B‑roll, and write-ups</span>
              </h1>
              <p className="text-base text-earth-800 sm:text-lg leading-relaxed">
                YouTube vlog style cuts, B‑roll from the road, and longer written blogs about the
                communities we visit.
              </p>
              <div className="mt-8 flex justify-center">
                <SocialLinks size="large" />
              </div>
            </PageHeroPanel>
          </div>
        </div>
      </section>

      <PageContentBand>
        <div className="space-y-20">
          <section>
            <SectionHeading>Short-form &amp; B‑roll</SectionHeading>
            <p className="text-earth-800 -mt-2 mb-8 sm:text-lg leading-relaxed">
              Quick vlog style moments: driving, towns, and the space between the formal sit-downs. When
              a clip is ready to embed, add its YouTube ID in your vlog data so it can play on this page
              too.
            </p>
            {sortedVlogs.length === 0 ? (
              <div className="card card-body text-center text-earth-600">Vlog posts will show up as you add them.</div>
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

          <section>
            <SectionHeading>Link out</SectionHeading>
            <p className="text-earth-800 -mt-2 mb-6 sm:text-lg leading-relaxed">
              Follow the trip in motion on the channels I update most often.
            </p>
            <SocialLinks className="justify-start" size="large" />
          </section>

          <section>
            <SectionHeading>Written blogs: experiences in each town</SectionHeading>
            <p className="text-earth-800 -mt-2 mb-8 sm:text-lg leading-relaxed">
              Longer posts about what I saw, who I met, and how each place is shaping the project.
            </p>
            {sortedBlogs.length === 0 ? (
              <p className="text-earth-600">No written blog posts yet. Add them alongside your other site content when you are ready.</p>
            ) : (
              <div className="space-y-6">
                {sortedBlogs.map((b) => (
                  <article key={b.id} className="card card-body">
                    {b.townLabel && <span className="badge-sage mb-2 inline-block">{b.townLabel}</span>}
                    <time className="text-xs text-earth-500 block mb-1">{formatDate(b.date)}</time>
                    <h3 className="font-display text-xl text-earth-900 mb-3">{b.title}</h3>
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
