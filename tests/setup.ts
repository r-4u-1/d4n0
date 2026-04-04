import '@testing-library/jest-dom'

// Mock framer-motion to avoid animation side effects in tests
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion')
  // Cache components so React sees a stable reference across renders —
  // without this, the Proxy returns a new function on every access, causing
  // React to unmount/remount the subtree on every render.
  const componentCache: Record<string, React.FC> = {}
  return {
    ...actual,
    motion: new Proxy(
      {},
      {
        get: (_target, prop: string) => {
          if (componentCache[prop]) return componentCache[prop]
          const Component = ({ children, ...props }: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }) => {
            const React = require('react')
            // Strip framer motion props
            const {
              initial, animate, exit, variants, whileHover, whileInView,
              viewport, transition, layout, layoutId, ...rest
            } = props as Record<string, unknown>
            void initial; void animate; void exit; void variants
            void whileHover; void whileInView; void viewport; void transition
            void layout; void layoutId
            return React.createElement(prop as string, rest, children)
          }
          Component.displayName = `motion.${prop}`
          componentCache[prop] = Component
          return Component
        },
      }
    ),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
    useTransform: () => 0,
  }
})

// Mock IntersectionObserver
class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null
  readonly rootMargin = ''
  readonly thresholds = []
  observe = jest.fn()
  unobserve = jest.fn()
  disconnect = jest.fn()
  takeRecords = () => []
}
global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { store = {} },
  }
})()
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

// Suppress console.error for expected React warnings in tests
const originalError = console.error
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && args[0].includes('Warning:')) return
    originalError(...args)
  }
})
afterAll(() => { console.error = originalError })
