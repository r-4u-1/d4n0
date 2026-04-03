import { useState, useEffect } from 'react'

export function useScrollSpy(sectionIds: string[], offset = 80): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '')

  useEffect(() => {
    const observers = new Map<string, IntersectionObserver>()

    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id)
        },
        {
          rootMargin: `-${offset}px 0px -60% 0px`,
          threshold: 0,
        }
      )
      observer.observe(el)
      observers.set(id, observer)
    })

    return () => {
      observers.forEach(obs => obs.disconnect())
    }
  }, [sectionIds, offset])

  return activeId
}
