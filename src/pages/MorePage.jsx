import { Link, Navigate } from 'react-router-dom'
import more from '../data/more.json'
import PageContentBand from '../components/PageContentBand'
import { STATE_PHOTO_HEROES } from '../lib/statePhotoHeroes'

const stateHeroShell = 'max-w-6xl mx-auto w-full px-2.5 sm:px-4 lg:px-6'
const STATE_PHOTO_HERO_MIN_H = 'min-h-[17rem] sm:min-h-[19.5rem] md:min-h-[22.5rem]'
const photoHeroIntroClass =
  'mx-auto mt-2.5 max-w-3xl text-base leading-tight sm:mt-3 sm:text-lg sm:leading-snug'

function HeroBackLink({ light = false }) {
  return (
    <Link
      to="/#map"
      className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
        light ? 'text-white/95 hover:text-white' : 'text-earth-800 hover:text-rust-800'
      }`}
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

  const photoHero = STATE_PHOTO_HEROES.more

  return (
    <>
      <section
        className={`relative overflow-hidden border-b flex flex-col ${STATE_PHOTO_HERO_MIN_H} border-sage-800/30`}
      >
        <div className="absolute inset-0 z-0">
          <img
            src={photoHero.src}
            alt=""
            sizes="100vw"
            className={`h-full w-full object-cover ${photoHero.positionClass}`}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>

        <div className="relative z-10 flex min-h-0 flex-1 flex-col min-h-[inherit] items-center justify-center">
          <div className={`${stateHeroShell} absolute inset-x-0 top-0 z-20 pt-4 sm:pt-5 md:pt-6`}>
            <HeroBackLink light />
          </div>

          <div className={`${stateHeroShell} w-full py-8 text-center sm:py-9 md:py-10`}>
            <div className="mx-auto w-full max-w-4xl">
              <h1 className="font-display text-[2.75rem] leading-none text-white drop-shadow-sm sm:text-[3.5rem] lg:text-[4rem] xl:text-[4.5rem]">
                {more.name}
              </h1>
              <div
                className="mx-auto mt-2.5 h-px w-14 bg-gradient-to-r from-transparent via-rust-400 to-transparent sm:mt-3 sm:w-20"
                aria-hidden
              />
              <p className={`${photoHeroIntroClass} text-white/90`}>{more.heroIntro}</p>
            </div>
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
