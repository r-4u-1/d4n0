import { motion } from 'framer-motion'
import { AWARDS } from '@/data'
import { staggerContainer, fadeIn, viewportOnce } from '@/hooks/animations'
import styles from './Awards.module.css'

export function Awards() {
  return (
    <section
      className={styles.awards}
      aria-label="Awards and recognition"
    >
      <span className={styles.label}>Recognition</span>
      <motion.ul
        className={styles.list}
        role="list"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {AWARDS.map(award => (
          <motion.li key={award.id} className={styles.item} variants={fadeIn}>
            <span className={styles.badge}>{award.name}</span>
            <span className={styles.festival}>{award.festival}</span>
            <span className={styles.year}>{award.year}</span>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}
