import { Link, Navigate, useParams } from 'react-router-dom'
import states from '../data/states.json'
import towns from '../data/towns.json'
import YouTubeEmbed from '../components/YouTubeEmbed'
import { innerPageTopBandSectionClass } from '../config/mapPinColors'
import { SectionAmbience } from '../components/SectionAmbience'
import PageContentBand from '../components/PageContentBand'
import SectionHeading, { pageTitleClass } from '../components/SectionHeading'
import BlogBackLink from '../components/BlogBackLink'
import { formatDate, sectionShell, sortedBlogs, sortedVlogs } from './blogData'

const stateSlugs = new Set(states.map((s) => s.slug))
const townsInState = (stateSlug) => towns.filter((t) => t.stateSlug === stateSlug)
const townSlugsInState = (stateSlug) => new Set(townsInState(stateSlug).map((t) => t.slug))

export default function BlogStateHub() {
  const { stateSlug } = useParams()
  if (!stateSlugs.has(stateSlug)) {
    return <Navigate to="/blog" replace />
  }

  const state = states.find((s) => s.slug === stateSlug)
  const slugs = townSlugsInState(stateSlug)
  const vlogsHere = sortedVlogs.filter((v) => slugs.has(v.townSlug))
  const blogsHere = sortedBlogs.filter((b) => b.stateSlug === stateSlug)

  return (
    <>
      <section
        className={`relative overflow-hidden border-b border-sage-200/60 ${innerPageTopBandSectionClass}`}
      >
        <SectionAmbience variant="paper" />
        <div className="relative z-10">
          <div className={`${sectionShell} py-8 sm:py-10`}>
            <BlogBackLink />
            <h1 className={`font-display mt-4 text-3xl sm:text-4xl ${pageTitleClass}`}>{state.name}</h1>
            <p className="mt-3 max-w-2xl text-earth-800 sm:text-lg leading-relaxed">
              Blog posts and video reflections from this stop only. For full field notes and interviews,
              visit the{' '}
              <Link to={`/${state.slug}`} className="font-medium text-rust-800 underline decoration-rust-300/60 underline-offset-2 hover:text-rust-900">
                {state.name} state page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <PageContentBand variant="sage">
        <div className="space-y-16 [&_article.card]:border-sage-200/90 [&_article.card]:shadow-md [&_article.card]:shadow-sage-900/[0.08] [&_article.card]:ring-1 [&_article.card]:ring-rust-200/30">
          <section>
            <SectionHeading>Blog posts</SectionHeading>
            <p className="text-earth-800 -mt-2 mb-6 text-sm leading-relaxed sm:text-base">
              Optional: add a <code className="rounded bg-sage-100/90 px-1 py-0.5">stateSlug</code> field
              (matching this state&apos;s slug) to an entry in vlogBlogs.json to list it here.
            </p>
            {blogsHere.length === 0 ? (
              <p className="text-earth-600">No blog posts tagged for {state.name} yet.</p>
            ) : (
              <div className="space-y-8">
                {blogsHere.map((b) => (
                  <article key={b.id} className="card card-body">
                    <time className="text-xs text-earth-500 block mb-1">{formatDate(b.date)}</time>
                    <h2 className="font-display text-xl text-earth-900 mb-3 sm:text-2xl">{b.title}</h2>
                    <p className="text-earth-800 leading-relaxed whitespace-pre-line">{b.text}</p>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section>
            <SectionHeading>Videos</SectionHeading>
            {vlogsHere.length === 0 ? (
              <p className="text-earth-600">No video posts linked to towns in {state.name} yet.</p>
            ) : (
              <div className="space-y-10">
                {vlogsHere.map((v) => (
                  <article key={v.id} className="card overflow-hidden">
                    <YouTubeEmbed youtubeId={v.youtubeId} title={v.title} />
                    <div className="card-body">
                      <time className="text-xs text-earth-500">{formatDate(v.date)}</time>
                      <h2 className="font-display mt-2 text-2xl text-earth-900 mb-3">{v.title}</h2>
                      <p className="text-earth-800 leading-relaxed whitespace-pre-line">{v.reflection}</p>
                    </div>
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
