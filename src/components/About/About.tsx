import { motion } from 'framer-motion'
import { slideInLeft, fadeUp, staggerContainer, viewportOnce } from '@/hooks/animations'
import styles from './About.module.css'

const SERVICES = [
  {
    name: 'Narrative Film',
    desc: 'Features, shorts & documentary storytelling',
    accent: 'var(--mint)',
  },
  {
    name: 'Education',
    desc: 'School & university film productions',
    accent: 'var(--violet)',
  },
  {
    name: 'Corporate',
    desc: 'Brand films & internal content',
    accent: 'var(--coral)',
  },
]

export function About() {
  return (
    <section
      id="about"
      className={`${styles.about} section`}
      aria-labelledby="about-heading"
    >
      <div className="container">
        <div className={styles.header}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <p className={styles.num}>01 — About</p>
            <h2 id="about-heading" className={styles.title}>The Director</h2>
            <p className={styles.sub}>A life spent behind the lens</p>
          </motion.div>
        </div>

        <div className={styles.grid}>
          {/* Portrait */}
          <motion.div
            className={styles.visual}
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className={styles.imageFrame}>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJMx7WSe1czuW_r8Jjv2PjVXTCVqCzPIGQEK-EkhCyNII0pbAJ1tRf-yBi9moxctbJevME-CjEiXzwlzOrFlxXUB_X_wbUSHD4rTKXg0gteR0mFjk2mgWX66eCJ6ljnE3_7ws0EPs8YwHSKRhiokNwR3h80l9LFMtEnEF-j2-Cbe9RcoHpAPZLEb5AmDDpTWCbIv7EHMxATRlZ5Avipy0uJtO7v_GOvUCFIxLkL0-xdmbohblD10SwU44FQhdU0btVfbl05j_OxE7C"
                alt="Daniel, film director — dramatic portrait with side lighting"
                className={styles.image}
                loading="lazy"
              />
              <div className={styles.imageAccent} aria-hidden="true" />
              <div className={styles.imageBottomLine} aria-hidden="true" />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            className={styles.text}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.div className={styles.accentLine} variants={fadeUp} aria-hidden="true" />

            <motion.p className={styles.bio} variants={fadeUp}>
              Daniel is a <strong>narrative film director</strong> with
              over a decade of experience turning complex human stories into visceral
              cinematic experiences. His work spans independent features, short films,
              and commissioned productions.
            </motion.p>

            <motion.p className={styles.bio} variants={fadeUp}>
              Beyond his own projects, Alexandre works closely with{' '}
              <strong>schools, universities, and companies</strong> — guiding emerging
              storytellers through every stage of production, from concept to colour grade.
            </motion.p>

            <motion.p className={styles.bio} variants={fadeUp}>
              His approach is rooted in <strong>visual precision and emotional truth</strong>.
              Every frame is a decision. Every cut, a consequence.
            </motion.p>

            {/* Services */}
            <motion.div className={styles.services} variants={fadeUp} role="list">
              {SERVICES.map(s => (
                <div key={s.name} className={styles.service} role="listitem">
                  <div
                    className={styles.serviceAccent}
                    style={{ background: s.accent }}
                    aria-hidden="true"
                  />
                  <p className={styles.serviceName}>{s.name}</p>
                  <p className={styles.serviceDesc}>{s.desc}</p>
                </div>
              ))}
            </motion.div>

            {/* Press kit */}
            <motion.div variants={fadeUp}>
              <a
                href="/press-kit.pdf"
                className={styles.pressKit}
                download
                aria-label="Download press kit PDF"
              >
                ↓ Download Press Kit
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
