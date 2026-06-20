import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { heroStagger, heroItem } from '@/hooks/animations'
import styles from './Hero.module.css'

const PARTICLE_STATE = {
  canvas: { bgColor: '#0D1117', bgAlpha: 1, aspectRatio: 'Full', trails: 0.1 },
  layers: [
    {
      name: 'Studio',
      visible: true,
      type: 'text',
      text: 'D4N0',
      alignment: 'center',
      font: 'Righteous',
      size: 180,
      lineHeight: 1.2,
      letterSpacing: 0,
      weight: '400',
      svgDataUrl: null,
      svgName: null,
      svgSize: 300,
      offsetX: 0,
      offsetY: -60,
      id: 'layer-studio',
      entrance: { enabled: true, speed: 1.2, delay: 0 },
      style: {
        particleColor: '#00FFB2',
        particleAlpha: 1,
        pixelGrid: 3,
        particleSize: 4,
        shape: 'star',
        customShapeUrl: null,
      },
      physics: {
        mode: 'wave',
        influence: 180,
        force: 120,
        elasticity: 0.035,
        damping: 0.9,
        speed: 1.2,
        modeParams: {
          drift: { turbulence: 0.01, direction: 0 },
          orbit: { orbitRadius: 0.5, orbitalSpeed: 0.8 },
          echo: { persistence: 0.05, push: 0.3 },
          stick: { viscosity: 3, captureZone: 0.3 },
          glitch: { intensity: 2, frequency: 1 },
        },
      },
    },
    {
      name: 'Production',
      visible: true,
      type: 'text',
      text: 'PRODUCTIONS',
      alignment: 'center',
      font: 'Bebas Neue',
      size: 110,
      lineHeight: 1.2,
      letterSpacing: 0,
      weight: '400',
      svgDataUrl: null,
      svgName: null,
      svgSize: 300,
      offsetX: 0,
      offsetY: 80,
      id: 'layer-production',
      entrance: { enabled: true, speed: 1.2, delay: 0.4 },
      style: {
        particleColor: '#BF5FFF',
        particleAlpha: 0.9,
        pixelGrid: 4,
        particleSize: 3.5,
        shape: 'diamond',
        customShapeUrl: null,
      },
      physics: {
        mode: 'drift',
        influence: 150,
        force: 60,
        elasticity: 0.03,
        damping: 0.92,
        speed: 0.8,
        modeParams: {
          drift: { turbulence: 0.015, direction: 45 },
          orbit: { orbitRadius: 0.5, orbitalSpeed: 0.8 },
          echo: { persistence: 0.05, push: 0.3 },
          stick: { viscosity: 3, captureZone: 0.3 },
          glitch: { intensity: 2, frequency: 1 },
        },
      },
    },
    {
      name: 'Dots',
      visible: true,
      type: 'text',
      text: '👑',
      alignment: 'center',
      font: 'JetBrains Mono',
      size: 50,
      lineHeight: 1.2,
      letterSpacing: 0,
      weight: '400',
      svgDataUrl: null,
      svgName: null,
      svgSize: 300,
      offsetX: 0,
      offsetY: -185,
      id: 'layer-dots',
      entrance: { enabled: true, speed: 1.2, delay: 0.8 },
      style: {
        particleColor: '#FFD700',
        particleAlpha: 0.7,
        pixelGrid: 5,
        particleSize: 2,
        shape: 'circle',
        customShapeUrl: null,
      },
      physics: {
        mode: 'orbit',
        influence: 120,
        force: 50,
        elasticity: 0.04,
        damping: 0.93,
        speed: 1,
        modeParams: {
          drift: { turbulence: 0.01, direction: 0 },
          orbit: { orbitRadius: 0.4, orbitalSpeed: 1.5 },
          echo: { persistence: 0.05, push: 0.3 },
          stick: { viscosity: 3, captureZone: 0.3 },
          glitch: { intensity: 2, frequency: 1 },
        },
      },
    },
  ],
  activeLayerId: 'layer-dots',
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).THREE) { resolve(); return }
    const existing = document.querySelector(`script[src="${src}"]`)
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', reject, { once: true })
      return
    }
    const s = document.createElement('script')
    s.src = src
    s.onload = () => resolve()
    s.onerror = reject
    document.head.appendChild(s)
  })
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cleanupRef = useRef<(() => void) | null>(null)
  const reduced = useReducedMotion()

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (reduced) return
    const container = containerRef.current
    if (!container) return

    let cancelled = false
    let animId = 0

    loadScript('https://unpkg.com/three@0.160.0/build/three.min.js').then(() => {
      if (cancelled || !containerRef.current) return
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const THREE = (window as any).THREE
      const state = PARTICLE_STATE
      const MAX_PARTICLES_PER_LAYER = 80000

      let width = container.clientWidth
      let height = container.clientHeight

      const scene = new THREE.Scene()
      const camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 1000)
      camera.position.z = 100

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'high-performance' })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      container.appendChild(renderer.domElement)

      const fadeScene = new THREE.Scene()
      const fadeCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
      const fadeMat = new THREE.MeshBasicMaterial({
        color: state.canvas.bgColor,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      })
      fadeScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), fadeMat))

      let mouseX = -9999
      let mouseY = -9999

      const onPointerMove = (e: PointerEvent) => {
        const rect = container.getBoundingClientRect()
        mouseX = e.clientX - rect.left - rect.width / 2
        mouseY = -(e.clientY - rect.top - rect.height / 2)
      }
      const onPointerLeave = () => { mouseX = -9999; mouseY = -9999 }
      container.addEventListener('pointermove', onPointerMove)
      container.addEventListener('pointerleave', onPointerLeave)

      const shapeTextures: Record<string, unknown> = {}
      const createShapeTexture = (shape: string) => {
        if (shapeTextures[shape]) return shapeTextures[shape]
        const cvs = document.createElement('canvas')
        cvs.width = 64; cvs.height = 64
        const ctx = cvs.getContext('2d')!
        ctx.fillStyle = '#ffffff'
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = 4
        ctx.translate(32, 32)
        ctx.beginPath()
        switch (shape) {
          case 'square': ctx.fillRect(-24, -24, 48, 48); break
          case 'circle': ctx.arc(0, 0, 24, 0, Math.PI * 2); ctx.fill(); break
          case 'ring': ctx.arc(0, 0, 20, 0, Math.PI * 2); ctx.stroke(); break
          case 'triangle': ctx.moveTo(0, -24); ctx.lineTo(24, 24); ctx.lineTo(-24, 24); ctx.fill(); break
          case 'diamond': ctx.moveTo(0, -24); ctx.lineTo(24, 0); ctx.lineTo(0, 24); ctx.lineTo(-24, 0); ctx.fill(); break
          case 'star':
            for (let i = 0; i < 5; i++) {
              ctx.lineTo(Math.cos(((18 + i * 72) * Math.PI) / 180) * 24, -Math.sin(((18 + i * 72) * Math.PI) / 180) * 24)
              ctx.lineTo(Math.cos(((54 + i * 72) * Math.PI) / 180) * 10, -Math.sin(((54 + i * 72) * Math.PI) / 180) * 10)
            }
            ctx.closePath(); ctx.fill(); break
          default: ctx.fillRect(-24, -24, 48, 48)
        }
        const tex = new THREE.CanvasTexture(cvs)
        tex.minFilter = THREE.LinearFilter
        shapeTextures[shape] = tex
        return tex
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const layerData: Record<string, any> = {}
      const imageCache: Record<string, HTMLImageElement> = {}
      const entranceStates: Record<string, { startTime: number; complete: boolean }> = {}

      async function updateTargets() {
        // Scale font sizes and offsets proportionally to viewport width
        const scale = Math.min(1, width / 750)

        for (const layer of state.layers) {
          if (!layer.visible) continue
          const cvs = document.createElement('canvas')
          cvs.width = width; cvs.height = height
          const ctx = cvs.getContext('2d', { willReadFrequently: true })
          if (!ctx) continue

          ctx.fillStyle = '#000'
          ctx.fillRect(0, 0, width, height)
          ctx.fillStyle = '#fff'
          ctx.textBaseline = 'middle'

          const scaledSize = Math.round(layer.size * scale)
          const scaledOffsetX = layer.offsetX * scale
          const scaledOffsetY = layer.offsetY * scale

          if (layer.type === 'text' && layer.text) {
            try { await document.fonts.load(`${layer.weight} ${scaledSize}px "${layer.font}"`) } catch (e) { /* noop */ }
            ctx.font = `${layer.weight} ${scaledSize}px "${layer.font}"`
            ctx.textAlign = layer.alignment as CanvasTextAlign
            const lines = layer.text.split('\n')
            const lineH = scaledSize * layer.lineHeight
            const totalH = lineH * lines.length
            let startY = height / 2 - totalH / 2 + lineH / 2
            let startX = layer.alignment === 'left' ? width * 0.1 : layer.alignment === 'right' ? width * 0.9 : width / 2
            startX += scaledOffsetX
            startY += scaledOffsetY
            lines.forEach(line => { ctx.fillText(line, startX, startY); startY += lineH })
          } else if (layer.type === 'svg' && layer.svgDataUrl) {
            let img = imageCache[layer.svgDataUrl]
            if (!img) {
              img = new Image()
              await new Promise<void>(r => { img.onload = () => { imageCache[layer.svgDataUrl!] = img; r() }; img.src = layer.svgDataUrl! })
            }
            const aspect = img.width / img.height
            let drawW = layer.svgSize, drawH = layer.svgSize / aspect
            if (drawH > layer.svgSize) { drawH = layer.svgSize; drawW = layer.svgSize * aspect }
            ctx.drawImage(img, width / 2 - drawW / 2 + layer.offsetX, height / 2 - drawH / 2 + layer.offsetY, drawW, drawH)
          }

          const imgData = ctx.getImageData(0, 0, width, height).data
          const newTargets: number[] = []
          const grid = layer.style.pixelGrid
          for (let y = 0; y < height; y += grid)
            for (let x = 0; x < width; x += grid) {
              const idx = (y * width + x) * 4
              if (imgData[idx] > 128) newTargets.push(x - width / 2, -(y - height / 2), 0)
            }

          const count = Math.min(newTargets.length / 3, MAX_PARTICLES_PER_LAYER)
          let ld = layerData[layer.id]
          if (!ld) {
            const positions = new Float32Array(MAX_PARTICLES_PER_LAYER * 3)
            const targets = new Float32Array(MAX_PARTICLES_PER_LAYER * 3)
            const velocities = new Float32Array(MAX_PARTICLES_PER_LAYER * 3)
            const randomSeeds = new Float32Array(MAX_PARTICLES_PER_LAYER)
            for (let j = 0; j < MAX_PARTICLES_PER_LAYER; j++) randomSeeds[j] = Math.random()
            const geometry = new THREE.BufferGeometry()
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
            geometry.setDrawRange(0, 0)
            const material = new THREE.PointsMaterial({
              color: layer.style.particleColor,
              size: layer.style.particleSize,
              transparent: true,
              opacity: layer.style.particleAlpha,
              map: createShapeTexture(layer.style.shape),
              depthWrite: false,
              blending: THREE.NormalBlending,
              alphaTest: 0.05,
            })
            const points = new THREE.Points(geometry, material)
            scene.add(points)
            ld = { positions, targets, velocities, randomSeeds, count: 0, geometry, material, points }
            layerData[layer.id] = ld
          }

          const doEntranceInit = layer.entrance?.enabled && !entranceStates[layer.id]
          if (doEntranceInit) entranceStates[layer.id] = { startTime: performance.now(), complete: false }

          for (let i = 0; i < count; i++) {
            ld.targets[i*3] = newTargets[i*3]
            ld.targets[i*3+1] = newTargets[i*3+1]
            ld.targets[i*3+2] = 0
            if (doEntranceInit) {
              ld.positions[i*3] = (Math.random() - 0.5) * width * 1.5
              ld.positions[i*3+1] = height / 2 + Math.random() * 800
              ld.positions[i*3+2] = 0
              ld.velocities[i*3] = (Math.random() - 0.5) * 4
              ld.velocities[i*3+1] = -(Math.random() * 4 + 1)
              ld.velocities[i*3+2] = 0
            } else if (i >= ld.count) {
              ld.positions[i*3] = (Math.random() - 0.5) * width
              ld.positions[i*3+1] = (Math.random() - 0.5) * height
              ld.positions[i*3+2] = 0
              ld.velocities[i*3] = 0; ld.velocities[i*3+1] = 0; ld.velocities[i*3+2] = 0
            }
          }
          ld.count = count
          ld.geometry.setDrawRange(0, count)
          ld.points.renderOrder = state.layers.length - 1 - state.layers.indexOf(layer)
        }
      }

      updateTargets()

      const onResize = () => {
        width = container.clientWidth
        height = container.clientHeight
        renderer.setSize(width, height)
        camera.left = width / -2; camera.right = width / 2
        camera.top = height / 2; camera.bottom = height / -2
        camera.updateProjectionMatrix()
        updateTargets()
      }
      window.addEventListener('resize', onResize)

      function loop() {
        animId = requestAnimationFrame(loop)
        const mx = mouseX, my = mouseY
        const time = performance.now() * 0.005

        for (const layer of state.layers) {
          if (!layer.visible) continue
          const ld = layerData[layer.id]
          if (!ld) continue
          const { positions, targets, velocities, randomSeeds, count, geometry } = ld
          const { mode, influence, force, elasticity, damping, speed } = layer.physics
          const mp = layer.physics.modeParams

          const entranceState = entranceStates[layer.id]
          const isEntranceActive = layer.entrance?.enabled && entranceState && !entranceState.complete
          const entranceElapsed = isEntranceActive ? (performance.now() - entranceState.startTime) / 1000 : 0
          const entranceDelay = layer.entrance?.delay || 0
          const entranceSpeed = layer.entrance?.speed || 1
          const convergeDuration = 2.5 / entranceSpeed

          for (let i = 0; i < count; i++) {
            const i3 = i * 3
            let entranceFactor = 1
            if (isEntranceActive) {
              const seed = randomSeeds[i]
              const particleDelay = entranceDelay + seed * 0.8
              if (entranceElapsed < particleDelay) {
                entranceFactor = 0
              } else {
                const t = (entranceElapsed - particleDelay) / convergeDuration
                entranceFactor = Math.min(1, t * t)
              }
            }

            let ax = (targets[i3] - positions[i3]) * elasticity * entranceFactor
            let ay = (targets[i3+1] - positions[i3+1]) * elasticity * entranceFactor

            if (entranceFactor < 1) {
              const seed = randomSeeds[i]
              ay -= (0.15 + seed * 0.25) * (1 - entranceFactor)
              ax += Math.sin(time * 1.5 + i * 0.37 + seed * 6.28) * 0.2 * (1 - entranceFactor)
            }

            if (mx !== -9999) {
              const dx = positions[i3] - mx, dy = positions[i3+1] - my
              const dist = Math.sqrt(dx*dx + dy*dy)
              if (dist < influence && dist > 0.1) {
                const forceMag = (1 - dist / influence) * force * entranceFactor
                if (mode === 'repel') { ax += (dx/dist)*forceMag; ay += (dy/dist)*forceMag }
                else if (mode === 'attract') { ax -= (dx/dist)*forceMag; ay -= (dy/dist)*forceMag }
                else if (mode === 'swirl') { ax += (dy/dist)*forceMag; ay -= (dx/dist)*forceMag }
                else if (mode === 'wave') { ay += Math.sin(dist*0.05 - time)*forceMag }
                else if (mode === 'drift') {
                  const baseAngle = mp.drift.direction * Math.PI / 180
                  const angle = baseAngle + Math.sin(positions[i3]*mp.drift.turbulence + time)*0.5 + Math.atan2(dy,dx)*0.3
                  ax += Math.cos(angle)*forceMag*0.5; ay += Math.sin(angle)*forceMag*0.5
                } else if (mode === 'orbit') {
                  const orbitRadius = influence * mp.orbit.orbitRadius
                  const radialForce = (dist - orbitRadius) / influence * forceMag
                  ax += (dy/dist)*forceMag*mp.orbit.orbitalSpeed - (dx/dist)*radialForce
                  ay += -(dx/dist)*forceMag*mp.orbit.orbitalSpeed - (dy/dist)*radialForce
                }
              }
            }
            velocities[i3] = (velocities[i3] + ax*speed) * damping
            velocities[i3+1] = (velocities[i3+1] + ay*speed) * damping
            positions[i3] += velocities[i3]
            positions[i3+1] += velocities[i3+1]
          }

          if (isEntranceActive && entranceElapsed > entranceDelay + 0.8 + convergeDuration * 1.5) {
            entranceState.complete = true
          }
          geometry.attributes.position.needsUpdate = true
        }

        if (state.canvas.trails > 0) {
          renderer.autoClearColor = false
          fadeMat.color.set(state.canvas.bgColor)
          fadeMat.opacity = 1 - state.canvas.trails
          renderer.render(fadeScene, fadeCamera)
        } else {
          renderer.autoClearColor = true
          renderer.setClearColor(state.canvas.bgColor, state.canvas.bgAlpha)
          renderer.clear()
        }
        renderer.render(scene, camera)
      }
      loop()

      cleanupRef.current = () => {
        cancelAnimationFrame(animId)
        window.removeEventListener('resize', onResize)
        container.removeEventListener('pointermove', onPointerMove)
        container.removeEventListener('pointerleave', onPointerLeave)
        renderer.dispose()
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement)
        }
      }
    })

    return () => {
      cancelled = true
      cleanupRef.current?.()
    }
  }, [reduced])

  return (
    <section
      id="hero"
      className={styles.hero}
      aria-label="Hero — Studio Production"
    >
      {/* Particle canvas mount point */}
      <div ref={containerRef} className={styles.particleCanvas} aria-hidden="true" />

      {/* Gradient overlay at bottom for CTA legibility */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* Anamorphic lens flare */}
      <div className={styles.lensFlare} aria-hidden="true" />

      {/* CTA content */}
      <motion.div
        className={styles.content}
        variants={heroStagger}
        initial="hidden"
        animate="visible"
      >
        <motion.p className={styles.eyebrow} variants={heroItem}>
          <span className={styles.eyebrowDot} aria-hidden="true" />
          Film Director · Narrator · Visual Artist
        </motion.p>

        <h1 className="sr-only">Dano B — Studio Production</h1>

        <motion.div className={styles.ctas} variants={heroItem}>
          <button
            className={styles.ctaPrimary}
            onClick={scrollToProjects}
            aria-label="Scroll down to view projects"
          >
            View Projects
          </button>
          <button
            className={styles.ctaGhost}
            onClick={scrollToContact}
            aria-label="Get in touch"
          >
            <span className={styles.ctaPlay} aria-hidden="true">▶</span>
            Watch Showreel
          </button>
        </motion.div>
      </motion.div>

      {/* Timecode decoration */}
      <div className={styles.timecode} aria-hidden="true">
        <span className={styles.timecodeText}>TC 01:00:00:00</span>
        <span className={styles.timecodeFormat}>24fps · 2.39:1</span>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator} aria-hidden="true">
        <motion.div
          className={styles.scrollLine}
          initial={{ scaleY: 0, originY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1.8, duration: 1.2, ease: 'easeOut' }}
        />
        <span className={styles.scrollLabel}>Scroll</span>
      </div>

      {/* Film frame corner marks */}
      <div className={styles.cornerTL} aria-hidden="true" />
      <div className={styles.cornerTR} aria-hidden="true" />
      <div className={styles.cornerBL} aria-hidden="true" />
    </section>
  )
}
