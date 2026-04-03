import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { REEL_ITEMS } from '@/data'
import styles from './Showreel.module.css'

export function Showreel() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <div className={styles.strip} role="region" aria-label="Showreel">
        <span className={styles.label}>Showreel 2024</span>
        <button
          className={styles.playBtn}
          onClick={() => setModalOpen(true)}
          aria-label="Watch showreel video"
        >
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
            <path d="M0 0L10 6L0 12V0Z" fill="currentColor" />
          </svg>
        </button>
        <div className={styles.ticker} aria-hidden="true">
          <div className={styles.tickerInner}>
            {[...REEL_ITEMS, ...REEL_ITEMS].map((item, i) => (
              <span key={i} className={styles.tickerItem}>
                {item.title}
                <span className={styles.tickerMeta}>{item.year} · {item.type}</span>
                <span className={styles.dot}>·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Showreel video"
          >
            <motion.div
              className={styles.modalInner}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={e => e.stopPropagation()}
            >
              <div className={styles.videoPlaceholder}>
                <span className={styles.videoLabel}>Showreel 2024</span>
                <p className={styles.videoSub}>Replace with your Vimeo or YouTube embed</p>
                {/* <iframe src="https://player.vimeo.com/video/YOUR_ID?autoplay=1&muted=1" ... /> */}
              </div>
              <button
                className={styles.modalClose}
                onClick={() => setModalOpen(false)}
                aria-label="Close showreel"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
