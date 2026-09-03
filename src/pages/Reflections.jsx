import { Link } from 'react-router-dom'
import states from '../data/states.json'
import ComingSoonReflectionCard from '../components/ComingSoonReflectionCard'
import PageContentBand from '../components/PageContentBand'
import SectionHeading, { pageTitleClass } from '../components/SectionHeading'
import StateSubpageHero from '../components/StateSubpageHero'
import { formatDate } from './blogData'
import { comingSoonReflectionsAll, publishedReflectionsAll } from '../lib/stateContent'

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
      <StateSubpageHero
        backTo="/#map"
        backLabel="Back to home & map"
        title="Reflections"
        description="Written pieces from the trip—housed here and on each state’s page as they come together."
      />

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
