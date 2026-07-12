import USMap from '../components/USMap'
import SocialLinks from '../components/SocialLinks'
import ScrollReveal from '../components/ScrollReveal'
import { SectionAmbience } from '../components/SectionAmbience'
import SectionHeading, { pageTitleClass } from '../components/SectionHeading'
import { useInView } from '../hooks/useInView'
/** Home hero background photo, bundled as-is. */
import homeHeroBgUrl from '../assets/home/IMG_3286.jpg?url'

const shell = 'max-w-6xl mx-auto px-2.5 sm:px-4'
/** Slightly roomier side insets for mid-page narrative sections */
const sectionShell = 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-10'

const CONTENT_PILLS = ['Videos', 'Conversations', 'Reflections']

export default function Home() {
  const { ref: mapRevealRef, inView: mapInView, exitEdge: mapExitEdge } = useInView({
    threshold: 0.12,
    rootMargin: '0px 0px -5%',
  })

  const mapHiddenClass =
    mapExitEdge === 'top'
      ? 'opacity-0 -translate-y-8 scale-[0.965]'
      : 'opacity-0 translate-y-10 scale-[0.96]'

  return (
    <div className="overflow-x-clip">
      {/* 1. Hero — cinematic editorial opener */}
      <section className="relative min-h-[min(78vh,44rem)] overflow-hidden border-b border-sage-800/35 sm:min-h-[min(82vh,46rem)]">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={homeHeroBgUrl}
            alt=""
            sizes="100vw"
            className="h-full w-full object-cover object-[50%_72%] motion-reduce:scale-100 motion-reduce:transform-none animate-ken-burns sm:object-[50%_76%] lg:object-[48%_82%]"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-sage-950/55 via-sage-950/20 to-sage-950/65"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,transparent_0%,rgba(26,21,18,0.35)_100%)]"
          aria-hidden
        />

        <div className="relative z-10 flex min-h-[inherit] flex-col items-center justify-center">
          <div className={`${shell} w-full py-7 text-center sm:py-8 md:py-9`}>
            <p className="section-kicker hero-enter hero-enter-delay-1 mb-2 text-rust-200/95">
              Summer 2026 · On the road
            </p>

            <div className="relative mx-auto max-w-4xl py-3 sm:py-3.5 md:py-4 lg:max-w-5xl">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 border-y border-white/25 bg-white/30 shadow-[0_20px_60px_-20px_rgba(26,21,18,0.45)] backdrop-blur-lg"
              />
              <h1
                className={`hero-enter hero-enter-delay-2 font-display text-[2.65rem] leading-[1.02] sm:text-6xl lg:text-7xl xl:text-[4.85rem] ${pageTitleClass}`}
              >
                STEM Across Rural America
              </h1>
              <p className="hero-enter hero-enter-delay-3 mt-2.5 font-display text-lg leading-snug text-earth-800 sm:mt-3 sm:text-xl lg:text-2xl">
                The Stories Behind the Data
              </p>
            </div>

            <div className="hero-enter hero-enter-delay-3 mx-auto mt-3 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              {CONTENT_PILLS.map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-white/35 bg-white/20 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white/95 backdrop-blur-sm sm:px-3.5 sm:py-1.5 sm:text-xs"
                >
                  {label}
                </span>
              ))}
            </div>

            <div className="hero-enter hero-enter-delay-4 mx-auto mt-3.5 w-full max-w-3xl lg:max-w-4xl">
              <div
                className="mx-auto h-px w-20 bg-gradient-to-r from-transparent via-rust-400/90 to-transparent sm:w-28"
                aria-hidden
              />
              <div className="mx-auto mt-3 space-y-2.5 text-[0.9375rem] leading-snug text-white/92 sm:text-base sm:leading-relaxed lg:text-lg">
                <p>
                  This summer, I am driving across the country to document experiences with STEM education in rural high
                  schools — not from numbers and statistics, but from the students and educators who live it every day.
                  Drawing from conversations in six different areas, I&apos;ll be sharing what STEM looks like in the
                  classroom and how students connect with it.
                </p>
                <p className="text-white/85">
                  This site is home to all of the videos, conversations, and reflections from each place I visit,
                  highlighting rural voices and telling stories from across the nation.
                </p>
              </div>
            </div>
          </div>

          <div className="hero-enter hero-enter-delay-4 mt-auto pb-4 sm:pb-5" aria-hidden>
            <div className="flex flex-col items-center gap-1.5 text-white/55">
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em]">Explore</span>
              <svg
                className="h-5 w-5 animate-scroll-cue motion-reduce:animate-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Inspiration */}
      <section className="relative overflow-hidden border-b border-sage-200/60">
        <SectionAmbience variant="paper" />
        <div className={`relative z-10 ${sectionShell} py-7 sm:py-8 lg:py-10`}>
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-[minmax(0,1fr)_18.5rem] md:grid-rows-[auto_auto] md:gap-x-4 md:gap-y-3 md:items-stretch lg:grid-cols-[minmax(0,1fr)_19.75rem] lg:gap-x-6">
            <ScrollReveal className="min-w-0 md:col-start-1 md:row-start-1" delay={0}>
              <p className="section-kicker mb-2">About the researcher</p>
              <SectionHeading className="!mt-0 !mb-0">Hi, I&apos;m Hannah!</SectionHeading>
            </ScrollReveal>

            <ScrollReveal
              className="mx-auto w-full max-w-[16.5rem] sm:max-w-[18.5rem] md:col-start-2 md:row-start-1 md:row-span-2 md:mx-0 md:flex md:max-w-none md:min-h-0 md:w-full md:items-center md:justify-end"
              direction="right"
              delay={120}
            >
              <figure className="group w-full">
                <div className="relative mx-auto aspect-[3/4] w-full max-h-[min(82vw,19rem)] overflow-hidden rounded-2xl bg-gradient-to-br from-rust-700 via-rust-500 to-amber-300 p-[3px] shadow-xl shadow-rust-900/25 ring-1 ring-rust-300/50 transition-[transform,box-shadow] duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl motion-reduce:transform-none sm:max-h-[21rem] md:mx-0 md:aspect-auto md:h-[20rem] md:max-h-none md:w-[15.5rem] lg:h-[21rem] lg:w-[16.75rem]">
                  <div className="h-full w-full overflow-hidden rounded-[0.72rem] ring-1 ring-white/55">
                    <img
                      src="/images/researcher.png"
                      alt="Portrait of the project researcher, outdoors with two dogs"
                      width={768}
                      height={1024}
                      decoding="async"
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transform-none"
                    />
                  </div>
                </div>
              </figure>
            </ScrollReveal>

            <ScrollReveal className="min-w-0 md:col-start-1 md:row-start-2" delay={200}>
              <div className="w-full space-y-3 text-base leading-relaxed text-earth-800 sm:text-lg">
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
            </ScrollReveal>
          </div>

          <ScrollReveal className="mx-auto mt-5 max-w-[min(100%,52rem)]" delay={280}>
            <p className="border-t border-sage-300/55 pt-3 text-center text-xs leading-snug text-earth-600 italic sm:pt-4 sm:text-sm">
              This project was generously funded by the Martin A. Dale &apos;53 Summer Award from Princeton University.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. Map — functionality unchanged; presentation enhanced */}
      <section
        id="map"
        className="relative overflow-hidden border-t border-sage-200/50 scroll-mt-20 sm:scroll-mt-24"
      >
        <SectionAmbience variant="map" />
        <div className="relative z-10 mx-auto max-w-7xl px-2 py-8 sm:px-3 sm:py-10 lg:py-12">
          <ScrollReveal className="mb-5 text-center sm:mb-6" direction="fade">
            <p className="section-kicker mb-2">Interactive journey</p>
            <div
              className="mx-auto mb-3 h-1 w-24 rounded-full bg-gradient-to-r from-rust-600 via-rust-400 to-rust-600 bg-shimmer animate-shimmer-bar motion-reduce:animate-none"
              aria-hidden
            />
            <h2 className="font-display text-3xl text-earth-900 sm:text-4xl lg:text-[2.65rem]">Summer 2026 Stops</h2>
            <p className="mx-auto mt-2.5 max-w-2xl text-base text-earth-600 sm:text-lg">
              Click a pin to explore each area along the route.
            </p>
          </ScrollReveal>

          <div
            ref={mapRevealRef}
            className={`motion-reduce:transform-none motion-reduce:opacity-100 transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              mapInView ? 'opacity-100 translate-y-0 scale-100' : mapHiddenClass
            }`}
          >
            <div className="editorial-frame">
              <div className="relative z-[1] rounded-[1.3rem] bg-gradient-to-b from-white/50 to-sage-50/30 p-1 sm:p-1.5">
                <USMap />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Follow */}
      <section className="relative overflow-hidden border-t border-sage-800/30">
        <SectionAmbience variant="dark" />
        <div className={`relative z-10 ${shell} py-7 text-center sm:py-8`}>
          <ScrollReveal direction="fade">
            <p className="section-kicker mb-1.5 text-rust-200/90">Stay connected</p>
            <h2 className="font-display mb-3 text-2xl text-white sm:mb-4 sm:text-3xl">Follow the Trip</h2>
            <SocialLinks variant="inline" />
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
