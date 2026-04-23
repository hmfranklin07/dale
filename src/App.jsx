import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import StatePage from './pages/StatePage'
import Blog from './pages/Blog'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/vlog" element={<Navigate to="/blog" replace />} />
          <Route path="/:stateSlug" element={<StatePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
