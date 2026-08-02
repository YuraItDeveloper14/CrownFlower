import { Routes, Route } from 'react-router-dom'
import Background from './components/Background'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import InstallApp from './components/InstallApp'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import LookbookPage from './pages/LookbookPage'
import About from './pages/About'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
import Wishlist from './pages/Wishlist'
import Faq from './pages/Faq'
import Legal from './pages/Legal'

export default function App() {
  return (
    <div className="relative min-h-screen">
      <Background />
      <ScrollToTop />
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/lookbook" element={<LookbookPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <InstallApp />
      <Footer />
    </div>
  )
}
