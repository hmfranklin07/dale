import USMap from '../components/USMap'
import SocialLinks from '../components/SocialLinks'
import { IconBarn, IconFence, IconBarnRow, IconHills } from '../components/RuralIcons'

export default function Home() {
  return (
    <>
      {/* 1. Title + project overview */}
      <section className="relative bg-gradient-to-b from-sage-200/60 to-sage-100 overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-earth-900 mb-6 leading-tight">
            STEM Across Rural America
          </h1>
          <div className="space-y-4 text-lg sm:text-xl text-earth-800 leading-relaxed">
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
          <IconBarnRow className="mt-8" />
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sage-400 to-transparent" />
        </div>
      </section>

      {/* 2. Inspiration + a little about me + photo */}
      <section className="bg-white/90 border-y border-sage-300/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h2 className="font-display text-2xl sm:text-3xl text-earth-900 flex flex-wrap items-center gap-2.5 mb-6">
            <span className="text-sage-600" aria-hidden>
              <IconBarn className="h-7 w-7 sm:h-8 sm:w-8" />
            </span>
            Project inspiration
          </h2>

          <div className="grid md:grid-cols-[1fr_min(280px,40%)] gap-8 md:gap-10 items-start">
            <div className="order-2 md:order-1 space-y-4 text-base sm:text-lg text-earth-800 leading-relaxed">
              <p>
                The project grew out of class readings and data that don’t line up with how generous and
                curious so many small-town students are. On paper, access to information keeps improving;
                in person, the gap in who sees themselves in STEM is still there. I wanted to leave the
                paper behind and go listen.
              </p>
              <p className="flex flex-wrap items-start gap-2">
                <span className="text-sage-600 mt-0.5" aria-hidden>
                  <IconFence className="h-5 w-5 sm:h-6 sm:w-6" />
                </span>
                <span>
                  I’m also inspired by teachers doing multiple jobs at once—one person covering every
                  science class, writing grants, and still showing up for kids after the bell. Their
                  stories are at the center of the trip.
                </span>
              </p>
              <p>
                <span className="font-display text-lg text-earth-900">A little about me. </span>
                I’m the researcher behind this project—[add your name, your school or program, and
                a sentence on what brought you to rural STEM and this road trip]. You’ll see my voice
                in the field notes, interviews, and reflections as the summer unfolds.
              </p>
            </div>

            <figure className="order-1 md:order-2 w-full max-w-sm mx-auto md:mx-0">
              <div className="relative rounded-2xl border-2 border-sage-200/90 shadow-md overflow-hidden bg-earth-100 aspect-[3/4]">
                {/* Add your headshot: save as public/images/researcher.jpg (same path Vite uses as /images/researcher.jpg) */}
                <img
                  src="/images/researcher.jpg"
                  alt="Portrait of the project researcher"
                  className="w-full h-full object-cover"
                />
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* 3. Project aspirations */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <h2 className="font-display text-2xl sm:text-3xl text-earth-900 flex flex-wrap items-center gap-2.5 mb-6">
          <span className="text-sage-600" aria-hidden>
            <IconHills className="h-7 w-7 sm:h-8 sm:w-8" />
          </span>
          Project aspirations
        </h2>
        <div className="space-y-4 text-base sm:text-lg text-earth-800 leading-relaxed">
          <p>
            I hope the site can be a useful slice of the summer: clear enough for policy readers,
            human enough for anyone who’s lived a version of this, and open enough that new interviews
            and reflections can be added as we go.
          </p>
          <p className="flex flex-wrap items-start gap-2">
            <span className="text-sage-600 mt-0.5" aria-hidden>
              <IconBarn className="h-5 w-5 sm:h-6 sm:w-6" />
            </span>
            <span>
              In the end, I want to return with not just a folder of recordings but a fair accounting of
              what I heard—especially from students who are still deciding who they can become.
            </span>
          </p>
        </div>
        <IconBarnRow className="mt-8" />
      </section>

      {/* 4. Map */}
      <section className="bg-sage-100/50 border-t border-sage-300/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="section-title">Interview sites</h2>
            <p className="text-earth-700 text-lg max-w-2xl mx-auto">
              Click a pin to explore updates in each town.
            </p>
          </div>
          <div className="w-full">
            <div className="card border-sage-400/50 bg-gradient-to-b from-sage-50 to-earth-100/40 p-2 sm:p-4">
              <USMap />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-earth-900 text-white py-14 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl sm:text-3xl mb-3">Follow the trip</h2>
          <p className="text-sage-200/95 mb-8 max-w-xl mx-auto">
            The same short-form and vlog content as on the Vlog page—wherever you post first.
          </p>
          <SocialLinks size="large" />
        </div>
      </section>
    </>
  )
}
