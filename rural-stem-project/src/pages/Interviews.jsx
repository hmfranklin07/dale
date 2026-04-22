import { Link } from 'react-router-dom'
import interviews from '../data/interviews.json'
import towns from '../data/towns.json'

const townMap = Object.fromEntries(towns.map((t) => [t.slug, t]))
const sortedInterviews = [...interviews].sort((a, b) => new Date(b.date) - new Date(a.date))

export default function Interviews() {
  return (
    <>
      <section className="bg-gradient-to-b from-rust-50 to-sage-50 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="badge-rust mb-4 inline-block">Conversations</span>
          <h1 className="section-title text-4xl sm:text-5xl mb-4">Interviews</h1>
          <p className="text-lg text-earth-600">
            In-depth conversations with the students, teachers, and community
            members who are living this reality every day.
          </p>
        </div>
      </section>

      <div className="page-container">
        <div className="max-w-3xl mx-auto">
          {sortedInterviews.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4 opacity-30">🎙️</div>
              <h3 className="font-display text-xl text-earth-900 mb-2">No Interviews Yet</h3>
              <p className="text-earth-500">Interviews will be published as the trip progresses.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {sortedInterviews.map((interview) => {
                const town = townMap[interview.townSlug]
                return (
                  <article key={interview.id} className="card card-body">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                      <div>
                        <h2 className="font-display text-2xl text-earth-900">{interview.personName}</h2>
                        <p className="text-earth-500">{interview.role}</p>
                        <p className="text-earth-400 text-sm">{interview.school}</p>
                      </div>
                      <div className="text-right">
                        {town && (
                          <Link to={`/towns/${town.slug}`} className="badge-sage hover:bg-sage-200 transition-colors">
                            {town.name}, {town.state}
                          </Link>
                        )}
                        <time className="block text-xs text-earth-400 mt-2">
                          {new Date(interview.date + 'T00:00:00').toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </time>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {interview.questions.map((qa, idx) => (
                        <div key={idx}>
                          <p className="text-sm font-semibold text-sage-700 mb-2">
                            Q: {qa.q}
                          </p>
                          <blockquote className="text-earth-700 leading-relaxed pl-4 border-l-2 border-sage-200 italic">
                            "{qa.a}"
                          </blockquote>
                        </div>
                      ))}
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
