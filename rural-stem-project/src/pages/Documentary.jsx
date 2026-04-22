import YouTubeEmbed from '../components/YouTubeEmbed'

export default function Documentary() {
  const documentaryYoutubeId = ''

  return (
    <>
      <section className="bg-gradient-to-b from-earth-900 to-earth-800 text-white py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-rust-600/20 text-rust-300 mb-4">
            The Film
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl mb-6">
            STEM on the Road
          </h1>
          <p className="text-lg text-earth-300 leading-relaxed">
            The full documentary compiling a summer's worth of conversations,
            observations, and discoveries about STEM education in rural America.
          </p>
        </div>
      </section>

      <div className="page-container">
        <div className="max-w-4xl mx-auto">
          {/* Main Video */}
          <div className="mb-12">
            <YouTubeEmbed youtubeId={documentaryYoutubeId} title="STEM on the Road Documentary" />
          </div>

          {/* Description */}
          <div className="max-w-3xl mx-auto space-y-8">
            <section>
              <h2 className="font-display text-2xl text-earth-900 mb-4">About the Documentary</h2>
              <div className="text-earth-700 leading-relaxed space-y-4">
                <p>
                  Over the course of one summer, we visited rural high schools across
                  America to understand a paradox: why, even as access to technology
                  and higher education expands, rural students still don't pursue
                  STEM at the same rate as their urban and suburban peers.
                </p>
                <p>
                  This documentary weaves together the voices of students who dream
                  of more, teachers who give everything they have, and communities
                  caught between tradition and transformation. It's a story about
                  the gap between opportunity and aspiration — and what it might
                  take to close it.
                </p>
              </div>
            </section>

            {/* Key Themes */}
            <section>
              <h2 className="font-display text-2xl text-earth-900 mb-6">Key Themes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="card card-body">
                  <div className="w-10 h-10 rounded-xl bg-sage-100 flex items-center justify-center mb-3">
                    <span className="text-sage-700 text-lg">🌐</span>
                  </div>
                  <h3 className="font-display text-lg text-earth-900 mb-1">The Access Paradox</h3>
                  <p className="text-sm text-earth-600">Why connectivity alone doesn't translate to STEM engagement</p>
                </div>
                <div className="card card-body">
                  <div className="w-10 h-10 rounded-xl bg-rust-100 flex items-center justify-center mb-3">
                    <span className="text-rust-700 text-lg">👤</span>
                  </div>
                  <h3 className="font-display text-lg text-earth-900 mb-1">Representation</h3>
                  <p className="text-sm text-earth-600">Students can't aspire to what they've never seen</p>
                </div>
                <div className="card card-body">
                  <div className="w-10 h-10 rounded-xl bg-earth-100 flex items-center justify-center mb-3">
                    <span className="text-earth-700 text-lg">🏫</span>
                  </div>
                  <h3 className="font-display text-lg text-earth-900 mb-1">Resource Gaps</h3>
                  <p className="text-sm text-earth-600">One teacher, four subjects, zero lab equipment</p>
                </div>
                <div className="card card-body">
                  <div className="w-10 h-10 rounded-xl bg-sage-100 flex items-center justify-center mb-3">
                    <span className="text-sage-700 text-lg">💡</span>
                  </div>
                  <h3 className="font-display text-lg text-earth-900 mb-1">What Could Work</h3>
                  <p className="text-sm text-earth-600">Mentorship, partnerships, and building STEM culture</p>
                </div>
              </div>
            </section>

            {/* Credits placeholder */}
            <section className="bg-sage-50 rounded-2xl p-8 border border-sage-100 text-center">
              <h2 className="font-display text-2xl text-earth-900 mb-3">Credits</h2>
              <p className="text-earth-600">
                {/* Replace with your actual credits */}
                Directed, filmed, and edited by [Your Name].<br />
                A project for [Class Name] at [University Name].<br />
                Summer 2026.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
