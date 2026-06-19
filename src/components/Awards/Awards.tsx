import { AWARDS } from '@/data'
import styles from './Awards.module.css'

export function Awards() {
  const doubled = [...AWARDS, ...AWARDS]

  return (
    <section className={styles.awards} aria-label="Awards and recognition">
      <span className={styles.label} aria-hidden="true">Recognition</span>

      <div className={styles.marqueeWrap} aria-hidden="true">
        <ul className={styles.marquee} role="list">
          {doubled.map((award, i) => (
            <li key={`${award.id}-${i}`} className={styles.item} role="listitem">
              <span className={styles.badge}>{award.name}</span>
              <span className={styles.sep} aria-hidden="true">·</span>
              <span className={styles.festival}>{award.festival}</span>
              <span className={styles.year}>{award.year}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Accessible version for screen readers */}
      <ul className="sr-only" role="list">
        {AWARDS.map(award => (
          <li key={award.id}>
            {award.name} — {award.festival} {award.year}
          </li>
        ))}
      </ul>
    </section>
  )
}
