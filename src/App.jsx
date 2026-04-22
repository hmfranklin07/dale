import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import StatePage from './pages/StatePage'
import Vlog from './pages/Vlog'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vlog" element={<Vlog />} />
          <Route path="/:stateSlug" element={<StatePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
