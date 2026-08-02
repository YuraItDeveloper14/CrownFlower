import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import SectionHeader from '../components/SectionHeader'
import ProductGrid from '../components/ProductGrid'
import Craft from '../components/Craft'
import Lookbook from '../components/Lookbook'
import Testimonials from '../components/Testimonials'
import Newsletter from '../components/Newsletter'
import PageTransition from '../components/PageTransition'
import { products } from '../data/products'

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <Marquee />

      {/* Featured */}
      <section className="relative px-5 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title="This season's favorites"
            subtitle="A taste of the collection. Tap any cap to spin it around or see the details."
          />
          <div className="mt-14">
            <ProductGrid products={products.slice(0, 3)} />
          </div>
          <div className="mt-12 text-center">
            <Link to="/shop" className="btn-ghost">
              View all caps <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Craft />
      <Lookbook />
      <Testimonials />
      <Newsletter />
    </PageTransition>
  )
}
