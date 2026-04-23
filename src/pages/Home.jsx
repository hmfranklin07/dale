import USMap from '../components/USMap'
import SocialLinks from '../components/SocialLinks'
import { SectionAmbience } from '../components/SectionAmbience'
import { PageHeroPanel } from '../components/PageHeroPanel'
import SectionHeading, { pageTitleClass } from '../components/SectionHeading'

const shell = 'max-w-6xl mx-auto px-2.5 sm:px-4'
/** Slightly roomier side insets for mid-page narrative sections */
const sectionShell = 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-10'

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden border-b border-sage-200/50 bg-earth-900">
        <img
          src="/images/hero-sunset.png"
          alt=""
          aria-hidden
          width={1024}
          height={761}
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[center_82%] sm:object-[center_86%] md:object-bottom"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black/10"
          aria-hidden
        />
        <div className="relative z-10">
          <div className={`${shell} py-12 sm:py-16 md:py-20`}>
            <PageHeroPanel className="bg-white/84">
              <h1 className="font-display mb-5 text-4xl leading-[1.08] sm:mb-6 sm:text-5xl lg:text-6xl">
                <span className={pageTitleClass}>STEM Across Rural America</span>
              </h1>
              <div className="max-w-none space-y-4 text-base text-earth-800 sm:text-lg leading-relaxed">
                <p>
                This site serves to document how STEM education is experienced in rural high schools across the United States.  Through conversations with students, educators, and administrators, I seek to share what STEM looks like in high schools; how it is taught, experienced, and how it connects to students’ lives, identities, and communities.  This project highlights voices from 6 different regions, capturing a wide range of perspectives and lived experiences.
                </p>
                <p>
                  You’ll find a mix of videos, interviews, reflections, transcriptions, and personal blogs that document stories from across the country.
                </p>
              </div>
            </PageHeroPanel>
          </div>
        </div>
      </section>

      {/* 2. Inspiration */}
      <section className="relative overflow-hidden border-b border-sage-200/60 bg-gradient-to-b from-white via-amber-50/40 to-sage-100/45">
        <SectionAmbience variant="paper" />
        <div className={`relative z-10 ${sectionShell} pt-8 pb-6 sm:pt-9 sm:pb-7`}>
          <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-[minmax(0,1fr)_18.5rem] md:grid-rows-[auto_auto] md:gap-x-2 md:gap-y-4 md:items-stretch lg:grid-cols-[minmax(0,1fr)_19.75rem] lg:gap-x-3">
            <div className="min-w-0 md:col-start-1 md:row-start-1">
              <SectionHeading className="!mb-3 sm:!mb-4">Project inspiration</SectionHeading>
            </div>

            <figure className="mx-auto w-full max-w-[16.5rem] sm:max-w-[18.5rem] md:col-start-2 md:row-start-1 md:row-span-2 md:mx-0 md:flex md:max-w-none md:min-h-0 md:w-full md:items-center md:justify-end">
              <div className="relative mx-auto aspect-[3/4] w-full max-h-[min(82vw,21rem)] overflow-hidden rounded-2xl bg-gradient-to-br from-rust-200/60 to-sage-300/45 p-1.5 shadow-xl shadow-rust-900/10 ring-1 ring-amber-200/40 sm:max-h-[23rem] md:mx-0 md:aspect-auto md:h-[22rem] md:max-h-none md:w-[16.25rem] lg:h-[23.5rem] lg:w-[17.5rem]">
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
              <div className="w-full space-y-4 text-base text-earth-800 sm:text-lg leading-relaxed">
                <p>
                  I’m Hannah Franklin, a sophomore studying chemistry at Princeton University. I grew up
                  in a small farm town in New York, and for most of my life, I didn’t think I could get
                  to where I am now. Education often felt disconnected from the rest of my life, and many
                  of the opportunities that existed beyond my community didn’t feel within reach.
                </p>
                <p>
                  I know there are so many rural students with remarkable potential, even when certain
                  opportunities or possibilities may not feel as visible. This project comes from a desire
                  to better understand how students and educators think about education in their own
                  communities through conversations and shared stories.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Map */}
      <section className="relative overflow-hidden border-t border-sage-300/50 bg-gradient-to-b from-sage-400/55 via-amber-50/35 to-sage-900/12">
        <SectionAmbience variant="map" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-10">
          <div className="mb-6 sm:mb-8 text-center">
            <div
              className="mx-auto mb-3 h-1.5 w-20 rounded-full bg-gradient-to-r from-rust-600 via-rust-500 to-rust-400"
              aria-hidden
            />
            <h2 className="font-display text-3xl text-earth-900 sm:text-4xl">Summer 2026 Sites</h2>
            <p className="text-earth-600 mx-auto mt-2 max-w-2xl text-base sm:text-lg">
              Click a pin to explore each area!
            </p>
          </div>
          <div className="w-full overflow-hidden rounded-[1.25rem] sm:rounded-[1.4rem]">
            <USMap />
          </div>
        </div>
      </section>

      {/* 4. Follow */}
      <section className="relative overflow-hidden bg-sage-900 py-12 text-white sm:py-16">
        <div className={`relative z-10 ${shell} text-center`}>
          <h2 className="font-display mb-3 text-2xl text-white sm:text-3xl">Follow the trip</h2>
          <p className="mx-auto mb-8 max-w-2xl text-base text-sage-100 sm:text-lg">
            The same short-form and vlog content as on the Vlog page—wherever you post first.
          </p>
          <SocialLinks size="large" />
        </div>
      </section>
    </>
  )
}
