import { ThemeProvider } from '@/context/ThemeContext'
import { Nav } from '@/components/Nav/Nav'
import { Hero } from '@/components/Hero/Hero'
import { Showreel } from '@/components/Showreel/Showreel'
import { Awards } from '@/components/Awards/Awards'
import { About } from '@/components/About/About'
import { Projects } from '@/components/Projects/Projects'
import { Gallery } from '@/components/Gallery/Gallery'
import { Contact } from '@/components/Contact/Contact'
import { Footer } from '@/components/Footer/Footer'
import '@/styles/globals.css'

export function App() {
  return (
    <ThemeProvider>
      {/* Skip to main content for a11y */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Nav />

      <main id="main-content">
        <Hero />
        <Showreel />
        <Awards />
        <div className="divider" />
        <About />
        <div className="divider" />
        <Projects />
        <div className="divider" />
        <Gallery />
        <div className="divider" />
        <Contact />
      </main>

      <Footer />
    </ThemeProvider>
  )
}
