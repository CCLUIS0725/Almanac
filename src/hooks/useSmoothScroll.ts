import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import { useReducedMotion } from 'framer-motion'

/**
 * Enables Lenis smooth scrolling on a container only when enabled === true
 * and user does not prefer reduced motion.
 */
export function useSmoothScroll(container: React.RefObject<HTMLElement | null>, enabled: boolean) {
  const prefersReducedMotion = useReducedMotion()
  const rafId = useRef<number | null>(null)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const el = container.current
    if (!el) return
    if (!enabled || prefersReducedMotion) {
      // Ensure cleanup if previously active
      lenisRef.current?.destroy()
      lenisRef.current = null
      if (rafId.current) cancelAnimationFrame(rafId.current)
      rafId.current = null
      return
    }

    // Ensure element is a scroll container for Lenis
    el.style.overflow = 'hidden'

    const lenis = new Lenis({
      wrapper: el as unknown as HTMLElement,
      content: el.firstElementChild as HTMLElement || undefined,
      duration: 1.0,
      smoothWheel: true,
      smoothTouch: true,
    } as any)
    lenisRef.current = lenis

    const raf = (time: number) => {
      lenis.raf(time)
      rafId.current = requestAnimationFrame(raf)
    }
    rafId.current = requestAnimationFrame(raf)

    return () => {
      lenisRef.current?.destroy()
      lenisRef.current = null
      if (rafId.current) cancelAnimationFrame(rafId.current)
      rafId.current = null
    }
  }, [container, enabled, prefersReducedMotion])
}

