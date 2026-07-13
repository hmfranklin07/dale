import PageContentBand from '../components/PageContentBand'
import aboutHeroUrl from '../assets/about/about-hero.jpg?url'

const heroShell = 'max-w-6xl mx-auto w-full px-2.5 sm:px-4 lg:px-6'
const HERO_MIN_H = 'min-h-[17rem] sm:min-h-[19.5rem] md:min-h-[22.5rem]'

export default function About() {
  return (
    <>
      <section
        className={`relative overflow-hidden border-b flex flex-col ${HERO_MIN_H} border-sage-800/30`}
      >
        <div className="absolute inset-0 z-0">
          <img
            src={aboutHeroUrl}
            alt=""
            sizes="100vw"
            className="h-full w-full object-cover object-[50%_45%] sm:object-[50%_42%] lg:object-[50%_40%]"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-sage-950/45 via-sage-950/15 to-sage-950/50"
          aria-hidden
        />

        <div className="relative z-10 flex min-h-0 flex-1 flex-col min-h-[inherit] items-center justify-center">
          <div className={`${heroShell} w-full py-8 text-center sm:py-9 md:py-10`}>
            <div className="mx-auto w-full max-w-4xl">
              <h1 className="font-display text-[2.35rem] leading-none text-white drop-shadow-sm sm:text-[3.25rem] lg:text-[3.75rem] xl:text-[4.25rem]">
                About this project
              </h1>
            </div>
          </div>
        </div>
      </section>

      <PageContentBand>
        <div className="card card-body mx-auto max-w-2xl border-2 border-rust-400/80 text-center !ring-rust-300/55 ring-2 sm:p-10">
          <p className="font-display text-2xl text-earth-900 sm:text-3xl">Coming soon!</p>
          <p className="mt-4 text-earth-700 leading-relaxed sm:text-lg">
            This website is currently under construction. Information will be updated soon.
          </p>
        </div>
      </PageContentBand>
    </>
  )
}
