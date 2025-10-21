import { motion } from 'framer-motion'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { usePhase } from '../scroll/PhaseContext'

type Props = {
  left: React.ReactNode
  right: React.ReactNode
  onRightActive?: () => void
}

export default function HorizontalReveal({ left, right, onRightActive }: Props) {
  const { phase, setPhase, allowHorizontal } = usePhase()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0)
  const [x, setX] = useState(0)
  const snapping = useRef(false)
  const reachedRight = useRef(false)

  // Keep width in sync
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Phase effects
  useEffect(() => {
    if (phase === 'locked') setX(0)
    if (phase === 'vertical') setX(-width)
  }, [phase, width])

  const clampX = useCallback((val: number) => {
    return Math.max(-width, Math.min(0, val))
  }, [width])

  const onWheel = useCallback((e: WheelEvent) => {
    if (!allowHorizontal()) return
    e.preventDefault()
    if (snapping.current) return
    const next = clampX(x - e.deltaY)
    setX(next)
  }, [allowHorizontal, clampX, x])

  // Basic touch support
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    let startX = 0, startY = 0, currentX = x
    const onTouchStart = (e: TouchEvent) => {
      if (!allowHorizontal()) return
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
      currentX = x
    }
    const onTouchMove = (e: TouchEvent) => {
      if (!allowHorizontal()) return
      const dx = e.touches[0].clientX - startX
      const dy = e.touches[0].clientY - startY
      if (Math.abs(dx) > Math.abs(dy)) {
        e.preventDefault()
        setX(clampX(currentX + dx))
      }
    }
    el.addEventListener('touchstart', onTouchStart, { passive: false })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
    }
  }, [allowHorizontal, clampX, x])

  // Wheel handling registration
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const handler = (e: WheelEvent) => onWheel(e)
    el.addEventListener('wheel', handler, { passive: false })
    return () => el.removeEventListener('wheel', handler)
  }, [onWheel])

  // Snap logic + phase transition
  useEffect(() => {
    if (!allowHorizontal()) return
    const threshold = -width * 0.6
    if (x <= threshold && !snapping.current) {
      snapping.current = true
      setX(-width)
      // After a short delay assume the snap completed
      const t = setTimeout(() => {
        if (!reachedRight.current) {
          reachedRight.current = true
          onRightActive?.()
          setPhase('vertical')
        }
        snapping.current = false
      }, 260)
      return () => clearTimeout(t)
    }
  }, [x, width, allowHorizontal, setPhase, onRightActive])

  // Prevent page vertical scroll while in non-vertical phases
  useEffect(() => {
    const prev = document.body.style.overflow
    if (phase !== 'vertical') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = prev }
  }, [phase])

  const gridStyle = useMemo(() => ({
    width: `${width * 2}px`,
    transform: `translateX(${x}px)`
  }), [width, x])

  return (
    <div ref={wrapperRef} className="relative h-screen w-screen overflow-hidden">
      <motion.div
        className="grid grid-cols-2 h-full"
        style={gridStyle as any}
        animate={{ x }}
        transition={{ type: 'tween', duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="h-screen w-screen">{left}</div>
        <div className="h-screen w-screen">{right}</div>
      </motion.div>
    </div>
  )
}
