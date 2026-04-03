import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { heroStagger, heroItem } from '@/hooks/animations'
import styles from './Hero.module.css'

const PANELS = [
  {
    speed: 0.25,
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdCISgU7mnbjJDroy5T-JYeMxlhPY1UBXe507v8tlYaebJk-W_puHJDX7MYiLEo0HhzYDXieou8bp0JBcE9zEFmYnAPEibJFShO__Oqljr6FhtIf27EYYXd_RjwWCl96OF8Znmq9iVvXOFY-tMtkSVCyKcmORGVbX2ktdDq24YgpMsSjFpaPKEqtkW8a5GW8fQsJMwGLci7W8q_77qU9_Q3dikY6uOwjAf-Nlp8KLsOa43AC8HzLf2LpJYyVxZEGsyPzN5vzmB4pNi',
    alt: 'Cinematic close-up of a vintage film camera lens with soft anamorphic blue flares and deep shadows',
  },
  {
    speed: 0.55,
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAivcOwURUB2b6tHlOAhAMVkBYfZ2ZMnoqPD_dYcMl0aGwG6QjNH5qHSftPRk-iH_EoAaaXOU002DHiJfROFw5ooU4lt9AkrnCqOARXlEq4Ux-m9z8E0WtrgAzOmQvbJ-JD11jZyGoP1y2Vwlgi-Q32xiKPNEpnwhA9uCWUmqaRT0yyTfGiRuKIhzU6El5sNimdt9Y-oRiOa36d-gknX7rJG3Pmwv5ME9RaJxO0gPeelff7jytM4tVEWuXFKHxEJ_gG4qFiv-N_HMTv',
    alt: 'Moody urban street at night in heavy rain with neon green lights reflecting in deep puddles',
  },
  {
    speed: 0.9,
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzdEJF-Q-byT2PHa8ma315XQ5N5p-P1B4cCUZE2BZhCw7Nyvc0PE7zRi15HDV041uagS3n0xTvD-lPE7NwbnodvwlJDJYooJ6J2dqSoW0zzsy40HnIgigUV8GL7elbAbcvnkMDOSugT1fxNX_i5kYoGUU1yMruyP9tqwpHyLzF1xSqh02cpyv7eqok3aVMOAjzw6XH4y4e5rYoddN28UwGmdEJU9_GT_e3xrxuYme1nvO_21qx9xWZI693JchaULTBxeunIhxe-K4m',
    alt: 'Wide shot of a lone figure standing on a misty cliff edge overlooking a vast dark ocean at twilight',
  },
]

function ParallaxPanel({
  src,
  alt,
  speed,
  containerRef,
}: {
  src: string
  alt: string
  speed: number
  containerRef: React.RefObject<HTMLElement>
}) {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 60}%`])

  return (
    <div className={styles.panel} aria-hidden="true">
      <motion.img
        src={src}
        alt={alt}
        className={styles.panelImg}
        style={{ y: reduced ? undefined : y }}
        loading="eager"
      />
    </div>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null!)

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={ref}
      className={styles.hero}
      aria-label="Hero — Daniel, Film Director"
    >
      {/* Parallax panels */}
      <div className={styles.panels} aria-hidden="true">
        {PANELS.map(p => (
          <ParallaxPanel key={p.src} {...p} containerRef={ref} />
        ))}
      </div>

      {/* Gradient overlay */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* Content */}
      <motion.div
        className={styles.content}
        variants={heroStagger}
        initial="hidden"
        animate="visible"
      >
        <motion.p className={styles.eyebrow} variants={heroItem}>
          Film Director · Narrator · Visual Artist
        </motion.p>

        <motion.h1 className={styles.title} variants={heroItem}>
          Alexandre
          <br />
          <span className={styles.titleAccent}>Noir</span>
        </motion.h1>

        <motion.p className={styles.tagline} variants={heroItem}>
          "Stories that move. Worlds that breathe."
        </motion.p>

        <motion.p className={styles.desc} variants={heroItem}>
          Award-winning narrative film director based in Stockholm.
          Crafting cinematic worlds for screen, stage, and story — from
          independent features to school and corporate productions.
        </motion.p>

        <motion.div className={styles.ctas} variants={heroItem}>
          <button
            className={styles.ctaPrimary}
            onClick={scrollToProjects}
            aria-label="Scroll down to view projects"
          >
            View Projects ↓
          </button>
          <button
            className={styles.ctaGhost}
            onClick={scrollToContact}
            aria-label="Get in touch"
          >
            ▶ Watch Showreel
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator} aria-hidden="true">
        <motion.div
          className={styles.scrollLine}
          initial={{ scaleY: 0, originY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1.5, duration: 1, ease: 'easeOut' }}
        />
        <span className={styles.scrollLabel}>Scroll</span>
      </div>
    </section>
  )
}
