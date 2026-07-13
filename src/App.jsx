import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import SiteBackgroundUnderlay from './components/SiteBackgroundUnderlay'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import MorePage from './pages/MorePage'
import StatePage from './pages/StatePage'
import StateVideos from './pages/StateVideos'
import StateVideo from './pages/StateVideo'
import StateTranscriptions from './pages/StateTranscriptions'
import StateTranscription from './pages/StateTranscription'
import StatePhotoHeroCache from './components/StatePhotoHeroCache'

export default function App() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <StatePhotoHeroCache />
      <ScrollToTop />
      <SiteBackgroundUnderlay />
      <Navbar />
      <main className="relative z-10 flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/more" element={<MorePage />} />
          <Route path="/blog/*" element={<Navigate to="/" replace />} />
          <Route path="/vlog" element={<Navigate to="/" replace />} />
          <Route path="/:stateSlug/videos/:videoId" element={<StateVideo />} />
          <Route path="/:stateSlug/videos" element={<StateVideos />} />
          <Route path="/:stateSlug/transcriptions/:interviewId" element={<StateTranscription />} />
          <Route path="/:stateSlug/transcriptions" element={<StateTranscriptions />} />
          <Route path="/:stateSlug/reflections" element={<Navigate to=".." replace relative="path" />} />
          <Route path="/:stateSlug" element={<StatePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
