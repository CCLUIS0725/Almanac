import { motion, useAnimationControls, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { usePhase } from '../scroll/PhaseContext'

export default function WelcomeScreen() {
  const { setPhase } = usePhase()
  const [broken, setBroken] = useState(false)
  const [showMsg, setShowMsg] = useState(false)
  const lastCharControls = useAnimationControls()
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      // Instant path for reduced motion users
      const t = setTimeout(() => {
        setShowMsg(true)
      }, 150)
      const t2 = setTimeout(() => setPhase('horiz'), 350)
      return () => { clearTimeout(t); clearTimeout(t2) }
    }
  }, [prefersReducedMotion, setPhase])

  const onStartClick = () => {
    if (broken || prefersReducedMotion) return
    setBroken(true)
    // Animate only the last letter falling
    lastCharControls.start({
      y: 28,
      rotate: -18,
      opacity: 0,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
    }).then(() => setShowMsg(true))
  }

  return (
    <div className="relative grid h-screen w-screen place-items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 to-black">
      <a
        href="#skip"
        onClick={(e) => { e.preventDefault(); setPhase('horiz') }}
        className="sr-only-focusable absolute top-2 left-2 z-10 rounded bg-zinc-800/80 px-3 py-1 text-sm text-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
      >
        Skip animation
      </a>

      <div className="mx-auto max-w-3xl px-6 text-center">
        <h1 className="text-xl md:text-2xl text-zinc-300">
          Thank you for checking my portfolio! Hope you like it :)
        </h1>

        <div className="mt-10">
          <motion.button
            type="button"
            aria-disabled={broken}
            disabled={broken}
            onClick={onStartClick}
            className="pixel inline-flex items-center gap-1 rounded border border-zinc-700 bg-zinc-900 px-5 py-3 text-zinc-100 shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 hover:bg-zinc-800 disabled:opacity-50"
          >
            {['S','T','A','R'].map((c) => (
              <span key={c} className="will-transform inline-block">{c}</span>
            ))}
            <motion.span
              className="will-transform inline-block"
              animate={lastCharControls}
            >
              T
            </motion.span>
          </motion.button>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={showMsg ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          onAnimationComplete={() => { if (showMsg && !prefersReducedMotion) setPhase('horiz') }}
          className="mt-6 text-sm text-zinc-400"
          role="status"
          aria-live="polite"
        >
          {showMsg && (
            <span>
              that start button had just one job .-. … Anyways, just scroll a bit to go to the main page :)
            </span>
          )}
        </motion.p>
      </div>
    </div>
  )
}

