import { Link } from 'react-router-dom'

export default function About() {
  return (
    <>
      <section className="bg-gradient-to-b from-earth-100 to-sage-50 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="badge-earth mb-4 inline-block">The Project</span>
          <h1 className="section-title text-4xl sm:text-5xl mb-6">
            Why Access Alone Isn't Enough
          </h1>
          <p className="text-lg text-earth-600 leading-relaxed">
            A research project exploring the persistent STEM gap in rural America —
            and the stories behind the statistics.
          </p>
        </div>
      </section>

      <div className="page-container">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* The Problem */}
          <section>
            <h2 className="font-display text-2xl text-earth-900 mb-4">The Problem</h2>
            <div className="prose prose-lg text-earth-700 space-y-4">
              <p>
                Over the past decade, significant investment has gone into expanding
                internet access and university enrollment opportunities for students
                in rural areas. On paper, the digital divide is closing. But the data
                tells a different story.
              </p>
              <p>
                Rural high school students still pursue college degrees and careers
                in STEM fields at significantly lower rates than their urban and
                suburban counterparts. Access to information isn't translating into
                aspiration, and aspiration isn't translating into action.
              </p>
              <p>
                The question isn't just <em>"Can rural students access STEM?"</em> —
                it's <em>"Do they see themselves in it?"</em>
              </p>
            </div>
          </section>

          {/* The Approach */}
          <section>
            <h2 className="font-display text-2xl text-earth-900 mb-4">The Approach</h2>
            <div className="prose prose-lg text-earth-700 space-y-4">
              <p>
                This summer, I'm driving across the United States visiting rural high
                schools to understand this gap firsthand. At each stop, I'm sitting
                down with:
              </p>
              <ul className="space-y-3 list-none pl-0">
                <li className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-sage-700 text-sm font-bold">1</span>
                  </span>
                  <span><strong>Students</strong> — to hear about their experiences, interests, and what they envision for their futures</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-sage-700 text-sm font-bold">2</span>
                  </span>
                  <span><strong>Teachers</strong> — to learn about the challenges they face delivering STEM education with limited resources</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-sage-700 text-sm font-bold">3</span>
                  </span>
                  <span><strong>Administrators and community members</strong> — to understand the systemic factors at play</span>
                </li>
              </ul>
              <p>
                Through interviews, observations, and conversations, this project aims to
                surface the human stories behind the statistics — and point toward what
                might actually make a difference.
              </p>
            </div>
          </section>

          {/* What You'll Find Here */}
          <section>
            <h2 className="font-display text-2xl text-earth-900 mb-4">What You'll Find Here</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/shorts" className="card card-body group">
                <h3 className="font-display text-lg text-earth-900 group-hover:text-sage-700 transition-colors">
                  Road Updates
                </h3>
                <p className="text-sm text-earth-500 mt-1">
                  Quick dispatches and observations from the road
                </p>
              </Link>
              <Link to="/vlogs" className="card card-body group">
                <h3 className="font-display text-lg text-earth-900 group-hover:text-sage-700 transition-colors">
                  Vlogs & Reflections
                </h3>
                <p className="text-sm text-earth-500 mt-1">
                  Video diaries and written reflections from each stop
                </p>
              </Link>
              <Link to="/interviews" className="card card-body group">
                <h3 className="font-display text-lg text-earth-900 group-hover:text-sage-700 transition-colors">
                  Interviews
                </h3>
                <p className="text-sm text-earth-500 mt-1">
                  In-depth conversations with students, teachers, and community members
                </p>
              </Link>
              <Link to="/documentary" className="card card-body group">
                <h3 className="font-display text-lg text-earth-900 group-hover:text-sage-700 transition-colors">
                  Documentary
                </h3>
                <p className="text-sm text-earth-500 mt-1">
                  The full-length film compiling the summer's findings
                </p>
              </Link>
            </div>
          </section>

          {/* About Me */}
          <section className="bg-sage-50 rounded-2xl p-8 border border-sage-100">
            <h2 className="font-display text-2xl text-earth-900 mb-4">About the Researcher</h2>
            <div className="prose text-earth-700 space-y-4">
              <p>
                {/* Replace this with your own bio! */}
                I'm a college student studying [your major] at [your university].
                This project grew out of a class on [class name], where I first
                encountered the research showing that expanding access doesn't
                automatically close the STEM participation gap in rural communities.
              </p>
              <p>
                I wanted to go beyond the data and hear directly from the people
                living this reality. So I'm spending my summer on the road,
                listening and learning.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
