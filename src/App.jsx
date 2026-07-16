import { useState } from 'react'
import { SegmentProvider } from './segment.jsx'
import Preloader from './components/Preloader.jsx'
import SignalLine from './components/SignalLine.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Metrics from './components/Metrics.jsx'
import Services from './components/Services.jsx'
import Process from './components/Process.jsx'
import Band from './components/Band.jsx'
import SpeedTest from './components/SpeedTest.jsx'
import Coverage from './components/Coverage.jsx'
import Plans from './components/Plans.jsx'
import Versus from './components/Versus.jsx'
import Testimonials from './components/Testimonials.jsx'
import Faq from './components/Faq.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx'

export default function App() {
  // El preloader corre una vez por sesión y nunca con movimiento reducido
  const [intro] = useState(
    () =>
      !sessionStorage.getItem('vc-intro') &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [ready, setReady] = useState(!intro)

  return (
    <SegmentProvider>
      {intro && <Preloader onReveal={() => setReady(true)} />}

      {ready && (
        <>
          <SignalLine />
          <Navbar />
          <main>
            <Hero />
            <Metrics />
            <Services />
            <Process />
            <Band />
            <SpeedTest />
            <Coverage />
            <Plans />
            <Versus />
            <Testimonials />
            <Faq />
            <Contact />
          </main>
          <Footer />
          <FloatingWhatsApp />
        </>
      )}
    </SegmentProvider>
  )
}
