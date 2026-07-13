import PageContentBand from '../components/PageContentBand'
import aboutHeroUrl from '../assets/about/about-hero.jpg?url'

const heroShell = 'max-w-6xl mx-auto w-full px-2.5 sm:px-4 lg:px-6'
const HERO_MIN_H = 'min-h-[17rem] sm:min-h-[19.5rem] md:min-h-[22.5rem]'

export default function About() {
  return (
    <>
      <section
        className={`relative flex flex-col overflow-hidden border-b border-sage-800/30 ${HERO_MIN_H}`}
      >
        <div className="absolute inset-0 z-0">
          <img
            src={aboutHeroUrl}
            alt=""
            sizes="100vw"
            className="h-full w-full object-cover object-[50%_48%] sm:object-[50%_46%] lg:object-[50%_44%]"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>

        <div className="relative z-10 flex min-h-0 min-h-[inherit] flex-1 flex-col items-center justify-center">
          <div className={`${heroShell} w-full py-8 text-center sm:py-9 md:py-10`}>
            <div className="mx-auto w-full max-w-4xl">
              <h1 className="font-display text-[2.75rem] leading-none text-white drop-shadow-sm sm:text-[3.5rem] lg:text-[4rem] xl:text-[4.5rem]">
                About this project
              </h1>
              <div
                className="mx-auto mt-2.5 h-px w-14 bg-gradient-to-r from-transparent via-rust-400 to-transparent sm:mt-3 sm:w-20"
                aria-hidden
              />
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
