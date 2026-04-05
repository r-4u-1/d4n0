import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { NAV_LINKS } from '@/data'
import styles from './Nav.module.css'

const SECTION_IDS = ['hero', 'about', 'projects', 'gallery', 'contact']

export function Nav() {
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const activeId = useScrollSpy(SECTION_IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#hero"
          className={styles.logo}
          onClick={e => { e.preventDefault(); handleNavClick('#hero') }}
          aria-label="DANO · B - back to top"
        >
          DANO · B
        </a>

        {/* Desktop links */}
        <ul className={styles.links} role="list">
          {NAV_LINKS.map(link => {
            const id = link.href.replace('#', '')
            const isActive = activeId === id
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`${styles.link} ${isActive ? styles.linkActive : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={e => { e.preventDefault(); handleNavClick(link.href) }}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      className={styles.linkUnderline}
                      layoutId="nav-underline"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Right controls */}
        <div className={styles.right}>
          <button
            className={styles.themeBtn}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☀ Light' : '☾ Dark'}
          </button>
          <a
            href="#contact"
            className={styles.cta}
            onClick={e => { e.preventDefault(); handleNavClick('#contact') }}
          >
            Let's Work →
          </a>

          {/* Hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(prev => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={`${styles.hamburgerLine} ${menuOpen ? styles.hamburgerOpen1 : ''}`} />
            <span className={`${styles.hamburgerLine} ${menuOpen ? styles.hamburgerOpen2 : ''}`} />
            <span className={`${styles.hamburgerLine} ${menuOpen ? styles.hamburgerOpen3 : ''}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className={styles.mobileMenu}
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <ul className={styles.mobileLinks} role="list">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 + 0.2 }}
                >
                  <a
                    href={link.href}
                    className={styles.mobileLink}
                    onClick={e => { e.preventDefault(); handleNavClick(link.href) }}
                  >
                    <span className={styles.mobileLinkNum}>0{i + 1}</span>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className={styles.mobileFooter}>
              <button
                className={styles.themeBtn}
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? '☀ Light mode' : '☾ Dark mode'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
