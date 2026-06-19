import { motion } from 'framer-motion'
import { NAV_LINKS } from '@/data'
import { fadeUp, viewportOnce } from '@/hooks/animations'
import styles from './Footer.module.css'

export function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className={styles.footer} role="contentinfo">
      {/* Big cinematic name */}
      <div className={styles.bigName} aria-hidden="true">
        <span className={styles.bigNameText}>DANO</span>
        <span className={styles.bigNameDot}>·</span>
        <span className={styles.bigNameB}>B</span>
      </div>

      <div className="container">
        <motion.div
          className={styles.inner}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className={styles.left}>
            <p className={styles.tagline}>
              "Stories that move. Worlds that breathe."
            </p>
            <p className={styles.location}>Stockholm, Sweden · Available worldwide</p>
          </div>

          <div className={styles.cols}>
            <div className={styles.col}>
              <p className={styles.colTitle}>Navigate</p>
              <nav aria-label="Footer navigation">
                {NAV_LINKS.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={styles.colLink}
                    onClick={e => { e.preventDefault(); scrollTo(link.href) }}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
            <div className={styles.col}>
              <p className={styles.colTitle}>Work</p>
              {['Narrative Film', 'School Docs', 'Corporate', 'Press Kit'].map(item => (
                <span key={item} className={styles.colLink}>{item}</span>
              ))}
            </div>
            <div className={styles.col}>
              <p className={styles.colTitle}>Connect</p>
              {[
                { name: 'Instagram', href: '#' },
                { name: 'Vimeo', href: '#' },
                { name: 'IMDb', href: '#' },
                { name: 'LinkedIn', href: '#' },
              ].map(s => (
                <a
                  key={s.name}
                  href={s.href}
                  className={styles.colLink}
                  aria-label={`Visit ${s.name} profile`}
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} Dano B · Stockholm · All rights reserved
          </p>
          <nav className={styles.social} aria-label="Social media links">
            {[
              { name: 'Instagram', href: '#' },
              { name: 'Vimeo', href: '#' },
              { name: 'IMDb', href: '#' },
            ].map(s => (
              <a
                key={s.name}
                href={s.href}
                className={styles.socialLink}
                aria-label={`Visit ${s.name}`}
              >
                {s.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
