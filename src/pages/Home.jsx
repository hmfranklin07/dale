import { Link } from 'react-router-dom'
import USMap from '../components/USMap'
import SectionHeading, { pageTitleClass } from '../components/SectionHeading'
import ScrollReveal from '../components/ScrollReveal'
/** Home hero background photo, bundled as-is. */
import homeHeroBgUrl from '../assets/home/home-hero.jpg?url'

const shell = 'max-w-6xl mx-auto px-2.5 sm:px-4'
/** Slightly roomier side insets for mid-page narrative sections */
const sectionShell = 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-10'
/** Fill the viewport below the sticky navigation, including the extra row on tablets. */
const heroViewportHeight =
  'min-h-[calc(100dvh-4rem-1px)] md:min-h-[calc(100dvh-7.5rem-2px)] lg:min-h-[calc(100dvh-4rem-1px)]'

export default function Home() {
  return (
    <div className="overflow-x-clip">
      {/* 1. Hero */}
      <section className={`relative flex flex-col overflow-hidden bg-paper ${heroViewportHeight}`}>
        <div className="absolute inset-0 z-0">
          {/* Cap the desktop crop so the flag stays below the title strip on short screens. */}
          <img
            src={homeHeroBgUrl}
            alt=""
            sizes="100vw"
            className="h-full w-full object-cover object-[62%_68%] sm:object-[50%_76%] lg:object-[52%_max(76%,calc(16.5rem_-_76vw))]"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>
        <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-start">
          <div className={`${shell} w-full pb-6 pt-3 text-center sm:pt-4`}>
            <div
              className="relative mx-auto w-full max-w-4xl px-2 py-4 text-center sm:py-5"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 border-y border-earth-900/10 bg-paper"
              />

              <h1
                className={`font-display text-4xl leading-[1.08] sm:text-5xl lg:text-6xl ${pageTitleClass}`}
              >
                STEM Across Rural America
              </h1>

              <p className="mt-2 font-display text-2xl leading-snug text-earth-800 sm:text-3xl">
                The Stories Behind the Data
              </p>

              <div
                className="mx-auto mt-4 h-px w-16 bg-rust-600"
                aria-hidden
              />

              <p
                className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-earth-800 sm:text-xl"
              >
                This summer I drove across the country collecting stories about STEM education in rural communities —
                from the teachers and students who live it every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Inspiration */}
      <section className="relative overflow-hidden border-t-[5px] border-t-rust-500 bg-paper">
        <div className="relative z-10">
          <div className={`${sectionShell} pt-7 pb-0 sm:pt-8`}>
            <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-[minmax(0,1fr)_18.5rem] md:grid-rows-[auto_auto] md:gap-x-2 md:gap-y-3 md:items-stretch lg:grid-cols-[minmax(0,1fr)_19.75rem] lg:gap-x-3">
              <ScrollReveal className="min-w-0 md:col-start-1 md:row-start-1">
                <SectionHeading className="!mt-4 !mb-0 sm:!mt-5 sm:!mb-0.5">Hi, I&apos;m Hannah!</SectionHeading>
              </ScrollReveal>

              <ScrollReveal
                as="figure"
                delay={1}
                className="mx-auto w-full max-w-[16.5rem] sm:max-w-[18.5rem] md:col-start-2 md:row-start-1 md:row-span-2 md:mx-0 md:flex md:max-w-none md:min-h-0 md:w-full md:items-center md:justify-end"
              >
                <div className="relative mx-auto aspect-[3/4] w-full max-h-[min(82vw,21rem)] overflow-hidden rounded-md border border-earth-300 sm:max-h-[23rem] md:mx-0 md:aspect-auto md:h-[22rem] md:max-h-none md:w-[16.25rem] lg:h-[23.5rem] lg:w-[17.5rem]">
                  <div className="h-full w-full overflow-hidden">
                    <img
                      src="/images/researcher.png"
                      alt="Portrait of the project researcher, outdoors with two dogs"
                      width={768}
                      height={1024}
                      decoding="async"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={2} className="min-w-0 md:col-start-1 md:row-start-2">
                <div className="w-full space-y-4 text-[1.0625rem] leading-relaxed text-earth-800 sm:text-[1.1875rem]">
                  <p>
                    I study chemistry at Princeton University, but I grew up in a small farm town in New York. For most of
                    my life, I didn&apos;t think I could get to where I am now. Education often felt disconnected from the
                    rest of my life, and the opportunities that existed beyond my community didn&apos;t feel within reach.
                  </p>
                  <p>
                    This project comes from my love for rural America and a desire to understand how students and
                    educators experience and think about education in their own communities, through conversations and
                    shared stories. It grew out of my work in Sophomore Research Seminar,{' '}
                    <em>The Curious Scientist</em>, at Princeton during the 2025–26 school year.
                  </p>
                </div>
                <p className="mt-4 sm:mt-5">
                  <Link
                    to="/about"
                    className="inline-block rounded-md border border-rust-700 bg-rust-700 px-5 py-2.5 text-center font-display text-lg text-white transition-colors duration-200 hover:bg-rust-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-rust-300 sm:px-6"
                  >
                    See more about this project
                  </Link>
                </p>
              </ScrollReveal>
            </div>
          </div>

          {/* Dale Award funding banner */}
          <ScrollReveal className="relative mt-5">
            <div
              className="pointer-events-none absolute inset-0 bg-rust-200/55"
              aria-hidden
            />
            <div className="relative mx-auto max-w-7xl px-4 py-3 sm:py-3.5">
              <p className="text-balance text-center text-sm italic leading-snug text-earth-800 lg:text-base">
                This project was generously funded by the Martin A. Dale &apos;53 Summer Award from Princeton University.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Full-width divider above the map */}
        <div className="relative z-10 h-[5px] w-full bg-rust-500" aria-hidden />
      </section>

      {/* 3. Map */}
      <section
        id="map"
        className="relative overflow-hidden bg-paper scroll-mt-20 sm:scroll-mt-24"
      >
        <div className="relative z-10 mx-auto max-w-7xl px-2 py-10 sm:px-3 sm:py-14">
          <div>
            <ScrollReveal className="mb-8 text-center sm:mb-10">
              <p className="kicker">The route</p>
              <h2 className="mt-2 font-display text-3xl text-earth-900 sm:text-4xl">Summer 2026 Stops</h2>
              <p className="mx-auto mt-3 max-w-xl text-lg leading-relaxed text-earth-800 sm:text-xl">
                Select a stop to read from that community.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={1} className="w-full rounded-md">
              <USMap />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  )
}
