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
      <div className="container">
        <motion.div
          className={styles.top}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div>
            <p className={styles.logo}>Daniel</p>
            <p className={styles.tagline}>"Stories that move. Worlds that breathe."</p>
          </div>

          <div className={styles.cols}>
            <div className={styles.col}>
              <p className={styles.colTitle}>Navigate</p>
              <nav aria-label="Footer navigation">
                {NAV_LINKS.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={styles.colItem}
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
                <span key={item} className={styles.colItem}>{item}</span>
              ))}
            </div>
          </div>
        </motion.div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} Daniel · Stockholm · All rights reserved
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
                aria-label={`Visit ${s.name} profile (opens in new context)`}
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
