import { Link, Navigate } from 'react-router-dom'
import more from '../data/more.json'
import { PageHeroPanel } from '../components/PageHeroPanel'
import PageContentBand from '../components/PageContentBand'
import { pageTitleClass } from '../components/SectionHeading'
import { stateHeroBandSectionClass } from '../config/mapPinColors'

const stateHeroShell = 'max-w-6xl mx-auto w-full px-2.5 sm:px-4 lg:px-6'
const STATE_HERO_MIN_H = 'min-h-[17rem] sm:min-h-[19.5rem] md:min-h-[22.5rem]'

function HeroBackLink() {
  return (
    <Link
      to="/#map"
      className="inline-flex items-center gap-1.5 text-sm font-medium text-earth-800 transition-colors hover:text-rust-800"
    >
      <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      Back to home &amp; map
    </Link>
  )
}

export default function MorePage() {
  if (more.slug !== 'more') {
    return <Navigate to="/" replace />
  }

  return (
    <>
      <section
        className={`relative overflow-hidden border-b flex flex-col ${STATE_HERO_MIN_H} border-sage-400/45 ${stateHeroBandSectionClass}`}
      >
        <div className="relative z-10 flex min-h-0 flex-1 flex-col min-h-[inherit] justify-center">
          <div className={`${stateHeroShell} absolute inset-x-0 top-0 z-20 pt-4 sm:pt-5 md:pt-6`}>
            <HeroBackLink />
          </div>

          <div className={`${stateHeroShell} w-full py-12 sm:py-16 md:py-20`}>
            <PageHeroPanel tone="statePage" className="mx-auto w-full max-w-2xl text-center !py-4 sm:!py-5 md:!py-6">
              <h1 className={`font-display mt-0 mb-2 text-4xl leading-tight sm:mb-3 sm:text-5xl ${pageTitleClass}`}>
                {more.name}
              </h1>
              <p className="text-base leading-relaxed text-earth-800 sm:text-lg">{more.heroIntro}</p>
            </PageHeroPanel>
          </div>
        </div>
      </section>

      <PageContentBand variant="sage">
        <div className="card card-body mx-auto max-w-2xl border-2 border-sage-500/75 text-center !ring-sage-400/45 ring-2 sm:p-10">
          <p className="font-display text-2xl text-earth-900 sm:text-3xl">Check back soon!</p>
          <p className="mt-4 text-earth-700 leading-relaxed sm:text-lg">
            More conversations and reflections on the way. Stay tuned!
          </p>
        </div>
      </PageContentBand>
    </>
  )
}
