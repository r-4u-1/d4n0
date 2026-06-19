import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import styles from './Cursor.module.css'

export function Cursor() {
  const reduced = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const [pointer, setPointer] = useState(false)

  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)

  const ringX = useSpring(mx, { damping: 26, stiffness: 260, mass: 0.5 })
  const ringY = useSpring(my, { damping: 26, stiffness: 260, mass: 0.5 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      setVisible(true)
    }
    const onOver = (e: MouseEvent) => {
      setPointer(!!(e.target as Element).closest('a, button, [data-cursor]'))
    }
    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [mx, my])

  if (reduced) return null

  return (
    <div className={styles.root} aria-hidden="true">
      <motion.div
        className={`${styles.ring} ${pointer ? styles.ringHover : ''}`}
        style={{ left: ringX, top: ringY, opacity: visible ? 1 : 0 }}
      />
      <motion.div
        className={styles.dot}
        style={{ left: mx, top: my, opacity: visible ? 1 : 0 }}
      />
    </div>
  )
}
