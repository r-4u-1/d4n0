import { motion } from 'framer-motion'
import { PROJECTS } from '@/data'
import { fadeUp, zoomIn, staggerContainer, viewportOnce } from '@/hooks/animations'
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
          className={styles.grid}
          role="list"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {PROJECTS.map(project => (
            <motion.li
              key={project.id}
              className={styles.card}
              role="listitem"
              variants={zoomIn}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <article aria-label={`Project: ${project.title}`}>
                <div className={styles.thumb}>
                  <motion.img
                    src={project.image}
                    alt={project.imageAlt}
                    className={styles.img}
                    loading="lazy"
                    whileHover={{ scale: 1.07 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <div className={styles.thumbOverlay}>
                    <p className={styles.overlayCat} style={{ color: project.color }}>
                      {project.category}
                    </p>
                    <h3 className={styles.overlayTitle}>{project.title}</h3>
                    <button
                      className={styles.overlayBtn}
                      aria-label={`View case study for ${project.title}`}
                    >
                      View Case →
                    </button>
                  </div>
                </div>
                <div className={styles.info}>
                  <div className={styles.meta}>
                    <span className={styles.year}>{project.year}</span>
                    <span
                      className={styles.cat}
                      style={{ color: project.color }}
                    >
                      {project.category}
                    </span>
                  </div>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <p className={styles.role}>{project.role}</p>
                </div>
              </article>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
