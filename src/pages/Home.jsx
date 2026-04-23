import USMap from '../components/USMap'
import SocialLinks from '../components/SocialLinks'
import { SectionAmbience } from '../components/SectionAmbience'
import { PageHeroPanel } from '../components/PageHeroPanel'
import SectionHeading, { pageTitleClass } from '../components/SectionHeading'

const shell = 'max-w-6xl mx-auto px-2.5 sm:px-4'

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden border-b border-sage-200/50 bg-earth-900">
        <img
          src="/images/hero-sunset.png"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-[center_58%]"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black/18"
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
        <div className={`relative z-10 ${shell} py-10 sm:py-14`}>
          <SectionHeading>Project inspiration</SectionHeading>

          <div className="grid items-start gap-6 sm:gap-8 md:grid-cols-[1fr_min(260px,32%)] md:gap-10">
            <div className="order-2 space-y-4 text-base text-earth-800 sm:text-lg leading-relaxed md:order-1">
              <p>
                
              </p>
              <p>
                I’m also inspired by teachers doing multiple jobs at once—one person covering every
                science class, writing grants, and still showing up for kids after the bell. Their
                stories are at the center of the trip.
              </p>
              <p>
                <span className="font-display text-rust-800 text-lg">A little about me. </span>
                I’m the researcher behind this project—[add your name, your school or program, and
                a sentence on what brought you to rural STEM and this road trip]. You’ll see my voice
                in the field notes, interviews, and reflections as the summer unfolds.
              </p>
            </div>

            <figure className="order-1 mx-auto w-full max-w-md md:order-2 md:mx-0">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-br from-rust-200/60 to-sage-300/45 p-1.5 shadow-xl shadow-rust-900/10 ring-1 ring-amber-200/40">
                <div className="h-full w-full overflow-hidden rounded-[0.6rem] ring-1 ring-white/50">
                  <img
                    src="/images/researcher.png"
                    alt="Portrait of the project researcher, outdoors with two dogs"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* 3. Aspirations */}
      <section className="relative overflow-hidden border-b border-sage-200/50 bg-gradient-to-br from-sage-200/60 via-amber-50/40 to-rust-100/45">
        <SectionAmbience variant="sage" />
        <div className={`relative z-10 ${shell} py-10 sm:py-12`}>
          <SectionHeading>Project aspirations</SectionHeading>
          <div className="max-w-none space-y-4 text-base text-earth-800 sm:text-lg leading-relaxed">
            <p>
              I hope the site can be a useful slice of the summer: clear enough for policy readers,
              human enough for anyone who’s lived a version of this, and open enough that new interviews
              and reflections can be added as we go.
            </p>
            <p>
              In the end, I want to return with not just a folder of recordings but a fair accounting of
              what I heard—especially from students who are still deciding who they can become.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Map */}
      <section className="relative overflow-hidden border-t border-sage-200/50 bg-gradient-to-b from-earth-100/55 via-amber-50/30 to-sage-100/50">
        <SectionAmbience variant="map" />
        <div className="relative z-10 mx-auto max-w-7xl px-2 py-10 sm:px-3 sm:py-14">
          <div className="mb-6 sm:mb-8 text-center">
            <div
              className="mx-auto mb-3 h-1.5 w-20 rounded-full bg-gradient-to-r from-rust-400/70 via-amber-300/60 to-sage-500/50"
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

      {/* 5. Follow */}
      <section className="relative overflow-hidden bg-gradient-to-br from-earth-950 via-sage-900 to-rust-900 py-12 text-white sm:py-16">
        <SectionAmbience variant="dark" />
        <div className={`relative z-10 ${shell} text-center`}>
          <h2 className="font-display mb-3 text-2xl sm:text-3xl">Follow the trip</h2>
          <p className="text-sage-200/95 mx-auto mb-8 max-w-2xl text-base sm:text-lg">
            The same short-form and vlog content as on the Vlog page—wherever you post first.
          </p>
          <SocialLinks size="large" />
        </div>
      </section>
    </>
  )
}
