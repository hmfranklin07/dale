import { Link } from 'react-router-dom'
import USMap from '../components/USMap'
import SocialLinks from '../components/SocialLinks'
import states from '../data/states.json'

export default function Home() {
  return (
    <>
      <section className="relative bg-gradient-to-b from-sage-100 to-sage-50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-3xl">
            <span className="badge-rust mb-4 inline-block">Summer 2026</span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-earth-900 mb-6 leading-tight">
              STEM on the Road
            </h1>
            <p className="text-lg sm:text-xl text-earth-600 leading-relaxed">
              A summer of stops across five states: short interviews, long conversations, and what it
              actually feels like in rural high schools that rarely make the news.
            </p>
            <div className="flex flex-wrap gap-2 mt-8">
              {states.map((s) => (
                <Link
                  key={s.slug}
                  to={`/${s.slug}`}
                  className="inline-flex items-center px-3 py-1.5 bg-white/90 text-earth-800 rounded-lg text-sm font-medium border border-sage-200 hover:border-sage-400 transition-colors"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sage-400 to-transparent" />
        </div>
      </section>

      {/* Interactive map */}
      <section className="page-container">
        <div className="text-center mb-8">
          <h2 className="section-title">Interactive U.S. map</h2>
          <p className="section-subtitle">
            Each pin opens the Illinois, Nebraska, Idaho, Arkansas, or Florida page—field notes, written
            interviews, and reflections for that state.
          </p>
        </div>

        <div className="card p-4 sm:p-6">
          <USMap />
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
        <div>
          <h2 className="font-display text-2xl text-earth-900 mb-4">Project statement</h2>
          <div className="prose prose-lg text-earth-700 space-y-4">
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

        <div>
          <h2 className="font-display text-2xl text-earth-900 mb-4">Project inspiration</h2>
          <div className="prose prose-lg text-earth-700 space-y-4">
            <p>
              The project grew out of class readings and data that don’t line up with how generous and
              curious so many small-town students are. On paper, access to information keeps improving;
              in person, the gap in who sees themselves in STEM is still there. I wanted to leave the
              paper behind and go listen.
            </p>
            <p>
              I’m also inspired by teachers doing multiple jobs at once—one person covering every
              science class, writing grants, and still showing up for kids after the bell. Their stories
              are at the center of the trip.
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl text-earth-900 mb-4">Project aspirations</h2>
          <div className="prose prose-lg text-earth-700 space-y-4">
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

      <section className="bg-earth-900 text-white py-14 sm:py-16 mt-4">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl sm:text-3xl mb-3">Follow the trip</h2>
          <p className="text-earth-300 mb-8 max-w-xl mx-auto">
            The same short-form and vlog content as on the Vlog page—wherever you post first.
          </p>
          <SocialLinks size="large" />
        </div>
      </section>
    </>
  )
}
