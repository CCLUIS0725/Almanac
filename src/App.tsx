import { PhaseProvider, usePhase } from './scroll/PhaseContext'
import WelcomeScreen from './components/WelcomeScreen'
import HorizontalReveal from './components/HorizontalReveal'
import MainSite from './components/MainSite'
import React, { useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useSmoothScroll } from './hooks/useSmoothScroll'

function Shell() {
  const { phase } = usePhase()
  const prefersReducedMotion = useReducedMotion()
  const rightScrollRef = useRef<HTMLDivElement>(null)

  // Enable Lenis only in vertical phase and when motion is allowed
  useSmoothScroll(rightScrollRef, phase === 'vertical' && !prefersReducedMotion)

  return (
    <HorizontalReveal
      left={<WelcomeScreen />}
      right={<MainSite ref={rightScrollRef} />}
    />
  )
}

export default function App() {
  return (
    <PhaseProvider>
      <Shell />
    </PhaseProvider>
  )
}
