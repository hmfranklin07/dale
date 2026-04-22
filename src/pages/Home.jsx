import { Link } from 'react-router-dom'
import USMap from '../components/USMap'
import towns from '../data/towns.json'

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-sage-100 to-sage-50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            <span className="badge-rust mb-4 inline-block">Summer 2026</span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-earth-900 mb-6 leading-tight">
              STEM on the Road
            </h1>
            <p className="text-lg sm:text-xl text-earth-600 leading-relaxed mb-8">
              Even when access expands, rural students still don't pursue STEM
              at the same rate as their urban and suburban peers. This summer,
              we're driving across America to find out why — visiting rural
              high schools, talking to teachers and students, and documenting
              what we discover.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/about"
                className="inline-flex items-center px-6 py-3 bg-rust-600 text-white rounded-xl font-medium hover:bg-rust-700 transition-colors shadow-sm"
              >
                Learn More
                <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                to="/documentary"
                className="inline-flex items-center px-6 py-3 bg-white text-earth-700 rounded-xl font-medium hover:bg-sage-50 transition-colors border border-sage-200 shadow-sm"
              >
                Watch the Documentary
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sage-400 to-transparent" />
        </div>
      </section>

      {/* Interactive Map */}
      <section className="page-container">
        <div className="text-center mb-8">
          <h2 className="section-title">Where I'm Going</h2>
          <p className="section-subtitle">
            Click a pin to explore what we found in each community
          </p>
        </div>

        <div className="card p-4 sm:p-6">
          <USMap />
        </div>

        {/* Town List (below map for mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {towns.map((town) => (
            <Link
              key={town.slug}
              to={`/towns/${town.slug}`}
              className="card card-body group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-lg text-earth-900 group-hover:text-sage-700 transition-colors">
                    {town.name}, {town.state}
                  </h3>
                  <p className="text-sm text-earth-500 mt-1 line-clamp-2">{town.summary}</p>
                </div>
                <svg className="w-5 h-5 text-earth-300 group-hover:text-sage-600 transition-colors shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-earth-900 text-white py-16 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="font-display text-4xl text-rust-400 mb-2">{towns.length}</div>
              <div className="text-earth-300 text-sm">Towns Visited</div>
            </div>
            <div>
              <div className="font-display text-4xl text-rust-400 mb-2">10k+</div>
              <div className="text-earth-300 text-sm">Miles Driven</div>
            </div>
            <div>
              <div className="font-display text-4xl text-rust-400 mb-2">50+</div>
              <div className="text-earth-300 text-sm">People Interviewed</div>
            </div>
            <div>
              <div className="font-display text-4xl text-rust-400 mb-2">1</div>
              <div className="text-earth-300 text-sm">Documentary</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
