import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import SiteWindingPath from './components/SiteWindingPath'
import Home from './pages/Home'
import StatePage from './pages/StatePage'
import StateVideos from './pages/StateVideos'
import StateTranscriptions from './pages/StateTranscriptions'
import StateReflections from './pages/StateReflections'
import Blog from './pages/Blog'
import BlogPosts from './pages/BlogPosts'
import BlogVideos from './pages/BlogVideos'
import BlogPost from './pages/BlogPost'
import BlogStateHub from './pages/BlogStateHub'

export default function App() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <ScrollToTop />
      <SiteWindingPath />
      <Navbar />
      <main className="relative z-10 flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/posts" element={<BlogPosts />} />
          <Route path="/blog/videos" element={<BlogVideos />} />
          <Route path="/blog/post/:postId" element={<BlogPost />} />
          <Route path="/blog/state/:stateSlug" element={<BlogStateHub />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/vlog" element={<Navigate to="/blog" replace />} />
          <Route path="/:stateSlug/videos" element={<StateVideos />} />
          <Route path="/:stateSlug/transcriptions" element={<StateTranscriptions />} />
          <Route path="/:stateSlug/reflections" element={<StateReflections />} />
          <Route path="/:stateSlug" element={<StatePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
