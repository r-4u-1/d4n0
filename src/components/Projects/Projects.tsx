import { motion } from 'framer-motion'
import { PROJECTS } from '@/data'
import { fadeUp, staggerContainer, viewportOnce } from '@/hooks/animations'
import styles from './Projects.module.css'

export function Projects() {
  return (
    <section
      id="projects"
      className={`${styles.projects} section section--alt`}
      aria-labelledby="projects-heading"
    >
      <div className="container">
        <div className={styles.header}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <p className={styles.num}>02 — Projects</p>
            <h2 id="projects-heading" className={styles.title}>Selected Work</h2>
            <p className={styles.sub}>2019 — 2024</p>
          </motion.div>
        </div>

        <motion.ul
          className={styles.list}
          role="list"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {PROJECTS.map((project, i) => (
            <motion.li
              key={project.id}
              className={styles.item}
              role="listitem"
              variants={fadeUp}
            >
              <article
                className={styles.article}
                aria-label={`Project: ${project.title}`}
              >
                {/* Unified image — card thumb on mobile, hover reveal on desktop */}
                <div className={styles.thumb}>
                  <motion.img
                    src={project.image}
                    alt={project.imageAlt}
                    className={styles.img}
                    loading="lazy"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <div className={styles.thumbOverlay} aria-hidden="true">
                    <p className={styles.overlayCat} style={{ color: project.color }}>
                      {project.category}
                    </p>
                  </div>
                </div>

                {/* Body — row on desktop, card info on mobile */}
                <div className={styles.body}>
                  <span className={styles.rowNum} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className={styles.titleGroup}>
                    <h3 className={styles.cardTitle}>{project.title}</h3>
                    <p className={styles.role}>{project.role}</p>
                  </div>

                  <div className={styles.meta}>
                    <span className={styles.year}>{project.year}</span>
                    <span
                      className={styles.cat}
                      style={{ color: project.color }}
                    >
                      {project.category}
                    </span>
                  </div>

                  <button
                    className={styles.viewBtn}
                    aria-label={`View case study for ${project.title}`}
                  >
                    <span className={styles.viewBtnLabel} aria-hidden="true">
                      View Case →
                    </span>
                    <span className={styles.viewBtnArrow} aria-hidden="true">↗</span>
                  </button>
                </div>
              </article>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
