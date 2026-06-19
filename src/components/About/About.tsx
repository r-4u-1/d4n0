import { motion } from 'framer-motion'
import { slideInLeft, fadeUp, staggerContainer, viewportOnce } from '@/hooks/animations'
import styles from './About.module.css'

const SERVICES = [
  { name: 'Narrative Film', desc: 'Features, shorts & documentary storytelling', accent: 'var(--mint)' },
  { name: 'Education',      desc: 'School & university film productions',          accent: 'var(--violet)' },
  { name: 'Corporate',      desc: 'Brand films & internal content',               accent: 'var(--coral)' },
]

const STATS = [
  { value: '14+', label: 'Years Active' },
  { value: '8',   label: 'Features' },
  { value: '3',   label: 'Countries' },
  { value: '5+',  label: 'Awards Won' },
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

        {/* Stats row */}
        <motion.div
          className={styles.stats}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          aria-label="Career statistics"
        >
          {STATS.map(stat => (
            <motion.div key={stat.label} className={styles.stat} variants={fadeUp}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

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
                src="/d4n0.png"
                alt="Daniel, film director — dramatic portrait with side lighting"
                className={styles.image}
                loading="lazy"
              />
              <div className={styles.imageAccent} aria-hidden="true" />
              <div className={styles.imageGradient} aria-hidden="true" />
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
              Beyond his own projects, Dano works closely with{' '}
              <strong>schools, universities, and companies</strong> — guiding emerging
              storytellers through every stage of production, from concept to colour grade.
            </motion.p>

            <motion.p className={styles.bio} variants={fadeUp}>
              His approach is rooted in <strong>visual precision and emotional truth</strong>.
              Every frame is a decision. Every cut, a consequence.
            </motion.p>

            <motion.div className={styles.services} variants={fadeUp} role="list">
              {SERVICES.map(s => (
                <div key={s.name} className={styles.service} role="listitem">
                  <div className={styles.serviceAccent} style={{ background: s.accent }} aria-hidden="true" />
                  <p className={styles.serviceName}>{s.name}</p>
                  <p className={styles.serviceDesc}>{s.desc}</p>
                </div>
              ))}
            </motion.div>

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
