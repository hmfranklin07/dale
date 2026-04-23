import USMap from '../components/USMap'
import SocialLinks from '../components/SocialLinks'
import { SectionAmbience } from '../components/SectionAmbience'

const shell = 'max-w-6xl mx-auto px-2.5 sm:px-4'

export default function Home() {
  return (
    <>
      {/* 1. Title + project overview */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sage-200/70 via-sage-100/80 to-sage-50/90">
        <SectionAmbience variant="hero" />
        <div className="relative z-10">
          <div className={`${shell} py-12 sm:py-16`}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-earth-900 mb-5 sm:mb-6 leading-tight">
              STEM Across Rural America
            </h1>
            <div className="space-y-4 text-base sm:text-lg text-earth-800 leading-relaxed max-w-none">
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
      </section>

      {/* 2. Inspiration + a little about me + photo */}
      <section className="relative overflow-hidden border-y border-sage-200/80 bg-gradient-to-b from-white via-sage-50/40 to-earth-50/30">
        <SectionAmbience variant="paper" />
        <div className={`relative z-10 ${shell} py-10 sm:py-14`}>
          <h2 className="font-display text-2xl sm:text-3xl text-earth-900 mb-5 sm:mb-6">Project inspiration</h2>

          <div className="grid md:grid-cols-[1fr_min(260px,32%)] gap-6 sm:gap-8 md:gap-10 items-start">
            <div className="order-2 md:order-1 space-y-4 text-base sm:text-lg text-earth-800 leading-relaxed">
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
                <span className="font-display text-lg text-earth-900">A little about me. </span>
                I’m the researcher behind this project—[add your name, your school or program, and
                a sentence on what brought you to rural STEM and this road trip]. You’ll see my voice
                in the field notes, interviews, and reflections as the summer unfolds.
              </p>
            </div>

            <figure className="order-1 md:order-2 w-full max-w-md mx-auto md:max-w-none md:mx-0">
              <div className="relative overflow-hidden rounded-2xl border border-sage-200/90 bg-earth-100 shadow-lg shadow-earth-900/5 ring-1 ring-earth-200/20 aspect-[3/4]">
                <img
                  src="/images/researcher.jpg"
                  alt="Portrait of the project researcher"
                  className="h-full w-full object-cover"
                />
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* 3. Project aspirations */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sage-100/80 via-sage-50/60 to-earth-100/40">
        <SectionAmbience variant="sage" />
        <div className={`relative z-10 ${shell} py-10 sm:py-12`}>
          <h2 className="font-display text-2xl sm:text-3xl text-earth-900 mb-5 sm:mb-6">Project aspirations</h2>
          <div className="max-w-none space-y-4 text-base sm:text-lg text-earth-800 leading-relaxed">
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
      <section className="relative overflow-hidden border-t border-sage-200/80 bg-gradient-to-b from-earth-100/30 via-sage-100/40 to-sage-100/30">
        <SectionAmbience variant="map" />
        <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-3 py-10 sm:py-14">
          <div className="mb-5 text-center sm:mb-6">
            <h2 className="section-title">Interview sites</h2>
            <p className="text-earth-700 max-w-3xl mx-auto px-1 text-base sm:text-lg">
              Click a pin to explore updates in each town.
            </p>
          </div>
          <div className="w-full">
            <div className="card border-sage-300/80 bg-gradient-to-b from-sage-50/90 to-earth-100/50 p-1.5 sm:p-3 shadow-lg shadow-earth-900/5">
              <USMap />
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-earth-900 text-white py-12 sm:py-16">
        <SectionAmbience variant="dark" />
        <div className={`relative z-10 ${shell} text-center`}>
          <h2 className="font-display text-2xl sm:text-3xl mb-3">Follow the trip</h2>
          <p className="text-sage-200/95 max-w-2xl mx-auto mb-8 text-base sm:text-lg">
            The same short-form and vlog content as on the Vlog page—wherever you post first.
          </p>
          <SocialLinks size="large" />
        </div>
      </section>
    </>
  )
}
