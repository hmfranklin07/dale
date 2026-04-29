import USMap from '../components/USMap'
import SocialLinks from '../components/SocialLinks'
import { SectionAmbience } from '../components/SectionAmbience'
import { PageHeroPanel } from '../components/PageHeroPanel'
import SectionHeading, { pageTitleClass } from '../components/SectionHeading'
/** Home hero background photo, bundled as-is. */
import homeHeroBgUrl from '../assets/home/IMG_3286.jpg?url'

const shell = 'max-w-6xl mx-auto px-2.5 sm:px-4'
/** Slightly roomier side insets for mid-page narrative sections */
const sectionShell = 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-10'

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <section className="relative min-h-[19rem] overflow-hidden border-b border-sage-400/45 sm:min-h-[22rem] md:min-h-[26rem]">
        <div className="absolute inset-0 z-0">
          <img
            src={homeHeroBgUrl}
            alt=""
            sizes="100vw"
            className="h-full w-full object-cover object-[52%_82%] sm:object-[50%_80%]"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-sage-950/28 via-white/20 to-sage-900/34"
          aria-hidden
        />
        <div className="relative z-10">
          <div className={`${shell} py-12 sm:py-16 md:py-20`}>
            <PageHeroPanel className="!bg-[rgba(255,255,255,0.65)] shadow-xl shadow-black/[0.12] ring-2 ring-sage-400/50 backdrop-blur-md">
              <h1 className="font-display mb-5 text-4xl leading-[1.08] sm:mb-6 sm:text-5xl lg:text-6xl">
                <span className={pageTitleClass}>STEM Across Rural America</span>
              </h1>
              <div className="max-w-none space-y-4 text-base leading-relaxed text-earth-800 sm:text-lg">
                <p>
                  This summer, I am driving across the country to document experiences with STEM education in rural high
                  schools, not from numbers and statistics, but from the students and educators who live it every day.
                  Drawing from conversations and interviews in 6 different areas, I'll be sharing what STEM looks
                  like in the classroom and how students connect with it.
                </p>
                <p>
                  This site is home to all of the videos, interviews, reflections, transcripts, and personal blogs from
                  each place I visit, highlighting rural voices and telling stories from across the nation.
                </p>
              </div>
            </PageHeroPanel>
          </div>
        </div>
      </section>

      {/* 2. Inspiration */}
      <section className="relative overflow-hidden border-b border-sage-200/60 bg-sage-100">
        <div className={`relative z-10 ${sectionShell} pt-7 pb-4 sm:pt-8 sm:pb-5`}>
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-[minmax(0,1fr)_18.5rem] md:grid-rows-[auto_auto] md:gap-x-2 md:gap-y-3 md:items-stretch lg:grid-cols-[minmax(0,1fr)_19.75rem] lg:gap-x-3">
            <div className="min-w-0 md:col-start-1 md:row-start-1">
              <SectionHeading className="!mt-4 !mb-0 sm:!mt-5 sm:!mb-0.5">Project inspiration</SectionHeading>
            </div>

            <figure className="mx-auto w-full max-w-[16.5rem] sm:max-w-[18.5rem] md:col-start-2 md:row-start-1 md:row-span-2 md:mx-0 md:flex md:max-w-none md:min-h-0 md:w-full md:items-center md:justify-end">
              <div className="relative mx-auto aspect-[3/4] w-full max-h-[min(82vw,21rem)] overflow-hidden rounded-2xl bg-gradient-to-r from-rust-700 via-rust-500 to-rust-300 p-1.5 shadow-xl shadow-rust-900/20 ring-1 ring-rust-300/60 sm:max-h-[23rem] md:mx-0 md:aspect-auto md:h-[22rem] md:max-h-none md:w-[16.25rem] lg:h-[23.5rem] lg:w-[17.5rem]">
                <div className="h-full w-full overflow-hidden rounded-[0.6rem] ring-1 ring-white/50">
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

            <div className="min-w-0 md:col-start-1 md:row-start-2">
              <div className="w-full space-y-3 text-base text-earth-800 sm:text-lg leading-relaxed">
                <p>
                  I&apos;m Hannah Franklin, a sophomore studying chemistry at Princeton University. I grew up in a small
                  farm town in New York, and for most of my life, I didn&apos;t think I could get to where I am now.
                  Education often felt disconnected from the rest of my life, and many of the opportunities that existed
                  beyond my community didn&apos;t feel within reach.
                </p>
                <p>
                  This project comes from my love for rural America and a desire to better understand how students and
                  educators experience and think about education in their own communities through conversations and
                  shared stories. It was born out of my academic work in my Sophomore Research Seminar{' '}
                  <em>The Curious Scientist</em> at Princeton during the 2025-26 school year.
                </p>
              </div>
            </div>
          </div>
          <p className="mx-auto mt-5 max-w-[min(100%,52rem)] border-t border-sage-300/50 pt-3.5 text-center text-xs leading-snug text-earth-600 italic sm:mt-5 sm:pt-4 sm:text-sm md:whitespace-nowrap">
            This project was generously funded by the Martin A. Dale &apos;53 Summer Award from Princeton University.
          </p>
        </div>
      </section>

      {/* 3. Map */}
      <section className="relative overflow-visible border-t border-sage-200/50 bg-gradient-to-b from-earth-100/55 via-amber-50/30 to-sage-100/50">
        <SectionAmbience variant="map" />
        <div className="relative z-10 mx-auto max-w-7xl px-2 py-10 sm:px-3 sm:py-14">
          <div className="mb-6 sm:mb-8 text-center">
            <div
              className="mx-auto mb-3 h-1.5 w-20 rounded-full bg-gradient-to-r from-rust-600 via-rust-500 to-rust-400"
              aria-hidden
            />
            <h2 className="font-display text-3xl text-earth-900 sm:text-4xl">Summer 2026 Stops</h2>
            <p className="text-earth-600 mx-auto mt-2 max-w-2xl text-base sm:text-lg">
              Click a pin to explore each area!
            </p>
          </div>
          <div className="w-full overflow-visible rounded-[1.25rem] sm:rounded-[1.4rem]">
            <USMap />
          </div>
        </div>
      </section>

      {/* 4. Follow */}
      <section className="relative overflow-hidden bg-sage-900 py-6 text-white sm:py-8">
        <div className={`relative z-10 ${shell} text-center`}>
          <h2 className="font-display mb-3 text-xl text-white sm:mb-4 sm:text-2xl">Follow the Trip!</h2>
          <SocialLinks variant="inline" />
        </div>
      </section>
    </>
  )
}
