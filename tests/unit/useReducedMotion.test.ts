import { renderHook, act } from '@testing-library/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

describe('useReducedMotion', () => {
  const mockMatchMedia = (matches: boolean) => {
    const listeners: ((e: MediaQueryListEvent) => void)[] = []
    const mq = {
      matches,
      media: '(prefers-reduced-motion: reduce)',
      addEventListener: jest.fn((_: string, cb: (e: MediaQueryListEvent) => void) => listeners.push(cb)),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }
    window.matchMedia = jest.fn().mockReturnValue(mq)
    return { mq, listeners }
  }

  it('returns false when reduced motion is not preferred', () => {
    mockMatchMedia(false)
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(false)
  })

  it('returns true when reduced motion is preferred', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(true)
  })

  it('updates when media query changes', () => {
    const { listeners } = mockMatchMedia(false)
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(false)
    act(() => {
      listeners.forEach(fn => fn({ matches: true } as MediaQueryListEvent))
    })
    expect(result.current).toBe(true)
  })

  it('removes event listener on unmount', () => {
    const { mq } = mockMatchMedia(false)
    const { unmount } = renderHook(() => useReducedMotion())
    unmount()
    expect(mq.removeEventListener).toHaveBeenCalledTimes(1)
  })
})
