import USMap from '../components/USMap'
import SocialLinks from '../components/SocialLinks'
import { SectionAmbience } from '../components/SectionAmbience'

const shell = 'max-w-6xl mx-auto px-2.5 sm:px-4'

function SectionHeading({ kicker, children, align = 'left' }) {
  return (
    <div className={`mb-6 sm:mb-8 ${align === 'center' ? 'text-center' : ''}`}>
      {kicker && (
        <p className="text-rust-600 mb-2 text-xs font-semibold uppercase tracking-widest">{kicker}</p>
      )}
      <h2
        className={`font-display text-2xl text-earth-900 sm:text-3xl flex gap-3 sm:gap-4 ${
          align === 'center' ? 'max-w-3xl mx-auto justify-center' : 'items-start'
        }`}
      >
        {align === 'left' && (
          <span
            className="from-rust-500 to-rust-700 mt-0.5 h-9 w-1.5 shrink-0 rounded-full bg-gradient-to-b"
            aria-hidden
          />
        )}
        <span className="leading-tight text-left sm:min-w-0">{children}</span>
      </h2>
    </div>
  )
}

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden border-b border-sage-200/50 bg-gradient-to-b from-amber-50/80 via-sage-100/70 to-sage-200/50">
        <SectionAmbience variant="hero" />
        <div className="relative z-10">
          <div className={`${shell} py-12 sm:py-16 md:py-20`}>
            <div className="texture-dots rounded-3xl border border-white/60 bg-white/40 p-6 shadow-2xl shadow-earth-900/10 ring-1 ring-sage-200/50 backdrop-blur-md sm:p-8 md:p-10">
              <p className="text-rust-600 mb-3 text-xs font-semibold uppercase tracking-widest">Field research</p>
              <h1 className="font-display mb-5 text-4xl leading-[1.08] sm:mb-6 sm:text-5xl lg:text-6xl">
                <span className="bg-gradient-to-r from-earth-950 via-sage-800 to-rust-800 bg-clip-text text-transparent">
                  STEM Across Rural America
                </span>
              </h1>
              <div className="max-w-none space-y-4 text-base text-earth-800 sm:text-lg leading-relaxed">
                <p>
                  This site documents a research road trip through rural America. In each state I sit down
                  with students, teachers, and people who make schools run—less to “fix” a narrative and
                  more to show what it looks like on the ground when you ask honest questions about STEM
                  access, identity, and aspiration.
                </p>
                <p>
                  You’ll find a mix: quick field notes, longer written interviews, and my own reflections as
                  the trip keeps moving. Everything is built around consent, accuracy, and respect for the
                  places that welcome the project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Inspiration */}
      <section className="relative overflow-hidden border-b border-sage-200/60 bg-gradient-to-b from-white via-amber-50/20 to-sage-50/40">
        <SectionAmbience variant="paper" />
        <div className={`relative z-10 ${shell} py-10 sm:py-14`}>
          <SectionHeading kicker="Stories & people">Project inspiration</SectionHeading>

          <div className="grid items-start gap-6 sm:gap-8 md:grid-cols-[1fr_min(260px,32%)] md:gap-10">
            <div className="order-2 space-y-4 text-base text-earth-800 sm:text-lg leading-relaxed md:order-1">
              <p>
                The project grew out of class readings and data that don’t line up with how generous and
                curious so many small-town students are. On paper, access to information keeps improving;
                in person, the gap in who sees themselves in STEM is still there. I wanted to leave the
                paper behind and go listen.
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
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-br from-rust-100/80 to-sage-200/50 p-1.5 shadow-xl shadow-earth-900/10 ring-1 ring-sage-300/40">
                <div className="h-full w-full overflow-hidden rounded-[0.6rem] ring-1 ring-white/50">
                  <img
                    src="/images/researcher.jpg"
                    alt="Portrait of the project researcher"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* 3. Aspirations */}
      <section className="relative overflow-hidden border-b border-sage-200/50 bg-gradient-to-br from-sage-200/50 via-amber-50/30 to-rust-50/40">
        <SectionAmbience variant="sage" />
        <div className={`relative z-10 ${shell} py-10 sm:py-12`}>
          <SectionHeading kicker="The hope">Project aspirations</SectionHeading>
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
      <section className="relative overflow-hidden border-t border-sage-200/50 bg-gradient-to-b from-earth-100/50 via-amber-50/15 to-sage-100/40">
        <SectionAmbience variant="map" />
        <div className="relative z-10 mx-auto max-w-7xl px-2 py-10 sm:px-3 sm:py-14">
          <div className="mb-6 sm:mb-8 text-center">
            <p className="text-rust-600 mb-2 text-xs font-semibold uppercase tracking-widest">On the map</p>
            <h2 className="font-display text-3xl text-earth-900 sm:text-4xl">Interview sites</h2>
            <p className="text-earth-600 mx-auto mt-2 max-w-2xl text-base sm:text-lg">
              Click a pin to explore updates in each town.
            </p>
          </div>
          <div className="w-full">
            <div className="card border-rust-200/40 bg-gradient-to-b from-rust-50/50 to-sage-100/30 p-1.5 shadow-xl shadow-earth-900/10 ring-1 ring-sage-300/50 sm:p-3">
              <USMap />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Follow */}
      <section className="relative overflow-hidden bg-gradient-to-br from-earth-950 via-sage-950 to-rust-950 py-12 text-white sm:py-16">
        <SectionAmbience variant="dark" />
        <div className={`relative z-10 ${shell} text-center`}>
          <p className="text-sage-300/90 mb-1 text-xs font-semibold uppercase tracking-widest">Stay close</p>
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
