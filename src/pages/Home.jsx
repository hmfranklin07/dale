import { Link } from 'react-router-dom'
import USMap from '../components/USMap'
import SectionHeading, { pageTitleClass } from '../components/SectionHeading'
import { useInView } from '../hooks/useInView'
/** Home hero background photo, bundled as-is. */
import homeHeroBgUrl from '../assets/home/home-hero.jpg?url'

const shell = 'max-w-6xl mx-auto px-2.5 sm:px-4'
/** Slightly roomier side insets for mid-page narrative sections */
const sectionShell = 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-10'
/** Fill the viewport below the sticky navbar (h-16); tablet second nav row is taller. */
const heroViewportH =
  'min-h-[calc(100dvh-4rem)] md:min-h-[calc(100dvh-7rem)] lg:min-h-[calc(100dvh-4rem)]'

function revealState(inView, exitEdge) {
  return [
    inView ? 'is-revealed' : '',
    !inView && exitEdge === 'top' ? 'scroll-reveal-exit-top' : '',
  ]
    .filter(Boolean)
    .join(' ')
}

const revealOpts = { threshold: 0.14, rootMargin: '0px 0px -8%' }

export default function Home() {
  const { ref: heroRevealRef, inView: heroInView, exitEdge: heroExitEdge } = useInView({
    ...revealOpts,
    enterDelay: 16,
  })
  const { ref: introRevealRef, inView: introInView, exitEdge: introExitEdge } = useInView(revealOpts)
  const { ref: mapRevealRef, inView: mapInView, exitEdge: mapExitEdge } = useInView(revealOpts)

  const heroState = revealState(heroInView, heroExitEdge)
  const introState = revealState(introInView, introExitEdge)
  const mapState = revealState(mapInView, mapExitEdge)

  return (
    <div className="overflow-x-clip">
      {/* 1. Hero — full-viewport editorial vignette (no card overlay) */}
      <section ref={heroRevealRef} className={`relative flex flex-col overflow-hidden bg-sage-200/50 ${heroViewportH}`}>
        <div className={`absolute inset-0 z-0 scroll-reveal-photo-hero ${heroState}`}>
          <img
            src={homeHeroBgUrl}
            alt=""
            sizes="100vw"
            className="h-full w-full object-cover object-[46%_42%] sm:object-[48%_46%] lg:object-[50%_48%]"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>
        <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-start">
          <div className={`${shell} w-full pb-10 pt-6 text-center sm:pb-12 sm:pt-8 md:pt-9`}>
            <div
              className={`relative mx-auto w-full max-w-3xl px-2 py-6 text-center sm:max-w-4xl sm:py-7 md:py-8 scroll-reveal scroll-reveal-delay-hero-title ${heroState}`}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 border-y border-earth-900/10 bg-[#f6f3ec]"
              />

              <p className="kicker">Summer 2026 · Field research</p>

              <h1
                className={`mt-3 font-display text-[2.45rem] font-medium leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-[3.65rem] ${pageTitleClass}`}
              >
                STEM Across Rural America
              </h1>

              <p className="mt-3 font-display text-xl italic leading-snug text-earth-700 sm:text-[1.65rem]">
                The Stories Behind the Data
              </p>

              <div
                className={`mx-auto mt-4 h-px w-12 bg-rust-600 scroll-reveal scroll-reveal-delay-hero-rule ${heroState}`}
                aria-hidden
              />

              <p
                className={`mx-auto mt-4 max-w-2xl font-body text-base leading-relaxed text-earth-700 sm:text-lg scroll-reveal scroll-reveal-delay-hero-body ${heroState}`}
              >
                This summer I drove across the country collecting stories about STEM education in rural communities —
                from the teachers and students who live it every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Inspiration — same quiet road field as Contact */}
      <section className="relative overflow-hidden border-t-[5px] border-t-rust-500 bg-sage-100">
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1000 400"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
          >
            <path
              d="M -40 95 C 160 55, 280 165, 460 110 S 720 50, 900 140 S 980 210, 1040 190"
              stroke="#c45a3a"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeDasharray="5 13"
              opacity="0.42"
            />
            <path
              d="M -20 210 C 180 175, 320 265, 500 205 S 780 145, 960 245 S 1020 300, 1060 285"
              stroke="#b4532a"
              strokeWidth="1.45"
              strokeLinecap="round"
              strokeDasharray="4 15"
              opacity="0.32"
            />
            <path
              d="M -30 325 C 200 285, 360 365, 540 300 S 820 230, 1000 340"
              stroke="#d9774f"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeDasharray="3 16"
              opacity="0.28"
            />
          </svg>
        </div>

        <div ref={introRevealRef} className="relative z-10">
          <div className={`${sectionShell} pt-7 pb-0 sm:pt-8`}>
            <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-[minmax(0,1fr)_18.5rem] md:grid-rows-[auto_auto] md:gap-x-2 md:gap-y-3 md:items-stretch lg:grid-cols-[minmax(0,1fr)_19.75rem] lg:gap-x-3">
              <div className={`min-w-0 md:col-start-1 md:row-start-1 scroll-reveal scroll-reveal-delay-1 ${introState}`}>
                <SectionHeading className="!mt-4 !mb-0 sm:!mt-5 sm:!mb-0.5">Hi, I&apos;m Hannah!</SectionHeading>
              </div>

              <figure
                className={`mx-auto w-full max-w-[16.5rem] sm:max-w-[18.5rem] md:col-start-2 md:row-start-1 md:row-span-2 md:mx-0 md:flex md:max-w-none md:min-h-0 md:w-full md:items-center md:justify-end scroll-reveal scroll-reveal-delay-2 ${introState}`}
              >
                <div className="relative mx-auto aspect-[3/4] w-full max-h-[min(82vw,21rem)] overflow-hidden border border-earth-300 sm:max-h-[23rem] md:mx-0 md:aspect-auto md:h-[22rem] md:max-h-none md:w-[16.25rem] lg:h-[23.5rem] lg:w-[17.5rem]">
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
              </figure>

              <div className={`min-w-0 md:col-start-1 md:row-start-2 scroll-reveal scroll-reveal-delay-3 ${introState}`}>
                <div className="w-full space-y-4 font-body text-[1.05rem] leading-[1.75] text-earth-800 sm:text-[1.125rem]">
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
                    className="font-sans text-[0.95rem] text-rust-800 underline decoration-rust-600/50 underline-offset-4 transition-colors hover:text-earth-900 hover:decoration-earth-900"
                  >
                    See more about this project →
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Light orange Dale footing */}
          <div className={`relative mt-5 scroll-reveal scroll-reveal-delay-3 ${introState}`}>
            <div
              className="pointer-events-none absolute inset-0 bg-rust-200/55"
              aria-hidden
            />
            <div className={`relative ${sectionShell} pb-5 pt-3.5 sm:pb-6 sm:pt-4`}>
              <p className="mx-auto max-w-[min(100%,52rem)] text-center font-sans text-[0.8rem] leading-relaxed tracking-wide text-earth-700">
                This project was generously funded by the Martin A. Dale &apos;53 Summer Award from Princeton University.
              </p>
            </div>
          </div>
        </div>

        {/* Full-bleed rust bar between Hannah orange footing and the map — matches top bar */}
        <div className="relative z-10 h-[5px] w-full bg-rust-500" aria-hidden />
      </section>

      {/* 3. Map */}
      <section
        id="map"
        className="relative overflow-hidden bg-sage-100 scroll-mt-20 sm:scroll-mt-24"
      >
        <div className="relative z-10 mx-auto max-w-7xl px-2 py-10 sm:px-3 sm:py-14">
          <div ref={mapRevealRef}>
            <div className={`mb-8 text-center scroll-reveal scroll-reveal-delay-1 sm:mb-10 ${mapState}`}>
              <p className="kicker">The route</p>
              <h2 className="mt-3 font-display text-[2rem] text-earth-900 sm:text-[2.5rem]">Summer 2026 Stops</h2>
              <p className="mx-auto mt-3 max-w-xl font-body text-base leading-relaxed text-earth-700 sm:text-lg">
                Select a stop to read from that community.
              </p>
            </div>
            <div className={`w-full rounded-none sm:rounded-none scroll-reveal scroll-reveal-delay-2 ${mapState}`}>
              <USMap />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
