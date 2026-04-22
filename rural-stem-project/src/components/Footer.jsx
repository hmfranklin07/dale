import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-earth-900 text-earth-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🔬</span>
              <span className="font-display text-xl text-white">STEM on the Road</span>
            </div>
            <p className="text-sm leading-relaxed">
              Driving across rural America to understand why STEM dreams
              fade where highways end. A summer research project exploring
              the gap between access and aspiration.
            </p>
          </div>

          <div>
            <h4 className="font-display text-white text-lg mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">The Project</Link></li>
              <li><Link to="/shorts" className="hover:text-white transition-colors">Road Updates</Link></li>
              <li><Link to="/vlogs" className="hover:text-white transition-colors">Vlogs & Reflections</Link></li>
              <li><Link to="/interviews" className="hover:text-white transition-colors">Interviews</Link></li>
              <li><Link to="/documentary" className="hover:text-white transition-colors">Documentary</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-white text-lg mb-4">About This Project</h4>
            <p className="text-sm leading-relaxed">
              This site documents a summer 2026 road trip research project.
              All interviews and content were gathered with consent from
              participants across rural communities in the United States.
            </p>
          </div>
        </div>

        <div className="border-t border-earth-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} STEM on the Road. Built for education, not profit.</p>
        </div>
      </div>
    </footer>
  )
}
