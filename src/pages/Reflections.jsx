import { Link } from 'react-router-dom'
import states from '../data/states.json'
import ComingSoonReflectionCard from '../components/ComingSoonReflectionCard'
import PageContentBand from '../components/PageContentBand'
import SectionHeading, { pageTitleClass } from '../components/SectionHeading'
import reflectionsHeroUrl from '../assets/reflections/reflections-hero.jpg?url'
import { formatDate } from './blogData'
import { comingSoonReflectionsAll, publishedReflectionsAll } from '../lib/stateContent'

const heroShell = 'max-w-6xl mx-auto w-full px-2.5 sm:px-4 lg:px-6'
const HERO_MIN_H = 'min-h-[17rem] sm:min-h-[19.5rem] md:min-h-[22.5rem]'
const photoHeroIntroClass =
  'mx-auto mt-2.5 max-w-3xl text-base leading-tight sm:mt-3 sm:text-lg sm:leading-snug'

function HeroBackLink() {
  return (
    <Link
      to="/#map"
      className="inline-flex items-center gap-1.5 text-sm font-medium text-white/95 transition-colors hover:text-white"
    >
      <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      Back to home &amp; map
    </Link>
  )
}

export default function Reflections() {
  const published = publishedReflectionsAll()
  const comingSoon = comingSoonReflectionsAll()
  const comingSoonByState = states
    .map((state) => ({
      state,
      items: comingSoon.filter((item) => item.stateSlug === state.slug),
    }))
    .filter((group) => group.items.length > 0)
  const publishedByState = states
    .map((state) => ({
      state,
      items: published.filter((paper) => paper.stateSlug === state.slug),
    }))
    .filter((group) => group.items.length > 0)
  const publishedOther = published.filter(
    (paper) => !paper.stateSlug || !states.some((state) => state.slug === paper.stateSlug),
  )

  return (
    <>
      <section className={`relative flex flex-col overflow-hidden border-b border-sage-800/30 ${HERO_MIN_H}`}>
        <div className="absolute inset-0 z-0">
          <img
            src={reflectionsHeroUrl}
            alt=""
            sizes="100vw"
            className="h-full w-full object-cover object-[48%_40%] sm:object-[50%_38%] lg:object-[52%_36%] xl:object-[54%_34%]"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>

        <div className="relative z-10 flex min-h-0 min-h-[inherit] flex-1 flex-col items-center justify-center">
          <div className={`${heroShell} absolute inset-x-0 top-0 z-20 pt-4 sm:pt-5 md:pt-6`}>
            <HeroBackLink />
          </div>

          <div className={`${heroShell} w-full py-8 text-center sm:py-9 md:py-10`}>
            <div className="mx-auto w-full max-w-4xl">
              <h1 className="font-display text-[2.75rem] leading-none text-white drop-shadow-sm sm:text-[3.5rem] lg:text-[4rem] xl:text-[4.5rem]">
                Reflections
              </h1>
              <div
                className="mx-auto mt-2.5 h-px w-14 bg-gradient-to-r from-transparent via-rust-400 to-transparent sm:mt-3 sm:w-20"
                aria-hidden
              />
              <p className={`${photoHeroIntroClass} text-white/90`}>
                Written pieces from the trip—housed here and on each state’s page as they come together.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PageContentBand field="route">
        <div className="space-y-16 sm:space-y-20">
          {(publishedByState.length > 0 || publishedOther.length > 0) && (
            <section>
              <SectionHeading>Papers</SectionHeading>
              <div className="space-y-10 sm:space-y-12">
                {publishedByState.map(({ state, items }) => (
                  <div key={state.slug}>
                    <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
                      <h3 className="font-display text-2xl text-earth-900 sm:text-3xl">{state.name}</h3>
                      <Link
                        to={`/${state.slug}`}
                        className="text-sm font-semibold text-rust-800 underline decoration-rust-400/60 underline-offset-2 transition-colors hover:text-rust-950 hover:decoration-rust-600"
                      >
                        View {state.name} page →
                      </Link>
                    </div>
                    <div className="space-y-6">
                      {items.map((paper) => (
                        <article key={paper.id} id={paper.id} className="card card-body">
                          {paper.date && (
                            <time className="mb-2 block text-xs text-earth-500">{formatDate(paper.date)}</time>
                          )}
                          <h2 className={`font-display mb-3 text-2xl ${pageTitleClass}`}>{paper.title}</h2>
                          {paper.text && (
                            <p className="leading-relaxed text-earth-800 whitespace-pre-line">{paper.text}</p>
                          )}
                        </article>
                      ))}
                    </div>
                  </div>
                ))}
                {publishedOther.length > 0 && (
                  <div className="space-y-6">
                    {publishedOther.map((paper) => (
                      <article key={paper.id} id={paper.id} className="card card-body">
                        {paper.date && (
                          <time className="mb-2 block text-xs text-earth-500">{formatDate(paper.date)}</time>
                        )}
                        <h2 className={`font-display mb-3 text-2xl ${pageTitleClass}`}>{paper.title}</h2>
                        {paper.text && (
                          <p className="leading-relaxed text-earth-800 whitespace-pre-line">{paper.text}</p>
                        )}
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {comingSoonByState.length > 0 && (
            <section>
              <SectionHeading>Coming soon</SectionHeading>
              <div className="space-y-10 sm:space-y-12">
                {comingSoonByState.map(({ state, items }) => (
                  <div key={state.slug}>
                    <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
                      <h3 className="font-display text-2xl text-earth-900 sm:text-3xl">{state.name}</h3>
                      <Link
                        to={`/${state.slug}`}
                        className="text-sm font-semibold text-rust-800 underline decoration-rust-400/60 underline-offset-2 transition-colors hover:text-rust-950 hover:decoration-rust-600"
                      >
                        View {state.name} page →
                      </Link>
                    </div>
                    <div className="space-y-4">
                      {items.map((item) => (
                        <ComingSoonReflectionCard key={item.id} item={item} badge={state.name} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {published.length === 0 && comingSoonByState.length === 0 && (
            <div className="card card-body mx-auto max-w-2xl border-2 border-rust-400/80 text-center !ring-rust-300/55 ring-2 sm:p-10">
              <p className="font-display text-2xl text-earth-900 sm:text-3xl">Check back soon!</p>
              <p className="mt-4 text-earth-700 leading-relaxed sm:text-lg">
                Reflections from the trip will show up here as they are written.
              </p>
            </div>
          )}
        </div>
      </PageContentBand>
    </>
  )
}
