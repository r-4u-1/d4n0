import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GALLERY_ITEMS } from '@/data'
import { fadeUp, staggerContainer, zoomIn, viewportOnce } from '@/hooks/animations'
import type { GalleryCategory, GalleryItem } from '@/types'
import styles from './Gallery.module.css'

const CATEGORIES: GalleryCategory[] = ['All', 'Narrative', 'Commercial', 'School', 'BTS']
const SORT_OPTIONS = ['Newest', 'Oldest', 'Photos first', 'Videos first'] as const
type SortOption = typeof SORT_OPTIONS[number]

function PlayIcon() {
  return (
    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
      <path d="M1 1L11 7L1 13V1Z" fill="white" stroke="white" strokeWidth="0.5" />
    </svg>
  )
}

function GalleryCard({ item }: { item: GalleryItem }) {
  return (
    <motion.article
      className={`${styles.item} ${item.span === 'wide' ? styles.itemWide : ''} ${item.span === 'tall' ? styles.itemTall : ''}`}
      variants={zoomIn}
      layout
      aria-label={`${item.type === 'video' ? 'Video' : 'Photo'}: ${item.title}`}
    >
      <div className={styles.itemInner}>
        <img
          src={item.image}
          alt={item.imageAlt}
          className={styles.itemImg}
          loading="lazy"
        />
        <div className={styles.itemOverlay}>
          <p className={styles.itemCat}>{item.category}</p>
          <p className={styles.itemTitle}>{item.title}</p>
        </div>
        {item.type === 'video' && (
          <button
            className={styles.playBtn}
            aria-label={`Play video: ${item.title}`}
          >
            <PlayIcon />
          </button>
        )}
        <span className={styles.itemType} aria-hidden="true">
          {item.type === 'video' ? '▶' : '◼'}
        </span>
      </div>
    </motion.article>
  )
}

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All')
  const [sort, setSort] = useState<SortOption>('Newest')

  const filtered = useMemo(() => {
    let items = activeCategory === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter(i => i.category === activeCategory)

    if (sort === 'Photos first') items = [...items].sort(a => a.type === 'photo' ? -1 : 1)
    if (sort === 'Videos first') items = [...items].sort(a => a.type === 'video' ? -1 : 1)

    return items
  }, [activeCategory, sort])

  return (
    <section
      id="gallery"
      className={`${styles.gallery} section`}
      aria-labelledby="gallery-heading"
    >
      <div className="container">
        <div className={styles.header}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <p className={styles.num}>03 — Gallery</p>
            <h2 id="gallery-heading" className={styles.title}>Stills & Footage</h2>
            <p className={styles.sub}>Photography, BTS & Film</p>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          className={styles.filters}
          role="group"
          aria-label="Filter gallery by category"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className={styles.filterBtns}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterBtnActive : ''}`}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>
          <label className={styles.sortLabel} htmlFor="gallery-sort">
            <span className="sr-only">Sort by</span>
            <select
              id="gallery-sort"
              className={styles.sortSelect}
              value={sort}
              onChange={e => setSort(e.target.value as SortOption)}
              aria-label="Sort gallery items"
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </label>
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            className={styles.grid}
            key={activeCategory}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            role="list"
            aria-label={`Gallery: ${activeCategory} items`}
          >
            {filtered.map(item => (
              <GalleryCard key={item.id} item={item} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
