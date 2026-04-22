import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Town from './pages/Town'
import Shorts from './pages/Shorts'
import Vlogs from './pages/Vlogs'
import Interviews from './pages/Interviews'
import Documentary from './pages/Documentary'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/towns/:slug" element={<Town />} />
          <Route path="/shorts" element={<Shorts />} />
          <Route path="/vlogs" element={<Vlogs />} />
          <Route path="/interviews" element={<Interviews />} />
          <Route path="/documentary" element={<Documentary />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
